import React from 'react';

const Icon = ({ name, size, weight }) => <i style={{ fontSize: size, fontWeight: weight }} className={`icon-${name}`}></i>;

export default Icon;
