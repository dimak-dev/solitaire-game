import React from 'react';
import './CardPlaceholder.scss';

interface ICardPlaceholderProps {
    children?: JSX.Element;
    isTarget?: boolean;
    onClick?: () => void;
}

export default function CardPlaceholder({children, isTarget, onClick}: ICardPlaceholderProps) {
    return (
        <div className={`card-placeholder${isTarget ? ' target' : ''}`} onClick={onClick}>

            {children || (
                <div className='icon-wrapper'>
                    <div className='icon'>♤ ♧<br/>♡ ♢</div>
                </div>
            )}
        </div>
    )
};