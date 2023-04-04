/**
 * Shuffling Array using the Fisher and Yates' modern algorithm, introduced by Richard Durstenfeld.
 *
 * @see The modern algorithm on {@link https://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm Wikipedia}
 *
 * @param {Array} array Array to be shuffling.
 * @return {Array} Shuffled array.
 */
export function shuffleArrayByFisherAndYatesAlgorithm<T>(array: Array<T>): Array<T> {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * 100 % shuffledArray.length);
        [shuffledArray[i], shuffledArray[newIndex]] = [shuffledArray[newIndex], shuffledArray[i]];
    }

    return shuffledArray;
}

/**
 * Shuffling Array using the Fisher and Yates' variant "Pencil-and-paper" algorithm.
 *
 * @see The modern algorithm on {@link https://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm Wikipedia}
 *
 * @param {Array} array Array to be shuffling.
 * @return {Array} Shuffled array.
 */
export function shuffleArrayByPencilAndPaperAlgorithm<T>(array: Array<T>): Array<T> {
    const scratch = [...array];
    const shuffledArray: Array<T> = [];

    while(scratch.length) {
        const randomIndex = Math.floor(Math.random() * 100 % scratch.length);
        shuffledArray.push(...scratch.splice(randomIndex, 1))
    }

    return shuffledArray;
}