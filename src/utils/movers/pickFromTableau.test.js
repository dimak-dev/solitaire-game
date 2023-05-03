import hasCardOnPile from "Utils/checkers/hasCardOnPile";
import pickFromTableau from "Utils/movers/pickFromTableau";

jest.mock('Utils/checkers/hasCardOnPile');

describe('Movers: pickCardsFromTableau', function () {
    beforeEach(() => {
        hasCardOnPile.mockReturnValue(true);
    });

    afterEach(() => {
        hasCardOnPile.mockReset();
    });

    test('Wrong card on pile throws error', () => {
        hasCardOnPile.mockReturnValue(false);
        const fn = () => pickFromTableau({});

        expect(fn).toThrowError(/card is not present on pile/i)
    });

    test('Immutability', () => {
        const originPile = {
            id: 'test-pile-1',
            cards: [
                {card: {id: 'test-card-1'}},
                {card: {id: 'test-card-2'}}
            ],
        }

        pickFromTableau(originPile, 'test-card-1');

        expect(originPile.id).toStrictEqual('test-pile-1');
        expect(originPile.cards).toHaveLength(2);
        expect(originPile.cards[0]).toStrictEqual({card: {id: 'test-card-1'}});
        expect(originPile.cards[1]).toStrictEqual({card: {id: 'test-card-2'}});
    });

    test('Pile is empty after picking last card', () => {
        const cards = [
            {card: {id: 'test-card-1'}},
        ];

        const result = pickFromTableau({cards}, 'test-card-1');

        expect(result).toHaveProperty('restOfCardsOnPile');
        expect(result.restOfCardsOnPile).toHaveLength(0);
    });

    test('Pile is empty after picking last three cards', () => {
        const cards = [
            {card: {id: 'test-card-1'}},
            {card: {id: 'test-card-2'}},
            {card: {id: 'test-card-3'}},
        ];

        const result = pickFromTableau({cards}, 'test-card-1');

        expect(result).toHaveProperty('restOfCardsOnPile');
        expect(result.restOfCardsOnPile).toHaveLength(0);
    });

    test('Picked card from pile with only one card', () => {
        const cards = [
            {card: {id: 'test-card-1'}},
        ];

        const result = pickFromTableau({cards}, 'test-card-1');

        expect(result).toHaveProperty('pickedCards');
        expect(result.pickedCards).toHaveLength(1);
        expect(result.pickedCards[0]).toStrictEqual({id: 'test-card-1'});
    });

    test('Picked cards from pile with three cards', () => {
        const cards = [
            {card: {id: 'test-card-1'}},
            {card: {id: 'test-card-2'}},
            {card: {id: 'test-card-3'}},
        ];

        const result = pickFromTableau({cards}, 'test-card-1');

        expect(result.pickedCards).toHaveLength(3);
        expect(result.pickedCards[0]).toStrictEqual({id: 'test-card-1'});
        expect(result.pickedCards[1]).toStrictEqual({id: 'test-card-2'});
        expect(result.pickedCards[2]).toStrictEqual({id: 'test-card-3'});
    });

    test('Picked cards from middle of pile with three cards', () => {
        const cards = [
            {card: {id: 'test-card-1'}},
            {card: {id: 'test-card-2'}},
            {card: {id: 'test-card-3'}},
        ];

        const result = pickFromTableau({cards}, 'test-card-2');

        expect(result.restOfCardsOnPile).toHaveLength(1);
        expect(result.pickedCards).toHaveLength(2);
    });

    test('Last hidden card will be opened.', () => {
        const cards = [
            {card: {id: 'test-card-1'}, isOpen: false},
            {card: {id: 'test-card-2'}, isOpen: true},
            {card: {id: 'test-card-3'}, isOpen: true},
        ];

        const result = pickFromTableau({cards}, 'test-card-2');
        expect(result.restOfCardsOnPile[0]).toHaveProperty('isOpen');
        expect(result.restOfCardsOnPile[0].isOpen).toStrictEqual(true);
    });

});