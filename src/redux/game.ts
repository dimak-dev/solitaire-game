import {createSlice} from "@reduxjs/toolkit";
import {IGameBoard} from "Types/IGameBoard";
import {initializeFoundations} from "Utils/game";
import newGameReducer from "Redux/reducers/newGameReducer";
import pickCardsFromStockReducer from "Redux/reducers/pickCardsFromStockReducer";
import resetStockReducer from "Redux/reducers/resetStockReducer";


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
        pickCardsFromStock: pickCardsFromStockReducer,
        resetStock: resetStockReducer,
    }
});

export const gameBoardReducer = gameBoard.reducer;

export const gameBoardActions = gameBoard.actions;