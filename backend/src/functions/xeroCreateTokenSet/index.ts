import { updateRecord } from '/opt/dynamoDB';
import { getScopes, initXeroClient } from '/opt/xero';
import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils';

const { TABLE_USER } = process.env;

// openid profile email offline_access accounting.transactions accounting.settings accounting.contacts accounting.contacts accounting.attachments
export const handler = async (ctx: Context) => {
  const { sub } = ctx.identity as AppSyncIdentityCognito;
  const { input } = ctx.arguments;
  const { url, scopeSet } = input;
  console.log('sub: ', sub);
  console.log('url: ', url);

  const scopes = getScopes(scopeSet);

  let xero;
  try {
    xero = await initXeroClient({
      scopes: scopes.split(' '),
      grantType: 'authorization_code',
    });
  } catch (err: any) {
    console.log('ERROR init xero: ', err);
    throw new Error(err.message);
  }

  let tokenSet;
  try {
    tokenSet = await xero.apiCallback(url);
  } catch (err: any) {
    console.log('ERROR get tokenSet ', err);
    throw new Error(err.message);
  }

  let response;
  try {
    const keys = {
      id: sub,
    };

    const updateParams = {
      tokenSet: JSON.stringify(tokenSet),
    };

    response = await updateRecord(TABLE_USER ?? '', keys, updateParams);
    console.log(response);
  } catch (err: any) {
    console.log('Error update user ', err);
    throw new Error(err.message);
  }

  return response;
};
