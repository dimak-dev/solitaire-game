import moveSelectedCardToFoundation from "Redux/reducers/moveSelectedCardToFoundation";
import {EGameBoardPart} from "Types/EGameBoardPart";
import {findTargetPositions} from "Utils/findPositions";
import {resetFoundationTargets, resetTableauTargets} from "Utils/resetTargets";

jest.mock('Utils/findPositions');
jest.mock('Utils/resetTargets')


describe('Moving selected card to foundation', () => {
    let state;

    beforeEach(() => {
        state = {
            selectedCard: {
                card: 'garbage',
            },
            foundations: [
                {id: 'test-foundation-id-1', cards: []},
                {id: 'test-foundation-id-2', cards: []},
                {id: 'test-foundation-id-3', cards: []},
                {id: 'test-foundation-id-4', cards: []},
            ],
            tableau: [
                {id: 'test-pile-1'},
                {id: 'test-pile-2'},
                {id: 'test-pile-3'},
                {id: 'test-pile-4'},
                {id: 'test-pile-5'},
                {id: 'test-pile-6'},
                {id: 'test-pile-7'},
            ],
        };
    });

    test('Empty selected card must throws error', () => {
        state.selectedCard = null;
        const payload = 'test-foundation-id-1';
        const fn = () => moveSelectedCardToFoundation(state, {payload});
        expect(fn).toThrowError(/not selected/i);
    });

    test('Wrong target must throws error', () => {
        findTargetPositions.mockReturnValue([]);

        const payload = 'test-foundation-id-1';
        const fn = () => moveSelectedCardToFoundation(state, {payload});

        expect(fn).toThrowError(/invalid target/i);
        expect(findTargetPositions).toHaveBeenCalled();
    });

    test('Wrong foundation id must throws error', () => {
        const mock = [{
            position: EGameBoardPart.FOUNDATIONS,
            foundationId: 'wrong-foundation-id'
        }];
        const payload = 'wrong-foundation-id';

        findTargetPositions.mockReturnValue(mock);

        const fn = () => moveSelectedCardToFoundation(state, {payload});

        expect(fn).toThrowError(/invalid foundation id/i);
        expect(findTargetPositions).toHaveBeenCalled();
    });

    test('Selected card is empty after moving', () => {
        const mock = [{
            position: EGameBoardPart.FOUNDATIONS,
            foundationId: 'test-foundation-id-1'
        }];
        findTargetPositions.mockReturnValue(mock);

        moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});
        expect(state.selectedCard).toBeNull();
    });

    describe('Card moves from talon to foundation', () => {
        beforeEach(() => {
            state.selectedCard = {
                card: {id: 'test-card-id-2'},
                position: EGameBoardPart.TALON,
            };
            state.talon = [
                {id: 'test-card-id-1'},
                {id: 'test-card-id-2'},
            ];

            const mock = [{
                position: EGameBoardPart.FOUNDATIONS,
                foundationId: 'test-foundation-id-1'
            }];
            findTargetPositions.mockReturnValue(mock);
        });

        test('Talon\'s mutability', () => {
            const originTalon = state.talon;

            moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});

            expect(originTalon === state.talon).toBeFalsy();
        });

        test('All of targets will be empty after moving', () => {
            moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});

            expect(resetFoundationTargets).toHaveBeenCalledWith(state);
            expect(resetTableauTargets).toHaveBeenCalledWith(state);
        });

        test('Talon contains no more moved card', () => {
            moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});

            expect(state.talon).toHaveLength(1);
            expect(state.talon).toStrictEqual([{id: 'test-card-id-1'}]);
        });

        test('Foundation has moved card', () => {
            moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});

            expect(state.foundations[0].cards).toHaveLength(1);
            expect(state.foundations[0].cards).toStrictEqual([{id: 'test-card-id-2'}]);
        });
    });

    describe('Card moves from tableau to foundation', function () {
        beforeEach(() => {
            state.selectedCard = {
                card: {id: 'test-card-id-2'},
                position: EGameBoardPart.TABLEAU,
                pileId: 'test-pile-id-1'
            }
            state.tableau = [
                {
                    id: 'test-pile-id-1', cards: [
                        {isOpen: true, card: {id: 'test-card-id-2'}}
                    ]
                },
                {
                    id: 'test-pile-id-2', cards: [
                        {isOpen: false, card: {id: 'test-card-id-3'}},
                        {isOpen: false, card: {id: 'test-card-id-4'}},
                        {isOpen: true, card: {id: 'test-card-id-1'}}
                    ]
                },
            ];

            const mock = [{
                position: EGameBoardPart.FOUNDATIONS,
                foundationId: 'test-foundation-id-1'
            }];
            findTargetPositions.mockReturnValue(mock);
        });

        test('Wrong pile id in selected card must throws error', () => {
            state.selectedCard.pileId = 'wrond-id';
            const fn = () => moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});
            expect(fn).toThrowError(/invalid pile id/i)
        });


        test('Wrong card id in selected card must throws error', () => {
            state.selectedCard.card = {id: 'wrong-id'};
            const fn = () => moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});
            expect(fn).toThrowError(/pile is not contain selected card/i)
        });

        test('Pile\'s mutability', () => {
            const originTableau = state.tableau;
            const originPile1 = state.tableau[0];
            const originPile2 = state.tableau[1];

            moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});

            expect(originTableau === state.tableau).toBeFalsy();
            expect(originPile1 === state.tableau[0]).toBeFalsy();
            expect(originPile2 === state.tableau[1]).toBeTruthy();
        });

        test('When pile contain only one card, then pile will be empty', () => {
            state.selectedCard = {
                card: {id: 'test-card-id-2'},
                position: EGameBoardPart.TABLEAU,
                pileId: 'test-pile-id-1',
            };

            moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});
            expect(state.tableau[0].cards).toHaveLength(0);
        });

        test('Pile contains no more moved card', () => {
            state.selectedCard.pileId = 'test-pile-id-2';
            state.selectedCard.card.id = 'test-card-id-1';

            moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});
            expect(state.tableau[1].cards).toHaveLength(2);
        });

        test('When last but one card is hidden, after moving it will be open', () => {
            state.selectedCard.pileId = 'test-pile-id-2';
            state.selectedCard.card.id = 'test-card-id-1';

            moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});
            expect(state.tableau[1].cards[1].isOpen).toBeTruthy();
        });

        test('Foundation has moved card', () => {
            moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});

            expect(state.foundations[0].cards).toHaveLength(1);
            expect(state.foundations[0].cards).toStrictEqual([{id: 'test-card-id-2'}]);
        });

        test('All of targets will be empty after moving', () => {
            moveSelectedCardToFoundation(state, {payload: 'test-foundation-id-1'});

            expect(resetFoundationTargets).toHaveBeenCalledWith(state);
            expect(resetTableauTargets).toHaveBeenCalledWith(state);
        });
    });
});