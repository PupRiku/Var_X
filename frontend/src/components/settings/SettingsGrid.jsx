/* eslint-disable */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import BackwardsIcon from '../../images/BackwardsOutline';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%',
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

export default function SettingsGrid({
  setSelectedSetting,
  rows,
  columns,
  setOpen,
  rowsPerPage,
}) {
  const classes = useStyles();

  return (
    <Grid item container classes={classes.container}>
      <Grid item classes={{ root: classes.header }}>
        <IconButton onClick={() => setSelectedSetting(null)}>
          <div className={classes.icon}>
            <BackwardsIcon color='#fff' />
          </div>
        </IconButton>
      </Grid>
      <DataGrid
        hideFooterSelectedRowCount
        onRowClick={event => (setOpen ? setOpen(event.row.id) : null)}
        rows={rows}
        columns={columns}
        pageSize={rowsPerPage || 5}
        classes={{ root: classes.render }}
      />
    </Grid>
  );
}
