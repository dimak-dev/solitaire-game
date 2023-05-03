import {IFoundation, IGameBoard, IPile} from "Types/IGameBoard";
import {PayloadAction} from "@reduxjs/toolkit";
import {EGameBoardPart} from "Types/EGameBoardPart";
import {findCurrentPosition, findTargetPositions} from "Utils/findPositions";
import pickFromTalon from "Utils/movers/pickFromTalon";
import putToFoundation from "Utils/movers/putToFoundation";
import hasFoundationById from "Utils/checkers/hasFoundationById";
import replaceElementInArray from "Utils/replaceElementInArray";
import hasPileById from "Utils/checkers/hasPileById";
import putToTableau from "Utils/movers/putToTableau";
import pickFromFoundation from "Utils/movers/pickFromFoundation";
import pickFromTableau from "Utils/movers/pickFromTableau";

type TTargetFoundationPayload = {
    target: EGameBoardPart.FOUNDATIONS;
    foundationId: IFoundation['id'];
}

type TTargetTableauPayload = {
    target: EGameBoardPart.TABLEAU;
    pileId: IPile['id'];
}

type TTargetPayload = TTargetFoundationPayload | TTargetTableauPayload;

export default function moveSelectedCardToTargetReducer(state: IGameBoard, {payload}: PayloadAction<TTargetPayload>) {
    const currentPosition = findCurrentPosition(state, state.selectedCard?.card);
    const possibleTargets = findTargetPositions(state, state.selectedCard?.card);

    let {foundations, tableau, stock, talon} = state;

    switch (payload.target) {
        case EGameBoardPart.FOUNDATIONS:
            if (!possibleTargets.some(t => t.position === EGameBoardPart.FOUNDATIONS && t.foundationId === payload.foundationId)) {
                throw new Error('Invalid target foundation');
            }
            break;
        case EGameBoardPart.TABLEAU:
            if (!possibleTargets.some(t => t.position === EGameBoardPart.TABLEAU && t.pileId === payload.pileId)) {
                throw new Error('Invalid target pile');
            }
            break;
    }


    // talon -> foundation
    // talon -> tableau
    if (currentPosition.position === EGameBoardPart.TALON) {
        const {pickedCard, restOfTalon} = pickFromTalon(talon);
        talon = restOfTalon;

        if (payload.target === EGameBoardPart.FOUNDATIONS) {
            if (!hasFoundationById(state, payload.foundationId)) {
                throw new Error('Foundation does not exist');
            }

            const foundationIndex = state.foundations.findIndex(({id}) => id === payload.foundationId);

            const foundation = putToFoundation(state.foundations[foundationIndex], pickedCard);

            foundations = replaceElementInArray(foundations, foundationIndex, foundation);
        } else if (payload.target === EGameBoardPart.TABLEAU) {
            if (!hasPileById(state, payload.pileId)) {
                throw new Error('Pile does not exist');
            }

            const pileIndex = state.tableau.findIndex(({id}) => id === payload.pileId);

            const pile = putToTableau(state.tableau[pileIndex], [pickedCard]);

            tableau = replaceElementInArray(tableau, pileIndex, pile);
        }
    // foundation -> tableau
    } else if (currentPosition.position === EGameBoardPart.FOUNDATIONS) {
        if (!hasFoundationById(state, currentPosition.foundationId)) {
            throw new Error('Foundation does not exist');
        }

        const foundationIndex = state.foundations.findIndex(({id}) => id === currentPosition.foundationId);

        const {pickedCard, restCardsInFoundation} = pickFromFoundation(foundations[foundationIndex]);
        const foundation = {...foundations[foundationIndex], cards: restCardsInFoundation}

        foundations = replaceElementInArray(foundations, foundationIndex, foundation);

        if (payload.target === EGameBoardPart.TABLEAU) { // todo: refactor
            if (!hasPileById(state, payload.pileId)) {
                throw new Error('Pile does not exist');
            }

            const pileIndex = state.tableau.findIndex(({id}) => id === payload.pileId);

            const pile = putToTableau(state.tableau[pileIndex], [pickedCard]);

            tableau = replaceElementInArray(tableau, pileIndex, pile);
        }
    } else if (currentPosition.position === EGameBoardPart.TABLEAU) {
        if (!hasPileById(state, currentPosition.pileId)) {
            throw new Error('Pile does not exist');
        }

        const pileIndex = state.tableau.findIndex(({id}) => id === currentPosition.pileId);

        const {pickedCards, restOfCardsOnPile} = pickFromTableau(tableau[pileIndex], state.selectedCard?.card?.id);
        const pile = {...tableau[pileIndex], cards: restOfCardsOnPile};

        tableau = replaceElementInArray(tableau, pileIndex, pile);

        if(payload.target === EGameBoardPart.FOUNDATIONS) {
            if (!hasFoundationById(state, payload.foundationId)) {
                throw new Error('Foundation does not exist');
            }

            if (pickedCards.length > 1) {
                throw new Error('Too many picked cards');
            }

            const foundationIndex = state.foundations.findIndex(({id}) => id === payload.foundationId);

            const foundation = putToFoundation(state.foundations[foundationIndex], pickedCards[0]);

            foundations = replaceElementInArray(foundations, foundationIndex, foundation);
        } else if (payload.target === EGameBoardPart.TABLEAU) {
            if (!hasPileById(state, payload.pileId)) {
                throw new Error('Pile does not exist');
            }

            const pileIndex = state.tableau.findIndex(({id}) => id === payload.pileId);
            const pile = putToTableau(tableau[pileIndex], pickedCards);
            tableau = replaceElementInArray(tableau, pileIndex, pile);
        }
    }

    state.talon = talon;
    state.stock = stock;
    state.tableau = tableau;
    state.foundations = foundations;
}