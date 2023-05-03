import {ICard} from "Types/ICard";
import {ICardInPile} from "Types/ICardInPile";


interface IResultAfterPickingForTableauPile {
    restPackOfCard: Array<ICard>;
    cardsInPile: Array<ICardInPile>;
}

/**
 * Pick some cards from pack for tableau.
 *
 * @param {Array<ICard>} packOfCards Pack of card for picking.
 * @param {number} countOfHiddenCards Count of hidden cards in pile.
 */
export function pickCardsFromPackForTableau(packOfCards: Array<ICard>, countOfHiddenCards: number): IResultAfterPickingForTableauPile {
    if (packOfCards.length < (countOfHiddenCards + 1)) {
        throw new Error('Insufficient cards in pack.');
    }

    const restPackOfCard = [...packOfCards];
    const pickedCards = restPackOfCard.splice(packOfCards.length - countOfHiddenCards - 1, countOfHiddenCards + 1);

    return {
        restPackOfCard,
        cardsInPile: pickedCards.map((card, index) => ({card, isOpen: index == countOfHiddenCards})),
    }
}