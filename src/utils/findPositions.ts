import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import {EGameBoardPart} from "Types/EGameBoardPart";

/**
 * Base type of position result.
 */
type TBaseGameBoardPositionResult = {
    position: EGameBoardPart,
};

/**
 * Position result for talon.
 */
type TTalonGameBoardPositionResult = TBaseGameBoardPositionResult & {
    position: EGameBoardPart.TALON,
}

/**
 * Position result for tableau.
 */
type TTableauGameBoardPositionResult = TBaseGameBoardPositionResult & {
    position: EGameBoardPart.TABLEAU,
    pileId: string,
}

/**
 * Position result for foundation.
 */
type TFoundationGameBoardPositionResult = TBaseGameBoardPositionResult & {
    position: EGameBoardPart.FOUNDATIONS,
    foundationId: string,
}

type TGameBoardPositionResult = TFoundationGameBoardPositionResult
    | TTalonGameBoardPositionResult
    | TTableauGameBoardPositionResult;

export function findCurrentPosition(state: IGameBoard, card: ICard): TGameBoardPositionResult {
    const lastCardInTalon = !!state.talon.length && state.talon[state.talon.length - 1];
    if (lastCardInTalon && card.value == lastCardInTalon.value && card.suit == lastCardInTalon.suit) {
        return {
            position: EGameBoardPart.TALON,
        };
    }

    const cardInFoundations = !!state.foundations.length && state.foundations
        .find(foundation => foundation.suit == card.suit && foundation.cards.find(({value}) => card.value == value));

    if (cardInFoundations) {
        return {
            position: EGameBoardPart.FOUNDATIONS,
            foundationId: cardInFoundations.id,
        };
    }

    const cardInTableau = state.tableau
        .map(({cards, id}) => ({
            pileId: id,
            cards: cards.filter(({isOpen}) => isOpen)
        }))
        .find(({cards}) => cards.length && cards.find(({card: {suit, value}}) => card.value == value && suit == card.suit));

    if (cardInTableau) {
        return {
            position: EGameBoardPart.TABLEAU,
            pileId: cardInTableau.pileId,
        }
    }

    throw new Error('Interaction with this card is restricted');
}