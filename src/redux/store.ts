import { configureStore } from "@reduxjs/toolkit";
import widgetsReducer from './reducers/widgets-slice';
export const store = configureStore({
    reducer: {
        widgets: widgetsReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;