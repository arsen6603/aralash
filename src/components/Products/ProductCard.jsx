import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import Typography from '@material-ui/core/Typography';
import { useMain } from '../../contexts/ProductContext';
import { NavLink } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useEffect } from 'react';
import './ProductCard.css'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { text } from '../../consts/colorConsts';

const useStyles = makeStyles({
  media: {
    height: 170,
    width: 270
  },
  card: {
    backgroundColor: '#FFB236'
  },
  back: {
    color: text,
    backgroundColor: '#07161F'
  },
  content: {
    display: 'flex',
    justifyContent: 'center'
  }
});
const ProductCard = ({ item }) => {
    const classes = useStyles();
    const { deleteProduct,history,addFavorite,favorites, getFavorites,addProductToCart, cart, getCart } = useMain()
    useEffect(() => {
      getFavorites()
    },[])
    useEffect(() => {
      getCart()
    }, [])
    const checkFavorites = (id) => {
      if(favorites && favorites.products){
        const foundItem = favorites?.products.find(product => product.item.id === id)
        return foundItem ? 'secondary' : 'default'
      }
    }
    const checkItemInCart = (id) => {
      if(cart && cart.products){
        const foundItem = cart?.products.find(product => product.item.id === id)
        return foundItem ? 'secondary' : 'default'
      }
    }
    return (
      <Flippy
    flipOnHover={false} // default false
    flipOnClick={true} // default false
    flipDirection="horizontal" // horizontal or vertical
    style={{ width: '300px', height: '250px', margin: '10px' }} /// these are optional style, it is not necessary
  >
    <FrontSide
      className={classes.card}
    >
       <CardActionArea>
            <NavLink to={`/details/${item.id}`}>
          <CardMedia
            className={classes.media}
            image={item.image}
          />
            </NavLink>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
             {item.title}
            </Typography>
            
          </CardContent>
        </CardActionArea>
    </FrontSide>
    <BackSide
    className={classes.back}>
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
      <IconButton color={checkFavorites(item.id)} onClick={()=> addFavorite(item)}>
        <StarOutlineRoundedIcon/>
      </IconButton>
      <IconButton color={checkItemInCart(item.id)} onClick={() => addProductToCart(item)} aria-label="add to favorites">
        <AddShoppingCartIcon />
      </IconButton>
        </CardActions>
    </BackSide>
  </Flippy>
    );
};

export default ProductCard;