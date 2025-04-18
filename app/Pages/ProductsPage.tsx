import { useEffect, useContext } from "react";
import { NavLink } from "react-router";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ProductsContext } from "~/Context/ProductsContext";
import { PRODUCTS_ACTION_TYPES } from "~/Reducer/productsRedcuer";
import { PRODUCTS_ACTION_SORT_TYPES } from "~/Reducer/productsRedcuer";

import { client } from "~/Pages/HomePage";
import { Outlet } from "react-router";


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

    const handleSortCahange = (event) => {
        const { value } = event.target;

        switch (value) {
            case PRODUCTS_ACTION_SORT_TYPES.ASC_PRICE:
                dispatchProducts({ type: PRODUCTS_ACTION_TYPES.SORT_BY_PRICE_ASC });
                break;
            case PRODUCTS_ACTION_SORT_TYPES.DESC_PRICE:
                dispatchProducts({ type: PRODUCTS_ACTION_TYPES.SORT_BY_PRICE_DESC });
                break;
            case PRODUCTS_ACTION_SORT_TYPES.ASC_NAME:
                dispatchProducts({ type: PRODUCTS_ACTION_TYPES.SORT_BY_NAME_ASC });
                break;
            case PRODUCTS_ACTION_SORT_TYPES.DESC_NAME:
                dispatchProducts({ type: PRODUCTS_ACTION_TYPES.SORT_BY_NAME_DESC });
                break;
            default:
                break;
        }
    }

    return (
        <Grid container direction={'column'} sx={{ px: 2 }}>
            <Grid>
                <Typography variant="h4" component='h1' gutterBottom flexGrow={1} >
                    Browser through our products
                </Typography>
            </Grid>
            <Grid container alignItems={'center'}>
                <Typography variant="h6" component='h2' flexGrow={1}>
                    We have a wide range of products for you to explore
                </Typography>
                <FormControl>
                    <InputLabel>Sort</InputLabel>
                    <Select
                        label={'Sort'}
                        value={products.sortedBy}
                        onChange={handleSortCahange}
                    >
                        <MenuItem value={PRODUCTS_ACTION_SORT_TYPES.ASC_PRICE}>ASC PRICE</MenuItem>
                        <MenuItem value={PRODUCTS_ACTION_SORT_TYPES.DESC_PRICE}>DESC ASC PRICE</MenuItem>
                        <MenuItem value={PRODUCTS_ACTION_SORT_TYPES.ASC_NAME}>Name A-Z</MenuItem>
                        <MenuItem value={PRODUCTS_ACTION_SORT_TYPES.DESC_NAME}>Name Z-A</MenuItem>
                    </Select>
                </FormControl>

            </Grid>
            <Grid container alignItems={'center'} sx={{ my: 5 }}>
                {products.loaded && products.products.map((product, index) => {
                    return (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ my: 2, mx: 1 }}>
                                <NavLink to={'/products/' + product.id} style={{ textDecoration: 'none', color: 'inherit'}}>
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
                                                <Typography variant="h6" component={'div'} sx={{ px: 1 }}>
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
                                </NavLink>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default ProductsPage