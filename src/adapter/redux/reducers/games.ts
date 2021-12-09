import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export type GamesState = typeof initialState;

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {}
});

export const gameReducer = gameSlice.reducer;
