import {IGameBoard} from "Types/IGameBoard";
import {generatePileId} from "Utils/generateId";

/**
 * Generate seven empty piles.
 */
export default function initPiles(): IGameBoard['tableau'] {
    return [
        {id: generatePileId(), cards: [], isTarget: false},
        {id: generatePileId(), cards: [], isTarget: false},
        {id: generatePileId(), cards: [], isTarget: false},
        {id: generatePileId(), cards: [], isTarget: false},
        {id: generatePileId(), cards: [], isTarget: false},
        {id: generatePileId(), cards: [], isTarget: false},
        {id: generatePileId(), cards: [], isTarget: false},
    ]
}