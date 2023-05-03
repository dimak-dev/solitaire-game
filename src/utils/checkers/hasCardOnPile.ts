import {IPile} from "Types/IGameBoard";
import {ICard} from "Types/ICard";

/**
 * Check that card is present on pile.
 *
 * @param {IPile} pile Pile on tableau.
 * @param {ICard['id']} cardId Card's id.
 * @param {boolean} [onlyOpened] Optional parameter for looking only opened cards, default = true.
 */
export default function hasCardOnPile(pile: IPile, cardId: ICard['id'], onlyOpened: boolean = true): boolean {
    if (!pile.cards?.length) {
        return false;
    }

    return pile.cards
        .filter(({isOpen}) => !onlyOpened || isOpen)
        .some(({card}) => card.id === cardId);
}