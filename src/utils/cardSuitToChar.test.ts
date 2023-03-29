import * as assert from "assert";
import {ECardSuit} from "Types/ECardSuit";
import cardSuitToChar from "Utils/cardSuitToChar";

test('Convert internal representation of card suit to display', () => {
    assert.equal(cardSuitToChar(ECardSuit.DIAMOND), '♦');
    assert.equal(cardSuitToChar(ECardSuit.CLUB), '♣');
    assert.equal(cardSuitToChar(ECardSuit.SPADE), '♠');
    assert.equal(cardSuitToChar(ECardSuit.HEART), '♥');
});