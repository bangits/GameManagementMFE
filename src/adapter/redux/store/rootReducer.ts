import { providerApi } from '@/adapter/redux/api';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [providerApi.reducerPath]: providerApi.reducer
});

export default rootReducer;
