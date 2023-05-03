import hasPileById from "Utils/checkers/hasPileById";
import {getTestPile} from "Tests/TestPile";

describe('checkers: hasPileById', () => {
    test('Lack of piles (empty state) returns false', () => {
        const state = {};

        expect(hasPileById(state, 'some-id')).toBeFalsy();
    });

    test('Empty foundations array returns false', () => {
        const state = {
            tableau: [],
        };

        expect(hasPileById(state, 'some-id')).toBeFalsy();
    });

    test('Wrong id returns false', () => {
        const state = {
            tableau: [
                getTestPile('test-id-1'),
                getTestPile('test-id-2'),
                getTestPile('test-id-3'),
                getTestPile('test-id-4'),
                getTestPile('test-id-5'),
                getTestPile('test-id-6'),
                getTestPile('test-id-7'),
            ],
        };
        expect(hasPileById(state, 'some-id')).toBeFalsy();
    });

    test('Correct id returns true', () => {
        const state = {
            tableau: [
                getTestPile('test-id-1'),
                getTestPile('test-id-2'),
                getTestPile('test-id-3'),
                getTestPile('test-id-4'),
                getTestPile('test-id-5'),
                getTestPile('test-id-6'),
                getTestPile('test-id-7'),
            ],
        };
        expect(hasPileById(state, 'test-id-3')).toBeTruthy();
    });
});