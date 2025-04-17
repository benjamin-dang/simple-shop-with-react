export const PRODUCTS_ACTION_TYPES = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    SORT_BY_PRICE_ASC: 'SORT_BY_PRICE_ASC',
    SORT_BY_PRICE_DESC: 'SORT_BY_PRICE_DESC',
    SORT_BY_NAME_ASC: 'SORT_BY_NAME_ASC',
    SORT_BY_NAME_DESC: 'SORT_BY_NAME_DESC',
    FILTER_BY_CATEGORY: 'FILTER_BY_CATEGORY',
};

export default function productsReducer(state, action) {
    console.log('productsReducer called with action: ', action.payload);

    switch (action.type) {
        case PRODUCTS_ACTION_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loaded: true
            };

        case PRODUCTS_ACTION_TYPES.SORT_BY_PRICE_ASC:
            return {
                ...state,
                products: state.products.sort((a, b) => a.price - b.price),
                sortedBy: 'priceAsc'
            };

        case PRODUCTS_ACTION_TYPES.SORT_BY_PRICE_DESC:
            return {
                ...state,
                products: state.products.sort((a, b) => b.price - a.price),
                sortedBy: 'priceDesc'
            };
        case PRODUCTS_ACTION_TYPES.SORT_BY_NAME_ASC:
            return {
                ...state,
                products: state.products.sort((a, b) => a.title.localeCompare(b.title)),
                sortedBy: 'nameAsc'
            };
        case PRODUCTS_ACTION_TYPES.SORT_BY_NAME_DESC:
            return {
                ...state,
                products: state.products.sort((a, b) => b.title.localeCompare(a.title)),
                sortedBy: 'nameDesc'
            };
        case PRODUCTS_ACTION_TYPES.FILTER_BY_CATEGORY:
            return {
                ...state,
                products: state.products.filter(product => product.category === action.payload),
                sortedBy: 'category'
            };
        // Add more cases for other actions as needed
        default:
            return state;
            }
    };

