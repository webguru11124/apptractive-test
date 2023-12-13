import React from 'react';
import { test } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { EnhancedTableToolbar } from './TableToolbar';

afterEach(cleanup);

describe('EnhancedTableToolbar Component', () => {
  test('renders "Invoices" title when no selection', () => {
    const { queryByText } = render(<EnhancedTableToolbar numSelected={0} />);
    const title = queryByText('Invoices');
    expect(title).not.toBeNull();
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
