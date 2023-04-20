import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './slices/todo';
import motorReducer from './slices/motor';
export const store = configureStore({
    reducer:{
      todo:todoReducer,
      motor:motorReducer
    }
});
