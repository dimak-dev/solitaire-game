import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import {findTargetPositions} from "Utils/findPositions";
import {EGameBoardPart} from "Types/EGameBoardPart";
import {PayloadAction} from "@reduxjs/toolkit";

export function showPossibleTargetsReducer(state: IGameBoard, {payload: card}: PayloadAction<ICard>) {
    const targets = findTargetPositions(state, card);

    state.possibleTargets = {
        foundationsIds: targets
            .map(target => target.position === EGameBoardPart.FOUNDATIONS && target.foundationId)
            .filter(Boolean),
        pilesIds: targets
            .map(target => target.position === EGameBoardPart.TABLEAU && target.pileId)
            .filter(Boolean),
    };
}