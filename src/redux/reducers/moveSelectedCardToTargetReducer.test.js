import {findCurrentPosition, findTargetPositions} from "Utils/findPositions";
import hasFoundationById from "Utils/checkers/hasFoundationById";
import moveSelectedCardToTargetReducer from "Redux/reducers/moveSelectedCardToTargetReducer";
import pickFromTalon from "Utils/movers/pickFromTalon";
import putToFoundation from "Utils/movers/putToFoundation";
import hasPileById from "Utils/checkers/hasPileById";
import putToTableau from "Utils/movers/putToTableau";
import pickFromFoundation from "Utils/movers/pickFromFoundation";
import pickFromTableau from "Utils/movers/pickFromTableau";

jest.mock('Utils/findPositions');
jest.mock('Utils/checkers/hasFoundationById');
jest.mock('Utils/checkers/hasPileById');
jest.mock('Utils/movers/pickFromFoundation');
jest.mock('Utils/movers/pickFromTableau');
jest.mock('Utils/movers/pickFromTalon');
jest.mock('Utils/movers/putToFoundation');
jest.mock('Utils/movers/putToTableau');

describe('Reducer: Move selected card to target', function () {
    let state;
    beforeEach(() => {
        state = {
            talon: ['garbage'],
            foundations: [
                {id: 'test-foundation-3', cards: ['garbage']},
            ],
            tableau: [
                {id: 'test-pile-3', cards: ['garbage']},
                {id: 'test-pile-5', cards: ['garbage']},
            ]
        };
        findCurrentPosition.mockReturnValue(null);
        // mock all possible targets
        findTargetPositions.mockReturnValue([
            {position: 'foundation', foundationId: 'test-foundation-3'},
            {position: 'tableau', pileId: 'test-pile-3'},
            {position: 'tableau', pileId: 'test-pile-5'},
        ]);
        hasPileById.mockReturnValue(true);
        hasFoundationById.mockReturnValue(true);

        pickFromFoundation.mockImplementation(() => {
            throw new Error('Test Error');
        })

        pickFromTableau.mockImplementation(() => {
            throw new Error('Test Error');
        })

        pickFromTalon.mockImplementation(() => {
            throw new Error('Test Error');
        })

        putToFoundation.mockImplementation(() => {
            throw new Error('Test Error');
        });

        putToTableau.mockImplementation(() => {
            throw new Error('Test Error');
        });
    });

    afterEach(() => {
        findCurrentPosition.mockReset();
        findTargetPositions.mockReset();
        hasPileById.mockReset();
        hasFoundationById.mockReset();
        pickFromTableau.mockReset();
        pickFromFoundation.mockReset();
        pickFromTalon.mockReset();
        putToFoundation.mockReset();
        putToTableau.mockReset();
    });

    describe('Talon -> Foundation', () => {
        let payload;

        beforeEach(() => {
            findCurrentPosition.mockReturnValue({position: 'talon'});
            pickFromTalon.mockReturnValue({});
            putToFoundation.mockReturnValue({});

            payload = {target: 'foundation', foundationId: 'test-foundation-3'};
        });

        test('Invalid target foundation id throws error', () => {
            hasFoundationById.mockReturnValue(false);
            const fn = () => moveSelectedCardToTargetReducer(state, {payload});

            expect(fn).toThrowError(/Foundation does not exist/i);
            expect(hasFoundationById).toHaveBeenCalled();
        });

        test('Invalid foundation as target throws error', () => {
            findTargetPositions.mockReturnValue([]);

            const fn = () => moveSelectedCardToTargetReducer(state, {payload});
            expect(fn).toThrowError(/Invalid target foundation/i);
        });

        test('Card from talon has been picked', () => {
            state.talon = 'mock-talon';

            moveSelectedCardToTargetReducer(state, {payload});

            expect(pickFromTalon).toHaveBeenCalledWith('mock-talon');
            expect(pickFromTalon).toHaveBeenCalledTimes(1);
        });

        test('Talon in state has been changed', () => {
            pickFromTalon.mockReturnValue({restOfTalon: 'test-rest-of-talon'});

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.talon).toStrictEqual('test-rest-of-talon');
        });

        test('Card has been putted to foundation', () => {
            pickFromTalon.mockReturnValue({pickedCard: 'test-picked-card'});

            moveSelectedCardToTargetReducer(state, {payload});

            expect(putToFoundation).toHaveBeenCalledWith(expect.anything(), 'test-picked-card');
            expect(putToFoundation).toHaveBeenCalledTimes(1);

        });

        test('Foundation in state has been changed', () => {
            putToFoundation.mockReturnValue('mock-foundation');

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.foundations).toContain('mock-foundation');
        });

        test('Stock and tableau has no changes', () => {
            state.tableau = 'mock-tableau';
            state.stock = 'mock-stock';

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.tableau).toStrictEqual('mock-tableau');
            expect(state.stock).toStrictEqual('mock-stock');
        });
    });

    describe('Talon -> Tableau', () => {
        let payload;

        beforeEach(() => {
            findCurrentPosition.mockReturnValue({position: 'talon'});
            pickFromTalon.mockReturnValue({});
            putToTableau.mockReturnValue({});

            payload = {target: 'tableau', pileId: 'test-pile-3'};
        });

        test('Invalid target pile id throws error', () => {
            hasPileById.mockReturnValue(false);
            const fn = () => moveSelectedCardToTargetReducer(state, {payload});

            expect(fn).toThrowError(/Pile does not exist/i);
            expect(hasPileById).toHaveBeenCalled();
        });

        test('Invalid pile as target throws error', () => {
            findTargetPositions.mockReturnValue([]);

            const fn = () => moveSelectedCardToTargetReducer(state, {payload});
            expect(fn).toThrowError(/Invalid target pile/i);
        });

        test('Card from talon has been picked', () => {
            state.talon = 'mock-talon';

            moveSelectedCardToTargetReducer(state, {payload});

            expect(pickFromTalon).toHaveBeenCalledWith('mock-talon');
            expect(pickFromTalon).toHaveBeenCalledTimes(1);
        });

        test('Talon in state has been changed', () => {
            pickFromTalon.mockReturnValue({restOfTalon: 'test-rest-of-talon'});

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.talon).toStrictEqual('test-rest-of-talon');
        });

        test('Card has been putted to foundation', () => {
            pickFromTalon.mockReturnValue({pickedCard: 'test-picked-card'});

            moveSelectedCardToTargetReducer(state, {payload});

            expect(putToTableau).toHaveBeenCalledWith(expect.anything(), ['test-picked-card']);
            expect(putToTableau).toHaveBeenCalledTimes(1);

        });

        test('Foundation in state has been changed', () => {
            putToTableau.mockReturnValue('mock-tableau');

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.tableau).toContain('mock-tableau');
        });

        test('Stock and foundations has no changes', () => {
            state.foundations = 'mock-foundations';
            state.stock = 'mock-stock';

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.foundations).toStrictEqual('mock-foundations');
            expect(state.stock).toStrictEqual('mock-stock');
        });
    });

    describe('Foundation -> Tableau', () => {
        let payload;

        beforeEach(() => {
            findCurrentPosition.mockReturnValue({position: 'foundation', foundationId: 'test-foundation-3'});
            pickFromFoundation.mockReturnValue({});
            putToTableau.mockReturnValue({});

            payload = {target: 'tableau', pileId: 'test-pile-3'};
        });

        test('Check that foundation id is present', () => {
            hasFoundationById.mockReturnValue(false);
            const fn = () => moveSelectedCardToTargetReducer(state, {payload});

            expect(fn).toThrowError(/foundation does not exist/i);
            expect(hasFoundationById).toHaveBeenCalledWith(expect.anything(), 'test-foundation-3');
        });

        test('Invalid target pile id throws error', () => {
            hasPileById.mockReturnValue(false);
            const fn = () => moveSelectedCardToTargetReducer(state, {payload});

            expect(fn).toThrowError(/pile does not exist/i);
            expect(hasPileById).toHaveBeenCalledWith(expect.anything(), 'test-pile-3');
        });

        test('Foundation has no picked card', () => {
            pickFromFoundation.mockReturnValue({restCardsInFoundation: []});

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.foundations[0].cards).toHaveLength(0);
        });

        test('Tableau has putted card', () => {
            pickFromFoundation.mockReturnValue({pickedCard: {id: 'card-mock'}});

            moveSelectedCardToTargetReducer(state, {payload});

            expect(putToTableau).toHaveBeenCalledWith(expect.anything(), [{id: 'card-mock'}]);
        });

        test('Tableau in state has been changed', () => {
            putToTableau.mockReturnValue('mock-tableau');

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.tableau).toContain('mock-tableau');
        });

        test('Stock and talon has no changes', () => {
            state.talon = 'mock-talon';
            state.stock = 'mock-stock';

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.talon).toStrictEqual('mock-talon');
            expect(state.stock).toStrictEqual('mock-stock');
        });
    });

    describe('Tableau -> Foundation', () => {
        let payload;
        beforeEach(() => {
            payload = {target: 'foundation', foundationId: 'test-foundation-3'};
            findCurrentPosition.mockReturnValue({position: 'tableau', pileId: 'test-pile-3'});
            pickFromTableau.mockReturnValue({pickedCards: []});
            putToFoundation.mockReturnValue({});
        });

        test('Invalid pile id for selected card throws error', () => {
            hasPileById.mockReturnValue(false);

            const fn = () => moveSelectedCardToTargetReducer(state, {payload});
            expect(fn).toThrowError(/pile does not exist/i);
            expect(hasPileById).toHaveBeenCalledWith(expect.anything(), 'test-pile-3');
        });

        test('Invalid foundation id for target throws error', () => {
            hasFoundationById.mockReturnValue(false);
            const fn = () => moveSelectedCardToTargetReducer(state, {payload});

            expect(fn).toThrowError(/Foundation does not exist/i);
            expect(hasFoundationById).toHaveBeenCalled();
        });

        test('Too many picked cards throws error', () => {
            pickFromTableau.mockReturnValue({pickedCards: [1, 2]});

            const fn = () => moveSelectedCardToTargetReducer(state, {payload});

            expect(fn).toThrowError(/too many picked cards/i);
        });

        test('Card from tableau has been picked', () => {
            state.selectedCard = {card: {id: 'test-card-1'}};

            moveSelectedCardToTargetReducer(state, {payload});

            expect(pickFromTableau).toHaveBeenCalledWith(expect.anything(), 'test-card-1')
        });

        test('Card has been putted to foundation', () => {
            pickFromTableau.mockReturnValue({pickedCards: ['mock-card']});

            moveSelectedCardToTargetReducer(state, {payload});

            expect(putToFoundation).toHaveBeenCalledWith(expect.anything(), 'mock-card')
        });

        test('Foundation in state has been changed', () => {
            putToFoundation.mockReturnValue('mock-foundation');

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.foundations).toContain('mock-foundation');
        });

        test('Stock and talon has no changes', () => {
            state.talon = 'mock-talon';
            state.stock = 'mock-stock';

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.talon).toStrictEqual('mock-talon');
            expect(state.stock).toStrictEqual('mock-stock');
        });
    });

    describe('Tableau -> Tableau', () => {
        let payload;
        beforeEach(() => {
            payload = {target: 'tableau', pileId: 'test-pile-5'};
            findCurrentPosition.mockReturnValue({position: 'tableau', pileId: 'test-pile-3'});
            pickFromTableau.mockReturnValue({pickedCards: []});
            putToTableau.mockReturnValue({});
        });

        test('Invalid pile id for selected card throws error', () => {
            hasPileById.mockReturnValueOnce(false);
            hasPileById.mockReturnValueOnce(true);

            const fn = () => moveSelectedCardToTargetReducer(state, {payload});
            expect(fn).toThrowError(/pile does not exist/i);
            expect(hasPileById).toHaveBeenCalledWith(expect.anything(), 'test-pile-3');
        });

        test('Invalid pile id for target throws error', () => {
            hasPileById.mockReturnValueOnce(true);
            hasPileById.mockReturnValueOnce(false);

            const fn = () => moveSelectedCardToTargetReducer(state, {payload});
            expect(fn).toThrowError(/pile does not exist/i);
            expect(hasPileById).toHaveBeenCalledTimes(2);
            expect(hasPileById).toHaveBeenNthCalledWith(2, expect.anything(), 'test-pile-5');
        });

        test('Two picked cards doesn\'t throw error', () => {
            pickFromTableau.mockReturnValue({pickedCards: [1, 2]});

            const fn = () => moveSelectedCardToTargetReducer(state, {payload});

            expect(fn).not.toThrowError(/too many picked cards/i);
        });

        test('Card from tableau has been picked', () => {
            state.selectedCard = {card: {id: 'test-card-1'}};

            moveSelectedCardToTargetReducer(state, {payload});

            expect(pickFromTableau).toHaveBeenCalledWith(expect.anything(), 'test-card-1');
        });

        test('One card has been putted to tableau', () => {
            pickFromTableau.mockReturnValue({pickedCards: ['mock-card']});

            moveSelectedCardToTargetReducer(state, {payload});

            expect(putToTableau).toHaveBeenCalledWith(expect.anything(), ['mock-card']);
        });

        test('Two cards have been putted to tableau', () => {
            pickFromTableau.mockReturnValue({pickedCards: ['mock-card-1', 'mock-card-2']});

            moveSelectedCardToTargetReducer(state, {payload});

            expect(putToTableau).toHaveBeenCalledWith(expect.anything(), ['mock-card-1', 'mock-card-2']);
        });

        test('Tableau in state has been changed', () => {
            putToTableau.mockReturnValue('mock-pile');

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.tableau).toContain('mock-pile');
        });

        test('Foundations, stock and talon has no changes', () => {
            state.talon = 'mock-talon';
            state.stock = 'mock-stock';
            state.foundations = 'mock-foundations';

            moveSelectedCardToTargetReducer(state, {payload});

            expect(state.talon).toStrictEqual('mock-talon');
            expect(state.stock).toStrictEqual('mock-stock');
            expect(state.foundations).toStrictEqual('mock-foundations');
        });
    });
});