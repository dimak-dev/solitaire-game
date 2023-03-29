import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Card from './Card';
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";
import CardPlaceholder from "Components/CardPlaceholder";

test('Snapshot of CardPlaceholder Component', () => {
    const tree = renderer
        .create(<CardPlaceholder/>)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test('Snapshot of CardPlaceholder Component with Card as Children', () => {
    const tree = renderer
        .create(<CardPlaceholder><Card suit={ECardSuit.HEART} value={ECardValue.ONE}/></CardPlaceholder>)
        .toJSON();

    expect(tree).toMatchSnapshot();
});