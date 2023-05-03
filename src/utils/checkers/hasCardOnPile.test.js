import hasCardOnPile from "Utils/checkers/hasCardOnPile";

describe('checkers: hasCardOnPile', () => {
    test('Empty pile returns false', () => {
        expect(hasCardOnPile({cards: []})).toBeFalsy();
    });

    test('Wrong id returns false', () => {
        const cards = [
            {isOpen: true, card: {id: 'test-card-1'}},
            {isOpen: true, card: {id: 'test-card-2'}},
        ];
        expect(hasCardOnPile({cards}, 'wrong-id')).toBeFalsy();
    });

    test('Correct id of opened card with filter returns true', () => {
        const cards = [
            {isOpen: true, card: {id: 'test-card-3'}},
            {isOpen: true, card: {id: 'test-card-5'}},
        ];
        expect(hasCardOnPile({cards}, 'test-card-5', true)).toBeTruthy();
    });

    test('Correct id of hidden card without filter returns false', () => {
        const cards = [
            {isOpen: false, card: {id: 'test-card-3'}},
            {isOpen: true, card: {id: 'test-card-5'}},
        ];
        expect(hasCardOnPile({cards}, 'test-card-3', false)).toBeTruthy();
    });

    test('Correct id of hidden card with filter returns false', () => {
        const cards = [
            {isOpen: false, card: {id: 'test-card-3'}},
            {isOpen: true, card: {id: 'test-card-5'}},
        ];
        expect(hasCardOnPile({cards}, 'test-card-3', true)).toBeFalsy();
    });
});