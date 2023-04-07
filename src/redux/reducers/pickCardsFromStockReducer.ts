import {IGameBoard} from "Types/IGameBoard";
import {EPickingFromStockCount} from "Types/EPickingFromStockCount";

/**
 * Reducer for picking cards from stock to talon.
 */
export default function pickCardsFromStockReducer(state: IGameBoard): void {
    if (!state.stock.length) {
        throw new Error('Empty stock. Please reinitialize stock before pick cards.');
    }
    // without settings mode is hardcoded.
    // todo: after implementation settings `mode` will be getting from settings.
    const mode = EPickingFromStockCount.ONE;
    const cardsCount = mode === EPickingFromStockCount.ONE ? 1 : 3;

    const pickedCards = state.stock.splice(-cardsCount, cardsCount);

    state.stock = [...state.stock];
    state.talon = [...state.talon, ...pickedCards];
}