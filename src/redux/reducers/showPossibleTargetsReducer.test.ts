import {EGameBoardPart} from "Types/EGameBoardPart";
import {findTargetPositions} from "Utils/findPositions";
import showPossibleTargetsReducer from "Redux/reducers/showPossibleTargetsReducer";
import {IGameBoard} from "Types/IGameBoard";
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";

jest.mock('Utils/findPositions')

describe('Show possible targets for selected card - Reducer', () => {
    let state: IGameBoard;

    beforeEach(() => {
        state = {
            foundations: [
                {id: 'test-foundation-1', cards: [], isTarget: false},
                {id: 'test-foundation-2', cards: [], isTarget: false},
                {id: 'test-foundation-3', cards: [], isTarget: false},
                {id: 'test-foundation-4', cards: [], isTarget: false},
            ],
            tableau: [
                {id: 'test-pile-1', cards: [], isTarget: false},
                {id: 'test-pile-2', cards: [], isTarget: false},
                {id: 'test-pile-3', cards: [], isTarget: false},
                {id: 'test-pile-4', cards: [], isTarget: false},
                {id: 'test-pile-5', cards: [], isTarget: false},
                {id: 'test-pile-6', cards: [], isTarget: false},
                {id: 'test-pile-7', cards: [], isTarget: false},
            ],
            talon: [],
            stock: [],
            selectedCard: {position: EGameBoardPart.TALON, card: {id: 'test-id', suit: ECardSuit.SPADE, value: ECardValue.SEVEN}},
        };
    })

    test('Throws error when card is not selected', () => {
        state.selectedCard = null;
        const fn = () => showPossibleTargetsReducer(state);
        expect(fn).toThrowError(/card is not selected/i)
    });

    test('Empty targets', () => {
        (findTargetPositions as jest.Mock).mockReturnValue([]);
        state.selectedCard = {position: EGameBoardPart.TALON, card: {id: 'test-id', suit: ECardSuit.SPADE, value: ECardValue.SEVEN}};

        showPossibleTargetsReducer(state);

        expect(findTargetPositions).toHaveBeenCalled();
        expect(state.foundations[0].isTarget).toBeFalsy();
        expect(state.foundations[1].isTarget).toBeFalsy();
        expect(state.foundations[2].isTarget).toBeFalsy();
        expect(state.foundations[3].isTarget).toBeFalsy();

        expect(state.tableau[0].isTarget).toBeFalsy();
        expect(state.tableau[1].isTarget).toBeFalsy();
        expect(state.tableau[2].isTarget).toBeFalsy();
        expect(state.tableau[3].isTarget).toBeFalsy();
        expect(state.tableau[4].isTarget).toBeFalsy();
        expect(state.tableau[5].isTarget).toBeFalsy();
        expect(state.tableau[6].isTarget).toBeFalsy();
    });

    test('Immutability', () => {
        const originFoundation = state.foundations[1];
        const originCardsOnFoundation = state.foundations[1].cards;
        const originPile = state.tableau[3];
        const originCardsOnTableau = state.tableau[3].cards;

        (findTargetPositions as jest.Mock).mockReturnValue([]);

        showPossibleTargetsReducer(state);

        expect(originFoundation === state.foundations[1]).toBeFalsy();
        expect(originPile === state.tableau[3]).toBeFalsy();
        expect(originCardsOnFoundation === state.foundations[1].cards).toBeTruthy();
        expect(originCardsOnTableau === state.tableau[3].cards).toBeTruthy();
    });

    test('Two targets on tableau', () => {
        const mockValue = [
            {position: EGameBoardPart.TABLEAU, pileId: 'test-pile-4'},
            {position: EGameBoardPart.TABLEAU, pileId: 'test-pile-2'},
        ];
        (findTargetPositions as jest.Mock).mockReturnValue(mockValue);

        showPossibleTargetsReducer(state);

        expect(state.foundations[0].isTarget).toBeFalsy();
        expect(state.foundations[1].isTarget).toBeFalsy();
        expect(state.foundations[2].isTarget).toBeFalsy();
        expect(state.foundations[3].isTarget).toBeFalsy();

        expect(state.tableau[0].isTarget).toBeFalsy();
        expect(state.tableau[1].isTarget).toBeTruthy();
        expect(state.tableau[2].isTarget).toBeFalsy();
        expect(state.tableau[3].isTarget).toBeTruthy();
        expect(state.tableau[4].isTarget).toBeFalsy();
        expect(state.tableau[5].isTarget).toBeFalsy();
        expect(state.tableau[6].isTarget).toBeFalsy();
    });

    test('Two targets on foundations', () => {
        const mockFoundationValue = [
            {position: EGameBoardPart.FOUNDATIONS, foundationId: 'test-foundation-4'},
            {position: EGameBoardPart.FOUNDATIONS, foundationId: 'test-foundation-2'},
        ];
        (findTargetPositions as jest.Mock).mockReturnValue(mockFoundationValue);

        showPossibleTargetsReducer(state);

        expect(state.foundations[0].isTarget).toBeFalsy();
        expect(state.foundations[1].isTarget).toBeTruthy();
        expect(state.foundations[2].isTarget).toBeFalsy();
        expect(state.foundations[3].isTarget).toBeTruthy();

        expect(state.tableau[0].isTarget).toBeFalsy();
        expect(state.tableau[1].isTarget).toBeFalsy();
        expect(state.tableau[2].isTarget).toBeFalsy();
        expect(state.tableau[3].isTarget).toBeFalsy();
        expect(state.tableau[4].isTarget).toBeFalsy();
        expect(state.tableau[5].isTarget).toBeFalsy();
        expect(state.tableau[6].isTarget).toBeFalsy();
    });

    test('Two targets on foundations and two targets on tableau', () => {
        const mockFoundationValue = [
            {position: EGameBoardPart.FOUNDATIONS, foundationId: 'test-foundation-4'},
            {position: EGameBoardPart.FOUNDATIONS, foundationId: 'test-foundation-2'},
            {position: EGameBoardPart.TABLEAU, pileId: 'test-pile-4'},
            {position: EGameBoardPart.TABLEAU, pileId: 'test-pile-2'},
        ];
        (findTargetPositions as jest.Mock).mockReturnValue(mockFoundationValue);

        showPossibleTargetsReducer(state);

        expect(state.foundations[0].isTarget).toBeFalsy();
        expect(state.foundations[1].isTarget).toBeTruthy();
        expect(state.foundations[2].isTarget).toBeFalsy();
        expect(state.foundations[3].isTarget).toBeTruthy();

        expect(state.tableau[0].isTarget).toBeFalsy();
        expect(state.tableau[1].isTarget).toBeTruthy();
        expect(state.tableau[2].isTarget).toBeFalsy();
        expect(state.tableau[3].isTarget).toBeTruthy();
        expect(state.tableau[4].isTarget).toBeFalsy();
        expect(state.tableau[5].isTarget).toBeFalsy();
        expect(state.tableau[6].isTarget).toBeFalsy();
    });

    test.todo('When selected card on tableau is not last, foundations couldn\'t be as target');
});