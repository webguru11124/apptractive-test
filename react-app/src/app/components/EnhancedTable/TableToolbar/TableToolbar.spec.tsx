import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { EnhancedTableToolbar } from './TableToolbar';

afterEach(cleanup);

describe('EnhancedTableToolbar Component', () => {
  test('rendered successfully', () => {
    const { baseElement } = render(<EnhancedTableToolbar numSelected={0} />);
    expect(baseElement).toMatchSnapshot();
  });

  test('renders "Invoices" title when no selection', () => {
    const { queryByTestId } = render(<EnhancedTableToolbar numSelected={0} />);
    const title = queryByTestId('invoices');
    expect(title).toBeInTheDocument();
  });

  test('renders "selected" title when items selected', () => {
    const numSelected = 3;
    const { queryByText } = render(
      <EnhancedTableToolbar numSelected={numSelected} />
    );
    const title = queryByText(`${numSelected} selected`);
    expect(title).not.toBeNull();
  });
});
