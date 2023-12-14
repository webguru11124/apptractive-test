import * as React from 'react';
import { XeroInvoice, XeroInvoiceStatus } from '../../graphql';
import { EnhancedTable } from '../EnhancedTable/EnhancedTable';
import { useXeroInvoices } from './hook/useXeroInvoices';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox, ListItemText, Menu } from '@mui/material';

const columns: (keyof XeroInvoice)[] = [
  'status',
  'totalTax',
  'total',
  'invoiceNumber',
  'amountPaid',
];

const statues = Object.keys(XeroInvoiceStatus);

export function XeroInvoicesTable() {
  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    data,
    order,
    orderBy,
    setOrder,
    setStatusSelected,
    statusSelected,
    refetch,
  } = useXeroInvoices();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    refetch();
  };

  const handleStatusSelected = (status: string) => {
    const currentIndex = statusSelected.indexOf(status);
    const newStatusSelected = [...statusSelected];
    if (currentIndex === -1) {
      newStatusSelected.push(status);
    } else {
      newStatusSelected.splice(currentIndex, 1);
    }
    setStatusSelected(newStatusSelected);
  };

  return (
    <>
      <EnhancedTable<XeroInvoice>
        columns={columns}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        rows={data}
        order={order}
        orderBy={orderBy}
        onChangeOrder={setOrder}
        onFilterClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {statues.map((status) => (
          <MenuItem
            key={status}
            value={status}
            onClick={() => handleStatusSelected(status)}
          >
            <Checkbox checked={statusSelected.indexOf(status) > -1} />
            <ListItemText primary={status} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
