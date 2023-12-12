import * as React from 'react';
import { XeroInvoice } from '../../graphql';
import { EnhancedTable } from '../EnhancedTable.tsx';
import { useXeroInvoices } from './useXeroInvoices';

const filterdKeys: (keyof XeroInvoice)[] = [
  'invoiceNumber',
  'status',
  'amountPaid',
  'totalTax',
  'total',
];
export function XeroInvoicesTable() {
  const { page, setPage, rowsPerPage, totalCount, setRowsPerPage, data } =
    useXeroInvoices();

  return (
    <EnhancedTable<XeroInvoice>
      columns={filterdKeys}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      rows={data}
      totalCount={totalCount}
    />
  );
}
