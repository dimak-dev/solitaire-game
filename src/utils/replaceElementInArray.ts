/**
 * Replace element of array with new element.
 *
 * @template T
 * @param {Array<T>} array Origin array.
 * @param {number} index Index of element to be replaced.
 * @param {T} element New element
 * @return {Array<T>} New array with replaced element.
 */
export default function replaceElementInArray<T extends any[], N extends number>(array: T, index: N, element: T[N]): T {
    if (index < 0 || index >= array.length) {
        throw new Error('Out of bounds');
    }

    const newArray = [...array];
    newArray[index] = element;
    return newArray as T;
}