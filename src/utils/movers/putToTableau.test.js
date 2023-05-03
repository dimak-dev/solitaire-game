import putToTableau from "Utils/movers/putToTableau";

describe('Put selected cards to pile on tableau', () => {
    test('Immutability', () => {
        const originCards = [1, 2, 3]
        const originPile = {cards: originCards};

        const pile = putToTableau(originPile, [4, 5, 6]);

        expect(pile === originPile).toBeFalsy();
        expect(originCards === pile.cards).toBeFalsy();
        expect(originCards).toStrictEqual([1, 2, 3]);
    });

    test('Empty pile add new card', () => {
        const pile = {cards: []};
        const cards = [1];

        const cardsOnTableau = putToTableau(pile, cards).cards.map(({card}) => card);

        expect(cardsOnTableau).toContain(1);
    });

    test('Putting card to pile with cards', () => {
        const cardsOnPile = [
            {isOpen: false, card: 1},
            {isOpen: true, card: 2},
        ];
        const pile = putToTableau({cards: cardsOnPile}, [3]);

        expect(pile.cards).toHaveLength(3);

        expect(pile.cards.some(({card}) => card === 3)).toBeTruthy();
    });

    test('After putting, laid card is open', () => {
        const cardsOnPile = [
            {isOpen: false, card: 1},
            {isOpen: true, card: 2},
        ];

        const pile = putToTableau({cards: cardsOnPile}, [3]);
        const cardOnPile = pile.cards.find(({card}) => card === 3);

        expect(cardOnPile).toHaveProperty('isOpen');
        expect(cardOnPile.isOpen).toBeTruthy();
    });

    test('After putting, laid card is last', () => {
        const cardsOnPile = [
            {isOpen: false, card: 1},
            {isOpen: true, card: 2},
        ];

        const pile = putToTableau({cards: cardsOnPile}, [5]);

        expect(pile.cards[2].card).toStrictEqual(5);
    });

    test('After putting, laid cards is last', () => {
        const cardsOnPile = [
            {isOpen: false, card: 1},
            {isOpen: true, card: 2},
        ];

        const pile = putToTableau({cards: cardsOnPile}, [5, 6, 7]);

        expect(pile.cards[2].card).toStrictEqual(5);
        expect(pile.cards[3].card).toStrictEqual(6);
        expect(pile.cards[4].card).toStrictEqual(7);
    });

    test('After putting one cards, pile sorting has no changes', () => {
        const cardsOnPile = [
            {isOpen: false, card: 1},
            {isOpen: false, card: 2},
            {isOpen: true, card: 3},
        ];

        const pile = putToTableau({cards: cardsOnPile}, [7, 8, 9]);

        expect(pile.cards[0].isOpen).toBeFalsy();
        expect(pile.cards[0].card).toStrictEqual(1);
        expect(pile.cards[1].isOpen).toBeFalsy();
        expect(pile.cards[1].card).toStrictEqual(2);
        expect(pile.cards[2].isOpen).toBeTruthy();
        expect(pile.cards[2].card).toStrictEqual(3);
    });

});