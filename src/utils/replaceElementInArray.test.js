import replaceElementInArray from "Utils/replaceElementInArray";

describe('Replace element in array', () => {
    test('Attempt to replace out of bounds element', () => {
        const fn1 = () => replaceElementInArray([], -1, 'test')
        expect(fn1).toThrowError(/out of bounds/i);

        const fn2 = () => replaceElementInArray(['foo'], 1, 'test')
        expect(fn2).toThrowError(/out of bounds/i);
    });

    test('Immutability', () => {
        const originArray = [1, 2, 3];
        const actualArray = replaceElementInArray(originArray, 0, 1);

        expect(originArray === actualArray).toBeFalsy();
    });

    test('Replace with primitives', () => {
        const result = replaceElementInArray([1, 2, 3], 1, 4);

        expect(result).toStrictEqual([1, 4, 3]);
    });

    test.skip('Foo', () => {

    });
});