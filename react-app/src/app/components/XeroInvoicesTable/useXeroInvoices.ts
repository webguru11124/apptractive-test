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

export const useXeroInvoices = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { data: xeroInvoices, refetch } =
    useSuspenseQuery<XeroGetInvoicesQueryResult>(GET_INVOICES_QUERY, {
      variables: {
        input: {
          page: page + 1,
          limit: rowsPerPage,
          statuses: [XeroInvoiceStatus.AUTHORISED, XeroInvoiceStatus.DELETED],
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
          statuses: [XeroInvoiceStatus.AUTHORISED, XeroInvoiceStatus.DELETED],
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
  };
};
