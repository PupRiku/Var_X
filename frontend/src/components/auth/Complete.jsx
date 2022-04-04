/* eslint-disable */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import checkmark from '../../images/checkmark-outline.svg';
import forward from '../../images/forward-outline.svg';

const useStyles = makeStyles(theme => ({
  iconText: {
    marginTop: '10rem',
  },
  text: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textTransform: 'none',
  },
  shop: {
    marginLeft: '1rem',
  },
  shopContainer: {
    marginRight: '1rem',
    marginBottom: '1rem',
  },
}));

export default function Complete() {
  const classes = useStyles();

  return (
    <>
      <Grid
        item
        container
        direction='column'
        alignItems='center'
        classes={{ root: classes.iconText }}
      >
        <Grid item>
          <img src={checkmark} alt='sign up finished' />
        </Grid>
        <Grid item>
          <Typography variant='h3' classes={{ root: classes.text }}>
            Account Created!
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent='flex-end'>
        <Grid item classes={{ root: classes.shopContainer }}>
          <Button>
            <Typography variant='h3' classes={{ root: classes.text }}>
              Shop
            </Typography>
            <img src={forward} alt='browse products' className={classes.shop} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
