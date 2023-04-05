import {ICard} from "Types/ICard";

/**
 * Interface of card in pile.
 *
 * @property {boolean} isOpen Is open card at this time or not.
 * @property {ICard} card Card.
 */
export interface ICardInPile {
    isOpen: boolean,
    card: ICard;
}