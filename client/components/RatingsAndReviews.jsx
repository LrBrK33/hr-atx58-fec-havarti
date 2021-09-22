import React, { useState, useContext, useEffect, useRef } from 'react';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
import RatingBreakdownBars from './RARRatingBreakdownBars.jsx';
import ReviewSorter from './RARReviewSorter.jsx';
import ReviewDisplay from './RARReviewDisplay.jsx';
import { ProductsContext } from './ProductsContext';
import Typography from '@mui/material/Typography';
import RecommendRatio from './RARRecommendRatio.jsx';
import FactorBarsDisplay from './RARFactorBarsDisplay.jsx';

const axios = require('axios');


export default function RatingsAndReviews(props) {
  const { overviewProduct } = useContext(ProductsContext)
  const [ overviewProductState, setOverviewProductState ] = overviewProduct;
  const { starRating } = useContext(ProductsContext);
  const [ starRatingState, setStarRating ] = starRating;

  const [currentReviews, setCurrentReviews] = useState({});
  const [averageStarRating, updateAverageStarRating] = useState(0);
  const [isLoading, setLoading] = useState(true);
  // const [recommendRatio, setRecommendRatio] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      axios.get('/reviewtotal', {
        params: {
          ID: overviewProductState.id
        }
      })
      .then((reviewData) => {
        // console.log('Review data object: ', reviewData.data);
        setCurrentReviews(reviewData.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error while fetching reviews:');
        console.log(error);
      })
    } else {
    isMounted.current = true;
  }}, [overviewProductState])

  if (isLoading) {
    return (
      <div>
        Loading reviews...
      </div>
    )
  } else {
      return (
      <>
        <h3 id='ratings-and-reviews'>Ratings And Reviews</h3>
        <Grid container spacing={6}>
          <Grid item xs={6} s={6} m={6} lg={6} xl={6} className="RARLeftColumn">
            <RecommendRatio currentReviews = {currentReviews} />
            {starRatingState} <StarRatings rating={starRatingState} starDimension={'15px'} starSpacing={'1px'} />
            <RatingBreakdownBars setStarRating = {setStarRating} currentReviews={currentReviews} overviewProduct = {overviewProduct}/>
            <FactorBarsDisplay currentReviews={currentReviews} />
          </Grid>
          <Grid item xs={6} s={6} m={6} lg={6} xl={6} className="RARRightColumn">
            <ReviewSorter currentReviews={currentReviews}/>
            <ReviewDisplay currentReviews={currentReviews} currentProduct={overviewProduct}/>
          </Grid>
        </Grid>
      </>
    )
  }
}
