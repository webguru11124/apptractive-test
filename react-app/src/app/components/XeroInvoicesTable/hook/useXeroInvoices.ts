import * as React from 'react';
import { gql, useSuspenseQuery } from '@apollo/client';
import {
  xeroGetInvoices as XEROGETINVOICES,
  XeroInvoice,
  XeroInvoiceStatus,
} from '../../../graphql';
interface XeroGetInvoicesQueryResult {
  xeroGetInvoices: XeroInvoice[];
}

const GET_INVOICES_QUERY = gql`
  ${XEROGETINVOICES}
`;
const statues = Object.keys(XeroInvoiceStatus);

export const useXeroInvoices = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [statusSelected, setStatusSelected] = React.useState<string[]>(statues);

  const firstInvoiceNumber = page * rowsPerPage; // Convert page number to invoice number
  const startPage = Math.floor(firstInvoiceNumber / 100) + 1; // Determine which page to start from in Xero
  const endInvoiceNumber = firstInvoiceNumber + rowsPerPage;
  const endPage = Math.ceil(endInvoiceNumber / 100); // Determine which page to end at in Xero
  const totalAPIPagesToFetch = endPage - startPage + 1; // Total API pages to fetch

  const {
    data: { xeroGetInvoices },
    refetch,
  } = useSuspenseQuery<XeroGetInvoicesQueryResult>(GET_INVOICES_QUERY, {
    variables: {
      input: {
        startPage,
        pageCount: totalAPIPagesToFetch,
        statuses: statusSelected,
      },
    },
  });

  const data = React.useMemo(
    () =>
      xeroGetInvoices.slice(
        firstInvoiceNumber - (startPage - 1) * 100,
        firstInvoiceNumber - (startPage - 1) * 100 + rowsPerPage
      ),
    [firstInvoiceNumber, rowsPerPage, startPage, xeroGetInvoices]
  );

  const handlePageChange = React.useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleStatusSelectionChange = React.useCallback(
    (statuses: string[]) => {
      setStatusSelected(statuses);
    },
    []
  );

  const handleRowsPerPageChange = React.useCallback(
    (newRowsPerPage: number) => {
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    },
    []
  );

  return {
    data,
    page,
    setPage: handlePageChange,
    rowsPerPage,
    setRowsPerPage: handleRowsPerPageChange,
    statusSelected,
    refetch,
    setStatusSelected: handleStatusSelectionChange,
  };
};
