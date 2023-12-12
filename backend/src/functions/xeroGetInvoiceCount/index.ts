import { User } from '/opt/API';
import { getRecord, updateRecord } from '/opt/dynamoDB';
import { initXeroClient } from '/opt/xero';
import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils';

const { TABLE_USER } = process.env;
type TokenSet = {
  id_token: string;
  access_token: string;
  expires_at: number;
  refresh_token: string;
  scope: [string];
};
// openid profile email offline_access accounting.transactions accounting.settings accounting.contacts accounting.contacts accounting.attachments
export const handler = async (ctx: Context) => {
  const { sub } = ctx.identity as AppSyncIdentityCognito;
  const { input } = ctx.arguments;

  const item: User = await getRecord(TABLE_USER ?? '', { id: sub });
  const tokenSet: TokenSet = JSON.parse(item.tokenSet);
  const { statuses } = input;

  let xero;
  try {
    xero = await initXeroClient({ scopes: tokenSet.scope });
  } catch (err: any) {
    console.log('ERROR init xero: ', err);
    throw new Error(err.message);
  }

  await xero.setTokenSet(tokenSet);

  if (tokenSet && new Date(tokenSet.expires_at * 1000) < new Date()) {
    const validTokenSet = await xero.refreshToken();
    // save the new tokenset
    const updateParams = {
      tokenSet: JSON.stringify(validTokenSet),
    };
    await updateRecord(TABLE_USER ?? '', { id: sub }, updateParams);
  }

  await xero.updateTenants();
  const xeroTenantId = xero.tenants[0].tenantId;

  let response;
  try {
    response = await xero.accountingApi.getInvoices(
      xeroTenantId,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      statuses
    );
    console.log(response.body || response.response.statusCode);
  } catch (err) {
    const error = JSON.stringify(err.response.body, null, 2);
    console.log(`Status Code: ${err.response.statusCode} => ${error}`);
    throw new Error(error);
  }
  return response.body.invoices.length;
};
