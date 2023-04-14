import {generateFoundationId, generatePileId} from "Utils/generateId";

describe('Unique id generator', () => {
    test('foundations', () => {
        expect(generateFoundationId()).toMatch(/^foundation-id-\d+$/)
        expect(generateFoundationId()).not.toEqual(generateFoundationId());
    });

    test('piles', () => {
        expect(generatePileId()).toMatch(/^pile-id-\d+$/)
        expect(generatePileId()).not.toEqual(generatePileId());
    });
})