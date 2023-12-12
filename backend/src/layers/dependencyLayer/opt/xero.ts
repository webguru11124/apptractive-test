import { XeroClient } from 'xero-node';

const { XERO_CLIENT_ID, XERO_CLIENT_SECRET } = process.env;

interface InitXeroProps {
  redirectUris?: string[]; //The redirect URI configured for the app created at https://developer.xero.com/myapps must match the REDIRECT_URI variable otherwise an "Invalid URI" error will be reported when attempting the initial connection to Xero.
  scopes: string[];
  state?: string;
  httpTimeout?: number;
  clockTolerance?: number;
  grantType?: string;
}

// interface GetXeroInvoicesProps {
//   redirectUris?: string[]; //The redirect URI configured for the app created at https://developer.xero.com/myapps must match the REDIRECT_URI variable otherwise an "Invalid URI" error will be reported when attempting the initial connection to Xero.
//   scopes: string[];
//   statuses: Array<string>;
//   page: number;
// }
/**
 * Initialize Xero client
 *
 * @param redirectUris
 * @param scopes
 * @param httpTimeout
 * @param grantType
 */
export const initXeroClient = async ({
  redirectUris = ['https://localhost:4200/xero-redirect'],
  scopes,
  httpTimeout = 2000,
  grantType,
}: InitXeroProps) => {
  if (!XERO_CLIENT_ID) {
    throw new Error('XERO_CLIENT_ID not set');
  }

  if (!XERO_CLIENT_SECRET) {
    throw new Error('XERO_CLIENT_SECRET not set');
  }

  const xero = new XeroClient({
    clientId: XERO_CLIENT_ID,
    clientSecret: XERO_CLIENT_SECRET,
    redirectUris,
    scopes,
    grantType,
    httpTimeout,
  });
  try {
    await xero.initialize();
  } catch (err: any) {
    console.log('ERROR initialize xero: ', err);
    throw new Error(err.message);
  }
  return xero;
};

export const getScopes = (scopeSet: string) => {
  if (scopeSet === 'PROFILE') {
    return 'openid profile email offline_access';
  } else if (scopeSet === 'ACCOUNTING') {
    return 'offline_access accounting.transactions accounting.settings accounting.contacts accounting.contacts accounting.attachments';
  } else {
    return '';
  }
};
