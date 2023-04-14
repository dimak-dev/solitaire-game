import {IFoundation, IGameBoard, IPile} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import {EGameBoardPart} from "Types/EGameBoardPart";
import {ECardValue} from "Types/ECardValue";
import {nextByPriority, prevByPriority} from "Utils/prevOnNextCardValue";
import {cardSuiteColor} from "Utils/cardSuiteColor";

/**
 * Base type of position result.
 */
type TBaseGameBoardPositionResult = {
    // position: EGameBoardPart,
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

/**
 * Find current position of selected card.
 *
 * @param {IGameBoard} state State.
 * @param {ICard} card Selected card.
 */
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
        .find(({cards}) => cards.length && cards.find(({
                                                           card: {
                                                               suit,
                                                               value
                                                           }
                                                       }) => card.value == value && suit == card.suit));

    if (cardInTableau) {
        return {
            position: EGameBoardPart.TABLEAU,
            pileId: cardInTableau.pileId,
        }
    }

    throw new Error('Interaction with this card is restricted');
}

/**
 * Find all possible targets for selected cards.
 *
 * @param {IGameBoard} state State.
 * @param {IGameBoard} card Selected card.
 */
export function findTargetPositions(state: IGameBoard, card: ICard): Array<TGameBoardPositionResult> {
    const targetPositions: Array<TGameBoardPositionResult> = [];

    // check in foundations
    if (state.foundations.length) {
        // calculate previous value by priority
        const previousValueByPriority = prevByPriority(card.value);

        // filter predicate for foundations
        const filterPredicate = (foundation: IFoundation): boolean => {
            if (card.value === ECardValue.ACE) {
                if (!foundation.suit) return true;
                if (!foundation.cards.length) return true;
            }

            if (foundation.suit == card.suit && foundation.cards.length) {
                const lastCardInFoundation = foundation.cards[foundation.cards.length - 1];

                if (lastCardInFoundation.value == previousValueByPriority) return true;
            }

            return false;
        };

        state.foundations
            .filter(filterPredicate)
            .forEach(foundation => targetPositions.push({
                position: EGameBoardPart.FOUNDATIONS,
                foundationId: foundation.id
            }));
    }

    // check in tableau
    if (state.tableau.length) {
        // find all empty piles on tableau for Kings
        if (card.value === ECardValue.KING) {
            state.tableau
                .filter(({cards}) => !cards.length)
                .forEach(({id: pileId}) => targetPositions.push({position: EGameBoardPart.TABLEAU, pileId}))
        } else {
            const nextValueByPriority = nextByPriority(card.value);
            const filterPredicate = (pile: IPile): boolean => {
                const lastCardInPile = pile.cards[pile.cards.length - 1].card;
                if (cardSuiteColor(lastCardInPile.suit) == cardSuiteColor(card.suit)) return false;
                return nextValueByPriority == lastCardInPile.value;
            }

            state.tableau
                .filter(({cards}) => cards.length)
                .filter(filterPredicate)
                .forEach(pile => targetPositions.push({position: EGameBoardPart.TABLEAU, pileId: pile.id}));
        }
    }


    return targetPositions;
}