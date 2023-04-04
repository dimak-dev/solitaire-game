import {initializePackOfCards, initializeShuffledPackOfCards} from "Utils/packOfCards";
import * as assert from "assert";
import {ECardValue} from "Types/ECardValue";
import {ECardSuit} from "Types/ECardSuit";

describe('A pack of cards', function () {
    test('A pack of sorted cards is array of 52 cards', () => {
        const pack = initializePackOfCards();
        expect(pack).toBeInstanceOf(Array);
        expect(pack).toHaveLength(52);

        const card = pack[0];
        expect(card).toHaveProperty('suit');
        expect(card).toHaveProperty('value');
    });

    test('A pack of shuffled cards is array of 52 cards', () => {
        const pack = initializeShuffledPackOfCards();
        expect(pack).toBeInstanceOf(Array);
        expect(pack).toHaveLength(52);

        const card = pack[0];
        expect(card).toHaveProperty('suit');
        expect(card).toHaveProperty('value');
    });

    test('Initialized pack of card contains all of the cards, the cards are sorted', () => {
        const cards = initializePackOfCards();

        // ACE
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.ACE && suit === ECardSuit.CLUB), 0);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.ACE && suit === ECardSuit.SPADE), 1);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.ACE && suit === ECardSuit.HEART), 2);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.ACE && suit === ECardSuit.DIAMOND), 3);

        // ONE
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.ONE && suit === ECardSuit.CLUB), 4);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.ONE && suit === ECardSuit.SPADE), 5);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.ONE && suit === ECardSuit.HEART), 6);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.ONE && suit === ECardSuit.DIAMOND), 7);

        // TWO
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.TWO && suit === ECardSuit.CLUB), 8);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.TWO && suit === ECardSuit.SPADE), 9);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.TWO && suit === ECardSuit.HEART), 10);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.TWO && suit === ECardSuit.DIAMOND), 11);

        // THREE
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.THREE && suit === ECardSuit.CLUB), 12);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.THREE && suit === ECardSuit.SPADE), 13);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.THREE && suit === ECardSuit.HEART), 14);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.THREE && suit === ECardSuit.DIAMOND), 15);

        // FOUR
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.FOUR && suit === ECardSuit.CLUB), 16);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.FOUR && suit === ECardSuit.SPADE), 17);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.FOUR && suit === ECardSuit.HEART), 18);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.FOUR && suit === ECardSuit.DIAMOND), 19);

        // FIVE
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.FIVE && suit === ECardSuit.CLUB), 20);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.FIVE && suit === ECardSuit.SPADE), 21);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.FIVE && suit === ECardSuit.HEART), 22);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.FIVE && suit === ECardSuit.DIAMOND), 23);

        // SIX
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.SIX && suit === ECardSuit.CLUB), 24);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.SIX && suit === ECardSuit.SPADE), 25);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.SIX && suit === ECardSuit.HEART), 26);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.SIX && suit === ECardSuit.DIAMOND), 27);

        // SEVEN
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.SEVEN && suit === ECardSuit.CLUB), 28);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.SEVEN && suit === ECardSuit.SPADE), 29);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.SEVEN && suit === ECardSuit.HEART), 30);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.SEVEN && suit === ECardSuit.DIAMOND), 31);

        // EIGHT
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.EIGHT && suit === ECardSuit.CLUB), 32);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.EIGHT && suit === ECardSuit.SPADE), 33);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.EIGHT && suit === ECardSuit.HEART), 34);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.EIGHT && suit === ECardSuit.DIAMOND), 35);

        // NINE
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.NINE && suit === ECardSuit.CLUB), 36);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.NINE && suit === ECardSuit.SPADE), 37);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.NINE && suit === ECardSuit.HEART), 38);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.NINE && suit === ECardSuit.DIAMOND), 39);

        // JACK
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.JACK && suit === ECardSuit.CLUB), 40);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.JACK && suit === ECardSuit.SPADE), 41);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.JACK && suit === ECardSuit.HEART), 42);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.JACK && suit === ECardSuit.DIAMOND), 43);

        // QUEEN
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.QUEEN && suit === ECardSuit.CLUB), 44);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.QUEEN && suit === ECardSuit.SPADE), 45);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.QUEEN && suit === ECardSuit.HEART), 46);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.QUEEN && suit === ECardSuit.DIAMOND), 47);

        // KING
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.KING && suit === ECardSuit.CLUB), 48);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.KING && suit === ECardSuit.SPADE), 49);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.KING && suit === ECardSuit.HEART), 50);
        assert.equal(cards.findIndex(({value, suit}) => value === ECardValue.KING && suit === ECardSuit.DIAMOND), 51);
    });

    it('A shuffled pack of cards must contain all of the cards', () => {
        const firstShuffledPack = initializeShuffledPackOfCards();
        const secondShuffledPack = initializeShuffledPackOfCards();

        expect(firstShuffledPack).toContainEqual({value: ECardValue.ACE, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.ACE, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.ACE, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.ACE, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.ACE, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.ACE, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.ACE, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.ACE, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.ONE, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.ONE, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.ONE, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.ONE, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.ONE, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.ONE, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.ONE, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.ONE, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.TWO, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.TWO, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.TWO, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.TWO, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.TWO, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.TWO, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.TWO, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.TWO, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.THREE, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.THREE, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.THREE, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.THREE, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.THREE, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.THREE, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.THREE, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.THREE, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.FOUR, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.FOUR, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.FOUR, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.FOUR, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.FOUR, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.FOUR, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.FOUR, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.FOUR, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.FIVE, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.FIVE, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.FIVE, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.FIVE, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.FIVE, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.FIVE, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.FIVE, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.FIVE, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.SIX, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.SIX, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.SIX, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.SIX, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.SIX, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.SIX, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.SIX, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.SIX, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.SEVEN, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.SEVEN, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.SEVEN, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.SEVEN, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.SEVEN, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.SEVEN, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.SEVEN, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.SEVEN, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.EIGHT, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.EIGHT, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.EIGHT, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.EIGHT, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.EIGHT, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.EIGHT, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.EIGHT, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.EIGHT, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.NINE, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.NINE, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.NINE, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.NINE, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.NINE, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.NINE, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.NINE, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.NINE, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.JACK, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.JACK, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.JACK, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.JACK, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.JACK, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.JACK, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.JACK, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.JACK, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.QUEEN, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.QUEEN, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.QUEEN, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.QUEEN, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.QUEEN, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.QUEEN, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.QUEEN, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.QUEEN, suit: ECardSuit.DIAMOND});

        expect(firstShuffledPack).toContainEqual({value: ECardValue.KING, suit: ECardSuit.CLUB});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.KING, suit: ECardSuit.CLUB});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.KING, suit: ECardSuit.SPADE});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.KING, suit: ECardSuit.SPADE});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.KING, suit: ECardSuit.HEART});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.KING, suit: ECardSuit.HEART});
        expect(firstShuffledPack).toContainEqual({value: ECardValue.KING, suit: ECardSuit.DIAMOND});
        expect(secondShuffledPack).toContainEqual({value: ECardValue.KING, suit: ECardSuit.DIAMOND});
    })
});