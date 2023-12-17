import React from 'react';
import {
  Box,
  Checkbox,
  TableCell,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { visuallyHidden } from '@mui/utils';
import { Order } from './type';

type Numeric = 'right' | 'left' | 'center';

type HeaderCell = {
  id: string;
  label: string;
  numeric: Numeric;
};
export interface EnhancedTableProps {
  numSelected: number;

  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  headerCells: HeaderCell[];
  orderBy?: string;
  order?: Order;
  onChangeOrder?: (event: React.MouseEvent<unknown>, property: string) => void;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    numSelected,
    rowCount,
    headerCells,
    orderBy,
    order,
    onChangeOrder,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onChangeOrder && onChangeOrder(event, property);
    };
  return (
    <TableHead data-testid="table-head">
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headerCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
