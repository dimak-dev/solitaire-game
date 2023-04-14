import {IPile} from "Types/IGameBoard";
import {generatePileId} from "Utils/generateId";

type TPiles = [IPile, IPile, IPile, IPile, IPile, IPile, IPile];

/**
 * Generate seven empty piles.
 */
export default function initPiles(): TPiles {
    return [
        {id: generatePileId(), cards: []},
        {id: generatePileId(), cards: []},
        {id: generatePileId(), cards: []},
        {id: generatePileId(), cards: []},
        {id: generatePileId(), cards: []},
        {id: generatePileId(), cards: []},
        {id: generatePileId(), cards: []},
    ]
}