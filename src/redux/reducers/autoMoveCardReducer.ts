import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import {ECardValue} from "Types/ECardValue";
import {EGameBoardPart} from "Types/EGameBoardPart";

interface IAutoMoveSelectedCardPayload {
    card: ICard;
}

//TODO: Under development yet
function autoMoveCardReducer(state: IGameBoard, {card}: IAutoMoveSelectedCardPayload) {
    // ACE card always moves to first empty foundation
    if (card.value === ECardValue.ACE) {


        const foundations = [...state.foundations];

    }
}