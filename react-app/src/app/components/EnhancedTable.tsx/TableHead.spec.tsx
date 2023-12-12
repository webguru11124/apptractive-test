import { render, cleanup, fireEvent } from '@testing-library/react';
import { EnhancedTableHead } from './TableHead';
import * as jest from 'jest';

afterEach(cleanup);

describe('EnhancedTableHead Component', () => {
  test('renders the correct number of headers', () => {
    const headerCells = [
      { label: 'Header 1', numeric: 'left' as 'left' | 'center' | 'right' },
      { label: 'Header 2', numeric: 'center' as 'left' | 'center' | 'right' },
      { label: 'Header 3', numeric: 'right' as 'left' | 'center' | 'right' },
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
    // this checks the number of headers including checkbox column
    expect(headers.length).toBe(headerCells.length + 1);
  });

  test('checkbox works correctly with onSelectAllClick prop', () => {
    const mockHandler = jest.fn();
    const { getByRole } = render(
      <EnhancedTableHead
        numSelected={0}
        onSelectAllClick={mockHandler}
        rowCount={5}
        headerCells={[]}
      />
    );
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockHandler).toHaveBeenCalled();
  });
});
