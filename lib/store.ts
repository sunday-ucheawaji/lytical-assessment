// store.ts
import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../app/reducers/clientReducer';

export const store = configureStore({
  reducer: {
    client: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
