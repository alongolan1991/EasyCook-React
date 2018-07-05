import React from 'react';

const Header = (props) => {
  const styles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    background: props.background || 'linear-gradient(to right, #fdcfdc 0%,#e8fffa 100%)'
  }
  
  

  return (
    <div style={styles}>
      {props.children}
    </div>
  );
}

export default Header;
