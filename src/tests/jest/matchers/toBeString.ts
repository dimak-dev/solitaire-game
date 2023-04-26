import CustomMatcherResult = jest.CustomMatcherResult;
import MatcherContext = jest.MatcherContext;

/**
 * Check that a variable is type of string or instanceof String.
 */
export default function toBeString(this: MatcherContext, expected: any): CustomMatcherResult {
    const {printReceived, printExpected, matcherHint} = this.utils;

    const pass = typeof expected === 'string' || expected instanceof String;

    return {
        pass,
        message: () =>
            pass
                ? matcherHint('.not.toBeString', 'received', '') +
                '\n\n' +
                'Expected value must be not type of string, but string is received:\n' +
                `  ${printReceived(expected)}`
                : matcherHint('.toBeString', 'received', '') +
                '\n\n' +
                'Expected:\n' +
                `  ${printExpected('type of string OR instanceof String')}\n` +
                'Received:\n' +
                `  ${printReceived(typeof expected)}`,
    }
}