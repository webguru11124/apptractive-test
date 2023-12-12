import * as React from 'react';
import { gql, useSuspenseQuery } from '@apollo/client';
import {
  xeroGetInvoices as XEROGETINVOICES,
  XeroInvoice,
  XeroInvoiceStatus,
  xeroGetInvoiceCount as XEROGETINVOICECOUNT,
} from '../../graphql';
interface XeroGetInvoicesQueryResult {
  xeroGetInvoices: XeroInvoice[];
}
interface XeroGetInvoiceCountQueryResult {
  xeroGetInvoiceCount: number;
}

const GET_INVOICES_QUERY = gql`
  ${XEROGETINVOICES}
`;
const GET_INVOICE_COUNT_QUERY = gql`
  ${XEROGETINVOICECOUNT}
`;
const statues = Object.keys(XeroInvoiceStatus);

export const useXeroInvoices = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statusSelected, setStatusSelected] = React.useState<string[]>(statues);

  const { data: xeroInvoices, refetch } =
    useSuspenseQuery<XeroGetInvoicesQueryResult>(GET_INVOICES_QUERY, {
      variables: {
        input: {
          page: page + 1,
          limit: rowsPerPage,
          statuses: statusSelected,
        },
      },
    });
  const handlePageChange = React.useCallback(
    (newPage: number) => {
      setPage(newPage);
      refetch();
    },
    [refetch]
  );

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

  const { data: xeroInvoiceCount } =
    useSuspenseQuery<XeroGetInvoiceCountQueryResult>(GET_INVOICE_COUNT_QUERY, {
      variables: {
        input: {
          statuses: statusSelected,
        },
      },
    });
  return {
    data: xeroInvoices.xeroGetInvoices,
    page,
    setPage: handlePageChange,
    rowsPerPage,
    setRowsPerPage: handleRowsPerPageChange,
    totalCount: xeroInvoiceCount.xeroGetInvoiceCount,
    statusSelected,
    refetch,
    setStatusSelected: handleStatusSelectionChange,
  };
};
