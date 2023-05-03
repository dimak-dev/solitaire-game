import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";

/**
 * Put selected cards to pile on tableau.
 *
 * @param pile
 * @param cards
 */
export default function putToTableau(pile: IGameBoard['tableau'][number], cards: Array<ICard>): IGameBoard['tableau'][number] {
    const newPile = {...pile};
    newPile.cards = [...pile.cards, ...cards.map(card => ({isOpen: true, card}))];

    return newPile;
}