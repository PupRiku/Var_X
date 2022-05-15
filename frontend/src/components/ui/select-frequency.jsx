/* eslint-disable */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  select: {
    '&.MuiSelect-select': {
      paddingRight: 0,
    },
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
  },
  chipRoot: {
    backgroundColor: '#fff',
    height: '3rem',
    borderRadius: 50,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  chipLabel: {
    color: theme.palette.secondary.main,
  },
  menuItem: {
    color: '#fff',
  },
}));

export default function SelectFrequency({ value, setValue }) {
  const classes = useStyles();

  const frequencies = [
    'Week',
    'Two Weeks',
    'Month',
    'Three Months',
    'Six Months',
    'Year',
  ];

  return (
    <Select
      classes={{ select: classes.select }}
      value={value}
      disableUnderline
      IconComponent={() => null}
      MenuProps={{ classes: { paper: classes.menu } }}
      onChange={event => setValue(event.target.value)}
      renderValue={selected => (
        <Chip
          label={selected}
          classes={{
            root: classes.chipRoot,
            label: classes.chipLabel,
          }}
        />
      )}
    >
      {frequencies.map(frequency => (
        <MenuItem
          key={frequency}
          value={frequency}
          classes={{ root: classes.menuItem }}
        >
          {frequency}
        </MenuItem>
      ))}
    </Select>
  );
}
