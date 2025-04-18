import { Grid, Typography, Card, CardMedia, CardContent, CardActionArea, CardActions, Box } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router";
import axios from "axios";

import { ProductsContext } from "../Context/ProductsContext";
import { PRODUCTS_ACTION_TYPES } from "~/Reducer/productsRedcuer";

export const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

const HomePage = () => {
    const { products, dispatchProducts } = useContext(ProductsContext);

    useEffect(() => {
        const fetchData = async () => {
            if (products.loaded) {
                console.log('Products already loaded');
                return;
            };

            try {
                const response = await client.get('/products');
                console.log('Response from API: ', response.data);

                dispatchProducts(
                    {
                        type: PRODUCTS_ACTION_TYPES.SET_PRODUCTS,
                        payload: response.data
                    }
                )
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <Grid container alignItems={'center'} direction={'column'}>
            <Grid>
                <Typography variant="h4" component='h1' gutterBottom flexGrow={1}>
                    Welcome to this Awesome E-commerce Store
                </Typography>
            </Grid>
            <Grid>
                <Typography variant="h6" component='h2' gutterBottom flexGrow={1}>
                    We have a wide range of products for you to explore
                </Typography>
            </Grid>
            <Grid container alignItems={'center'} justifyContent={'center'} sx={{ my: 5 }}>
                {products.loaded && products.products.map((product, index) => {
                    if (index > 2) return;
                    return (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ my: 2, mx: 1 }}>
                                <NavLink to={'/products/' + product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardActionArea >
                                        <CardMedia
                                            component={'img'}
                                            src={product.image}
                                            alt={product.title}
                                            height={240}
                                            sx={{ objectFit: 'contain' }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom>
                                                {product.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </NavLink>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid>
                <Typography variant="h6" component='h2' gutterBottom flexGrow={1}>
                    Check out our latest products
                </Typography>
            </Grid>
        </Grid>
    )
}

export default HomePage;