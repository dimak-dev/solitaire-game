import pickCardsFromStockReducer from "Redux/reducers/pickCardsFromStockReducer";
import {EPickingFromStockCount} from "Types/EPickingFromStockCount";

describe('Reducer for picking cards from stock to talon', () => {
    let state;
    let mode;

    beforeEach(() => {
        state = {
            stock: [],
            talon: [],
        }
    });

    describe('One card mode', () => {
        beforeEach(() => {
            mode = EPickingFromStockCount.ONE;
        });

        test('Call reducer on empty stock must be throw error', () => {
            expect(() => pickCardsFromStockReducer(state)).toThrowError(/empty/i);
        });

        test('After picking, the stock contains no more picked cards', () => {
            state.stock = [1, 2, 3];
            pickCardsFromStockReducer(state);

            expect(state.stock).toHaveLength(2);
            expect(state.stock).not.toContain(3);
        });

        test('After picking, the stock contains no more picked cards', () => {
            state.stock = [1, 2, 3];
            state.talon = [4, 5];
            pickCardsFromStockReducer(state);

            expect(state.talon).toHaveLength(3);
            expect(state.talon).toContain(3);
        });
    });

    // describe('Three card mode', () => {
    //     beforeEach(() => {
    //         mode = EPickingFromStockCount.THREE;
    //     });
    //
    //     test('Call reducer on empty stock must be throw error', () => {
    //         expect(() => pickCardsFromStockReducer(state)).toThrowError(/empty/i);
    //     });
    //
    //     test('After picking, the stock contains no more picked cards', () => {
    //         state.stock = [1, 2, 3, 4];
    //         pickCardsFromStockReducer(state);
    //
    //         expect(state.stock).toHaveLength(1);
    //         expect(state.stock).not.toContain(2);
    //         expect(state.stock).not.toContain(3);
    //         expect(state.stock).not.toContain(4);
    //     });
    //
    //     test('After picking, the stock contains no more picked cards', () => {
    //         state.stock = [1, 2, 3, 4, 5];
    //         state.talon = [6, 7];
    //         pickCardsFromStockReducer(state);
    //
    //         expect(state.talon).toHaveLength(5);
    //         expect(state.talon).toContain(3);
    //         expect(state.talon).toContain(4);
    //         expect(state.talon).toContain(5);
    //     });
    // });
});