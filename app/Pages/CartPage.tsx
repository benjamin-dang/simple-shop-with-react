import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { NavLink } from 'react-router';
import { useContext, useEffect } from 'react';

import { CartContext } from '~/Context/CartContext';
import { PRODUCTS_ACTION_TYPES } from '~/Reducer/productsRedcuer';


const CartPage = () => {

    const { cart, dispatchCart } = useContext(CartContext)

    console.log('Current Cart: ', cart)


    return (
        <Grid container direction={'column'} sx={{ px: 2, mx: 4 }}>
            <Grid>
                <Typography variant="h4" component='h1' gutterBottom flexGrow={1} >
                    Overview of current cart
                </Typography>
            </Grid>
            <Grid container alignItems={'center'}>
                <Typography variant="h6" component='h2' flexGrow={1}>
                    Ready to ckeckout with fast shipping
                </Typography>
            </Grid>
            {!cart.totalItems ?
                (
                    <Grid container direction={'column'} >
                        <Typography variant="h6" component='h2' flexGrow={1} mt={5} fontWeight={500}>
                            Your cart is empty
                        </Typography>
                        <Button variant="outlined" color="primary" sx={{ width: '50%' }}><NavLink to={'/products'} style={{ textDecoration: 'none', color: 'inherit' }}>Continue Shopping</NavLink></Button>
                    </Grid >
                )

                :

                (
                    <Grid container>
                        {cart.cart.map((item, index) =>
                        (
                            <>
                                <Grid container direction={'row'} sx={{ my: 2 }} key={index} alignItems={'center'}>
                                    <Grid>
                                        <Box component={'img'} src={item.image} sx={{ width: '100%', height: '300px', objectFit: 'contain' }} />
                                    </Grid>
                                    <Grid container direction={'column'} flex={1} sx={{ ml: 3 }}>
                                        <Typography variant="h6" component='h2' flexGrow={1} mt={5} fontWeight={700}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="h6" component='h2' flexGrow={1} mt={5}>
                                            {item.description}
                                        </Typography>
                                        <Typography variant="h6" component='h2' flexGrow={1} mt={5} fontWeight={700}>
                                            {item.price}$
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </>)
                        )}
                        {cart.totalItems > 1 && <Typography variant='h6' mt={5} gutterBottom alignItems={'end'} right={0}>Total: {cart.totalPrice}$</Typography>}
                        <Grid container width={'100%'}>
                            <Button variant="outlined" color="primary" sx={{ width: '50%' }}><NavLink to={'/products'} style={{ textDecoration: 'none', color: 'inherit' }}>Continue Shopping</NavLink></Button>
                            <Button variant="outlined" color="primary" sx={{ width: '50%' }}  >Checkout</Button>
                        </Grid>
                    </Grid >
                )
            }
        </Grid>
    )
}

export default CartPage; 