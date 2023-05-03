import isTalonEmpty from "Utils/checkers/isTalonEmpty";

describe('Checker: isTalonEmpty', () => {
    test('Uninitialized talon returns true', () => {
        const talon = null;

        expect(isTalonEmpty(talon)).toBeTruthy();
    });

    test('Empty talon returns true', () => {
        const talon = [];

        expect(isTalonEmpty(talon)).toBeTruthy();
    });

    test('Not empty talon returns false', () => {
        const talon = [1, 2, 3];

        expect(isTalonEmpty(talon)).toBeFalsy();
    });
});