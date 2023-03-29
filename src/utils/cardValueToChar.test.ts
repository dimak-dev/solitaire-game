import * as assert from "assert";
import cardValueToChar from "./cardValueToChar";
import {ECardValue} from "Types/ECardValue";

test('Convert internal representation of card value to display', () => {
    assert.equal(cardValueToChar(ECardValue.ACE), 'A')
    assert.equal(cardValueToChar(ECardValue.ONE), '1')
    assert.equal(cardValueToChar(ECardValue.TWO), '2')
    assert.equal(cardValueToChar(ECardValue.THREE), '3')
    assert.equal(cardValueToChar(ECardValue.FOUR), '4')
    assert.equal(cardValueToChar(ECardValue.FIVE), '5')
    assert.equal(cardValueToChar(ECardValue.SIX), '6')
    assert.equal(cardValueToChar(ECardValue.SEVEN), '7')
    assert.equal(cardValueToChar(ECardValue.EIGHT), '8')
    assert.equal(cardValueToChar(ECardValue.NINE), '9')
    assert.equal(cardValueToChar(ECardValue.JACK), 'J')
    assert.equal(cardValueToChar(ECardValue.QUEEN), 'Q')
    assert.equal(cardValueToChar(ECardValue.KING), 'K')
});