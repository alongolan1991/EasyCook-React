import React from 'react';
import './LabeledIcon.css';

const LabeledIcon = (props) => {
   
    return (
        <div className="labeled-icon" style={{flexDirection: props.row ? 'row' : 'column'}}>
            <img src={props.imgSrc} style={{ width: '20px' }} />
            <p className="icons" style={{marginLeft: props.row ? '5px' : '0'}}>{props.text}</p>
        </div>
    );
}

export default LabeledIcon;
