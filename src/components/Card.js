import React, { useState } from 'react';

const Card = (props) => {
    return (
        <div className="card">
            <div className="card-header name">{ props.item.name }</div>
            <div className="card-body">
                <p>{props.item.desc1}</p>
                <p>{props.item.desc2}</p>
                <p>{props.item.desc3}</p>
            </div>
        </div>
    );
};

export default Card;