import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import {EGameBoardPart} from "Types/EGameBoardPart";

export function findCurrentPosition(state: IGameBoard, card: ICard) {
    const lastCardInTalon = !!state.talon.length && state.talon[state.talon.length - 1];
    if (lastCardInTalon && card.value == lastCardInTalon.value && card.suit == lastCardInTalon.suit) {
        return EGameBoardPart.TALON;
    }

    const cardInTableau = state.tableau
        .map(({cards, id}) => ({
            pileId: id,
            card: !!cards.length && cards[cards.length - 1].card
        }))
        .find(({card: cardInPile}) => cardInPile && cardInPile.value == card.value && cardInPile.suit == card.suit);

    if (cardInTableau) {
        return EGameBoardPart.TABLEAU
    }

    const cardInFoundations = state.foundations
        .find(foundation => foundation.suit == card.suit && foundation.cards.find(({value}) => card.value == value));

    if (cardInFoundations) {
        return EGameBoardPart.FOUNDATIONS;
    }

    throw new Error('Interaction with this card is restricted');
}