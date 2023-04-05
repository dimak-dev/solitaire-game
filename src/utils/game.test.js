import {initializeFoundations, pickCardsForTableauPile} from "Utils/game";

describe('Game board', () => {
    describe('Foundations', () => {

        test('Array of foundations must contain only 4 elements', () => {
            expect(initializeFoundations()).toHaveLength(4);
        });

        test('New foundations must contain piles for each suits, but suits is not set', () => {
            const suits = initializeFoundations().map(f => f.suit);

            expect(suits[0]).toBeUndefined();
            expect(suits[1]).toBeUndefined();
            expect(suits[2]).toBeUndefined();
            expect(suits[0]).toBeUndefined();
        });

        test('New foundation must contain empty array of cards', () => {
            const piles = initializeFoundations().map(f => f.cards);

            expect(piles).toHaveLength(4);

            expect(piles[0]).toBeInstanceOf(Array);
            expect(piles[1]).toBeInstanceOf(Array);
            expect(piles[2]).toBeInstanceOf(Array);
            expect(piles[3]).toBeInstanceOf(Array);

            expect(piles[0]).toHaveLength(0);
            expect(piles[1]).toHaveLength(0);
            expect(piles[2]).toHaveLength(0);
            expect(piles[3]).toHaveLength(0);
        });
    });

    describe('Picking cards to piles', () => {
        test('Function is immutable', () => {
            const packOfCards = [1, 2, 3, 4];
            pickCardsForTableauPile(packOfCards);

            expect(packOfCards).toStrictEqual([1, 2, 3, 4]);
        });

        test('There is no possibility of picking more cards than present in the pack.', () => {
            expect(() => pickCardsForTableauPile([1, 2, 3], 3))
                .toThrowError('Insufficient cards in pack.');
        });

        test('There is a possibility of picking fewer cards than present in the pack.', () => {
            expect(() => pickCardsForTableauPile([1, 2, 3], 1)).not.toThrowError();
            expect(() => pickCardsForTableauPile([1, 2, 3], 2)).not.toThrowError();
        });

        test('There is four picked cards. Three firsts must be closed, last one - open', () => {
            const {cardsInPile} = pickCardsForTableauPile([1, 2, 3, 4], 3);

            expect(cardsInPile).toBeInstanceOf(Array);
            expect(cardsInPile).toHaveLength(4);

            expect(cardsInPile[0].isOpen).toBeFalsy();
            expect(cardsInPile[1].isOpen).toBeFalsy();
            expect(cardsInPile[2].isOpen).toBeFalsy();
            expect(cardsInPile[3].isOpen).toBeTruthy();
        });

        test('There is the rest of the pack of cards after picking some cards.', () => {
            const {cardsInPile, restPackOfCard} = pickCardsForTableauPile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);

            expect(restPackOfCard).toBeInstanceOf(Array);
            expect(restPackOfCard).toHaveLength(6);

            const cards = cardsInPile.map(card => card.card);

            expect(cards).toContain(10);
            expect(cards).toContain(9);
            expect(cards).toContain(8);
            expect(cards).toContain(7);

            expect(restPackOfCard).toContain(6);
            expect(restPackOfCard).toContain(5);
            expect(restPackOfCard).toContain(4);
            expect(restPackOfCard).toContain(3);
            expect(restPackOfCard).toContain(2);
            expect(restPackOfCard).toContain(1);
        });
    });
})