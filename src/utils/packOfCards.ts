import {ICard} from "Types/ICard";
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";
import {shuffleArrayByFisherAndYatesAlgorithm} from "Utils/shuffle";

/**
 * Available card suits.
 */
const suits: Array<ECardSuit> = [
    ECardSuit.CLUB,
    ECardSuit.SPADE,
    ECardSuit.HEART,
    ECardSuit.DIAMOND,
];

/**
 * Available card values.
 */
const values: Array<ECardValue> = [
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
    ECardValue.KING,
];

/**
 * Initialize a sorted pack of cards.
 */
export function initializePackOfCards(): Array<ICard> {
    const packOfCard: Array<ICard> = [];

    values.forEach(value => {
        suits.forEach(suit => {
            packOfCard.push({value, suit});
        });
    });

    return packOfCard;
}

/**
 * Initialize a shuffled pack of cards.
 */
export function initializeShuffledPackOfCards(): Array<ICard> {
    return shuffleArrayByFisherAndYatesAlgorithm(initializePackOfCards());
}