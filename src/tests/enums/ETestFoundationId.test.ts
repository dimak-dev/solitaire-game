import {ETestFoundationId} from "Tests/enums/ETestFoundationId";

describe('ETestFoundationId', () => {
    test('Unique values', () => {
        expect(Object.values(ETestFoundationId)).toBeUniqueArray();
    });
});