import { MockedProvider } from '@apollo/client/testing';
import { render } from '../../helpers/render';
import {
  xeroGetInvoices,
  XeroScopeSet,
} from '../../graphql';
import XeroTransactions from './XeroTransactions';
import { gql } from '@apollo/client';

const XERO_GETINVOICES = gql`${xeroGetInvoices}`;
const request = {
  query: XERO_GETINVOICES,
  variables: {
    input: {
      startPage:1,
      pageCount: 1,
    }
  }
}
const mocks = [
  {
    request,
    result:{data:{xeroGetInvoices:{request}}}
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

describe('XeroTransactions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <XeroTransactions />
      </MockedProvider>
      );
    expect(baseElement).toMatchSnapshot();
  });
});
