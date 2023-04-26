import MatcherContext = jest.MatcherContext;
import toBeString from "Tests/jest/matchers/toBeString";

describe('toBeString Custom Matcher', () => {
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

    test('Empty primitive string is a string', () => {
        const result = toBeString.call(matcherContextMock, '');
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Empty string as String object is a string', () => {
        const result = toBeString.call(matcherContextMock, String(''));
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not empty primitive string with letters is a string', () => {
        const result = toBeString.call(matcherContextMock, 'letters');
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not empty string as String object with letters is a string', () => {
        const result = toBeString.call(matcherContextMock, String('letters'));
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not empty primitive string with zero is a string', () => {
        const result = toBeString.call(matcherContextMock, '0');
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not empty string as String object with zero is a string', () => {
        const result = toBeString.call(matcherContextMock, String('0'));
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not empty primitive string with numbers is a string', () => {
        const result = toBeString.call(matcherContextMock, '123456');
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Not empty string as String object with numbers is a string', () => {
        const result = toBeString.call(matcherContextMock, String('123456'));
        expect(result.pass).toBeTruthy();
        expect(result.message()).toMatchSnapshot();
    });

    test('number as primitive is not a string', () => {
        const result = toBeString.call(matcherContextMock, 123456);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('number as Number object is not a string', () => {
        const result = toBeString.call(matcherContextMock, Number(123456));
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('zero number as primitive is not a string', () => {
        const result = toBeString.call(matcherContextMock, 0);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('zero number as Number object is not a string', () => {
        const result = toBeString.call(matcherContextMock, Number(0));
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('number as Bigint object is not a string', () => {
        const result = toBeString.call(matcherContextMock, BigInt(123456));
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('extra large number as Bigint object is not a string', () => {
        const result = toBeString.call(matcherContextMock, BigInt(1234567890123456789012345));
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('zero number as Bigint object is not a string', () => {
        const result = toBeString.call(matcherContextMock, BigInt(0));
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('true boolean as primitive is not a string', () => {
        const result = toBeString.call(matcherContextMock, true);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('false boolean as primitive is not a string', () => {
        const result = toBeString.call(matcherContextMock, false);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('true boolean as object is not a string', () => {
        const result = toBeString.call(matcherContextMock, Boolean(true));
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('false boolean as object is not a string', () => {
        const result = toBeString.call(matcherContextMock, Boolean(false));
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('undefined is not a string', () => {
        const result = toBeString.call(matcherContextMock, undefined);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('null is not a string', () => {
        const result = toBeString.call(matcherContextMock, null);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Symbol is not a string', () => {
        const result = toBeString.call(matcherContextMock, Symbol());
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Symbol with description is not a string', () => {
        const result = toBeString.call(matcherContextMock, Symbol('description'));
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('Empty object is not a string', () => {
        const result = toBeString.call(matcherContextMock, {});
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('object with string value is not a string', () => {
        const result = toBeString.call(matcherContextMock, {key: 'value'});
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('empty array is not a string', () => {
        const result = toBeString.call(matcherContextMock, []);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });

    test('array with string value is not a string', () => {
        const result = toBeString.call(matcherContextMock, ['value']);
        expect(result.pass).toBeFalsy();
        expect(result.message()).toMatchSnapshot();
    });
});