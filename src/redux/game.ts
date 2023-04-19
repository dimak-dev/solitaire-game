import {createSlice} from "@reduxjs/toolkit";
import {IGameBoard} from "Types/IGameBoard";
import newGameReducer from "Redux/reducers/newGameReducer";
import pickCardsFromStockReducer from "Redux/reducers/pickCardsFromStockReducer";
import resetStockReducer from "Redux/reducers/resetStockReducer";
import initFoundations from "Redux/reducers/initializers/initFoundations";
import initPiles from "Redux/reducers/initializers/initPiles";
import {showPossibleTargetsReducer} from "Redux/reducers/showPossibleTargetsReducer";


const initialState: IGameBoard = {
    foundations: initFoundations(),
    stock: [],
    tableau: initPiles(),
    talon: [],
};

export const gameBoard = createSlice({
    name: 'Game Board',
    initialState,
    reducers: {
        newGame: newGameReducer,
        pickCardsFromStock: pickCardsFromStockReducer,
        resetStock: resetStockReducer,
        showPossibleTargets: showPossibleTargetsReducer,
    }
});


export const gameBoardReducer = gameBoard.reducer;

export const gameBoardActions = gameBoard.actions;