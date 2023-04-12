import {ECardValue} from "Types/ECardValue";
import {nextByPriority, prevByPriority} from "Utils/prevOnNextCardValue";

describe('Sorting by priority', () => {
    describe('Next value by priority', () => {
        test('Next after ACE is ONE', () => {
            expect(nextByPriority(ECardValue.ACE)).toEqual(ECardValue.ONE);
        });

        test('Next after ONE is TWO', () => {
            expect(nextByPriority(ECardValue.ONE)).toEqual(ECardValue.TWO);
        });

        test('Next after TWO is THREE', () => {
            expect(nextByPriority(ECardValue.TWO)).toEqual(ECardValue.THREE);
        });

        test('Next after THREE is FOUR', () => {
            expect(nextByPriority(ECardValue.THREE)).toEqual(ECardValue.FOUR);
        });

        test('Next after FOUR is FIVE', () => {
            expect(nextByPriority(ECardValue.FOUR)).toEqual(ECardValue.FIVE);
        });

        test('Next after FIVE is SIX', () => {
            expect(nextByPriority(ECardValue.FIVE)).toEqual(ECardValue.SIX);
        });

        test('Next after SIX is SEVEN', () => {
            expect(nextByPriority(ECardValue.SIX)).toEqual(ECardValue.SEVEN);
        });

        test('Next after SEVEN is EIGHT', () => {
            expect(nextByPriority(ECardValue.SEVEN)).toEqual(ECardValue.EIGHT);
        });

        test('Next after EIGHT is NINE', () => {
            expect(nextByPriority(ECardValue.EIGHT)).toEqual(ECardValue.NINE);
        });

        test('Next after NINE is JACK', () => {
            expect(nextByPriority(ECardValue.NINE)).toEqual(ECardValue.JACK);
        });

        test('Next after JACK is QUEEN', () => {
            expect(nextByPriority(ECardValue.JACK)).toEqual(ECardValue.QUEEN);
        });

        test('Next after QUEEN is KING', () => {
            expect(nextByPriority(ECardValue.QUEEN)).toEqual(ECardValue.KING);
        });

        test('Next after KING is _null_', () => {
            expect(nextByPriority(ECardValue.KING)).toBeNull();
        });
    });

    describe('Previous before by priority', () => {
        test('Previous before ACE is _null_', () => {
            expect(prevByPriority(ECardValue.ACE)).toBeNull();
        });
        test('Previous before ONE is ACE', () => {
            expect(prevByPriority(ECardValue.ONE)).toEqual(ECardValue.ACE);
        });

        test('Previous before TWO is ONE', () => {
            expect(prevByPriority(ECardValue.TWO)).toEqual(ECardValue.ONE);
        });

        test('Previous before THREE is TWO', () => {
            expect(prevByPriority(ECardValue.THREE)).toEqual(ECardValue.TWO);
        });

        test('Previous before FOUR is THREE', () => {
            expect(prevByPriority(ECardValue.FOUR)).toEqual(ECardValue.THREE);
        });

        test('Previous before FIVE is FOUR', () => {
            expect(prevByPriority(ECardValue.FIVE)).toEqual(ECardValue.FOUR);
        });

        test('Previous before SIX is FIVE', () => {
            expect(prevByPriority(ECardValue.SIX)).toEqual(ECardValue.FIVE);
        });

        test('Previous before SEVEN is SIX', () => {
            expect(prevByPriority(ECardValue.SEVEN)).toEqual(ECardValue.SIX);
        });

        test('Previous before EIGHT is SEVEN', () => {
            expect(prevByPriority(ECardValue.EIGHT)).toEqual(ECardValue.SEVEN);
        });

        test('Previous before NINE is EIGHT', () => {
            expect(prevByPriority(ECardValue.NINE)).toEqual(ECardValue.EIGHT);
        });

        test('Previous before JACK is NINE', () => {
            expect(prevByPriority(ECardValue.JACK)).toEqual(ECardValue.NINE);
        });

        test('Previous before QUEEN is JACK', () => {
            expect(prevByPriority(ECardValue.QUEEN)).toEqual(ECardValue.JACK);
        });

        test('Previous before KING is QUEEN', () => {
            expect(prevByPriority(ECardValue.KING)).toEqual(ECardValue.QUEEN);
        });
    });
});