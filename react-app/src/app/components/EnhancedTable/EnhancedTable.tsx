import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { EnhancedTableHead } from './TableHead/TableHead';
import { EnhancedTableToolbar } from './TableToolbar/TableToolbar';
import { useTranslation } from 'react-i18next';
import { Order } from './TableHead/type';
import { Skeleton } from '@mui/material';

interface EnhancedTableProps<T extends object> {
  rows: undefined | T[];
  columns: (keyof T)[];
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  totalCount?: number;
  orderBy?: string;
  order?: Order;
  onChangeOrder?: (event: React.MouseEvent<unknown>, property: string) => void;
  setRowsPerPage: (page: number) => void;
  onFilterClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function EnhancedTable<T extends object>({
  rows,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  columns,
  onFilterClick,
  order,
  orderBy,
  onChangeOrder,
}: EnhancedTableProps<T>) {
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [dense, setDense] = React.useState(false);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n, index) => index) ?? [];
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  let emptyRows =
    rows !== undefined ? Math.max(0, rowsPerPage - rows.length) : rowsPerPage;
  if (rows !== undefined && page === 0 && emptyRows > 0) emptyRows = -1;
  const count = rows
    ? emptyRows > 0
      ? page * rowsPerPage + rows.length
      : emptyRows === -1
      ? rows.length
      : -1
    : 0;

  const visibleRows: T[] | undefined = React.useMemo(
    () =>
      rows
        ?.slice(0, rowsPerPage)
        .map(
          (row) =>
            columns.reduce(
              (obj, column) => ({ ...obj, [column]: row[column] }),
              {}
            ) as T
        ),
    [columns, rows, rowsPerPage]
  );
  const headerCells = columns.map((key) => ({
    id: key as string,
    label: t(key as string, { ns: 'xero' }),
    numeric: 'center' as 'right' | 'left' | 'center',
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onFilterClick={onFilterClick}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onChangeOrder={onChangeOrder}
              headerCells={headerCells}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows?.length ?? 0}
            />
            {
              <TableBody>
                {visibleRows &&
                  visibleRows.map((row: T, index) => {
                    const isItemSelected = isSelected(index);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, index)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        {Object.keys(row).map((key: string, index: number) => (
                          <React.Fragment key={index}>
                            <TableCell align="right">
                              {row[key as keyof T] as React.ReactNode}
                            </TableCell>
                          </React.Fragment>
                        ))}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 &&
                  new Array(emptyRows).fill(null).map((_, index) => (
                    <TableRow
                      style={{
                        height: dense ? 33 : 53,
                      }}
                      key={index}
                    >
                      <TableCell colSpan={6} padding="normal">
                        {rows === undefined ? (
                          <Skeleton
                            variant="rectangular"
                            sx={{ margin: '-4px' }}
                          />
                        ) : (
                          <div></div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            }
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label={t('densePadding', { ns: 'table' })}
      />
    </Box>
  );
}
