import React from 'react';


function ClassCard(props){
    return (
        <div className='card'>
            <h2>{props.text}</h2>
            <div className='action'>
                <img src={props.image} width={100} height={100}/>
                <button className='joinbtn'>Join Class</button>
            </div>
        </div>
    );
}

export default ClassCard;