import {IGameBoard} from "Types/IGameBoard";
import {pickCardsFromPackForTableau} from "Utils/pickCardsFromPackForTableau";
import {initializeShuffledPackOfCards} from "Utils/packOfCards";
import initFoundations from "Redux/reducers/initializers/initFoundations";
import initPiles from "Redux/reducers/initializers/initPiles";

export default function newGameReducer(state: IGameBoard): void {
    // shuffled pack of cards
    let packOfCard = initializeShuffledPackOfCards();

    // reset foundations
    state.foundations = initFoundations();
    // reset waste
    state.talon = [];

    const piles = initPiles();

    for (let i = 0; i < 7; i++) {
        const {cardsInPile, restPackOfCard} = pickCardsFromPackForTableau(packOfCard, i);
        packOfCard = restPackOfCard;
        piles[i].cards = cardsInPile;
    }

    state.tableau = piles;

    state.stock = packOfCard;
}