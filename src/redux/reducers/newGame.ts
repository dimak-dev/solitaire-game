import {IGameBoard} from "Types/IGameBoard";
import {initializeFoundations, pickCardsForTableauPile} from "Utils/game";
import {initializeShuffledPackOfCards} from "Utils/packOfCards";

export default function newGameReducer(state: IGameBoard) {
    // shuffled pack of cards
    let packOfCard = initializeShuffledPackOfCards();

    // reset foundations
    state.foundations = initializeFoundations();
    // reset waste
    state.talon = [];

    const piles = [];

    for (let i = 0; i < 7; i++) {
        const {cardsInPile, restPackOfCard} = pickCardsForTableauPile(packOfCard, i);
        packOfCard = restPackOfCard;
        piles[i] = {
            id: `pile-${i}`,
            cards: cardsInPile,
        };
    }

    state.tableau = piles;

    state.stock = packOfCard;
}