import initPiles from "Redux/reducers/initializers/initPiles";
describe('Initializer for tableau piles', () => {
    test('Array of piles must contain only 7 elements', () => {
        expect(initPiles()).toHaveLength(7);
    });


    test('New piles must contain ids', () => {
        const piles = initPiles();

        expect(piles[0].id).toBeString();
        expect(piles[1].id).toBeString();
        expect(piles[2].id).toBeString();
        expect(piles[3].id).toBeString();
        expect(piles[4].id).toBeString();
        expect(piles[5].id).toBeString();
        expect(piles[6].id).toBeString();
    });

    test('New foundation must contain empty array of cards', () => {
        const piles = initPiles().map(p => p.cards);

        expect(piles).toHaveLength(7);

        expect(piles[0]).toBeInstanceOf(Array);
        expect(piles[1]).toBeInstanceOf(Array);
        expect(piles[2]).toBeInstanceOf(Array);
        expect(piles[3]).toBeInstanceOf(Array);
        expect(piles[4]).toBeInstanceOf(Array);
        expect(piles[5]).toBeInstanceOf(Array);
        expect(piles[6]).toBeInstanceOf(Array);

        expect(piles[0]).toHaveLength(0);
        expect(piles[1]).toHaveLength(0);
        expect(piles[2]).toHaveLength(0);
        expect(piles[3]).toHaveLength(0);
        expect(piles[4]).toHaveLength(0);
        expect(piles[5]).toHaveLength(0);
        expect(piles[6]).toHaveLength(0);
    });

    test('New piles must contain property isTarget and it may be falsy', () => {
        const piles = initPiles();

        expect(piles).toHaveProperty('[0].isTarget');
        expect(piles).toHaveProperty('[1].isTarget');
        expect(piles).toHaveProperty('[2].isTarget');
        expect(piles).toHaveProperty('[3].isTarget');
        expect(piles).toHaveProperty('[4].isTarget');
        expect(piles).toHaveProperty('[5].isTarget');
        expect(piles).toHaveProperty('[6].isTarget');

        expect(piles[0].isTarget).toBeFalsy();
        expect(piles[1].isTarget).toBeFalsy();
        expect(piles[2].isTarget).toBeFalsy();
        expect(piles[3].isTarget).toBeFalsy();
        expect(piles[4].isTarget).toBeFalsy();
        expect(piles[5].isTarget).toBeFalsy();
        expect(piles[6].isTarget).toBeFalsy();
    });
});