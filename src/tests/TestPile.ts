import {IPile} from "Types/IGameBoard";
import {ICardInPile} from "Types/ICardInPile";

export function getTestPile(id: string, isTarget: boolean = false, cards: Array<ICardInPile> = []): Readonly<IPile> {
    return {
        id: id,
        isTarget,
        cards
    }
}