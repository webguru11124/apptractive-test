import { render } from '../../helpers/render';

import { XeroInvoicesTable } from './XeroInvoicesTable';

describe('XeroInvoicesTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<XeroInvoicesTable />);
    expect(baseElement).toBeTruthy();
  });
});
