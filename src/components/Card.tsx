import React, {memo} from 'react';
import './Card.scss';
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";
import cardValueToChar from "Utils/cardValueToChar";
import cardSuitToChar from "Utils/cardSuitToChar";
import {cardSuiteColor} from "Utils/cardSuiteColor";


interface ICardProps {
    suit: ECardSuit,
    value: ECardValue,
}

/**
 * Card component.
 *
 * Memoized for decreasing count of renders.
 */
// const Card = memo();

export default function Card({suit, value}: ICardProps) {
    const valueChar = cardValueToChar(value);
    const suitChar = cardSuitToChar(suit);
    const color = cardSuiteColor(suit);

    return (
        <div className={`card ${color}`}>
            <div className="flex-wrapper">
                <div className="top-line">
                    {valueChar}{suitChar}
                </div>
                <div className="bottom-line">
                    {valueChar}{suitChar}
                </div>
            </div>
        </div>
    )
};