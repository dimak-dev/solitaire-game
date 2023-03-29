import * as assert from "assert";
import {cardSuiteColor} from "Utils/cardSuiteColor";
import {ECardSuit} from "Types/ECardSuit";
import {ECardSuitColor} from "Types/ECardSuitColor";

test('Colors of card suits', () => {
   assert.equal(cardSuiteColor(ECardSuit.HEART), ECardSuitColor.RED);
   assert.equal(cardSuiteColor(ECardSuit.DIAMOND), ECardSuitColor.RED);
   assert.equal(cardSuiteColor(ECardSuit.SPADE), ECardSuitColor.BLACK);
   assert.equal(cardSuiteColor(ECardSuit.CLUB), ECardSuitColor.BLACK);
});