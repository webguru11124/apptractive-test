import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { gql } from '@apollo/client';
import { vi } from 'vitest';

import XeroRedirect, { XeroRedirectProps } from './XeroRedirect';
import { xeroCreateTokenSet, XeroScopeSet } from '../../graphql';
import { XeroErrorBoundary } from '../../components/XeroErrorBoundary/XeroErrorBoundary';

const XERO_CREATE_TOKEN_SET = gql`
  ${xeroCreateTokenSet}
`;
const request = {
  query: XERO_CREATE_TOKEN_SET,
  variables: {
    input: {
      url: 'http://example.com',
      scopeSet: XeroScopeSet.ACCOUNTING,
    },
  },
};
const response = {
  __typename: 'XeroCreateTokenSetResponse',
  token: 'mock-token',
  expiresIn: 3600,
  user: {
    __typename: 'XeroCreateTokenSetUser',
    email: 'test@example.com',
    givenName: 'John',
    familyName: 'Doe',
  },
};
const mocks = [
  {
    request,
    result: { data: { xeroCreateTokenSet: response } },
  },
];

const renderComponent = (props?: XeroRedirectProps) =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <XeroErrorBoundary>
        <MockedProvider mocks={mocks} addTypename={false}>
          <XeroRedirect {...props} />
        </MockedProvider>
      </XeroErrorBoundary>
    </MemoryRouter>
  );

// Correctly mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/',
      search: '',
      // other properties as needed
    }),
    useSearchParams: () => [new URLSearchParams({ error: 'mockError' })],
  };
});

describe('XeroRedirect', () => {
  it('should render successfully', async () => {
    const { baseElement } = renderComponent();
    await waitFor(() => {
      expect(baseElement).toBeTruthy();
    });
  });

  it('should render correctly', async () => {
    const { baseElement } = renderComponent();
    await waitFor(() => {
      expect(baseElement).toMatchSnapshot();
    });
  });
});
