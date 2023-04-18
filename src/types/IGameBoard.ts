import {ECardSuit} from "Types/ECardSuit";
import {ICard} from "Types/ICard";
import {ICardInPile} from "Types/ICardInPile";

/**
 * Foundation.
 *
 * @property {string} id Id of foundation.
 * @property {ECardSuit} [suit] Suit of pile.
 * @property {Array<ICard>} cards Cards on foundation.
 */
export interface IFoundation {
    id: string;
    suit?: ECardSuit;
    cards: Array<ICard>;
}

/**
 * Pile of cards.
 *
 * @property {string} id Id.
 * @property {Array<ICardInPile>} cards Cards.
 */
export interface IPile {
    id: string;
    cards: Array<ICardInPile>;
}

/**
 * Possible targets for selected card.
 *
 * @property {Array<IPile["id"]>} pilesIds Array of ids for possible piles on tableau.
 * @property {Array<IFoundation["id"]>} foundationsIds Array of ids for possible foundations.
 */
interface IPossibleTargets {
    pilesIds: Array<IPile["id"]>;
    foundationsIds: Array<IFoundation["id"]>
}

/**
 * Interface of four different types of piles in Solitaire.
 *
 * @property {Array<IFoundation>} foundations
 *  Four piles on which a whole suit or sequence must be built up.
 *  In most Solitaire games, the four aces are the bottom card or base of the foundations.
 *  The foundation piles are hearts, diamonds, spades, and clubs.
 *
 * @property {Array<IPile>} tableau
 *  Seven piles that make up the main table.
 *
 * @property {Array<ICard>} talon
 *  (or waste)
 *  Cards from the stock pile that have no place in the tableau or
 *  on foundations are laid face up in the waste pile.
 *
 * @property {Array<ICard>} stock
 *  (or hand)
 *  If the entire pack is not laid out in a tableau at the beginning of a game,
 *  the remaining cards form the stock pile from which additional cards
 *  are brought into play according to the rules.
 *
 *  @property {IPossibleTargets} possibleTargets
 *   Possible targets for selected card.
 */
export interface IGameBoard {
    foundations: [] | [IFoundation, IFoundation, IFoundation, IFoundation];
    tableau: [] | [IPile, IPile, IPile, IPile, IPile, IPile, IPile];
    talon: Array<ICard>;
    stock: Array<ICard>;
    possibleTargets: IPossibleTargets;
}