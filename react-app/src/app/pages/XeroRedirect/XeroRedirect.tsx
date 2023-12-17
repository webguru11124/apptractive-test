import React from 'react';
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
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { PageContainer } from '../../components';

/* eslint-disable-next-line */
export interface XeroRedirectProps {}

export function XeroRedirect(props: XeroRedirectProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const url = useLocation();
  const [xeroCreateTokenSet] = useMutation(
    gql`
      ${XERO_CREATE_TOKEN_SET}
    `
  );

  const errorCode = searchParams.get('error');

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        await Auth.currentAuthenticatedUser();
      } catch (err) {
        console.log('ERROR Auth.currentAuthenticatedUser: ', err);
      }
    };

    getAuthUser();
  }, []);

  useEffect(() => {
    const createTokenSet = async () => {
      const options: OperationVariables = {
        variables: {
          input: {
            url: `${url.pathname}${url.search}`,
            scopeSet: XeroScopeSet.ACCOUNTING,
          },
        },
      };

      try {
        await xeroCreateTokenSet(options);
      } catch (err) {
        console.log('ERROR create xero token set', err);
      }
    };

    if (!errorCode) {
      enqueueSnackbar(t('xeroConnected', { ns: 'xero' }), {
        variant: 'success',
      });
      createTokenSet();
    }
  }, [xeroCreateTokenSet, errorCode, t, enqueueSnackbar]);

  return (
    <PageContainer>
      <Typography variant="h3">
        {t('xeroRedirection', { ns: 'xero' })}
      </Typography>
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
          {t('goToDashboard', { ns: 'common' })}
        </Button>
      </NavLink>
      {errorCode && (
        <Typography color="error">
          {t('xeroError', { ns: 'xero' })} ({errorCode})
        </Typography>
      )}
    </PageContainer>
  );
}

export default XeroRedirect;
