-- name: CreateSubdomain :one
INSERT INTO subdomain (program_id, url, title, body_hash, status_code, technologies, content_length, tag, ip, port, screenshot) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;

-- name: UpdateSubdomain :one
UPDATE subdomain SET program_id = $2, url = $3, title = $4, body_hash = $5, status_code = $6, technologies = $7, content_length = $8, tag = $9, updated_at = NOW() WHERE id = $1 RETURNING *;

-- name: FindSubdomainByIDs :one
SELECT * FROM subdomain WHERE id = $1 LIMIT 1;

-- name: FindSubdomainByProgram :many
SELECT * FROM subdomain WHERE program_id = $1;

-- name: FindSubdomains :many
SELECT * FROM subdomain;

-- name: DeleteSubdomainByIDs :exec
DELETE FROM subdomain WHERE id = $1;
