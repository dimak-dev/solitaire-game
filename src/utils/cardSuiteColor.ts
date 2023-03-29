import {ECardSuit} from "Types/ECardSuit";
import {ECardSuitColor} from "Types/ECardSuitColor";

/**
 * Get color of card suit.
 *
 * @param {ECardSuit} suit Card suit.
 * @return {ECardSuitColor} Suit color.
 */
export function cardSuiteColor(suit: ECardSuit): ECardSuitColor {
    switch (suit) {
        case ECardSuit.HEART:
        case ECardSuit.DIAMOND:
            return ECardSuitColor.RED;
        default:
            return ECardSuitColor.BLACK;
    }
}