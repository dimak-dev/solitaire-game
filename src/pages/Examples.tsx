import Card from 'Components/Card';
import CardPlaceholder from 'Components/CardPlaceholder';
import React from 'react';
import {ECardSuit} from "Types/ECardSuit";
import {ECardValue} from "Types/ECardValue";

export default function Examples() {
    return (
        <div>
            Examples card:<br/>

            <CardPlaceholder/>
            <CardPlaceholder>
                <Card suit={ECardSuit.DIAMOND} value={ECardValue.KING}/>
            </CardPlaceholder>


            <Card suit={ECardSuit.HEART} value={ECardValue.SEVEN}/>
            <Card suit={ECardSuit.CLUB} value={ECardValue.SEVEN}/>
        </div>
    );
}