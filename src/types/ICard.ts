import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";

/**
 * Interface of playing card.
 */
export interface ICard {
    readonly id: string,
    readonly suit: ECardSuit,
    readonly value: ECardValue,
}