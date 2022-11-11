import { createSlice } from '@reduxjs/toolkit'
import { CartItem } from '../types';

const initialState = {
    cartItems: [] as CartItem[]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            let item: CartItem = action.payload
            state.cartItems.push(item)
        },

        increaseCartQuantity: (state, action) => {
            let cartItem = state.cartItems.find(item => item.product.id === action.payload.id)
            if (cartItem) {
                cartItem.quantity++;
                state.cartItems = [...state.cartItems];
            } else {
                let newCartItem: CartItem = { cartItemId: state.cartItems.length + 1, quantity: 1, product: action.payload }
                state.cartItems = [...state.cartItems, newCartItem]
            }
        },
        decreaseCartQuantity: (state, action) => {
            let cartItemIndex = state.cartItems.findIndex(item => item.product.id === action.payload.id)

            if (cartItemIndex >= 0) {
                state.cartItems[cartItemIndex].quantity--;
                if (state.cartItems[cartItemIndex].quantity === 0) {
                    state.cartItems.splice(cartItemIndex, 1)

                }
                state.cartItems = [...state.cartItems];
            }
        },
        removeFromCart: (state, action) => {
            let filtered = state.cartItems.filter(ele => { return ele.product.id !== action.payload.id });
            state.cartItems = [...filtered];
        }
    }
});

export const { addCartItem, removeFromCart, increaseCartQuantity, decreaseCartQuantity } = cartSlice.actions

// export const selectTodoList = state => state.todo.todoList

export default cartSlice.reducer