import {IGameBoard} from "Types/IGameBoard";
import {PayloadAction} from "@reduxjs/toolkit";
import {resetFoundationTargets, resetTableauTargets} from "Utils/resetTargets";

/**
 * Select card.
 */
export default function selectCardReducer (state: IGameBoard, {payload}: PayloadAction<IGameBoard['selectedCard']>) {
    const payloadCardId = payload.card.id;
    const previouslySelectedCardId = state.selectedCard?.card?.id;

    if (previouslySelectedCardId && previouslySelectedCardId === payloadCardId) {
        state.selectedCard = null;
        resetTableauTargets(state);
        resetFoundationTargets(state);
    } else {
        state.selectedCard = payload;
    }
}