/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Details from './Details';
import Payments from './Payments';
import Locations from './Locations';
import Edit from './Edit';

import { UserContext } from '../../contexts';

const useStyles = makeStyles(theme => ({
  bottomRow: {
    borderTop: '4px solid #fff',
  },
  sectionContainer: {
    height: '50%',
  },
}));

export default function Settings({ setSelectedSetting }) {
  const classes = useStyles();
  const { user, dispatchUser } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [detailValues, setDetailValues] = useState({
    name: '',
    phone: '',
    email: '',
    password: '********',
  });
  const [detailSlot, setDetailSlot] = useState(0);
  const [detailErrors, setDetailErrors] = useState({});
  const [locationValues, setLocationValues] = useState({
    street: '',
    zip: '',
    city: '',
    state: '',
  });
  const [locationSlot, setLocationSlot] = useState(0);
  const [locationErrors, setLocationErrors] = useState({});

  const [billingSlot, setBillingSlot] = useState(0);

  const allErrors = { ...detailErrors, ...locationErrors };
  const isError = Object.keys(allErrors).some(
    error => allErrors[error] === true
  );

  useEffect(() => {
    setDetailErrors({});
  }, [detailSlot]);

  useEffect(() => {
    setLocationErrors({});
  }, [locationSlot]);

  return (
    <>
      <Grid container classes={{ root: classes.sectionContainer }}>
        <Details
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          values={detailValues}
          setValues={setDetailValues}
          slot={detailSlot}
          setSlot={setDetailSlot}
          errors={detailErrors}
          setErrors={setDetailErrors}
        />
        <Payments
          user={user}
          edit={edit}
          slot={billingSlot}
          setSlot={setBillingSlot}
        />
      </Grid>
      <Grid
        container
        classes={{ root: clsx(classes.bottomRow, classes.sectionContainer) }}
      >
        <Locations
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          values={locationValues}
          setValues={setLocationValues}
          slot={locationSlot}
          setSlot={setLocationSlot}
          errors={locationErrors}
          setErrors={setLocationErrors}
        />
        <Edit
          setSelectedSetting={setSelectedSetting}
          user={user}
          dispatchUser={dispatchUser}
          edit={edit}
          setEdit={setEdit}
          setChangesMade={setChangesMade}
          changesMade={changesMade}
          details={detailValues}
          locations={locationValues}
          detailSlot={detailSlot}
          locationSlot={locationSlot}
          isError={isError}
        />
      </Grid>
    </>
  );
}
