import {createSlice} from "@reduxjs/toolkit";
import {IGameBoard} from "Types/IGameBoard";
import {initializeFoundations} from "Utils/game";
import newGameReducer from "Redux/reducers/newGame";


const initialState: IGameBoard = {
    foundations: initializeFoundations(),
    stock: [],
    tableau: [],
    talon: [],
};

export const gameBoard = createSlice({
   name: 'Game Board',
   initialState,
   reducers: {
        newGame: newGameReducer,
   }
});

export const gameBoardReducer = gameBoard.reducer;

export const gameBoardActions = gameBoard.actions;