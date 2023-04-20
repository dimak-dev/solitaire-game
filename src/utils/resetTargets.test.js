import {resetFoundationTargets, resetTableauTargets} from "Utils/resetTargets";

describe('Reset targets', function () {
    describe('reset targets on foundations', () => {
        test('Mutability', () => {
            const foundation0 = {id: 'test-id-1', cards: [1, 2, 3], isTarget: false};
            const foundation1 = {id: 'test-id-2', cards: [4, 5, 6], isTarget: false};
            const foundation2 = {id: 'test-id-3', cards: [2, 3, 4], isTarget: false};
            const foundation3 = {id: 'test-id-4', cards: [9, 9, 9], isTarget: false};
            const state = {
                foundations: [foundation0, foundation1, foundation2, foundation3]
            };

            resetFoundationTargets(state);

            expect(state.foundations[0]).toStrictEqual(foundation0);
            expect(state.foundations[1]).toStrictEqual(foundation1);
            expect(state.foundations[2]).toStrictEqual(foundation2);
            expect(state.foundations[3]).toStrictEqual(foundation3);

            expect(state.foundations[0] === foundation0).toBeFalsy();
            expect(state.foundations[1] === foundation1).toBeFalsy();
            expect(state.foundations[2] === foundation2).toBeFalsy();
            expect(state.foundations[3] === foundation3).toBeFalsy();
        });

        test('Reset all foundations', () => {
            const state = {
                foundations: [{isTarget: true}, {isTarget: true}, {isTarget: true}, {isTarget: true}],
            };

            resetFoundationTargets(state);

            expect(state.foundations[0].isTarget).toBeFalsy();
            expect(state.foundations[1].isTarget).toBeFalsy();
            expect(state.foundations[2].isTarget).toBeFalsy();
            expect(state.foundations[3].isTarget).toBeFalsy();
        });
    });


    describe('reset targets on tableau', () => {
        test('Mutability', () => {
            const pile0 = {id: 'test-id-1', cards: [1, 2, 3], isTarget: false};
            const pile1 = {id: 'test-id-2', cards: [4, 5, 6], isTarget: false};
            const pile2 = {id: 'test-id-3', cards: [2, 3, 4], isTarget: false};
            const pile3 = {id: 'test-id-4', cards: [9, 9, 9], isTarget: false};
            const pile4 = {id: 'test-id-5', cards: [9, 9, 9], isTarget: false};
            const pile5 = {id: 'test-id-6', cards: [9, 9, 9], isTarget: false};
            const pile6 = {id: 'test-id-7', cards: [9, 9, 9], isTarget: false};
            const state = {
                tableau: [pile0, pile1, pile2, pile3, pile4, pile5, pile6],
            };

            resetTableauTargets(state);

            expect(state.tableau[0]).toStrictEqual(pile0);
            expect(state.tableau[1]).toStrictEqual(pile1);
            expect(state.tableau[2]).toStrictEqual(pile2);
            expect(state.tableau[3]).toStrictEqual(pile3);
            expect(state.tableau[4]).toStrictEqual(pile4);
            expect(state.tableau[5]).toStrictEqual(pile5);
            expect(state.tableau[5]).toStrictEqual(pile5);

            expect(state.tableau[0] === pile0).toBeFalsy();
            expect(state.tableau[1] === pile1).toBeFalsy();
            expect(state.tableau[2] === pile2).toBeFalsy();
            expect(state.tableau[3] === pile3).toBeFalsy();
            expect(state.tableau[4] === pile4).toBeFalsy();
            expect(state.tableau[5] === pile5).toBeFalsy();
            expect(state.tableau[6] === pile6).toBeFalsy();
        });

        test('Reset all foundations', () => {
            const state = {
                tableau: [{isTarget: true}, {isTarget: true}, {isTarget: true}, {isTarget: true}, {isTarget: true}, {isTarget: true}, {isTarget: true}],
            };

            resetTableauTargets(state);

            expect(state.tableau[0].isTarget).toBeFalsy();
            expect(state.tableau[1].isTarget).toBeFalsy();
            expect(state.tableau[2].isTarget).toBeFalsy();
            expect(state.tableau[3].isTarget).toBeFalsy();
            expect(state.tableau[4].isTarget).toBeFalsy();
            expect(state.tableau[5].isTarget).toBeFalsy();
            expect(state.tableau[6].isTarget).toBeFalsy();
        });
    });
});