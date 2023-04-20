import {IGameBoard} from "Types/IGameBoard";

/**
 *  Empty all targets on tableau in state.
 *
 *  @param {IGameBoard} state Game board state.
 */
export function resetTableauTargets(state: IGameBoard) {
    if (!state.tableau || !state.tableau.length) {
        return;
    }

    state.tableau = [
        {...state.tableau[0], isTarget: false},
        {...state.tableau[1], isTarget: false},
        {...state.tableau[2], isTarget: false},
        {...state.tableau[3], isTarget: false},
        {...state.tableau[4], isTarget: false},
        {...state.tableau[5], isTarget: false},
        {...state.tableau[6], isTarget: false},
    ];
}

/**
 *  Empty all targets on foundations in state.
 *
 *  @param {IGameBoard} state Game board state.
 */
export function resetFoundationTargets(state: IGameBoard) {
    if (!state.foundations || !state.foundations.length) {
        return;
    }

    state.foundations = [
        {...state.foundations[0], isTarget: false},
        {...state.foundations[1], isTarget: false},
        {...state.foundations[2], isTarget: false},
        {...state.foundations[3], isTarget: false},
    ]
}