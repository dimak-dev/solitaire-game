import React from 'react';
import './ReverseSideOfCard.scss';

interface IReverseSideOfCardProps {
    onClick?: () => void;
}
export default function ReverseSideOfCard({onClick}: IReverseSideOfCardProps) {
    return (<div className="reverse-side" onClick={onClick}/>)
}