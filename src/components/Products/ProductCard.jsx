import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useMain } from '../../contexts/ProductContext';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 280,
    margin: 10,
    height: 300
  },
  media: {
    height: 140,
  },
});
const ProductCard = ({ item }) => {
    const classes = useStyles();
    const { deleteProduct,history } = useMain()
    
    return (
      <Card className={classes.root}>
        <CardActionArea>
            <NavLink to={`/details/${item.id}`}>
          <CardMedia
            className={classes.media}
            image={item.image}
          />
            </NavLink>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
             {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button 
          size="small" 
          color="primary"
          onClick={() => deleteProduct(item.id)}
          >
            Delete
          </Button>
          <Button onClick={() => history.push(`/edit/${item.id}`)} size="small" color="primary">
           Edit
          </Button>
        </CardActions>
      </Card>
    );
};

export default ProductCard;