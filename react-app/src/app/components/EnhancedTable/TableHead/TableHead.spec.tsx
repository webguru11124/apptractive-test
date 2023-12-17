import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { EnhancedTableHead, EnhancedTableProps } from './TableHead';
import { Order } from './type';

if (typeof Object.hasOwn !== 'function') {
  Object.hasOwn = function (object: any, property: any) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
}

// Clean up after each test
afterEach(() => {
  vi.restoreAllMocks();
});

const renderComponent = (props: EnhancedTableProps) =>
  render(
    <MemoryRouter>
      <table>
        <EnhancedTableHead {...props} />
      </table>
    </MemoryRouter>
  );

describe('EnhancedTableHead Component', () => {
  const defaultProps: EnhancedTableProps = {
    onSelectAllClick: vi.fn(),
    numSelected: 0,
    rowCount: 2,
    headerCells: [
      {
        id: 'header1',
        label: 'Header 1',
        numeric: 'left',
      },
      {
        id: 'header2',
        label: 'Header 2',
        numeric: 'center',
      },
      {
        id: 'header3',
        label: 'Header 3',
        numeric: 'right',
      },
    ],
    orderBy: 'header2',
    order: 'asc' as Order,
    onChangeOrder: vi.fn(),
  };

  it('renders the correct number of headers', async () => {
    renderComponent(defaultProps);
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(defaultProps.headerCells.length + 1); // +1 for the checkbox column
  });

  it('checkbox is not checked if no items are selected', () => {
    renderComponent({ ...defaultProps, numSelected: 0, rowCount: 5 });
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('checkbox is checked if all items are selected', () => {
    renderComponent({ ...defaultProps, numSelected: 5, rowCount: 5 });
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls onSelectAllClick when checkbox is clicked', () => {
    const handleSelectAllClick = vi.fn();
    renderComponent({
      ...defaultProps,
      onSelectAllClick: handleSelectAllClick,
      numSelected: 0,
      rowCount: 5,
    });
    const checkbox = screen.getByRole('checkbox');
    checkbox.click();
    expect(handleSelectAllClick).toHaveBeenCalled();
  });
});
