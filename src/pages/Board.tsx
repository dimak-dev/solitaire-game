import React from "react";
import './Board.scss';
import CardPlaceholder from "Components/CardPlaceholder";
import Card from "Components/Card";
import ReverseSideOfCard from "Components/ReverseSideOfCard";
import {useAppDispatch, useAppSelector} from "Redux/hooks/reduxHooks";
import {gameBoardActions} from "Redux/game";

export default function Board() {
    const gameBoard = useAppSelector(state => state.gameBoardReducer);
    const dispatch = useAppDispatch();

    const onPickFromStock = () => {
        dispatch(gameBoardActions.pickCardsFromStock());
    };

    return (
        <div className="board">
            <div className="foundations">
                {gameBoard.foundations.map((foundation) => (
                    <div className="foundation" key={foundation.id}>
                        <CardPlaceholder>
                            {foundation.cards.length && (
                                <Card suit={foundation.cards[foundation.cards.length - 1].suit} value={foundation.cards[foundation.cards.length - 1].value}/>
                            )}
                        </CardPlaceholder>
                    </div>
                ))}

                {/*The Talon (or “Waste”) Pile*/}
                <div className="talon">
                    {/* One card mode only */}
                    {!!gameBoard.talon.length && (
                        <CardPlaceholder>
                            <Card suit={gameBoard.talon[gameBoard.talon.length - 1].suit} value={gameBoard.talon[gameBoard.talon.length - 1].value}/>
                        </CardPlaceholder>
                    )}
                </div>

                {/*The Stock (or “Hand”) Pile*/}
                <div className="stock">
                    <CardPlaceholder>
                        {!!gameBoard.stock.length && (<ReverseSideOfCard onClick={onPickFromStock}/>)}
                    </CardPlaceholder>
                </div>
            </div>

            <div className="piles">
                {gameBoard.tableau.map((pile) => (
                    <div className="pile" key={pile.id}>
                        {pile.cards.map(({card, isOpen}) => (
                            <CardPlaceholder key={`card-in-pile-${card.value}-${card.suit}`}>
                                {isOpen && (
                                    <Card suit={card.suit} value={card.value}/>
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