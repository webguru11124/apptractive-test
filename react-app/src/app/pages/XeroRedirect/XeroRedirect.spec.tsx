import { MockedProvider } from '@apollo/client/testing';
import { render } from '../../helpers/render';
import {
  xeroCreateTokenSet,
  XeroScopeSet,
} from '../../graphql';
import XeroRedirect from './XeroRedirect';
import { gql } from '@apollo/client';

const XERO_CREATE_TOKEN_SET = gql`${xeroCreateTokenSet}`;
const request = {
  query: XERO_CREATE_TOKEN_SET,
  variables: {
    input: {
      url:"https://localhost:4200/xero-redirect",
      scopeSet: XeroScopeSet.ACCOUNTING,
    }
  }
}
const mocks = [
  {
    request,
    result:{data:{xeroCreateTokenSet:{request}}}
  },
  {
    delay: Infinity ,
    request,
  },
  {
    request,
    error: new Error("An error occurred")
  },
];

describe('XeroRedirect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <XeroRedirect />
      </MockedProvider>
      );
    expect(baseElement).toMatchSnapshot();
  });
});
