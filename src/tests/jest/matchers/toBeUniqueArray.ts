import MatcherContext = jest.MatcherContext;
import CustomMatcherResult = jest.CustomMatcherResult;


/**
 * Workaround for JSON.stringify problem with BigInt.
 *
 * @param key
 * @param value
 */
const stringifyHelper = (key: any, value: any) => {
    if (typeof(value) === 'bigint') {
        return value.toString();
    }
    return value;
}
/**
 * Check that all elements of array is unique.
 */
export default function toBeUniqueArray(this: MatcherContext, expected: any): CustomMatcherResult {
    const {printReceived, printExpected, matcherHint} = this.utils;

    if (!Array.isArray(expected)) {
        return {
            pass: false,
            message: () => 'Expected type must be array, but received:\n' + printReceived(typeof expected),
        }
    }

    const duplicates: typeof expected = [];

    expected.forEach((element, index, array) => {
        if (array.includes(element, index + 1) && !duplicates.includes(element)) {
            duplicates.push(element);
        }
    });



    return {
        pass: !duplicates.length,
        message: () => !duplicates.length ?
            matcherHint('.not.toBeUniqueArray', 'received', '')
            + '\n\nAll elements in received array is unique:\n' + printReceived(JSON.stringify(expected, stringifyHelper))

            :

            matcherHint('.toBeUniqueArray', 'received', '')
            + '\n\nReceived array:\n'
            + printReceived(JSON.stringify(expected, stringifyHelper))
            + '\n\nNot unique elements:\n'
            + printExpected(JSON.stringify(duplicates, stringifyHelper))
    }
}