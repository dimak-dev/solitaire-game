import TestCard from "Tests/TestCard";

describe('TestCard', () => {
    test('Unique ids', () => {
        expect(Object.values(TestCard).map(c => c.id)).toBeUniqueArray();
    });
})