import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";

/**
 * Interface for result of card from foundation picker.
 *
 * @property {ICard} pickedCard Picked card.
 * @property {ICard[]} restCardsInFoundation Rest of cards in foundation.
 */
interface IPickFromFoundationResult {
    pickedCard: ICard,
    restCardsInFoundation: ICard[],
}

/**
 * Pick one card from foundation.
 *
 * @param {IGameBoard['foundation']} foundation
 */
export default function pickFromFoundation(foundation: IGameBoard['foundations'][number]): IPickFromFoundationResult {
    if (!foundation.suit || !foundation.cards?.length) {
        throw new Error('Foundation is empty');
    }

    const restCardsInFoundation = [...foundation.cards];
    const [pickedCard] = restCardsInFoundation.splice(-1);

    return {restCardsInFoundation, pickedCard};
}