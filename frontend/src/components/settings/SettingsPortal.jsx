/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSprings, animated, useSpring } from 'react-spring';
import useResizeAware from 'react-resize-aware';

import Settings from './Settings';
import { UserContext } from '../../contexts';

import accountIcon from '../../images/account.svg';
import settingsIcon from '../../images/settings.svg';
import orderHistoryIcon from '../../images/order-history.svg';
import favoritesIcon from '../../images/favorite.svg';
import subscriptionIcon from '../../images/subscription.svg';
import background from '../../images/repeating-smallest.svg';

const useStyles = makeStyles(theme => ({
  name: {
    color: theme.palette.secondary.main,
  },
  dashboard: {
    width: '100%',
    minHeight: '30rem',
    height: 'auto',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    borderTop: `0.5rem solid ${theme.palette.primary.main}`,
    borderBottom: `0.5rem solid ${theme.palette.primary.main}`,
    margin: '5rem 0',
  },
  icon: {
    height: '12rem',
    width: '12rem',
  },
}));

const AnimatedButton = animated(Button);
const AnimatedGrid = animated(Grid);

export default function SettingsPortal() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [resizeListener, sizes] = useResizeAware();
  const [showComponent, setShowComponent] = useState(false);

  const buttons = [
    { label: 'Settings', icon: settingsIcon, component: Settings },
    { label: 'Order History', icon: orderHistoryIcon },
    { label: 'Favorites', icon: favoritesIcon },
    { label: 'Subscriptions', icon: subscriptionIcon },
  ];

  const handleClick = setting => {
    if (selectedSetting === setting) {
      setSelectedSetting(null);
    } else {
      setSelectedSetting(setting);
    }
  };

  const springs = useSprings(
    buttons.length,
    buttons.map(button => ({
      to: async (next, cancel) => {
        const scale = {
          transform:
            selectedSetting === button.label || selectedSetting === null
              ? 'scale(1)'
              : 'scale(0)',
          delay: selectedSetting !== null ? 0 : 600,
        };

        const size = {
          height: selectedSetting === button.label ? '60rem' : '22rem',
          width:
            selectedSetting === button.label ? `${sizes.width}px` : '352px',
          borderRadius: selectedSetting === button.label ? 0 : 25,
          delay: selectedSetting !== null ? 600 : 0,
        };

        const hide = {
          display:
            selectedSetting === button.label || selectedSetting === null
              ? 'flex'
              : 'none',
          delay: 150,
        };

        await next(selectedSetting !== null ? scale : size);
        await next(hide);
        await next(selectedSetting !== null ? size : scale);
      },
    }))
  );

  const styles = useSpring({
    opacity: selectedSetting === null || showComponent ? 1 : 0,
    delay: selectedSetting === null || showComponent ? 0 : 1350,
  });

  useEffect(() => {
    if (selectedSetting === null) {
      setShowComponent(false);
      return;
    }

    const timer = setTimeout(() => setShowComponent(true), 2000);

    return () => clearTimeout(timer);
  }, [selectedSetting]);

  return (
    <Grid container direction='column' alignItems='center'>
      {resizeListener}
      <Grid item>
        <img src={accountIcon} alt='settings page' />
      </Grid>
      <Grid item>
        <Typography variant='h4' classes={{ root: classes.name }}>
          Welcome back, {user.username}
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems='center'
        justifyContent='space-around'
        classes={{ root: classes.dashboard }}
      >
        {springs.map((prop, i) => {
          const button = buttons[i];

          return (
            <Grid item key={i}>
              <AnimatedButton
                variant='contained'
                color='primary'
                onClick={() => handleClick(button.label)}
                style={prop}
              >
                <AnimatedGrid container direction='column' style={styles}>
                  {selectedSetting === button.label && showComponent ? (
                    <button.component />
                  ) : (
                    <>
                      <Grid item>
                        <img
                          src={button.icon}
                          alt={button.label}
                          className={classes.icon}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant='h5'>{button.label}</Typography>
                      </Grid>
                    </>
                  )}
                </AnimatedGrid>
              </AnimatedButton>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}