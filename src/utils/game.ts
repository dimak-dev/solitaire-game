import {ICard} from "Types/ICard";
import {ICardInPile} from "Types/ICardInPile";


interface IResultAfterPickingForTableauPile {
    restPackOfCard: Array<ICard>;
    cardsInPile: Array<ICardInPile>;
}

/**
 * Pick some cards to the tableau pile.
 *
 * @param {Array<ICard>} packOfCard Pack of card for picking.
 * @param {number} countOfHiddenCards Count of hidden cards in pile.
 */
export function pickCardsForTableauPile(packOfCard: Array<ICard>, countOfHiddenCards: number): IResultAfterPickingForTableauPile {
    if (packOfCard.length < (countOfHiddenCards + 1)) {
        throw new Error('Insufficient cards in pack.');
    }

    const restPackOfCard = [...packOfCard];
    const pickedCards = restPackOfCard.splice(packOfCard.length - countOfHiddenCards - 1, countOfHiddenCards + 1);

    return {
        restPackOfCard,
        cardsInPile: pickedCards.map((card, index) => ({card, isOpen: index == countOfHiddenCards})),
    }
}