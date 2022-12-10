import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../auth/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
})

setupListeners(store.dispatch)

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';
// //import userReducer from '../features/user/userSlice';
// import listReducer from '../features/lists/listSlice';

// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         //user: userReducer,
//         lists: listReducer
//     },
// });