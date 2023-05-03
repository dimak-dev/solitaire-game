import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import hasCardOnPile from "Utils/checkers/hasCardOnPile";
import {ICardInPile} from "Types/ICardInPile";

/**
 * Interface for result of pickCardsFromTableau.
 *
 * @property {Array<ICard>} pickedCards Picked cards from pile.
 * @property {Array<ICardInPile>} restOfCardsOnPile Rest cards on pile.
 */
interface IPickFromTableauResult {
    pickedCards: Array<ICard>;
    restOfCardsOnPile: Array<ICardInPile>;
}

/**
 * Pick cards from pile by card id.
 * Last hidden card will be opened.
 *
 * @param {IGameBoard['tableau'][number]} pile Pile on tableau.
 * @param {ICard['id']} cardId Card's id.
 */
export default function pickFromTableau(pile: IGameBoard['tableau'][number], cardId: ICard['id']): IPickFromTableauResult {
    if (!hasCardOnPile(pile, cardId, true)) {
        throw new Error('Card is not present on pile');
    }

    const cardsOnPile = [...pile.cards];

    const cardIndex = cardsOnPile.findIndex(({card}) => card.id === cardId);

    const pickedCardsOnPile = cardsOnPile.splice(cardIndex);

    if (cardsOnPile.length && !cardsOnPile[cardsOnPile.length - 1].isOpen) {
        cardsOnPile[cardsOnPile.length - 1] = {...cardsOnPile[cardsOnPile.length - 1], isOpen: true};
    }

    return {
        pickedCards: pickedCardsOnPile.map(({card}) => card),
        restOfCardsOnPile: cardsOnPile,
    }
}