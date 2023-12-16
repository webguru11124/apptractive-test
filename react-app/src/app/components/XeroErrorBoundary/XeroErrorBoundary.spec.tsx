import { render } from '../../helpers/render';

import { XeroErrorBoundary } from './XeroErrorBoundary';

describe('XeroErrorBoundary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <XeroErrorBoundary>Error!</XeroErrorBoundary>
    );
    expect(baseElement).toBeTruthy();
  });
});
