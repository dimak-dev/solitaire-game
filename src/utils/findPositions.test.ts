import {IGameBoard} from "Types/IGameBoard";
import {ICard} from "Types/ICard";
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";
import {findCurrentPosition, findTargetPositions} from "Utils/findPositions";
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

    describe('Find target positions', () => {
        describe('KING can occupy all empty piles on tableau', () => {
            let targetPositions: any[];

            beforeEach(() => {
                targetPositions = [];
            });

            afterEach(() => {
                const targetPiles = targetPositions
                    .map(target => target.position === EGameBoardPart.TABLEAU && target.pileId);

                expect(targetPiles).toHaveLength(7);
                expect(targetPiles).toContain('test-pile-1');
                expect(targetPiles).toContain('test-pile-2');
                expect(targetPiles).toContain('test-pile-3');
                expect(targetPiles).toContain('test-pile-4');
                expect(targetPiles).toContain('test-pile-5');
                expect(targetPiles).toContain('test-pile-6');
                expect(targetPiles).toContain('test-pile-7');
            });

            test('DIAMOND KING', () => {
                targetPositions = findTargetPositions(state, {suit: ECardSuit.DIAMOND, value: ECardValue.KING});
            });

            test('HEART KING', () => {
                targetPositions = findTargetPositions(state, {suit: ECardSuit.HEART, value: ECardValue.KING});
            });

            test('SPADE KING', () => {
                targetPositions = findTargetPositions(state, {suit: ECardSuit.SPADE, value: ECardValue.KING});
            });

            test('CLUB KING', () => {
                targetPositions = findTargetPositions(state, {suit: ECardSuit.CLUB, value: ECardValue.KING});
            });
        });

        test('KING can\'t occupy already occupied pile by other card', () => {
            const kingCard: ICard = {suit: ECardSuit.SPADE, value: ECardValue.KING};
            state.tableau[2].cards.push({isOpen: true, card: {suit: ECardSuit.CLUB, value: ECardValue.FIVE}});

            const piles = findTargetPositions(state, kingCard)
                .map(target => target.position === EGameBoardPart.TABLEAU && target.pileId);

            expect(piles).not.toContain('test-foundation-3');
        });

        test('KING can occupy only foundation with same suit and the last card in foundation is QUEEN', () => {
            const kingCard: ICard = {suit: ECardSuit.HEART, value: ECardValue.KING};

            state.foundations[1].suit = ECardSuit.HEART;
            state.foundations[1].cards.push({suit: ECardSuit.HEART, value: ECardValue.QUEEN});

            const foundations = findTargetPositions(state, kingCard)
                .filter(({position}) => position === EGameBoardPart.FOUNDATIONS)
                .map(target => target.position === EGameBoardPart.FOUNDATIONS && target.foundationId); // ts can`t cast types after array.filter

            expect(foundations).toHaveLength(1);
            expect(foundations).toContain('test-foundation-2');
        });

        test('KING can\'t occupy foundation if all foundation occupied by other cards (= not QUEEN)', () => {
            const kingCard: ICard = {suit: ECardSuit.HEART, value: ECardValue.KING};

            state.foundations[0].suit = ECardSuit.HEART;
            state.foundations[0].cards.push({suit: ECardSuit.HEART, value: ECardValue.SIX});
            state.foundations[1].suit = ECardSuit.CLUB;
            state.foundations[1].cards.push({suit: ECardSuit.CLUB, value: ECardValue.ACE});
            state.foundations[2].suit = ECardSuit.SPADE;
            state.foundations[2].cards.push({suit: ECardSuit.SPADE, value: ECardValue.JACK});
            state.foundations[3].suit = ECardSuit.DIAMOND;
            state.foundations[3].cards.push({suit: ECardSuit.DIAMOND, value: ECardValue.EIGHT});

            const foundations = findTargetPositions(state, kingCard)
                .filter(({position}) => position === EGameBoardPart.FOUNDATIONS)
                .map(target => target.position === EGameBoardPart.FOUNDATIONS && target.foundationId);

            expect(foundations).toHaveLength(0);
        });

        test('THREE SPADE can occupy only foundation what contains TWO SPADE', () => {
            const card: ICard = {suit: ECardSuit.SPADE, value: ECardValue.THREE};
            state.foundations[1].suit = ECardSuit.DIAMOND;
            state.foundations[1].cards.push({suit: ECardSuit.DIAMOND, value: ECardValue.TWO});
            state.foundations[2].suit = ECardSuit.SPADE;
            state.foundations[2].cards.push({suit: ECardSuit.SPADE, value: ECardValue.TWO});

            const targets = findTargetPositions(state, card);

            expect(targets).toHaveLength(1);
            expect(targets[0]).toHaveProperty('position', EGameBoardPart.FOUNDATIONS);
            expect(targets[0]).toHaveProperty('foundationId', 'test-foundation-3');
        });

        test('ACE can occupy all empty foundations', () => {
            const card: ICard = {suit: ECardSuit.SPADE, value: ECardValue.ACE};

            const foundationsIds = findTargetPositions(state, card)
                .filter(target => target.position == EGameBoardPart.FOUNDATIONS)
                .map(target => target.position == EGameBoardPart.FOUNDATIONS && target.foundationId);

            expect(foundationsIds).toHaveLength(4);
            expect(foundationsIds).toContain('test-foundation-1');
            expect(foundationsIds).toContain('test-foundation-2');
            expect(foundationsIds).toContain('test-foundation-3');
            expect(foundationsIds).toContain('test-foundation-4');
        });

        test('Black ACE can occupy two piles with Red ONE', () => {
            const card: ICard = {suit: ECardSuit.SPADE, value: ECardValue.ACE};

            state.tableau[2].cards.push({isOpen: true, card: {suit: ECardSuit.DIAMOND, value: ECardValue.ONE}});
            state.tableau[3].cards.push({isOpen: true, card: {suit: ECardSuit.SPADE, value: ECardValue.ONE}});
            state.tableau[4].cards.push({isOpen: true, card: {suit: ECardSuit.HEART, value: ECardValue.ONE}});
            state.tableau[5].cards.push({isOpen: true, card: {suit: ECardSuit.CLUB, value: ECardValue.ONE}});

            const pilesIds = findTargetPositions(state, card)
                .filter(target => target.position == EGameBoardPart.TABLEAU)
                .map(target => target.position == EGameBoardPart.TABLEAU && target.pileId);

            expect(pilesIds).toHaveLength(2);
            expect(pilesIds).toContain('test-pile-3');
            expect(pilesIds).toContain('test-pile-5');
        });

        test('Red SEVEN can occupy two piles with Black EIGHT', () => {
            const card: ICard = {suit: ECardSuit.DIAMOND, value: ECardValue.SEVEN};

            state.tableau[2].cards.push({isOpen: true, card: {suit: ECardSuit.DIAMOND, value: ECardValue.EIGHT}});
            state.tableau[3].cards.push({isOpen: true, card: {suit: ECardSuit.SPADE, value: ECardValue.EIGHT}});
            state.tableau[4].cards.push({isOpen: true, card: {suit: ECardSuit.HEART, value: ECardValue.EIGHT}});
            state.tableau[5].cards.push({isOpen: true, card: {suit: ECardSuit.CLUB, value: ECardValue.EIGHT}});

            const pilesIds = findTargetPositions(state, card)
                .filter(target => target.position == EGameBoardPart.TABLEAU)
                .map(target => target.position == EGameBoardPart.TABLEAU && target.pileId);

            expect(pilesIds).toHaveLength(2);
            expect(pilesIds).toContain('test-pile-4');
            expect(pilesIds).toContain('test-pile-6');
        });
    });
});