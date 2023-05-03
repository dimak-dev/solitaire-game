import {IFoundation} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import {ECardSuit} from "Types/ECardSuit";

export function getTestFoundation(id: string, isTarget: boolean = false, cards: Array<ICard> = [], suit: ECardSuit = null): Readonly<IFoundation> {
    return {id, isTarget, cards, suit}
}