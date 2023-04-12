import resetStockReducer from "Redux/reducers/resetStockReducer";

describe('Reducer for resetting stock', () => {
    let state;
    beforeEach(() => {
        state = {
            stock: 'garbage',
            talon: 'garbage',
        }
    });

    test('The error will be thrown if there is an attempt to reset not empty stock', () => {
        state.stock = [1];
        expect(() => resetStockReducer(state)).toThrowError(/not empty/i);
    });

    test('All of the cards from a talon were moved to stock', () => {
        state.stock = [];
        state.talon = [1, 2, 3, 4];
        resetStockReducer(state);
        expect(state.talon).toStrictEqual([]);
        expect(state.stock).toStrictEqual([1, 2, 3, 4]);
    })
});