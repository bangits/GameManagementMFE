import { providerApi } from '@/adapter/redux/api';
import { combineReducers } from '@reduxjs/toolkit';
import { provider } from '../reducers';

const rootReducer = combineReducers({
  provider,
  [providerApi.reducerPath]: providerApi.reducer
});
export default rootReducer;
