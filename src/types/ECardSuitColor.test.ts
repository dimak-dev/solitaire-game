import * as assert from "assert";
import {ECardSuitColor} from "Types/ECardSuitColor";

test('Color enumerations', () => {
    assert.equal(ECardSuitColor.RED, 'red');
    assert.equal(ECardSuitColor.BLACK, 'black');
})