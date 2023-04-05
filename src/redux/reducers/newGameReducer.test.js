import newGameReducer from "Redux/reducers/newGame";

describe('New Game Reducer', () => {
    let state;

    beforeEach(() => {
        state = {
            foundations: 'garbage',
            talon: 'garbage',
            stock: 'garbage',
            tableau: 'garbage',
        };
    })

    test('There are four empty foundations', () => {
        newGameReducer(state);

        expect(state).toHaveProperty('foundations');

        expect(state.foundations).toBeInstanceOf(Array);
        expect(state.foundations).toHaveLength(4);

        expect(state).toHaveProperty('foundations[0].id');
        expect(state).toHaveProperty('foundations[0].cards');
        expect(state).toHaveProperty('foundations[1].id');
        expect(state).toHaveProperty('foundations[1].cards');
        expect(state).toHaveProperty('foundations[2].id');
        expect(state).toHaveProperty('foundations[2].cards');
        expect(state).toHaveProperty('foundations[3].id');
        expect(state).toHaveProperty('foundations[3].cards');

        expect(state.foundations[0].cards).toBeInstanceOf(Array);
        expect(state.foundations[0].cards).toHaveLength(0);

        expect(state.foundations[1].cards).toBeInstanceOf(Array);
        expect(state.foundations[1].cards).toHaveLength(0);

        expect(state.foundations[2].cards).toBeInstanceOf(Array);
        expect(state.foundations[2].cards).toHaveLength(0);

        expect(state.foundations[3].cards).toBeInstanceOf(Array);
        expect(state.foundations[3].cards).toHaveLength(0);
    });

    test('The talon must be empty', () => {
        newGameReducer(state);

        expect(state).toHaveProperty('talon');

        expect(state.talon).toBeInstanceOf(Array);
        expect(state.talon).toHaveLength(0);
    });

    test('The stock must contain 24 cards', () => {
        newGameReducer(state);

        expect(state).toHaveProperty('stock');
        expect(state.stock).toBeInstanceOf(Array);
        expect(state.stock).toHaveLength(24);

        state.stock.forEach(card => {
            expect(card).toHaveProperty('suit');
            expect(card).toHaveProperty('value');
        });
    });

    test('The tableau must contain 7 piles', () => {
        newGameReducer(state);

        expect(state).toHaveProperty('tableau');

        expect(state.tableau).toBeInstanceOf(Array);
        expect(state.tableau).toHaveLength(7);
    });

    test('Each piles contain cards. Each next pile contain one more card. Only last card in pile is opened.', () => {
        newGameReducer(state);

        const snapshot = state.tableau.map(pile => pile.cards.map(card => card.isOpen));

        expect(snapshot[0]).toHaveLength(1);
        expect(snapshot[0]).toStrictEqual([true]);
        expect(snapshot[1]).toHaveLength(2);
        expect(snapshot[1]).toStrictEqual([false, true]);
        expect(snapshot[2]).toHaveLength(3);
        expect(snapshot[2]).toStrictEqual([false, false, true]);
        expect(snapshot[3]).toHaveLength(4);
        expect(snapshot[3]).toStrictEqual([false, false, false, true]);
        expect(snapshot[4]).toHaveLength(5);
        expect(snapshot[4]).toStrictEqual([false, false, false, false, true]);
        expect(snapshot[5]).toHaveLength(6);
        expect(snapshot[5]).toStrictEqual([false, false, false, false, false, true]);
        expect(snapshot[6]).toHaveLength(7);
        expect(snapshot[6]).toStrictEqual([false, false, false, false, false, false, true]);
    });
});