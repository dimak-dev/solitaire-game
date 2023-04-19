import {IFoundation, IGameBoard} from "Types/IGameBoard";
import {ECardValue} from "Types/ECardValue";
import {ECardSuit} from "Types/ECardSuit";
import {ICard} from "Types/ICard";
import {autoMoveCardReducer} from "Redux/reducers/autoMoveCardReducer";

const emptyFoundation = (): [IFoundation, IFoundation, IFoundation, IFoundation] => ([
    {id: 'id-1', cards: [], isTarget: false},
    {id: 'id-2', cards: [], isTarget: false},
    {id: 'id-3', cards: [], isTarget: false},
    {id: 'id-4', cards: [], isTarget: false}
]);

const createCard = (value: ECardValue, suit: ECardSuit): ICard => ({
    value,
    suit,
    id: 'test-id'
})

describe.skip('Moving selected card to foundation/tableau from talon (Reducer)', () => {
    let state: IGameBoard;

    beforeEach(() => {
        state = {
            foundations: emptyFoundation(),
            talon: [],
            tableau: [],
            stock: [],
        }
    })

    describe('Player click on ACE in Talon', () => {
        describe('First empty (from left to right) acquires the ACE suit', () => {
            test('All foundation is Empty. Player click on SPADE ACE', () => {
                const card = createCard(ECardValue.ACE, ECardSuit.SPADE);
                state.talon = [card];
                autoMoveCardReducer(state, {card});

                expect(state.foundations[0].suit).toEqual(ECardSuit.SPADE);
            });

            test('All foundation is Empty. Player click on DIAMOND ACE', () => {
                const card = createCard(ECardValue.ACE, ECardSuit.DIAMOND);
                state.talon = [card];
                autoMoveCardReducer(state, {card});

                expect(state.foundations[0].suit).toEqual(ECardSuit.DIAMOND);
            });

            test('Some foundations is occupied by others suits', () => {
                state.foundations[0].suit = ECardSuit.SPADE;
                state.foundations[1].suit = ECardSuit.HEART;

                const card = createCard(ECardValue.ACE, ECardSuit.DIAMOND);
                state.talon = [card];
                autoMoveCardReducer(state, {card});

                expect(state.foundations[0].suit).toEqual(ECardSuit.SPADE);
                expect(state.foundations[1].suit).toEqual(ECardSuit.HEART);
                expect(state.foundations[2].suit).toEqual(ECardSuit.DIAMOND);
            });
        })

        describe('All foundations is empty', () => {
            beforeEach(() => {
                state.foundations = emptyFoundation();
            });

            test('Talon has only one card: SPADE ACE', () => {
                const card = createCard(ECardValue.ACE, ECardSuit.SPADE);
                state.talon = [card];
                autoMoveCardReducer(state, {card});

                expect(state.talon).toBeInstanceOf(Array);
                expect(state.talon).toHaveLength(0);

                expect(state.foundations[0].cards).toBeInstanceOf(Array);
                expect(state.foundations[0].cards).toHaveLength(1);
                expect(state.foundations[0].suit).toEqual(null)
            })
        })
    })
});