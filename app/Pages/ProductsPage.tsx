import { useEffect, useContext } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { ProductsContext } from "~/Context/ProductsContext";
import { PRODUCTS_ACTION_TYPES } from "~/Reducer/productsRedcuer";

import { client } from "~/Pages/HomePage";


const ProductsPage = () => {
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
        <Grid container direction={'column'} sx={{ px: 2 }}>
            <Grid>
                <Typography variant="h4" component='h1' gutterBottom flexGrow={1} >
                    Browser through our products
                </Typography>
            </Grid>
            <Grid>
                <Typography variant="h6" component='h2' gutterBottom flexGrow={1}>
                    We have a wide range of products for you to explore
                </Typography>
            </Grid>
            <Grid container alignItems={'center'} sx={{ my: 5 }}>
                {products.products.map((product, index) => {
                    return (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ my: 2, mx: 1 }}>
                                <CardActionArea >
                                    <Box position={'relative'}>
                                        <CardMedia
                                            component={'img'}
                                            src={product.image}
                                            alt={product.title}
                                            height={240}
                                            sx={{ objectFit: 'contain' }}
                                        />
                                        <Box position={'absolute'} top={50} bgcolor={'red'} color={'white'}>
                                            <Typography variant="h6" component={'div'} sx={{ px: 1}}>
                                                {product.price}$
                                            </Typography>

                                        </Box>
                                    </Box>
                                    <CardContent>
                                        <Typography gutterBottom>
                                            {product.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default ProductsPage