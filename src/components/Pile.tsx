import React from "react";
import {ICardInPile} from "Types/ICardInPile";
import {IPile} from "Types/IGameBoard";
import CardPlaceholder from "Components/CardPlaceholder";
import ReverseSideOfCard from "Components/ReverseSideOfCard";
import Card from "Components/Card";
import {ICard} from "Types/ICard";

interface IPileProps {
    cards: ICardInPile[]
    id: IPile['id']
    isTarget: boolean;
    onCardClick: (pileId: IPile['id'], card: ICard) => void;
    onTargetClick: (pileId: IPile['id']) => void;
}

export default function Pile({cards, id: pileId, isTarget, onCardClick, onTargetClick}: IPileProps) {
    const showEmptyPlaceholder = !cards.length;

    const hiddenCards = cards
        .filter(({isOpen}) => !isOpen)
        .map(({card}) => card);

    const openedCards = cards
        .filter(({isOpen}) => isOpen)
        .map(({card}) => card);


    return (
        <div className="pile" id={pileId}>
            {hiddenCards.map(({id: cardId}) =>
                <CardPlaceholder key={cardId}>
                    <ReverseSideOfCard/>
                </CardPlaceholder>
            )}

            {openedCards.map((card) =>
                <CardPlaceholder
                    key={card.id}
                    onClick={() => onCardClick(pileId, card)}
                >
                    <Card {...card}/>
                </CardPlaceholder>
            )}

            {(showEmptyPlaceholder || isTarget) && (
                <CardPlaceholder onClick={() => onTargetClick(pileId)}/>
            )}
        </div>
    )
}