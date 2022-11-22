import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createApiKey, deleteApiKey, getApiKeys } from "../actions/settings";
import PageTitle from "../components/Typography/PageTitle";
import { TrashIcon } from "../icons";
import SectionTitle from "../components/Typography/SectionTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@windmill/react-ui";

function Settings() {
  const dispatch = useDispatch();
  const settingsState = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getApiKeys());
    console.log(settingsState);
  }, []);

  const handleCreateApiKey = () => {
    dispatch(createApiKey());
  };

  const handleDeleteApiKey = (id) => {
    dispatch(deleteApiKey(id));
  };

  const [pageTable, setPageTable] = useState(1);

  const [dataTable, setDataTable] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = settingsState.apikeys ? settingsState.apikeys.length : 0;

  function onPageChangeTable(p) {
    setPageTable(p);
  }

  useEffect(() => {
    setDataTable(
      settingsState.apikeys &&
        settingsState.apikeys.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
    );
  }, [pageTable]);

  return (
    <>
      <PageTitle>Settings</PageTitle>
      <SectionTitle>Api Keys</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3">
          <Button onClick={() => handleCreateApiKey()}>
            Create an API Key
          </Button>
        </div>

        {totalResults > 0 && (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>ID</TableCell>
                  <TableCell>Api Key</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {settingsState.apikeys.map((key, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">{key.id}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm truncate text-ellipsis overflow-hidden">
                        {key.api_key}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="icon" aria-label="Delete">
                          <TrashIcon
                            onClick={() => handleDeleteApiKey(key.id)}
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={onPageChangeTable}
                label="Navigation"
              />
            </TableFooter>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export default Settings;
