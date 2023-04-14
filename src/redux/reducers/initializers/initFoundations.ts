import {IFoundation} from "Types/IGameBoard";
import {generateFoundationId} from "Utils/generateId";

export default function initFoundations(): [IFoundation, IFoundation, IFoundation, IFoundation] {
    return [
        {id: generateFoundationId(), cards: []},
        {id: generateFoundationId(), cards: []},
        {id: generateFoundationId(), cards: []},
        {id: generateFoundationId(), cards: []},
    ]
}