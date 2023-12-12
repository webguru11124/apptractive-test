import { render } from '../../helpers/render';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Spinner />);
    expect(baseElement).toBeTruthy();
  });
});
