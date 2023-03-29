import React from 'react';
import './CardPlaceholder.css';

interface ICardPlaceholderProps {
    children?: JSX.Element,
}

export default function CardPlaceholder({children}: ICardPlaceholderProps) {
    return (
        <div className="card-placeholder">

            {children || (
                <div className='icon-wrapper'>
                    <div className='icon'>♤ ♧<br/>♡ ♢</div>
                </div>
            )}
        </div>
    )
};