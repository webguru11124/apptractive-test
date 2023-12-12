import { render } from '../../helpers/render';

import { EnhancedTable } from './EnhancedTable';
const mockData = [
  {
    column1: 'data 1',
    column2: 'data 2',
    column3: 'data 3',
    // add more columns if needed
  },
  // add more rows as required
];
describe('EnhancedTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <EnhancedTable
        rows={mockData}
        columns={['column1', 'column2', 'column3']}
        page={0}
        setPage={() => {}}
        rowsPerPage={5}
        setRowsPerPage={() => {}}
        totalCount={mockData.length}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
