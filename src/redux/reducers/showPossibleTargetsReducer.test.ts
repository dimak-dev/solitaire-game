import {EGameBoardPart} from "Types/EGameBoardPart";

jest.mock('Utils/findPositions')

import {findTargetPositions} from "Utils/findPositions";
import {showPossibleTargetsReducer} from "Redux/reducers/showPossibleTargetsReducer";
import {IGameBoard} from "Types/IGameBoard";
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";
import {gameBoardActions} from "Redux/game";

const testCard = {suit: ECardSuit.HEART, value: ECardValue.FOUR};
const testPayload = gameBoardActions.showPossibleTargets(testCard);

describe('Show possible targets for selected card - Reducer', () => {
    let state: IGameBoard;

    beforeEach(() => {
        state = {
            foundations: [
                {id: 'test-foundation-1', cards: []},
                {id: 'test-foundation-2', cards: []},
                {id: 'test-foundation-3', cards: []},
                {id: 'test-foundation-4', cards: []},
            ],
            tableau: [
                {id: 'test-pile-1', cards: []},
                {id: 'test-pile-2', cards: []},
                {id: 'test-pile-3', cards: []},
                {id: 'test-pile-4', cards: []},
                {id: 'test-pile-5', cards: []},
                {id: 'test-pile-6', cards: []},
                {id: 'test-pile-7', cards: []},
            ],
            talon: [],
            stock: [],
            possibleTargets: {pilesIds: ['garbage'], foundationsIds: ['garbage']},
        };
    })

    test('Empty targets', () => {
        (findTargetPositions as jest.Mock).mockReturnValue([]);

        showPossibleTargetsReducer(state, testPayload);

        expect(findTargetPositions).toHaveBeenCalled();
        expect(state.possibleTargets).toStrictEqual({pilesIds: [], foundationsIds: []})
    });

    test('Two targets on tableau', () => {
        const mockValue = [
            {position: EGameBoardPart.TABLEAU, pileId: 'test-pile-4'},
            {position: EGameBoardPart.TABLEAU, pileId: 'test-pile-2'},
        ];
        (findTargetPositions as jest.Mock).mockReturnValue(mockValue);

        showPossibleTargetsReducer(state, testPayload);

        expect(state).toHaveProperty('possibleTargets.pilesIds');
        expect(state.possibleTargets.pilesIds).toHaveLength(2);
        expect(state.possibleTargets.pilesIds).toContain('test-pile-4');
        expect(state.possibleTargets.pilesIds).toContain('test-pile-2');

        expect(state).toHaveProperty('possibleTargets.foundationsIds');
        expect(state.possibleTargets.foundationsIds).toHaveLength(0);
    });

    test('Two targets on foundations', () => {
        const mockFoundationValue = [
            {position: EGameBoardPart.FOUNDATIONS, foundationId: 'test-foundation-4'},
            {position: EGameBoardPart.FOUNDATIONS, foundationId: 'test-foundation-2'},
        ];
        (findTargetPositions as jest.Mock).mockReturnValue(mockFoundationValue);

        showPossibleTargetsReducer(state, testPayload);

        expect(state).toHaveProperty('possibleTargets.pilesIds');
        expect(state.possibleTargets.pilesIds).toHaveLength(0);

        expect(state).toHaveProperty('possibleTargets.foundationsIds');
        expect(state.possibleTargets.foundationsIds).toHaveLength(2);
        expect(state.possibleTargets.foundationsIds).toContain('test-foundation-4');
        expect(state.possibleTargets.foundationsIds).toContain('test-foundation-2');
    });

    test('Two targets on foundations and two targets on tableau', () => {
        const mockFoundationValue = [
            {position: EGameBoardPart.FOUNDATIONS, foundationId: 'test-foundation-4'},
            {position: EGameBoardPart.FOUNDATIONS, foundationId: 'test-foundation-2'},
            {position: EGameBoardPart.TABLEAU, pileId: 'test-pile-4'},
            {position: EGameBoardPart.TABLEAU, pileId: 'test-pile-2'},
        ];
        (findTargetPositions as jest.Mock).mockReturnValue(mockFoundationValue);

        showPossibleTargetsReducer(state, testPayload);

        expect(state).toHaveProperty('possibleTargets.pilesIds');
        expect(state.possibleTargets.pilesIds).toHaveLength(2);
        expect(state.possibleTargets.pilesIds).toContain('test-pile-4');
        expect(state.possibleTargets.pilesIds).toContain('test-pile-2');

        expect(state).toHaveProperty('possibleTargets.foundationsIds');
        expect(state.possibleTargets.foundationsIds).toHaveLength(2);
        expect(state.possibleTargets.foundationsIds).toContain('test-foundation-4');
        expect(state.possibleTargets.foundationsIds).toContain('test-foundation-2');
    });
});