import {IFoundation, IGameBoard} from "Types/IGameBoard";

/**
 * Check that foundation id is present on game board (state).
 * @param state
 * @param foundationId
 */
export default function hasFoundationById (state: IGameBoard, foundationId: IFoundation['id']): boolean {
    if (!state.foundations?.length) {
        return false;
    }

    return state.foundations.some(({id}) => foundationId === id);
}