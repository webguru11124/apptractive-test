import React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface EnhancedTableToolbarProps {
  numSelected: number;
  onFilterClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const { t } = useTranslation();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
          data-testid="selected"
        >
          {`${numSelected} ${t('selected', { ns: 'common' })}`}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          data-testid="invoices"
        >
          {t('invoices', { ns: 'xero' })}
        </Typography>
      )}
      <Tooltip title={t('filterList', { ns: 'table' })}>
        <IconButton
          onClick={(event) => props.onFilterClick && props.onFilterClick(event)}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
