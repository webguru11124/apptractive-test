import { gql, useMutation } from '@apollo/client';
import {
  xeroCreateConsentUrl as XERO_CREATE_CONSENT_URL,
  XeroScopeSet,
} from '../../graphql';
import { Box, Button, CircularProgress } from '@mui/material';

export const ConnectDisconnectXero = () => {
  const [xeroCreateConsentUrl, { loading }] = useMutation(
    gql(XERO_CREATE_CONSENT_URL),
    {}
  );

  const onXeroConnect = async () => {
    try {
      const { data } = await xeroCreateConsentUrl({
        variables: {
          input: {
            scopeSet: XeroScopeSet.ACCOUNTING,
          },
        },
      });
      if (data?.xeroCreateConsentUrl) {
        window.location.replace(data?.xeroCreateConsentUrl);
      }
    } catch (err) {
      console.log('ERROR create xero token set', err);
    }
  };

  return (
    <Button
      onClick={onXeroConnect}
      sx={{
        backgroundColor: '#13B5EA',
        '&:hover': {
          backgroundColor: '#13B5EA',
          opacity: 0.75,
        },
        color: '#FFF',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Connect Xero
      {loading && (
        <Box sx={{ marginLeft: 2 }}>
          <CircularProgress color="secondary" size={20} />
        </Box>
      )}
    </Button>
  );
};
