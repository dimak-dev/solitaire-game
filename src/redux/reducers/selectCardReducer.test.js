import selectCardReducer from "Redux/reducers/selectCardReducer";
import {resetFoundationTargets, resetTableauTargets} from "Utils/resetTargets";

jest.mock('Utils/resetTargets');

describe('Select card reducer', () => {
    let state;

    beforeEach(() => {
        state = {
            selectedCard: 'garbage',
        };
    })

    test('Selected card in state', () => {
        const payload = {card: {suit: 'suit', value: 'value'}};

        selectCardReducer(state, {payload});

        expect(state.selectedCard).toHaveProperty('card');
        expect(state.selectedCard.card).toStrictEqual({suit: 'suit', value: 'value'});
    });

    test('Selected card in state when selected card is empty', () => {
        state.selectedCard = null;
        const payload = {card: {suit: 'suit', value: 'value'}};

        selectCardReducer(state, {payload});

        expect(state.selectedCard).toHaveProperty('card');
        expect(state.selectedCard.card).toStrictEqual({suit: 'suit', value: 'value'});
    });

    test('Select another card when previous card is selected', () => {
        state.selectedCard = {card: {suit: 'suit1', value: 'value1'}};
        const payload = {card: {suit: 'suit', value: 'value'}};

        selectCardReducer(state, {payload});

        expect(state.selectedCard).toHaveProperty('card');
        expect(state.selectedCard.card).toStrictEqual({suit: 'suit', value: 'value'});
    });

    test('Reset selected card when player attempt select this card again', () => {
        state.selectedCard = {card: {id: 'test-card-id'}};

        selectCardReducer(state, {payload: state.selectedCard});

        expect(state.selectedCard).toBeNull();

        expect(resetFoundationTargets).toHaveBeenCalledWith(state);
        expect(resetTableauTargets).toHaveBeenCalledWith(state);
    });
});