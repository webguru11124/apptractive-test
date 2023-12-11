import { gql, useMutation } from '@apollo/client';
import { OperationVariables } from '@apollo/client/core/types';
import {
  xeroCreateTokenSet as XERO_CREATE_TOKEN_SET,
  XeroScopeSet,
} from '../../graphql';
import { Button, Typography } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

/* eslint-disable-next-line */
export interface XeroRedirectProps {}

export function XeroRedirect(props: XeroRedirectProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [xeroCreateTokenSet] = useMutation(gql(XERO_CREATE_TOKEN_SET), {});

  const errorCode = searchParams.get('error');

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        console.log('authUser: ', authUser);
      } catch (err) {
        console.log('ERROR Auth.currentAuthenticatedUser: ', err);
      }
    };

    getAuthUser();
  }, []);

  useEffect(() => {
    const createTokenSet = async () => {
      const url = window.location.href;
      const options: OperationVariables = {
        variables: {
          input: {
            url,
            scopeSet: XeroScopeSet.ACCOUNTING,
          },
        },
      };

      try {
        const { data } = await xeroCreateTokenSet(options);

        console.log('data: ', data);
      } catch (err) {
        console.log('ERROR create xero token set', err);
      }
    };

    if (!errorCode) {
      enqueueSnackbar('Xero Connected!', { variant: 'success' });
      createTokenSet();
    }
  }, [xeroCreateTokenSet, errorCode, enqueueSnackbar]);

  return (
    <>
      <NavLink to="/dashboard">
        <Button
          sx={{
            backgroundColor: '#13B5EA',
            '&:hover': {
              backgroundColor: '#13B5EA',
              opacity: 0.5,
            },
            color: '#FFF',
          }}
        >
          Go to Dashboard
        </Button>
      </NavLink>
      {errorCode && (
        <Typography color="error">
          {t('xeroError', { ns: 'xero' })} ({errorCode})
        </Typography>
      )}
    </>
  );
}

export default XeroRedirect;
