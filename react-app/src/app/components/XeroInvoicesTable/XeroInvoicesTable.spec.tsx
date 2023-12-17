import React from 'react';
import { render } from '@testing-library/react';
import { XeroInvoicesTable } from './XeroInvoicesTable';
// Mocking the useXeroInvoices hook
vi.mock('./hook/useXeroInvoices', () => ({
  useXeroInvoices: vi.fn(() => ({
    page: 0,
    setPage: vi.fn(),
    rowsPerPage: 10,
    setRowsPerPage: vi.fn(),
    data: [
      // Add mock data here as per your XeroInvoice structure
    ],
    order: 'asc',
    orderBy: 'invoiceNumber',
    setOrder: vi.fn(),
    setStatusSelected: vi.fn(),
    statusSelected: [],
    refetch: vi.fn(),
  })),
}));

describe('XeroInvoicesTable', () => {
  test('renders XeroInvoicesTable component snapshot', () => {
    const { container } = render(<XeroInvoicesTable />);
    expect(container).toMatchSnapshot();
  });
});
