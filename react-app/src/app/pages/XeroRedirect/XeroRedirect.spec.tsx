import { MockedProvider, wait } from '@apollo/client/testing';
import { render } from '../../helpers/render';
import {
  xeroCreateTokenSet,
  XeroScopeSet,
} from '../../graphql';
import XeroRedirect, { XeroRedirectProps } from './XeroRedirect';
import { gql } from '@apollo/client';
import { ErrorBoundary } from 'react-error-boundary';
import {  act, screen, waitFor } from '@testing-library/react'
import { XeroErrorBoundary } from '../../components/XeroErrorBoundary/XeroErrorBoundary';

const XERO_CREATE_TOKEN_SET = gql`${xeroCreateTokenSet}`;
const request = {
  query: XERO_CREATE_TOKEN_SET,
  variables: {
    input: {
      url:"https://localhost:4200/xero-redirect",
      scopeSet: [XeroScopeSet.ACCOUNTING],
    }
  }
}
const response = {
  token:"123-456",
  expireIn:12345,
  user:{
    email:"abc@abc.com",
    givenName:"abc",
    familyName:"def",
    __typename:"user"
  },
  __typename:"xeroCreateTokenSet"
  
}
const mocks = [
  {
    request,
    result:{data:{xeroCreateTokenSet:{...response}}}
  },
  {
    delay: 1000 ,
    request,
    result:{data:{xeroCreateTokenSet:{...response}}}
  },
  {
    request,
    error: new Error("An error occurred")
  },
];

const renderComponent = (props?:XeroRedirectProps)=>render(  
  <XeroErrorBoundary>
    <MockedProvider mocks={mocks} addTypename={false}>
      <XeroRedirect {...props}/>
    </MockedProvider>
  </XeroErrorBoundary>)

describe('XeroRedirect', () => {
  it('should render successfully', async () => {
    await act(async ()=>{
      const { baseElement } = renderComponent();
      await waitFor(() => {
        expect(baseElement).toBeTruthy();
      });
    })
  });

  it('should render correctly',async () => {
    await  act(async ()=>{
      const { baseElement } = renderComponent();
      await waitFor(() => {
        expect(baseElement).toMatchSnapshot();
      });
    })
    
  });
});
