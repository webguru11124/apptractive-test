import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageContainer, Spinner } from '../../components';

import { XeroInvoicesTable } from '../../components/XeroInvoicesTable/XeroInvoicesTable';
import { Suspense } from 'react';

export function XeroTransactions() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Typography variant="h1">
        {t('xeroTransactions', { ns: 'xero' })}
      </Typography>
      <Suspense fallback={<Spinner />}>
        <XeroInvoicesTable />
      </Suspense>
    </PageContainer>
  );
}

export default XeroTransactions;
