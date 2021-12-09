import { gameApi, providerApi } from '@/adapter/redux/api';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [providerApi.reducerPath]: providerApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer
});

export default rootReducer;
