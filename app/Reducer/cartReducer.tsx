export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
}

export default function cartReducer(state, action){
    console.log('cartReducer called with action: ', action.payload);

    switch (action.type) {
        case CART_ACTION_TYPES.ADD_TO_CART:
            const productExists = state.cart.find((product) => product.id === action.payload.product.id)
            if (productExists) {
                console.log('Product already in cart');
                return state;
            }
            return {
                ...state,
                cart: [...state.cart, action.payload.product],
                totalPrice: state.totalPrice + action.payload.product.price,
                totalItems: state.totalItems + 1,
            };
        case CART_ACTION_TYPES.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((product) => product.id !== action.payload.product.id),
                totalPrice: state.totalPrice - action.payload.product.price,
                totalItems: state.totalItems - 1,
            };
        case CART_ACTION_TYPES.CLEAR_CART:
            return {
                cart: [],
                totalPrice: 0,
                totalItems: 0,
            }
    }
}
