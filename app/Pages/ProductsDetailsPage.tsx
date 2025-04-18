import { NavLink, useParams } from "react-router";
import { useContext, useEffect } from "react";
import { ProductsContext } from "~/Context/ProductsContext";
import { PRODUCTS_ACTION_TYPES } from "~/Reducer/productsRedcuer";

import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

const ProductsDetailsPage = () => {
    const { id } = useParams();
    const { products, dispatchProducts } = useContext(ProductsContext);

    useEffect(() => {
        const fetchData = async () => {
            if (products.loaded) {
                console.log('Products already loaded');
                return;
            }

            const response = await client.get('/products');
            dispatchProducts(
                {
                    type: PRODUCTS_ACTION_TYPES.SET_PRODUCTS,
                    payload: response.data
                }
            )
        }

        fetchData();
    }, [])

    const selectedProduct = products.products.find((product) => product.id === Number(id));

    return (
        <>
            {products.loaded && (
                <Grid container alignItems={'center'} direction={'column'} width={'90%'} justifySelf={'center'}>
                    <Grid alignSelf={'start'}>
                        <NavLink to={'/products'} style={{ textDecoration: 'none', color: 'black' }}>
                            <ArrowBackIcon
                            fontSize="large"
                            />
                        </NavLink>
                        <Typography variant="h4" component='h1' gutterBottom flexGrow={1}>
                            {selectedProduct.title}
                        </Typography>
                    </Grid>
                    <Grid container alignItems={'center'} justifyContent={'center'} sx={{ my: 5 }}>
                        <Box component={'img'} src={selectedProduct.image} sx={{ width: '100%', height: '300px' }} />
                    </Grid>
                    <Grid container alignItems={'center'} justifyContent={'center'} >
                        <Typography variant="h5" component='h2' gutterBottom flexGrow={1} fontWeight={500}>
                            {selectedProduct.price}$
                        </Typography>
                        <Typography variant="h6" component='h2' gutterBottom flexGrow={1} fontSize={'1rem'}>
                            {selectedProduct.description}
                        </Typography>
                    </Grid>
                    <Grid container alignItems={'center'} justifyContent={'center'} mt={5}>
                        <Button sx={{ mx: 4 }} variant="outlined" color="primary">Add to Cart</Button>
                        <Button sx={{ mx: 4, color: 'grey' }}>Remove <form action=""></form> Cart</Button>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default ProductsDetailsPage;