import hasFoundationById from "Utils/checkers/hasFoundationById";
import {getTestFoundation} from "Tests/TestFoundation";

describe('checkers: hasFoundationById', () => {
    test('Lack of foundations (empty state) returns false', () => {
        const state = {};

        expect(hasFoundationById(state, 'some-id')).toBeFalsy();
    });

    test('Empty foundations array returns false', () => {
        const state = {
            foundations: [],
        };

        expect(hasFoundationById(state, 'some-id')).toBeFalsy();
    });

    test('Wrong id returns false', () => {
        const state = {
            foundations: [
                getTestFoundation('test-id-1'),
                getTestFoundation('test-id-2'),
                getTestFoundation('test-id-3'),
                getTestFoundation('test-id-4'),
            ],
        };
        expect(hasFoundationById(state, 'some-id')).toBeFalsy();
    });

    test('Correct id returns true', () => {
        const state = {
            foundations: [
                getTestFoundation('test-id-1'),
                getTestFoundation('test-id-2'),
                getTestFoundation('test-id-3'),
                getTestFoundation('test-id-4'),
            ],
        };
        expect(hasFoundationById(state, 'test-id-3')).toBeTruthy();
    });
});