import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Card from './Card';
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";

test('Snapshot of Card Component', () => {
    const suits = [
        ECardSuit.CLUB,
        ECardSuit.SPADE,
        ECardSuit.HEART,
        ECardSuit.DIAMOND,
    ];

    const values = [
        ECardValue.ACE,
        ECardValue.ONE,
        ECardValue.TWO,
        ECardValue.THREE,
        ECardValue.FOUR,
        ECardValue.FIVE,
        ECardValue.SIX,
        ECardValue.SEVEN,
        ECardValue.EIGHT,
        ECardValue.NINE,
        ECardValue.JACK,
        ECardValue.QUEEN,
        ECardValue.KING,
    ];

    suits.forEach(suit => {
       values.forEach(value => {
           const tree = renderer
               .create(<Card suit={suit} value={value}/>)
               .toJSON();
           expect(tree).toMatchSnapshot();
       });
    });
});