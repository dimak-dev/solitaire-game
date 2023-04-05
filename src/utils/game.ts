import {IFoundation} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import {ICardInPile} from "Types/ICardInPile";


/**
 * Initialize foundations.
 *
 * @return {Array<IFoundation>} Array of foundations.
 */
export function initializeFoundations(): Array<IFoundation> {
    const foundations: Array<IFoundation> = [];

    for (let i = 0; i < 4; i++) {
        foundations.push({id: `foundation-${i}`, cards: []});
    }

    return foundations;
}

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