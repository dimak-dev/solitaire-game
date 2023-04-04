import {
    shuffleArrayByFisherAndYatesAlgorithm,
    shuffleArrayByPencilAndPaperAlgorithm,
} from "Utils/shuffle";

describe('Algorithms for shuffling', () => {

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    describe('Based on Fisher and Yates\' algorithms', () => {
        test('Algorithms is immutable', () => {
            jest.spyOn(global.Math, 'random')
                .mockImplementation(() => 0.42);

            const array = [1, 2, 3];
            const shuffledArray = shuffleArrayByFisherAndYatesAlgorithm(array);

            expect(array).toStrictEqual([1, 2, 3]);
            expect(array).not.toStrictEqual(shuffledArray);

            jest.spyOn(global.Math, 'random')
                .mockImplementation(() => 0.02);

            const shuffledArray2 = shuffleArrayByPencilAndPaperAlgorithm(array);

            expect(array).toStrictEqual([1, 2, 3]);
            expect(array).not.toStrictEqual(shuffledArray2);
        });

        test('Without any mocks the shuffled arrays must contain all of elements', () => {
            const shuffledArray = shuffleArrayByFisherAndYatesAlgorithm([1, 2, 3, 4, 5]);

            expect(shuffledArray).toContain(1);
            expect(shuffledArray).toContain(2);
            expect(shuffledArray).toContain(3);
            expect(shuffledArray).toContain(4);
            expect(shuffledArray).toContain(5);

            const shuffledArray2 = shuffleArrayByPencilAndPaperAlgorithm([6, 7, 8, 9, 10]);

            expect(shuffledArray2).toContain(6);
            expect(shuffledArray2).toContain(7);
            expect(shuffledArray2).toContain(8);
            expect(shuffledArray2).toContain(9);
            expect(shuffledArray2).toContain(10);

        });

        test('Original algorithm: Shuffling only second and fourth elements', () => {
            jest.spyOn(global.Math, 'random')
                .mockImplementationOnce(() => 0.05)
                .mockImplementationOnce(() => 0.04)
                .mockImplementationOnce(() => 0.03)
                .mockImplementationOnce(() => 0.02)
                .mockImplementationOnce(() => 0.03) // changed element
                .mockImplementationOnce(() => 0.00)

            const shuffledArray = shuffleArrayByFisherAndYatesAlgorithm([1, 2, 3, 4, 5, 6]);

            expect(shuffledArray).toStrictEqual([1, 4, 3, 2, 5, 6]);
        });

        test('Original algorithm: Even if randomizer returns nonrandom - shuffled array will be not equal to original', () => {
            jest.spyOn(global.Math, 'random')
                .mockImplementation(() => 0)

            const shuffledArray = shuffleArrayByFisherAndYatesAlgorithm([1, 2, 3, 4, 5, 6]);

            expect(shuffledArray).not.toStrictEqual([1, 2, 3, 4, 5, 6]);
        });

        test('Paper and pencil: Shuffling only second and fourth elements', () => {
            jest.spyOn(global.Math, 'random')
                .mockImplementationOnce(() => 0.00)
                .mockImplementationOnce(() => 0.02) // selecting third element from scratch = fourth element from original
                .mockImplementationOnce(() => 0.01) // selecting second element from scratch = third element from original
                .mockImplementationOnce(() => 0.00)
                .mockImplementationOnce(() => 0.00)
                .mockImplementationOnce(() => 0.00)

            const shuffledArray = shuffleArrayByPencilAndPaperAlgorithm([1, 2, 3, 4, 5, 6]);

            expect(shuffledArray).toStrictEqual([1, 4, 3, 2, 5, 6]);
        });

        test('Original algorithm: Example from Wikipedia, Elvis -> Lives', () => {
            const Elvis = 'ELVIS'
                .split(''); // Because the algorithm works only with arrays.

            const random = jest.spyOn(global.Math, 'random')
                .mockImplementationOnce(() => 0.04) // Rolled 5, but our 5 is 4 (first element is 0).
                .mockImplementationOnce(() => 0.00) // Rolled 1
                .mockImplementationOnce(() => 0.02) // Rolled 3
                .mockImplementationOnce(() => 0.00); // Rolled 1

            const Lives = shuffleArrayByFisherAndYatesAlgorithm(Elvis);

            expect(Lives.join('')).toEqual('LIVES');
            expect(random).toHaveBeenCalledTimes(4);
        });


        test('Paper and pencil: Example from wikipedia, A B C D E F G H -> C E G D H A F B', () => {
            const random = jest.spyOn(global.Math, 'random')
                .mockImplementationOnce(() => 0.02) // Rolled 3, but our 3 is 2 (first element is 0).
                .mockImplementationOnce(() => 0.03) // Rolled 4
                .mockImplementationOnce(() => 0.04) // Rolled 5
                .mockImplementationOnce(() => 0.02) // Rolled 3
                .mockImplementationOnce(() => 0.03) // Rolled 4
                .mockImplementationOnce(() => 0.00) // Rolled 1
                .mockImplementationOnce(() => 0.01) // Rolled 2

            const shuffledArray = shuffleArrayByPencilAndPaperAlgorithm(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);

            expect(random).toHaveBeenCalledTimes(8);
            expect(shuffledArray).toStrictEqual(['C', 'E', 'G', 'D', 'H', 'A', 'F', 'B']);
        });
    });
});