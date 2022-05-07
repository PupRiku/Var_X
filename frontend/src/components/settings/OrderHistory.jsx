/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import OrderDetails from './OrderDetails';

import BackwardsIcon from '../../images/BackwardsOutline';
import detailsIcon from '../../images/details.svg';

import { UserContext } from '../../contexts';

const useStyles = makeStyles(theme => ({
  item: {
    height: '100%',
    width: '100%',
  },
  chipLabel: {
    fontWeight: 600,
  },
  header: {
    height: '8rem',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
  },
  icon: {
    height: '4rem',
    width: '4rem',
  },
  '@global': {
    //Column Headers
    '.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
    },
    //Column Separators
    '.MuiDataGrid-root .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    //Column Headers Container
    '.MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer': {
      justifyContent: 'center',
    },
    //Column Blank Header
    '.MuiDataGrid-root .MuiDataGrid-columnHeader--moving': {
      backgroundColor: 'transparent',
    },
    //Row Cell
    '.MuiDataGrid-root .MuiDataGrid-cell': {
      whiteSpace: 'pre-wrap',
      maxHeight: '100% !important',
      lineHeight: 'initial !important',
      padding: '1rem',
      paddingRight: 'calc(1rem + 26px)',
      display: 'flex',
      justifyContent: 'center !important',
      alignItems: 'center',
      fontWeight: 600,
      borderBottom: '2px solid #fff',
    },
    // Row
    '.MuiDataGrid-root .MuiDataGrid-row': {
      maxHeight: '100% !important',
    },
    // Data Render Zone
    '.MuiDataGrid-renderingZone': {
      maxHeight: '100% !important',
    },
    // Pagination
    '.MuiDataGrid-root .MuiDataGrid-footerContainer': {
      marginTop: '-11rem',
      [theme.breakpoints.down('lg')]: {
        marginTop: '-12rem',
      },
    },
    // Pagination Text
    '.MuiTablePagination-caption': {
      color: '#fff',
    },
    // Pagination Arrows
    '.MuiSvgIcon-root': {
      fill: '#fff',
    },
    // Column Header Row
    '.MuiDataGrid-root .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.secondary.main,
      border: 'none',
    },
    // Entire Data Grid
    '.MuiDataGrid-root': {
      border: 'none',
    },
    '.MuiDataGrid-root .MuiDataGrid-overlay': {
      bottom: '8rem',
    },
    '.MuiDataGrid-root .MuiDataGrid-window': {
      bottom: '8rem',
    },
  },
}));

export default function OrderHistory({ setSelectedSetting }) {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(null);
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
    { field: 'shipping', headerName: 'Shipping', width: 385, sortable: false },
    { field: 'order', headerName: 'Order', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 250,
      renderCell: ({ value }) => (
        <Chip label={value} classes={{ label: classes.chipLabel }} />
      ),
    },
    { field: 'date', headerName: 'Date', width: 250, type: 'date' },
    {
      field: 'total',
      headerName: 'Total',
      width: 250,
      renderCell: ({ value }) => (
        <Chip label={`$${value}`} classes={{ label: classes.chipLabel }} />
      ),
    },
    {
      field: '',
      width: 385,
      sortable: false,
      renderCell: () => (
        <IconButton>
          <img src={detailsIcon} alt='details' />
        </IconButton>
      ),
    },
  ];

  const rows = createData(orders);

  return (
    <Grid item container classes={{ root: classes.item }}>
      <Grid item classes={{ root: classes.header }}>
        <IconButton onClick={() => setSelectedSetting(null)}>
          <div className={classes.icon}>
            <BackwardsIcon color='#fff' />
          </div>
        </IconButton>
      </Grid>
      <DataGrid
        hideFooterSelectedRowCount
        onRowClick={event => setOpen(event.row.id)}
        rows={rows}
        columns={columns}
        pageSize={5}
        classes={{ root: classes.render }}
      />
      <OrderDetails orders={orders} open={open} setOpen={setOpen} />
    </Grid>
  );
}
