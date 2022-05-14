/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { CartContext } from '../../contexts';
import { addToCart, removeFromCart } from '../../contexts/actions';

import Cart from '../../images/Cart';

const useStyles = makeStyles(theme => ({
  qtyText: {
    color: ({ isCart }) => (isCart ? theme.palette.secondary.main : '#fff'),
  },
  mainGroup: {
    height: '3rem',
  },
  editButtons: {
    height: '1.525rem',
    borderRadius: 0,
    backgroundColor: ({ isCart }) =>
      isCart ? '#fff' : theme.palette.secondary.main,
    borderLeft: ({ isCart }) =>
      `2px solid ${isCart ? theme.palette.secondary.main : '#fff'}`,
    borderRight: '2px solid #fff',
    borderBottom: 'none',
    borderTop: 'none',
  },
  endButtons: {
    borderRadius: 50,
    backgroundColor: ({ isCart }) =>
      isCart ? '#fff' : theme.palette.secondary.main,
    border: 'none',
  },
  cartButton: {
    marginLeft: '0 !important',
    transition: 'background-color 1s ease',
  },
  minusButton: {
    borderTop: ({ isCart }) =>
      `2px solid ${isCart ? theme.palette.secondary.main : '#fff'}`,
  },
  minus: {
    marginTop: '-0.25rem',
  },
  qtyButton: {
    '&:hover': {
      backgroundColor: ({ isCart }) =>
        isCart ? '#fff' : theme.palette.secondary.main,
    },
  },
  badge: {
    color: '#fff',
    fontSize: '1.5rem',
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
  },
  success: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
  },
}));

export default function QtyButton({
  stock,
  variants,
  selectedVariant,
  name,
  isCart,
}) {
  const classes = useStyles({ isCart });
  const { cart, dispatchCart } = useContext(CartContext);
  const existingItem = cart.find(
    item => item.variant === variants[selectedVariant]
  );
  const [qty, setQty] = useState(isCart ? existingItem.qty : 1);
  const [success, setSuccess] = useState(false);

  const handleChange = direction => {
    if (qty === stock[selectedVariant].qty && direction === 'up') {
      return null;
    }
    if (qty === 1 && direction === 'down') {
      return null;
    }

    const newQty = direction === 'up' ? qty + 1 : qty - 1;

    setQty(newQty);

    if (isCart) {
      if (direction === 'up') {
        dispatchCart(addToCart(variants[selectedVariant], 1, name));
      } else if (direction === 'down') {
        dispatchCart(removeFromCart(variants[selectedVariant], 1));
      }
    }
  };

  const handleCart = () => {
    setSuccess(true);
    dispatchCart(
      addToCart(
        variants[selectedVariant],
        qty,
        name,
        stock[selectedVariant].qty
      )
    );
  };

  useEffect(() => {
    if (stock === null || stock === -1) {
      return undefined;
    } else if (qty === 0 && stock[selectedVariant].qty !== 0) {
      setQty(1);
    } else if (qty > stock[selectedVariant].qty) {
      setQty(stock[selectedVariant].qty);
    }
  }, [stock, selectedVariant]);

  useEffect(() => {
    let timer;

    if (success) {
      timer = setTimeout(() => setSuccess(false), 1500);
    }

    return () => clearTimeout(timer);
  }, [success]);

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
            onClick={() => handleChange('up')}
          >
            <Typography variant='h3' classes={{ root: classes.qtyText }}>
              +
            </Typography>
          </Button>
          <Button
            classes={{ root: clsx(classes.editButtons, classes.minusButton) }}
            onClick={() => handleChange('down')}
          >
            <Typography
              variant='h3'
              classes={{ root: clsx(classes.qtyText, classes.minus) }}
            >
              -
            </Typography>
          </Button>
        </ButtonGroup>
        {isCart ? null : (
          <Button
            classes={{
              root: clsx(classes.endButtons, classes.cartButton, {
                [classes.success]: success,
              }),
            }}
            onClick={handleCart}
            disabled={stock ? stock[selectedVariant].qty === 0 : true}
          >
            {success ? (
              <Typography variant='h3' classes={{ root: classes.qtyText }}>
                ✓
              </Typography>
            ) : (
              <Badge
                overlap='circular'
                badgeContent='+'
                classes={{ badge: classes.badge }}
              >
                <Cart color='#fff' />
              </Badge>
            )}
          </Button>
        )}
      </ButtonGroup>
    </Grid>
  );
}
