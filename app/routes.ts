import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/HomeRoute.tsx"),
    route('products', 'routes/ProductsRoute.tsx')
] satisfies RouteConfig;
