import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";

/**
 * Interface for result of card from talon picker.
 *
 * @property {ICard} pickedCard Picked card.
 * @property {ICard[]} restOfTalon Rest of cards in talon.
 */
interface IPickFromTalonResult {
    pickedCard: ICard,
    restOfTalon: ICard[],
}

/**
 * Pick one card from talon.
 *
 * @param {IGameBoard['talon']} talon
 */
export default function pickFromTalon(talon: IGameBoard['talon']): IPickFromTalonResult {
    if (!talon?.length) {
        throw new Error('Talon is empty');
    }

    const restOfTalon = [...talon];
    const [pickedCard] = restOfTalon.splice(-1);

    return {restOfTalon, pickedCard};
}