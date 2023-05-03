import {ECardSuit} from "Types/ECardSuit";
import {ICard} from "Types/ICard";
import {ICardInPile} from "Types/ICardInPile";
import {EGameBoardPart} from "Types/EGameBoardPart";

/**
 * Foundation.
 *
 * @property {string} id Id of foundation.
 * @property {ECardSuit} [suit] Suit of pile.
 * @property {Array<ICard>} cards Cards on foundation.
 * @property {boolean} [isTarget] Is target for previously selected card.
 */
export interface IFoundation {
    id: string;
    suit?: ECardSuit;
    cards: Array<ICard>;
    isTarget?: boolean;
}

/**
 * Pile of cards.
 *
 * @property {string} id Id.
 * @property {Array<ICardInPile>} cards Cards.
 * @property {boolean} isTarget Is target for previously selected card.
 */
export interface IPile {
    id: string;
    cards: Array<ICardInPile>;
    isTarget: boolean;
}

/**
 * Type for selected card from tableau.
 */
type TSelectedCardFromTableau = {
    position: EGameBoardPart.TABLEAU;
    pileId: IPile['id'];
    card: ICard;
}

/**
 * Type for selected card from tableau.
 */
type TSelectedCardFromFoundation = {
    position: EGameBoardPart.FOUNDATIONS;
    foundationId: IFoundation['id'];
    card: ICard;
}

/**
 * Type for selected card from talon.
 */
type TSelectedCardFromTalon = {
    position: EGameBoardPart.TALON;
    card: ICard;
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
 * @property {ICard} selectedCard
 *  Selected card for subsequent moving.
 */
export interface IGameBoard {
    foundations: [] | [IFoundation, IFoundation, IFoundation, IFoundation];
    tableau: [] | [IPile, IPile, IPile, IPile, IPile, IPile, IPile];
    talon: Array<ICard>;
    stock: Array<ICard>;
    selectedCard: null | TSelectedCardFromTalon | TSelectedCardFromTableau | TSelectedCardFromFoundation;
}