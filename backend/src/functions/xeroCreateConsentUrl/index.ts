import { getScopes, initXeroClient } from '/opt/xero';
import { Context } from '@aws-appsync/utils';

export const handler = async (ctx: Context) => {
  const { input } = ctx.arguments;
  console.log('input: ', input);

  const { scopeSet } = input;
  // get scopes for xero auth
  const scopes = getScopes(scopeSet);

  let xero;
  try {
    xero = initXeroClient({
      scopes: scopes.split(' '),
    });
  } catch (err: any) {
    console.log('ERROR init xero: ', err);
    throw new Error(err.message);
  }

  try {
    await xero.initialize();
  } catch (err: any) {
    console.log('ERROR initialize xero: ', err);
    throw new Error(err.message);
  }

  let url;
  try {
    url = await xero.buildConsentUrl();
    console.log('url: ', url);
  } catch (err: any) {
    console.log('ERROR create xero consent url: ', err);
    throw new Error(err.message);
  }

  return url;
};
