/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';

import ProductReview from './ProductReview';
import { GET_REVIEWS } from '../../apollo/queries';

import { UserContext } from '../../contexts';

const useStyles = makeStyles(theme => ({
  reviews: {
    padding: '0 3rem',
  },
}));

export default function ProductReviews({ product, edit, setEdit }) {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);

  const { user } = useContext(UserContext);

  const { data } = useQuery(GET_REVIEWS, { variables: { id: product } });

  useEffect(() => {
    if (data) {
      setReviews(data.product.reviews);
    }
  }, [data]);

  return (
    <Grid
      item
      container
      direction='column'
      id='reviews'
      classes={{ root: classes.reviews }}
    >
      {edit && (
        <ProductReview
          product={product}
          setEdit={setEdit}
          reviews={reviews}
          user={user}
        />
      )}
      {reviews
        .filter(review =>
          edit ? review.user.username !== user.username : review
        )
        .map(review => (
          <ProductReview
            key={review.id}
            product={product}
            review={review}
            reviews={reviews}
          />
        ))}
    </Grid>
  );
}
