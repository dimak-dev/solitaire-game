import MatcherContext = jest.MatcherContext;
import toBeUniqueArray from "Tests/jest/matchers/toBeUniqueArray";

describe('toBeUniqueArray Custom Matcher', () => {
    let matcherContextMock: MatcherContext;

    beforeEach(() => {
        matcherContextMock = {
            // @ts-ignore
            utils: {
                printReceived: jest.fn().mockImplementation((...args) => `printReceived mock, args: ${JSON.stringify(args)}`),
                printExpected: jest.fn().mockImplementation((...args) => `printExpected mock, args: ${JSON.stringify(args)}`),
                matcherHint: jest.fn().mockImplementation((...args) => `matcherHint mock, args: ${JSON.stringify(args)}`)
            }
        };
    });

    test('String is not array', () => {
        const fn = toBeUniqueArray.bind(matcherContextMock);

        expect(fn('').pass).toBeFalsy();
        expect(fn('').message()).toMatchSnapshot();
        expect(fn(String('')).pass).toBeFalsy();
        expect(fn(String('')).message()).toMatchSnapshot();
    });

    test('Number is not array', () => {
        const fn = toBeUniqueArray.bind(matcherContextMock);

        expect(fn(0).pass).toBeFalsy();
        expect(fn(0).message()).toMatchSnapshot();
        expect(fn(10).pass).toBeFalsy();
        expect(fn(10).message()).toMatchSnapshot();
        expect(fn(Number(0)).pass).toBeFalsy();
        expect(fn(Number(0)).message()).toMatchSnapshot();
        expect(fn(Number(100)).pass).toBeFalsy();
        expect(fn(Number(100)).message()).toMatchSnapshot();
        expect(fn(BigInt(0)).pass).toBeFalsy();
        expect(fn(BigInt(0)).message()).toMatchSnapshot();
        expect(fn(BigInt(100)).pass).toBeFalsy();
        expect(fn(BigInt(100)).message()).toMatchSnapshot();
    });

    test('Boolean is not array', () => {
        const fn = toBeUniqueArray.bind(matcherContextMock);

        expect(fn(true).pass).toBeFalsy();
        expect(fn(true).message()).toMatchSnapshot();
        expect(fn(false).pass).toBeFalsy();
        expect(fn(false).message()).toMatchSnapshot();
        expect(fn(Boolean(false)).pass).toBeFalsy();
        expect(fn(Boolean(false)).message()).toMatchSnapshot();
        expect(fn(Boolean(true)).pass).toBeFalsy();
        expect(fn(Boolean(true)).message()).toMatchSnapshot();
    });

    test('Undefined is not array', () => {
        const fn = toBeUniqueArray.bind(matcherContextMock);

        expect(fn(undefined).pass).toBeFalsy();
    });

    test('Null is not array', () => {
        const fn = toBeUniqueArray.bind(matcherContextMock);

        expect(fn(null).pass).toBeFalsy();
    });

    test('Symbol is not array', () => {
        const fn = toBeUniqueArray.bind(matcherContextMock);

        expect(fn(Symbol()).pass).toBeFalsy();
        expect(fn(Symbol()).message()).toMatchSnapshot();
        expect(fn(Symbol('string')).pass).toBeFalsy();
        expect(fn(Symbol('string')).message()).toMatchSnapshot();
    });

    test('Object is not array', () => {
        const fn = toBeUniqueArray.bind(matcherContextMock);

        expect(fn({}).pass).toBeFalsy();
        expect(fn({}).message()).toMatchSnapshot();
        expect(fn({'key': 'value'}).pass).toBeFalsy();
        expect(fn({'key': 'value'}).message()).toMatchSnapshot();
    });

    test('Empty array is unique array', () => {
        const result = toBeUniqueArray.call(matcherContextMock, []);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Array with only one element is unique', () => {
        let result;

        result = toBeUniqueArray.call(matcherContextMock, [1]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [Number(1)]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [BigInt(1)]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [String('a')]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, ['a']);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [true]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [false]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [null]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [undefined]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [Symbol]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Unique array of numbers', () => {
        let result;

        result = toBeUniqueArray.call(matcherContextMock, [1, 2, 3]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [BigInt(1), BigInt(2), BigInt(3)]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [Number(1), Number(2), Number(3)]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not unique array of numbers', () => {
        let result;

        result = toBeUniqueArray.call(matcherContextMock, [1, 1, 1]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [1, 2, 1, 3]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [1, 1, 2, 3]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [BigInt(1), BigInt(1), BigInt(1), BigInt(1)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [BigInt(1), BigInt(2), BigInt(1), BigInt(3)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [BigInt(1), BigInt(1), BigInt(2), BigInt(3)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [Number(1), Number(1), Number(1), Number(1)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [Number(1), Number(2), Number(1), Number(3)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [Number(1), Number(1), Number(2), Number(3)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [1, Number(1)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

    });

    test('Unique array of strings', () => {
        let result;

        result = toBeUniqueArray.call(matcherContextMock, ['a', 'b', 'c']);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [String('a'), String('b'), String('c')]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not unique array of strings', () => {
        let result;

        result = toBeUniqueArray.call(matcherContextMock, ['a', 'b', 'c', 'a']);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, ['a', 'a', 'a', 'a']);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, ['a', 'a', 'b', 'c']);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [String('a'), String('a'), String('a'), String('a')]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [String('a'), String('b'), String('c'), String('a')]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [String('a'), String('a'), String('b'), String('c')]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, ['b', 'c', String('b'), String('c')]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Unique array of boolean', () => {
        let result;

        result = toBeUniqueArray.call(matcherContextMock, [true, false]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [Boolean(false), Boolean(true)]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not unique array of boolean', () => {
        let result;

        result = toBeUniqueArray.call(matcherContextMock, [true, true]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [false, false]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [Boolean(false), Boolean(false)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [Boolean(true), Boolean(true)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [true, Boolean(true)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [false, Boolean(false)]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not unique array of null', () => {
        const result = toBeUniqueArray.call(matcherContextMock, [null, null]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not unique array of undefined', () => {
        const result = toBeUniqueArray.call(matcherContextMock, [undefined, undefined]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Unique array of symbols', () => {
        let result;

        result = toBeUniqueArray.call(matcherContextMock, [Symbol(), Symbol()]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();

        result = toBeUniqueArray.call(matcherContextMock, [Symbol('string'), Symbol('string')]);
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not unique array of symbols', () => {
        let result;
        const symbol1 = Symbol();
        const symbol2 = Symbol();

        result = toBeUniqueArray.call(matcherContextMock, [symbol1, symbol1, symbol2]);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

});