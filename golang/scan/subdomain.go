package scan

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"regexp"
	"strings"

	"github.com/aituglo/rubyx/golang/db/wrapper"
	"github.com/projectdiscovery/subfinder/v2/pkg/resolve"
	"github.com/projectdiscovery/subfinder/v2/pkg/runner"
)

// Special cases for TLDs like .co.uk
var specialCases = map[string]struct{}{
	"co.uk":  {},
	"com.au": {},
	"com.br": {},
	"com.sg": {},
}

func ScanSubdomains(input string) ([]string, error) {
	options := runner.Options{
		Threads:            10,
		Timeout:            30,
		MaxEnumerationTime: 10,
		Resolvers:          resolve.DefaultResolvers,
		All:                true,
		Silent:             true,
	}

	_, err := os.Stat("/rubyx-data/config/subfinder.yaml")
	if !os.IsNotExist(err) {
		options.ProviderConfig = "/rubyx-data/config/subfinder.yaml"
	}

	runnerInstance, err := runner.NewRunner(&options)
	if err != nil {
		return nil, err
	}

	buf := bytes.Buffer{}
	err = runnerInstance.EnumerateSingleDomain(input, []io.Writer{&buf})
	if err != nil {
		return nil, err
	}

	data, err := io.ReadAll(&buf)
	if err != nil {
		return nil, err
	}

	return strings.Split(string(data), "\n"), nil
}

func ExtractDomain(input string) (string, error) {
	regex := regexp.MustCompile(`(?i)(?:https?://)?(?:\*\.)?([a-z0-9.-]+[a-z0-9])`)
	matches := regex.FindStringSubmatch(input)

	if len(matches) < 2 {
		return "", fmt.Errorf("failed to extract domain from input: %s", input)
	}

	return matches[1], nil
}

func getRootDomain(domain string) (string, error) {
	labels := strings.Split(domain, ".")
	if len(labels) < 2 {
		return "", fmt.Errorf("invalid domain")
	}

	// Check if it's a special case TLD
	lastTwoLabels := strings.Join(labels[len(labels)-2:], ".")
	if _, ok := specialCases[lastTwoLabels]; ok && len(labels) >= 3 {
		return strings.Join(labels[len(labels)-3:], "."), nil
	}

	// Regular case
	return strings.Join(labels[len(labels)-2:], "."), nil
}

func CheckScope(subdomain string, querier wrapper.Querier) int64 {
	if subdomain == "" {
		return -1
	}

	domain, err := getRootDomain(subdomain)
	if err != nil {
		fmt.Printf("Error extracting root domain: %v\n", err)
		return -1
	}

	program, err := querier.FindProgramByScope(context.Background(), "%"+domain+"%")
	if err != nil {
		log.Println(err)
		log.Println(subdomain + " program not found")
		return -1
	}
	return program
}
