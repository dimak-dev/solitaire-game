import {ECardValue} from "Types/ECardValue";

/**
 * Convert card value to displaying char.
 *
 * @param {ECardValue} value Card value.
 * @return {string} Char to display.
 */
export default function cardValueToChar(value: ECardValue): string {
    switch (value) {
        case ECardValue.ACE:
            return 'A';
        case ECardValue.ONE:
            return '1';
        case ECardValue.TWO:
            return '2';
        case ECardValue.THREE:
            return '3';
        case ECardValue.FOUR:
            return '4';
        case ECardValue.FIVE:
            return '5';
        case ECardValue.SIX:
            return '6';
        case ECardValue.SEVEN:
            return '7';
        case ECardValue.EIGHT:
            return '8';
        case ECardValue.NINE:
            return '9';
        case ECardValue.JACK:
            return 'J';
        case ECardValue.QUEEN:
            return 'Q';
        case ECardValue.KING:
            return 'K';
    }
}