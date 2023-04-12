import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";
import {findCurrentPosition} from "Utils/findPositions";

describe('Find positions of selected card', function () {
    let state: IGameBoard;

    beforeEach(() => {
        state = {
            foundations: [
                {id: 'test-foundation-1', cards: []},
                {id: 'test-foundation-2', cards: []},
                {id: 'test-foundation-3', cards: []},
                {id: 'test-foundation-4', cards: []},
            ],
            tableau: [],
            talon: [],
            stock: [],
        };
    })

    describe('Find current position', function () {
        test('Selected card is placed in stock', () => {
            const card: ICard = {suit: ECardSuit.SPADE, value: ECardValue.ACE};

            state.stock.push(card);

            expect(() => findCurrentPosition(state, card)).toThrow(/restricted/i)
        });

        test('Selected card is hidden in tableau', () => {
            const hiddenCard: ICard = {suit: ECardSuit.SPADE, value: ECardValue.ONE};
            const openedCard: ICard = {suit: ECardSuit.DIAMOND, value: ECardValue.ONE};

            state.tableau.push({
                id: 'test-pile-1',
                cards: [{isOpen: false, card: hiddenCard}, {isOpen: true, card: openedCard}],
            })

            expect(() => findCurrentPosition(state, hiddenCard)).toThrow(/restricted/i)
        });

        test('Selected card is one from the bottom on talon', () => {
            const lastCard: ICard = {suit: ECardSuit.SPADE, value: ECardValue.FIVE};
            const oneFromTheBottomCard: ICard = {suit: ECardSuit.HEART, value: ECardValue.QUEEN};

            state.talon.push(oneFromTheBottomCard, lastCard);

            expect(() => findCurrentPosition(state, oneFromTheBottomCard)).toThrow(/restricted/i)
        });
    });


});