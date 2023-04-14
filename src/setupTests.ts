// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

expect.extend({
    toBeString: function toBeString(expected) {
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
    },
})