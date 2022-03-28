/* eslint-disable */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Cart from '../../images/Cart';

const useStyles = makeStyles((theme) => ({
  qtyText: {
    color: '#fff',
  },
  mainGroup: {
    height: '3rem',
    marginTop: '2.25rem',
  },
  editButtons: {
    height: '1.525rem',
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.main,
    borderLeft: '2px solid #fff',
    borderRight: '2px solid #fff',
    borderBottom: 'none',
    borderTop: 'none',
  },
  endButtons: {
    borderRadius: 50,
    backgroundColor: theme.palette.secondary.main,
    border: 'none',
  },
  cartButton: {
    marginLeft: '0 !important',
  },
  minusButton: {
    borderTop: '2px solid #fff',
  },
  minus: {
    marginTop: '-0.25rem',
  },
  qtyButton: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  badge: {
    color: '#fff',
    fontSize: '1.5rem',
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
  },
}));

export default function QtyButton() {
  const classes = useStyles();
  const [qty, setQty] = useState(1);

  return (
    <Grid item>
      <ButtonGroup classes={{ root: classes.mainGroup }}>
        <Button classes={{ root: clsx(classes.endButtons, classes.qtyButton) }}>
          <Typography variant='h3' classes={{ root: classes.qtyText }}>
            {qty}
          </Typography>
        </Button>
        <ButtonGroup orientation='vertical'>
          <Button
            classes={{ root: classes.editButtons }}
            onClick={() => setQty(qty + 1)}
          >
            <Typography variant='h3' classes={{ root: classes.qtyText }}>
              +
            </Typography>
          </Button>
          <Button
            classes={{ root: clsx(classes.editButtons, classes.minusButton) }}
            onClick={() => setQty(qty - 1)}
          >
            <Typography
              variant='h3'
              classes={{ root: clsx(classes.qtyText, classes.minus) }}
            >
              -
            </Typography>
          </Button>
        </ButtonGroup>
        <Button
          classes={{ root: clsx(classes.endButtons, classes.cartButton) }}
        >
          <Badge
            overlap='circle'
            badgeContent='+'
            classes={{ badge: classes.badge }}
          >
            <Cart color='#fff' />
          </Badge>
        </Button>
      </ButtonGroup>
    </Grid>
  );
}
