import {generateFoundationId, generatePileId} from "Utils/generateId";

describe('Unique id generator', () => {
    test('foundations', () => {
        expect(generateFoundationId()).toMatch(/^foundation-id-[0-9A-Za-z]+$/)
        expect(generateFoundationId()).not.toEqual(generateFoundationId());
    });

    test('piles', () => {
        expect(generatePileId()).toMatch(/^pile-id-[0-9A-Za-z]+$/)
        expect(generatePileId()).not.toEqual(generatePileId());
    });
})