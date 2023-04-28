import pickFromTalon from "Utils/movers/pickFromTalon";

describe('Picker from talon', function () {
    test('Checks that talon is not empty', () => {
        expect(() => pickFromTalon(null)).toThrowError(/talon is empty/i)
        expect(() => pickFromTalon([])).toThrowError(/talon is empty/i)
    });

    test('Immutability', () => {
        const talon = [1, 2, 3];

        const result = pickFromTalon(talon);

        expect(result.restOfTalon === talon).toBeFalsy();
        expect(talon).toStrictEqual([1, 2, 3]);
    });

    test('Talon is empty after moving last card from talon', () => {
        const talon = [1];

        expect(pickFromTalon(talon).restOfTalon).toHaveLength(0);
    });

    test('After picking card from talon with 3 cards, rest of talon have 2 cards', () => {
        const {restOfTalon} = pickFromTalon([1, 2, 3]);

        expect(restOfTalon).toHaveLength(2);
        expect(restOfTalon).toContain(1);
        expect(restOfTalon).toContain(2);
    });

    test('After picking, talon sorting has no changes', () => {
        const {restOfTalon} = pickFromTalon([1, 2, 3, 4, 5]);

        expect(restOfTalon).toStrictEqual([1, 2, 3, 4]);
    });

    test('Picked card', () => {
        const {pickedCard} = pickFromTalon([1]);

        expect(pickedCard).toStrictEqual(1);
    });

    test('Picked card is always last', () => {
        const {pickedCard} = pickFromTalon([1, 2, 3, 4, 5]);

        expect(pickedCard).toStrictEqual(5);
    });
});