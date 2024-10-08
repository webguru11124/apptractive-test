import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  xeroGetInvoices as XEROGETINVOICES,
  XeroInvoice,
  XeroInvoiceStatus,
} from '../../../graphql';
import { Order } from '../../EnhancedTable/TableHead/type';
interface XeroGetInvoicesQueryResult {
  xeroGetInvoices: XeroInvoice[];
}

const GET_INVOICES_QUERY = gql`
  ${XEROGETINVOICES}
`;
const statues = Object.keys(XeroInvoiceStatus);

export const useXeroInvoices = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof XeroInvoice | undefined>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [statusSelected, setStatusSelected] = React.useState<string[]>(statues);
  const [where, setWhere] = React.useState<string | undefined>();

  const firstInvoiceNumber = page * rowsPerPage; // Convert page number to invoice number
  const startPage = Math.floor(firstInvoiceNumber / 100) + 1; // Determine which page to start from in Xero
  const endInvoiceNumber = firstInvoiceNumber + rowsPerPage;
  const endPage = Math.ceil(endInvoiceNumber / 100); // Determine which page to end at in Xero
  const totalAPIPagesToFetch = endPage - startPage + 1; // Total API pages to fetch

  const apiOrder = orderBy ? `${orderBy} ${order.toUpperCase()}` : undefined;

  const { data, refetch } = useQuery<XeroGetInvoicesQueryResult>(
    GET_INVOICES_QUERY,
    {
      variables: {
        input: {
          startPage,
          pageCount: totalAPIPagesToFetch,
          where,
          order: apiOrder,
        },
      },
    }
  );

  const refetchQuery = () => {
    changeWhere();
    setPage(0);
    refetch();
  };

  const changeWhere = () => {
    setWhere(
      statues
        .filter((status) => statusSelected.includes(status))
        .map((status) => `Status=="${status}"`)
        .join('||')
    );
  };

  const invoices = React.useMemo(
    () =>
      data
        ? data.xeroGetInvoices.slice(
            firstInvoiceNumber - (startPage - 1) * 100,
            firstInvoiceNumber - (startPage - 1) * 100 + rowsPerPage
          )
        : undefined,
    [data, firstInvoiceNumber, startPage, rowsPerPage]
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

  const changeOrder = React.useCallback(
    (event: React.MouseEvent<unknown>, property: string) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property as keyof XeroInvoice);
    },
    [order, orderBy]
  );

  return {
    data: invoices,
    page,
    setPage: handlePageChange,
    rowsPerPage,
    setRowsPerPage: handleRowsPerPageChange,
    statusSelected,
    refetch: refetchQuery,
    setStatusSelected: handleStatusSelectionChange,
    order,
    orderBy,
    setOrder: changeOrder,
  };
};
