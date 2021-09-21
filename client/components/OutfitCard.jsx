import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ProductsContext } from "./ProductsContext.jsx";

//Cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarRatings from "react-star-ratings";

//Grid
import Grid from "@material-ui/core/Grid";

//Icons
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckIcon from "@material-ui/icons/Check";

//Image
const noImage = require("../../dist/Images/No-Image-Found.jpg");

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 250,
  },
  iconDepth: {
    zIndex: 1,
  },
});

export default function OutfitCard({ OutfitObj, remove }) {
  const classes = useStyles();
  //useContext
  const [overviewProduct, setOverviewProduct] = useContext(ProductsContext);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={OutfitObj.url ? OutfitObj.url : noImage}
        title={OutfitObj.name}
      >
        <div className={classes.align}>
          <Grid container direction="column" alignItems="flex-end">
            <Grid item>
              <HighlightOffIcon
                onClick={() => {
                  remove(OutfitObj);
                }}
              />
            </Grid>
          </Grid>
        </div>
      </CardMedia>
      <CardActionArea
        onClick={() => {
          setOverviewProduct(OutfitObj);
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {OutfitObj.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {OutfitObj.description}
          </Typography>
          <StarRatings
            rating={3.75}
            starDimension={"15px"}
            starSpacing={"1px"}
          />
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
}
