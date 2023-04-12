import {IGameBoard} from "Types/IGameBoard";

/**
 * Move cards from talon to stock.
 */
export default function resetStockReducer(state: IGameBoard): void {
    if (state.stock.length) {
        throw new Error('The stock is not empty');
    }

    state.stock = [...state.talon];
    state.talon = [];
}