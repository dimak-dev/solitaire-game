import {IFoundation, IGameBoard} from "Types/IGameBoard";
import {PayloadAction} from "@reduxjs/toolkit";
import {findTargetPositions} from "Utils/findPositions";
import {EGameBoardPart} from "Types/EGameBoardPart";
import replaceElementInArray from "Utils/replaceElementInArray";
import {resetFoundationTargets, resetTableauTargets} from "Utils/resetTargets";

export default function moveSelectedCardToFoundation(state: IGameBoard, {payload}: PayloadAction<IFoundation['id']>) {
    if (!state.selectedCard) {
        throw new Error('Card is not selected');
    }

    const foundationIndex = state.foundations.findIndex(({id}) => id === payload);

    if (foundationIndex === -1) {
        throw new Error('Invalid foundation id');
    }

    const invalidTarget = !findTargetPositions(state, state.selectedCard.card)
        .find((target) => target.position === EGameBoardPart.FOUNDATIONS && target.foundationId === payload);

    if (invalidTarget || foundationIndex === -1) {
        throw new Error('Invalid target');
    }

    const {selectedCard} = state;

    if (selectedCard.position === EGameBoardPart.TALON) {
        const talon = [...state.talon];
        const splicedCards = talon.splice(-1);
        const foundation = {...state.foundations[foundationIndex]};
        foundation.cards = [...foundation.cards, ...splicedCards];


        state.foundations = replaceElementInArray(state.foundations, foundationIndex, foundation);
        state.talon = talon;
    } else if (selectedCard.position === EGameBoardPart.TABLEAU) {
        const pileIndex = state.tableau.findIndex(({id}) => id === selectedCard.pileId);

        if (pileIndex === -1) {
            throw new Error('Invalid pile id in selected card')
        }

        const cardsOnPile = [...state.tableau[pileIndex].cards];

        const cardOnPileIndex = cardsOnPile.findIndex(({card: {id}}) => id === selectedCard.card.id);

        if (cardOnPileIndex === -1) {
            throw new Error('Pile is not contain selected card');
        }

        const cardsToMoving = cardsOnPile.splice(cardOnPileIndex).map(({card}) => card);

        if (cardsOnPile.length && !cardsOnPile[cardsOnPile.length - 1].isOpen) {
            cardsOnPile[cardsOnPile.length - 1].isOpen = true;
        }

        const pile = {...state.tableau[pileIndex], cards: cardsOnPile};
        const foundation = {
            ...state.foundations[foundationIndex],
            cards: [...state.foundations[foundationIndex].cards, ...cardsToMoving],
        };

        state.tableau = replaceElementInArray(state.tableau, pileIndex, pile);
        state.foundations = replaceElementInArray(state.foundations, foundationIndex, foundation);
    }

    resetFoundationTargets(state);
    resetTableauTargets(state);

    state.selectedCard = null;
}