import React from 'react';

function ClassCard(props){
    return (
        <div className='card'>
            <h2>{props.text}</h2>
            <div className='action'>
                <button className='joinbtn'>Join Class</button>
            </div>
        </div>
    );
}

export default ClassCard;