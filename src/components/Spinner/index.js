import React from 'react';

import './styles.css';

function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner__lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
