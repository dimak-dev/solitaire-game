import React from "react";
import './Board.scss';
import CardPlaceholder from "Components/CardPlaceholder";
import Card from "Components/Card";
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";

export default function Board() {
    return (
        <div className="board">
            <div className="foundations">
                <div className="foundation first">
                    <CardPlaceholder/>
                </div>
                <div className="foundation second">
                    <CardPlaceholder/>
                </div>
                <div className="foundation third">
                    <CardPlaceholder/>
                </div>
                <div className="foundation fourth">
                    <CardPlaceholder/>
                </div>

                <div className="waste"/>

                <div className="talon">
                    <CardPlaceholder/>
                </div>
            </div>

            <div className="piles">
                <div className="pile first"><CardPlaceholder/></div>
                <div className="pile second"><CardPlaceholder/></div>
                <div className="pile third"><CardPlaceholder/></div>
                <div className="pile fourth"><CardPlaceholder/></div>
                <div className="pile fifth"><CardPlaceholder/></div>
                <div className="pile sixth"><CardPlaceholder/></div>
                <div className="pile seventh">
                    <CardPlaceholder><Card suit={ECardSuit.SPADE} value={ECardValue.JACK}/></CardPlaceholder>
                    <CardPlaceholder><Card suit={ECardSuit.DIAMOND} value={ECardValue.SIX}/></CardPlaceholder>
                    <CardPlaceholder><Card suit={ECardSuit.CLUB} value={ECardValue.EIGHT}/></CardPlaceholder>
                    <CardPlaceholder/>
                </div>
            </div>
        </div>
    )
}