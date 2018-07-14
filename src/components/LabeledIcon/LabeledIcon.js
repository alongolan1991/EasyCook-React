import React from 'react';
import './LabeledIcon.css';
import Icon from '../Icon';

const LabeledIcon = ({ iconName, row, text }) => {

    return (
        <div className="labeled-icon" style={{ flexDirection: row ? 'row' : 'column' }}>
            <Icon name={iconName} />
            <p className="icons" style={{ marginLeft: row ? '5px' : '0' }}>{text}</p>
        </div>
    );
}

export default LabeledIcon;
