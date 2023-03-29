import {ECardSuit} from "Types/ECardSuit";

/**
 * Convert internal representation of card suit to display.
 *
 * @param {ECardSuit} suit Card suit.
 * @return {string} Char to display.
 */
export default function cardSuitToChar(suit: ECardSuit): string {
    switch (suit) {
        case ECardSuit.CLUB:
            return '\u2663';
        case ECardSuit.SPADE:
            return '\u2660';
        case ECardSuit.HEART:
            return '\u2665';
        case ECardSuit.DIAMOND:
            return '\u2666';
        default:
            throw new Error('Attempt to using unsupported suit. Allowed: CLUB, SPADE, HEART and DIAMOND');
    }
}