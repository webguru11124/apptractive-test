import { Button } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
interface XeroErrorBoundaryProps {
  children: React.ReactNode;
}
export function XeroErrorBoundary({ children }: XeroErrorBoundaryProps) {
  const { t } = useTranslation();
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          {t('xeroError', { ns: 'xero' })}
          <Button
            onClick={() => {
              resetErrorBoundary();
            }}
          >
            {t('tryAgain', { ns: 'common' })}
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
