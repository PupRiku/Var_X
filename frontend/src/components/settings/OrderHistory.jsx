/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from '../../contexts';

const useStyles = makeStyles(theme => ({
  item: {
    height: '100%',
    width: '100%',
  },
  chipLabel: {
    fontWeight: 600,
  },
  '@global': {
    //Column Headers
    '.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
      'font-weight': 600,
    },
    //Column Separators
    '.MuiDataGrid-root .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    //Column Headers Container
    '.MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer': {
      'justify-content': 'center',
    },
    //Column Blank Header
    '.MuiDataGrid-root .MuiDataGrid-columnHeader--moving': {
      'background-color': 'transparent',
    },
    //Row Cell
    '.MuiDataGrid-root .MuiDataGrid-cell': {
      'white-space': 'pre-wrap',
      'max-height': '100% !important',
      'line-height': 'initial !important',
      padding: '1rem',
      'padding-right': 'calc(1rem + 26px)',
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'font-weight': 600,
    },
    // Row
    '.MuiDataGrid-root .MuiDataGrid-row': {
      'max-height': '100% !important',
    },
    // Data Render Zone
    '.MuiDataGrid-renderingZone': {
      'max-height': '100% !important',
    },
    // Pagination
    '.MuiDataGrid-root .MuiDataGrid-footerContainer': {
      'margin-top': '-10rem',
    },
    // Pagination Text
    '.MuiTablePagination-caption': {
      color: '#fff',
    },
    // Pagination Arrows
    '.MuiSvgIcon-root': {
      fill: '#fff',
    },
  },
}));

export default function OrderHistory() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(process.env.GATSBY_STRAPI_URL + '/orders/history', {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        setOrders(response.data.orders);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const createData = data =>
    data.map(item => ({
      shipping: `${item.shippingInfo.name}\n${item.shippingAddress.street}\n${item.shippingAddress.city}, ${item.shippingAddress.state} ${item.shippingAddress.zip}`,
      order: `#${item.id
        .slice(item.id.length - 10, item.id.length)
        .toUpperCase()}`,
      status: item.status,
      date: `${item.createdAt.split('-')[1]}/${
        item.createdAt.split('-')[2].split('T')[0]
      }/${item.createdAt.split('-')[0]}`,
      total: item.total.toFixed(2),
      id: item.id,
    }));

  const columns = [
    { field: 'shipping', headerName: 'Shipping', flex: 1, sortable: false },
    { field: 'order', headerName: 'Order', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ value }) => (
        <Chip label={value} classes={{ label: classes.chipLabel }} />
      ),
    },
    { field: 'date', headerName: 'Date', flex: 1, type: 'date' },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      renderCell: ({ value }) => (
        <Chip label={`$${value}`} classes={{ label: classes.chipLabel }} />
      ),
    },
    { field: '', flex: 1.5, sortable: false },
  ];

  const rows = createData(orders);

  return (
    <Grid item classes={{ root: classes.item }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        classes={{ root: classes.render }}
      />
    </Grid>
  );
}
