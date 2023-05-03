import {createSlice} from "@reduxjs/toolkit";
import {IGameBoard} from "Types/IGameBoard";
import newGameReducer from "Redux/reducers/newGameReducer";
import pickCardsFromStockReducer from "Redux/reducers/pickCardsFromStockReducer";
import resetStockReducer from "Redux/reducers/resetStockReducer";
import initFoundations from "Redux/reducers/initializers/initFoundations";
import initPiles from "Redux/reducers/initializers/initPiles";
import showPossibleTargetsReducer from "Redux/reducers/showPossibleTargetsReducer";
import selectCardReducer from "Redux/reducers/selectCardReducer";
import moveSelectedCardToTargetReducer from "Redux/reducers/moveSelectedCardToTargetReducer";


const initialState: IGameBoard = {
    foundations: initFoundations(),
    stock: [],
    tableau: initPiles(),
    talon: [],
    selectedCard: null,
};

export const gameBoard = createSlice({
    name: 'Game Board',
    initialState,
    reducers: {
        newGame: newGameReducer,
        pickCardsFromStock: pickCardsFromStockReducer,
        resetStock: resetStockReducer,
        showPossibleTargets: showPossibleTargetsReducer,
        selectCard: selectCardReducer,
        moveSelectedCardToTarget: moveSelectedCardToTargetReducer,
    }
});


export const gameBoardReducer = gameBoard.reducer;

export const gameBoardActions = gameBoard.actions;