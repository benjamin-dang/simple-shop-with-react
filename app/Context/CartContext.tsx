import { createContext, useReducer } from 'react';
import cartReducer from '../Reducer/cartReducer';

export const CartContext = createContext(null);

const initialState = {
    cart: [],
    totalPrice: 0,
    totalItems: 0,
}

export default function CartProvider({ children}) {

    console.log('CartProvider rendered');

    const [cart, dispatchCart] = useReducer(cartReducer, initialState)

    return (
        <CartContext.Provider value={{cart, dispatchCart}}>
            {children}
        </CartContext.Provider>
    )
}