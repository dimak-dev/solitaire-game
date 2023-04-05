import React from "react";
import './Board.scss';
import CardPlaceholder from "Components/CardPlaceholder";
import Card from "Components/Card";
import ReverseSideOfCard from "Components/ReverseSideOfCard";
import {useAppSelector} from "Redux/hooks/reduxHooks";

export default function Board() {
    const gameBoard = useAppSelector(state => state.gameBoardReducer);
    return (
        <div className="board">
            <div className="foundations">
                {gameBoard.foundations.map((foundation) => (
                    <div className="foundation" key={foundation.id}>
                        <CardPlaceholder>
                            {foundation.cards.length && (
                                <Card suit={foundation.cards[length - 1].suit} value={foundation.cards[length - 1].value}/>
                            )}
                        </CardPlaceholder>
                    </div>
                ))}

                {/*The Talon (or “Waste”) Pile*/}
                <div className="waste"/>

                {/*The Stock (or “Hand”) Pile*/}
                <div className="talon">
                    <CardPlaceholder>
                        {gameBoard.stock.length && (<ReverseSideOfCard/>)}
                    </CardPlaceholder>
                </div>
            </div>

            <div className="piles">
                {gameBoard.tableau.map((pile) => (
                    <div className="pile" key={pile.id}>
                        {pile.cards.map((card) => (
                            <CardPlaceholder>
                                {card.isOpen && (
                                    <Card suit={card.card.suit} value={card.card.value}/>
                                ) || (
                                    <ReverseSideOfCard/>
                                ) }
                            </CardPlaceholder>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}