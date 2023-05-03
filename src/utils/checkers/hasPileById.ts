import {IGameBoard, IPile} from "Types/IGameBoard";

/**
 * Check that pile id is present on game board (state).
 * @param state
 * @param pileId
 */
export default function hasPileById(state: IGameBoard, pileId: IPile['id']): boolean {
    if (!state.tableau?.length) {
        return false;
    }

    return state.tableau.some(({id}) => pileId === id);
}