import {IGameBoard} from "Types/IGameBoard";
import {findTargetPositions} from "Utils/findPositions";
import {EGameBoardPart} from "Types/EGameBoardPart";

/**
 * Set value of possible targets on foundations and tableau.
 */
export default function showPossibleTargetsReducer(state: IGameBoard) {
    if (!state.selectedCard) {
        throw new Error('Card is not selected');
    }

    const targets = findTargetPositions(state, state.selectedCard.card);

    const isTargetFoundation = (i: number) => !!targets
        .find(t => t.position === EGameBoardPart.FOUNDATIONS && state.foundations[i].id === t.foundationId);

    const isTargetPile = (i: number) => !!targets
        .find(t => t.position === EGameBoardPart.TABLEAU && state.tableau[i].id === t.pileId);

    state.foundations = [
        {...state.foundations[0], isTarget: isTargetFoundation(0)},
        {...state.foundations[1], isTarget: isTargetFoundation(1)},
        {...state.foundations[2], isTarget: isTargetFoundation(2)},
        {...state.foundations[3], isTarget: isTargetFoundation(3)},
    ];

    state.tableau = [
        {...state.tableau[0], isTarget: isTargetPile(0)},
        {...state.tableau[1], isTarget: isTargetPile(1)},
        {...state.tableau[2], isTarget: isTargetPile(2)},
        {...state.tableau[3], isTarget: isTargetPile(3)},
        {...state.tableau[4], isTarget: isTargetPile(4)},
        {...state.tableau[5], isTarget: isTargetPile(5)},
        {...state.tableau[6], isTarget: isTargetPile(6)},
    ];
}