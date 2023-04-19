import {IGameBoard} from "Types/IGameBoard";
import {generateFoundationId} from "Utils/generateId";

export default function initFoundations(): IGameBoard['foundations'] {
    return [
        {id: generateFoundationId(), cards: [], isTarget: false},
        {id: generateFoundationId(), cards: [], isTarget: false},
        {id: generateFoundationId(), cards: [], isTarget: false},
        {id: generateFoundationId(), cards: [], isTarget: false},
    ]
}