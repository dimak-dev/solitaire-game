import pickFromFoundation from "Utils/movers/pickFromFoundation";

describe('Picker from foundation', function () {
    test('Checks that foundation is not empty', () => {
        expect(() => pickFromFoundation({})).toThrowError(/foundation is empty/i)
        expect(() => pickFromFoundation({cards: []})).toThrowError(/foundation is empty/i)
        expect(() => pickFromFoundation({suid: 's', cards: []})).toThrowError(/foundation is empty/i)
    });

    test('Immutability', () => {
        const foundation = {cards: [1, 2, 3], suit: 'test'};

        const result = pickFromFoundation(foundation);

        expect(result.restCardsInFoundation === foundation.cards).toBeFalsy();
        expect(foundation).toStrictEqual({cards: [1, 2, 3], suit: 'test'});
    });

    test('Foundation is empty after moving last card from foundation', () => {
        const foundation = {cards: [1], suit: 'test'};

        expect(pickFromFoundation(foundation).restCardsInFoundation).toHaveLength(0);
    });

    test('After picking card from foundation with 3 cards, rest of foundation have 2 cards', () => {
        const foundation = {cards: [1, 2, 3], suit: 'test'};
        const {restCardsInFoundation} = pickFromFoundation(foundation);

        expect(restCardsInFoundation).toHaveLength(2);
        expect(restCardsInFoundation).toContain(1);
        expect(restCardsInFoundation).toContain(2);
    });

    test('After picking, foundation sorting has no changes', () => {
        const foundation = {cards: [1, 2, 3, 4, 5], suit: 'test'};
        const {restCardsInFoundation} = pickFromFoundation(foundation);

        expect(restCardsInFoundation).toStrictEqual([1, 2, 3, 4]);
    });

    test('Picked card', () => {
        const foundation = {cards: [1], suit: 'test'};

        const {pickedCard} = pickFromFoundation(foundation);

        expect(pickedCard).toStrictEqual(1);
    });

    test('Picked card is always last', () => {
        const foundation = {cards: [1, 2, 3, 4, 5], suit: 'test'};

        const {pickedCard} = pickFromFoundation(foundation);

        expect(pickedCard).toStrictEqual(5);
    });
});