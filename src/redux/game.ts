import {createSlice} from "@reduxjs/toolkit";
import {IGameBoard} from "Types/IGameBoard";
import newGameReducer from "Redux/reducers/newGameReducer";
import pickCardsFromStockReducer from "Redux/reducers/pickCardsFromStockReducer";
import resetStockReducer from "Redux/reducers/resetStockReducer";
import initFoundations from "Redux/reducers/initializers/initFoundations";


const initialState: IGameBoard = {
    foundations: initFoundations(),
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