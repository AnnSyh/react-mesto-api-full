import React from 'react';

function Button({ title, btnClass, handleClick}) {
  return (

    <button className={btnClass} onClick={handleClick}>
      {title}
    </button>
  );
}

export default Button;