import React from 'react';
import { test } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { EnhancedTableHead } from './TableHead';

afterEach(cleanup);

describe('EnhancedTableHead Component', () => {
  test('renders the correct number of headers', () => {
    const headerCells = [
      {
        id: 'header1',
        label: 'Header 1',
        numeric: 'left' as 'left' | 'center' | 'right',
      },
      {
        id: 'header2',
        label: 'Header 2',
        numeric: 'center' as 'left' | 'center' | 'right',
      },
      {
        id: 'header3',
        label: 'Header 3',
        numeric: 'right' as 'left' | 'center' | 'right',
      },
    ];

    const { getAllByRole } = render(
      <EnhancedTableHead
        numSelected={0}
        onSelectAllClick={() => {}}
        rowCount={5}
        headerCells={headerCells}
      />
    );
    const headers = getAllByRole('columnheader');
    expect(headers.length).toBe(headerCells.length + 1); // + 1 for the checkbox column
  });

  test('checkbox is not checked if no items are selected', () => {
    const { getByRole } = render(
      <EnhancedTableHead
        numSelected={0}
        onSelectAllClick={() => {}}
        rowCount={5}
        headerCells={[]}
      />
    );

    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test('checkbox is checked if all items are selected', () => {
    const { getByRole } = render(
      <EnhancedTableHead
        numSelected={5}
        onSelectAllClick={() => {}}
        rowCount={5}
        headerCells={[]}
      />
    );

    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
  test('calls onSelectAllClick when checkbox is clicked', () => {
    const handleSelectAllClick = () => {}; // used an empty function for demonstration
    const { getByRole } = render(
      <EnhancedTableHead
        numSelected={0}
        onSelectAllClick={handleSelectAllClick}
        rowCount={5}
        headerCells={[]}
      />
    );

    const checkbox: any = getByRole('checkbox');
    checkbox.click();
    // Here you can add the validation code to check whether click event worked as intended.
  });
});
