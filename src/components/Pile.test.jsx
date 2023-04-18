import CardPlaceholder from "Components/CardPlaceholder";
import ReverseSideOfCard from "Components/ReverseSideOfCard";
import Card from "Components/Card";
import renderer from "react-test-renderer";
import Pile from "Components/Pile";
import {fireEvent, render} from "@testing-library/react";

jest.mock('Components/CardPlaceHolder');
jest.mock('Components/Card');
jest.mock('Components/ReverseSideOfCard');


describe('Pile component', () => {
    let testPile;
    let onCardClickMock;
    let onTargetClickMock;

    beforeAll(() => {
        CardPlaceholder.mockImplementation(
            ({children, onClick}) => (
                <div className={'card-placeholder-mock'} onClick={onClick}>{children}</div>
            )
        );

        Card.mockImplementation(
            ({id, suit, value}) => (
                <div className={'card-mock'} data-testid={id}>
                    id: {id}, suit: {suit}, value: {value}
                </div>
            )
        )

        ReverseSideOfCard.mockReturnValue(
             (
                <div
                    className={'reverse-side-card-mock'}
                    data-testid="reverse-side-card"
                >
                    reverse side
                </div>
            )
        );
    });

    beforeEach(() => {
        onCardClickMock = jest.fn();
        onTargetClickMock = jest.fn();
        testPile = {
            id: 'test-pile-id',
            cards: [],
            isTarget: false,
            onCardClick: onCardClickMock,
            onTargetClick: onTargetClickMock,
        };
    });

    test('Empty pile', () => {
        testPile.cards = [];
        const tree = renderer
            .create(<Pile {...testPile}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('One opened card on pile', () => {
        const card = {id: 'test-id', suit: 'test-suit', value: 'test-value'};
        testPile.cards = [{isOpen: true, card}];

        const tree = renderer
            .create(<Pile {...testPile}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('One hidden and one opened card on pile', () => {
        const card1 = {id: 'test-card-1', suit: 'suit-1', value: 'value-1'};
        const card2 = {id: 'test-card-2', suit: 'suit-2', value: 'value-2'};
        testPile.cards = [{isOpen: false, card: card1}, {isOpen: true, card: card2}];

        const tree = renderer
            .create(<Pile {...testPile}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Pile is target', () => {
        const card1 = {id: 'test-card-1', suit: 'suit-1', value: 'value-1'};
        const card2 = {id: 'test-card-2', suit: 'suit-2', value: 'value-2'};
        testPile.cards = [{isOpen: false, card: card1}, {isOpen: true, card: card2}];
        testPile.isTarget = true;

        const tree = renderer
            .create(<Pile {...testPile}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('onClick events', () => {
        let getByTestId;
        const card1 = {id: 'test-card-1', suit: 'suit-1', value: 'value-1'};
        const card2 = {id: 'test-card-2', suit: 'suit-2', value: 'value-2'};

        beforeEach(() => {
            testPile.cards = [{isOpen: false, card: card1}, {isOpen: true, card: card2}];
            getByTestId = render(<Pile {...testPile}/>).getByTestId;
        });

        test('click on hidden card don\'t fire onClick events', () => {
            fireEvent.click(getByTestId('reverse-side-card'));

            expect(onCardClickMock).not.toHaveBeenCalled();
            expect(onTargetClickMock).not.toHaveBeenCalled();
        });

        test('click on opened card fire only onCardClick', () => {
            fireEvent.click(getByTestId('test-card-2'));
            expect(onTargetClickMock).not.toHaveBeenCalled();

            expect(onCardClickMock).toHaveBeenCalledTimes(1);
            expect(onCardClickMock).toHaveBeenCalledWith('test-pile-id', card2);
        })
    });

});