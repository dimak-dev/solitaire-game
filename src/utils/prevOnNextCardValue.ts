import {ECardValue} from "Types/ECardValue";

/**
 * Priority list of card values.
 */
const PRIORITY_LIST = [
    ECardValue.ACE,
    ECardValue.ONE,
    ECardValue.TWO,
    ECardValue.THREE,
    ECardValue.FOUR,
    ECardValue.FIVE,
    ECardValue.SIX,
    ECardValue.SEVEN,
    ECardValue.EIGHT,
    ECardValue.NINE,
    ECardValue.JACK,
    ECardValue.QUEEN,
    ECardValue.KING
];

/**
 * Get previous card value by current value.
 *
 * @param {ECardValue} cardValue Value of current card.
 */
export function prevByPriority(cardValue: ECardValue): ECardValue | null {
    const currentPriority = PRIORITY_LIST.findIndex(value => value === cardValue);

    if (currentPriority === -1) {
        throw new Error(`Value ${cardValue} is not present in priority list`);
    } else if (currentPriority === 0) {
        return null;
    } else {
        return PRIORITY_LIST[currentPriority - 1];
    }
}
/**
 * Get next card value by current value.
 *
 * @param {ECardValue} cardValue Value of current card.
 */
export function nextByPriority(cardValue: ECardValue): ECardValue | null {
    const currentPriority = PRIORITY_LIST.findIndex(value => value === cardValue);

    if (currentPriority === -1) {
        throw new Error(`Value ${cardValue} is not present in priority list`);
    } else if (currentPriority === PRIORITY_LIST.length - 1) {
        return null;
    } else {
        return PRIORITY_LIST[currentPriority + 1];
    }
}