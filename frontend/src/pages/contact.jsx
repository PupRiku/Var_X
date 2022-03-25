import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';

import address from '../images/address.svg';
import phone from '../images/phone-adornment.svg';
import email from '../images/email-adornment.svg';
import send from '../images/send.svg';

import Layout from '../components/ui/layout';

function ContactPage() {
  return (
    <Layout>
      <Grid container="space-around" alignItems="center">
        {/* Contact form */}
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4">Contact Us</Typography>
            </Grid>
            <Grid item>
              <Button>
                <Typography variant="h4">send message</Typography>
                <img src={send} alt="send message" />
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Contact info */}
        <Grid item>
          <Grid container direction="column">
            <Grid item container>
              <Grid item>
                <img src={address} alt="address" />
              </Grid>
              <Grid item>
                <Typography variant="h2">
                  1234 S Example St Wichita, KS 67111
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <img src={phone} alt="phone" />
              </Grid>
              <Grid item>
                <Typography variant="h2">
                  (555) 555-5555
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <img src={email} alt="email" />
              </Grid>
              <Grid item>
                <Typography variant="h2">
                  chris@var-x.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ContactPage;
