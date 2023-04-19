import initFoundations from "Redux/reducers/initializers/initFoundations";

describe('Initializer for foundation', () => {
    test('Array of foundations must contain only 4 elements', () => {
        expect(initFoundations()).toHaveLength(4);
    });

    test('New foundations must contain piles for each suits, but suits is not set', () => {
        const foundations = initFoundations();

        expect(foundations[0].suit).toBeUndefined();
        expect(foundations[1].suit).toBeUndefined();
        expect(foundations[2].suit).toBeUndefined();
        expect(foundations[3].suit).toBeUndefined();
    });

    test('New foundations must contain ids', () => {
        const foundations = initFoundations();

        expect(foundations[0].id).toBeString();
        expect(foundations[1].id).toBeString();
        expect(foundations[2].id).toBeString();
        expect(foundations[0].id).toBeString();
    });

    test('New foundation must contain empty array of cards', () => {
        const piles = initFoundations().map(f => f.cards);

        expect(piles).toHaveLength(4);

        expect(piles[0]).toBeInstanceOf(Array);
        expect(piles[1]).toBeInstanceOf(Array);
        expect(piles[2]).toBeInstanceOf(Array);
        expect(piles[3]).toBeInstanceOf(Array);

        expect(piles[0]).toHaveLength(0);
        expect(piles[1]).toHaveLength(0);
        expect(piles[2]).toHaveLength(0);
        expect(piles[3]).toHaveLength(0);
    });

    test('New foundation must contain property isTarget and it may be falsy', () => {
        const foundations = initFoundations();

        expect(foundations).toHaveProperty('[0].isTarget');
        expect(foundations).toHaveProperty('[1].isTarget');
        expect(foundations).toHaveProperty('[2].isTarget');
        expect(foundations).toHaveProperty('[3].isTarget');

        expect(foundations[0].isTarget).toBeFalsy();
        expect(foundations[1].isTarget).toBeFalsy();
        expect(foundations[2].isTarget).toBeFalsy();
        expect(foundations[3].isTarget).toBeFalsy();
    });
});