import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";
import {findCurrentPosition} from "Utils/findPositions";
import {EGameBoardPart} from "Types/EGameBoardPart";

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
            tableau: [
                {id: 'test-pile-1', cards: []},
                {id: 'test-pile-2', cards: []},
                {id: 'test-pile-3', cards: []},
                {id: 'test-pile-4', cards: []},
                {id: 'test-pile-5', cards: []},
                {id: 'test-pile-6', cards: []},
                {id: 'test-pile-7', cards: []},
            ],
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

            state.tableau[0].cards.push({isOpen: false, card: hiddenCard}, {isOpen: true, card: openedCard});

            expect(() => findCurrentPosition(state, hiddenCard)).toThrow(/restricted/i)
        });

        test('Selected card is one from the bottom on talon', () => {
            const lastCard: ICard = {suit: ECardSuit.SPADE, value: ECardValue.FIVE};
            const oneFromTheBottomCard: ICard = {suit: ECardSuit.HEART, value: ECardValue.QUEEN};

            state.talon.push(oneFromTheBottomCard, lastCard);

            expect(() => findCurrentPosition(state, oneFromTheBottomCard)).toThrow(/restricted/i)
        });

        test('Selected card is one from the bottom on foundation', () => {
            const lastCard: ICard = {suit: ECardSuit.SPADE, value: ECardValue.FIVE};
            const oneFromTheBottomCard: ICard = {suit: ECardSuit.HEART, value: ECardValue.QUEEN};

            state.foundations[0].cards.push(oneFromTheBottomCard, lastCard);

            expect(() => findCurrentPosition(state, oneFromTheBottomCard)).toThrow(/restricted/i)
        });

        test('Selected card is the last on talon', () => {
            const lastCard: ICard = {suit: ECardSuit.SPADE, value: ECardValue.FIVE};

            state.talon.push(lastCard, lastCard);

            expect(findCurrentPosition(state, lastCard)).toStrictEqual({position: EGameBoardPart.TALON});
        });

        test('Selected card is the last on foundation', () => {
            const lastCard: ICard = {suit: ECardSuit.SPADE, value: ECardValue.FIVE};

            state.foundations[0].suit = lastCard.suit;
            state.foundations[0].cards.push(lastCard);

            expect(findCurrentPosition(state, lastCard)).toStrictEqual({
                position: EGameBoardPart.FOUNDATIONS,
                foundationId: 'test-foundation-1'
            });
        });

        test('Selected card is the last on another foundation', () => {
            const lastCard: ICard = {suit: ECardSuit.SPADE, value: ECardValue.FIVE};

            state.foundations[2].suit = lastCard.suit;
            state.foundations[2].cards.push(lastCard);

            expect(findCurrentPosition(state, lastCard)).toStrictEqual({
                position: EGameBoardPart.FOUNDATIONS,
                foundationId: 'test-foundation-3'
            });
        });

        test('Selected card is last on first pile on tableau', () => {
            const lastCard: ICard = {suit: ECardSuit.SPADE, value: ECardValue.FIVE};

            state.tableau[0].cards.push({isOpen: true, card: lastCard});
            expect(findCurrentPosition(state, lastCard)).toStrictEqual({
                position: EGameBoardPart.TABLEAU,
                pileId: 'test-pile-1'
            });
        });

        test('Selected card is last on third pile on tableau, first is not empty', () => {
            const lastCard: ICard = {suit: ECardSuit.SPADE, value: ECardValue.FIVE};

            state.tableau[0].cards.push({isOpen: true, card: {suit: ECardSuit.SPADE, value: ECardValue.QUEEN}});
            state.tableau[2].cards.push({isOpen: true, card: lastCard});
            expect(findCurrentPosition(state, lastCard)).toStrictEqual({
                position: EGameBoardPart.TABLEAU,
                pileId: 'test-pile-3'
            });
        });

        test('Selected card is third on second pile what contains 5 opened cards', () => {
            const selectedCards: ICard = {suit: ECardSuit.SPADE, value: ECardValue.FIVE};

            state.tableau[1].cards.push(
                {isOpen: true, card: {suit: ECardSuit.SPADE, value: ECardValue.QUEEN}},
                {isOpen: true, card: {suit: ECardSuit.DIAMOND, value: ECardValue.SIX}},
                {isOpen: true, card: selectedCards},
                {isOpen: true, card: {suit: ECardSuit.DIAMOND, value: ECardValue.JACK}},
                {isOpen: true, card: {suit: ECardSuit.HEART, value: ECardValue.EIGHT}},
            );

            expect(findCurrentPosition(state, selectedCards)).toStrictEqual({
                position: EGameBoardPart.TABLEAU,
                pileId: 'test-pile-2',
            })

        })


    });


});