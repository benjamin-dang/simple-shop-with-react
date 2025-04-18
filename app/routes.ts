import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/HomeRoute.tsx"),
    route('products', "routes/ProductsRoute.tsx"),
    route('products/:id', "routes/ProductsDetailsRoute.tsx"),
    route('cart', 'routes/CartRoute.tsx'),
] satisfies RouteConfig;
