import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";

/**
 * Put new card to foundation.
 *
 * @param foundation
 * @param card
 */
export default function putToFoundation(foundation: IGameBoard['foundations'][number], card: ICard): IGameBoard['foundations'][number] {
    const newFoundation = {...foundation};
    newFoundation.cards = [...foundation.cards || [], card];
    newFoundation.suit = card.suit;

    return newFoundation;
}