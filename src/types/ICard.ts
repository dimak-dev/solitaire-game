import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";

/**
 * Interface of playing card.
 */
export interface ICard {
    suit: ECardSuit,
    value: ECardValue,
}