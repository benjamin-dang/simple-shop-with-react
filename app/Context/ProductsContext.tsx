import { useReducer, createContext, useContext } from 'react';
import productsReducer from '../Reducer/productsRedcuer';

export const ProductsContext = createContext(null);

const initialState = {
    products: [''],
    loaded: false,
    sortedBy: 'default',
}


const ProductsProvider = ({ children }) => {

    const [products, dispatchProducts] = useReducer(productsReducer, initialState)

    return (
        <ProductsContext.Provider value={{ products, dispatchProducts }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsProvider;
