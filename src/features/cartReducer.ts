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
        },

        increaseCartQuantity: (state, action) => {
        },
        decreaseCartQuantity: (state, action) => {
        },
        removeFromCart: (state, action) => {
        }
    }
});

export const { addCartItem, removeFromCart, increaseCartQuantity, decreaseCartQuantity } = cartSlice.actions

// export const selectTodoList = state => state.todo.todoList

export default cartSlice.reducer