export const PRODUCTS_ACTION_TYPES = {
    SET_PRODUCTS: 'SET_PRODUCTS'
};

export default function productsReducer(state, action){
    console.log('productsReducer called with action: ', action.payload);

    switch (action.type) {
        case PRODUCTS_ACTION_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loaded: true
            };
        default:
            return state;
    }
};

