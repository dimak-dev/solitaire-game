import putToFoundation from "Utils/movers/putToFoundation";

describe('Put new card to foundation', function () {
    test('Empty foundation set new suit', () => {
        const foundation = {};

        const result = putToFoundation(foundation, {suit: 'test-suit'});

        expect(result).toHaveProperty('suit');
        expect(result.suit).toStrictEqual('test-suit')
    });

    test('Empty foundation add new card', () => {
        const foundation = {};

        const result = putToFoundation(foundation, 1);

        expect(result).toHaveProperty('cards');
        expect(result.cards).toHaveLength(1)
        expect(result.cards).toContain(1)
    });

    test('Immutability', () => {
        const originFoundation = {
            suit: 'test-suit',
            cards: [1, 2, 3]
        }

        const result = putToFoundation(originFoundation, {suit: 'test-suit'});

        expect(result === originFoundation).toBeFalsy();
        expect(result.cards === originFoundation.cards).toBeFalsy();

        expect(result.cards).not.toStrictEqual(originFoundation.cards);
        expect(result.suit).toStrictEqual(originFoundation.suit);
    });
    test('Putting card to foundation with cards', () => {
        const cards = [1, 2, 3];
        const result = putToFoundation({cards}, 4);

        expect(result.cards).toHaveLength(4);
        expect(result.cards).toContain(4)
    });
    test('After putting, laid card is last', () => {
        const cards = [1, 2, 3];
        const result = putToFoundation({cards}, 4);

        expect(result.cards[3]).toStrictEqual(4);
    });

    test('After putting, foundation sorting has no changes', () => {
        const cards = [1, 2, 3];
        const result = putToFoundation({cards}, 4);

        expect(result.cards).toStrictEqual([1, 2, 3, 4]);
    });
});