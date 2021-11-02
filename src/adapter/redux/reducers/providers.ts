import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export type ProviderState = typeof initialState;

export const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {}
});

export const providerReducer = providerSlice.reducer;
