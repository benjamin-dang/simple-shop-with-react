import { Box, Button, Card, CardActionArea, CardContent, CardMedia, DialogContentText, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { NavLink } from 'react-router';
import { useContext, useEffect, useState } from 'react';

import { CartContext } from '~/Context/CartContext';
import { PRODUCTS_ACTION_TYPES } from '~/Reducer/productsRedcuer';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CART_ACTION_TYPES } from '~/Reducer/cartReducer';


const CartPage = () => {

    const { cart, dispatchCart } = useContext(CartContext)
    const [open, setOpen] = useState(false);

    const handleCheckout = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const handlePay = () => {
        dispatchCart({ type: CART_ACTION_TYPES.CLEAR_CART });
        setOpen(false);
    }
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
                                        <Box component={'img'} src={item.image} sx={{ width: '500px', height: '300px', objectFit: 'contain' }} />
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
                            <Button variant="outlined" color="primary" sx={{ width: '50%' }} onClick={handleCheckout}  >Checkout</Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                            >
                                <DialogTitle>Checkout</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        You are about to checkout. Current cart will be cleared and you will be redirected to the payment page.
                                        Total price is {cart.totalPrice.toFixed(2)}$.
                                    </DialogContentText>
                                    <Button color='grey' onClick={handleCancel}>Cancel</Button>
                                    <Button onClick={handlePay}>Checkout</Button>
                                </DialogContent>
                            </Dialog>
                        </Grid>
                    </Grid >
                )
            }
        </Grid>
    )
}

export default CartPage; 