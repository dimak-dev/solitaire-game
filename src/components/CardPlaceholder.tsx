import React from 'react';
import './CardPlaceholder.scss';

interface ICardPlaceholderProps {
    children?: JSX.Element;
    onClick?: () => void;
}

export default function CardPlaceholder({children, onClick}: ICardPlaceholderProps) {
    return (
        <div className="card-placeholder" onClick={onClick}>

            {children || (
                <div className='icon-wrapper'>
                    <div className='icon'>♤ ♧<br/>♡ ♢</div>
                </div>
            )}
        </div>
    )
};