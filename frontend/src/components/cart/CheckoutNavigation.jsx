/* eslint-disable */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  navbar: {
    backgroundColor: theme.palette.secondary.main,
    width: '40rem',
    height: '5rem',
  },
  back: {
    visibility: ({ steps, selectedStep }) =>
      selectedStep === 0 || selectedStep === steps.length - 1
        ? 'hidden'
        : 'visible',
  },
  forward: {
    visibility: ({ steps, selectedStep }) =>
      selectedStep >= steps.length - 2 ? 'hidden' : 'visible',
  },
  disabled: {
    opacity: 0.5,
  },
}));

export default function CheckoutNavigation({
  steps,
  selectedStep,
  setSelectedStep,
}) {
  const classes = useStyles({ steps, selectedStep });

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='center'
      classes={{ root: classes.navbar }}
    >
      <Button
        onClick={() => setSelectedStep(selectedStep - 1)}
        disabled={selectedStep === 0 || selectedStep === steps.length - 1}
      >
        <Grid item classes={{ root: classes.back }}>
          <Typography variant='h5'>{'<'}</Typography>
        </Grid>
      </Button>
      <Grid item>
        <Typography variant='h5'>
          {steps[selectedStep].title.toUpperCase()}
        </Typography>
      </Grid>
      <Button
        onClick={() => setSelectedStep(selectedStep + 1)}
        disabled={steps[selectedStep].error || selectedStep >= steps.length - 2}
        classes={{ disabled: classes.disabled }}
      >
        <Grid item classes={{ root: classes.forward }}>
          <Typography variant='h5'>{'>'}</Typography>
        </Grid>
      </Button>
    </Grid>
  );
}
