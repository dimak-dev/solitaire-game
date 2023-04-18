import React from "react";
import './Board.scss';
import CardPlaceholder from "Components/CardPlaceholder";
import Card from "Components/Card";
import ReverseSideOfCard from "Components/ReverseSideOfCard";
import {useAppDispatch, useAppSelector} from "Redux/hooks/reduxHooks";
import {gameBoardActions} from "Redux/game";
import Pile from "Components/Pile";
import {IPile} from "Types/IGameBoard";
import {ICard} from "Types/ICard";

export default function Board() {
    const gameBoard = useAppSelector(state => state.gameBoardReducer);
    const dispatch = useAppDispatch();

    const onPickFromStockClick = () => {
        dispatch(gameBoardActions.pickCardsFromStock());
    };

    const onEmptyStockClick = () => {
        dispatch(gameBoardActions.resetStock());
    };

    const onCardOnTableauClick = (_: IPile['id'], card: ICard) => {
        dispatch(gameBoardActions.showPossibleTargets(card));
    };

    const onTargetOnTableauClick = (pileId: IPile['id']) => {};

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
                        <CardPlaceholder onClick={() => dispatch(gameBoardActions.showPossibleTargets(gameBoard.talon[gameBoard.talon.length - 1]))}>
                            <Card suit={gameBoard.talon[gameBoard.talon.length - 1].suit} value={gameBoard.talon[gameBoard.talon.length - 1].value}/>
                        </CardPlaceholder>
                    )}
                </div>

                {/*The Stock (or “Hand”) Pile*/}
                <div className="stock">
                    {gameBoard.stock.length && (
                        <CardPlaceholder>
                            {<ReverseSideOfCard onClick={onPickFromStockClick}/>}
                        </CardPlaceholder>
                    ) || (
                        <CardPlaceholder  onClick={onEmptyStockClick}/>
                    )}
                </div>
            </div>

            <div className="piles">
                {gameBoard.tableau.map((pile) => (
                    <Pile
                        {...pile}
                        isTarget={gameBoard.possibleTargets.pilesIds.includes(pile.id)}
                        onCardClick={onCardOnTableauClick}
                        onTargetClick={onTargetOnTableauClick}
                        key={pile.id}
                    />
                ))}
            </div>
        </div>
    )
}