import React from 'react';

function PopupWithOutForm(props) {

  return (

    <div className={`${props.name}`}>
        <div className={`popup ${props.name}__popup  ${props.isOpen && "popup_opened"}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <div className="popup__container">
                <div className="form popup__form">
                    <button 
                        className={`popup__close popup__close_${props.name}`}
                        type="button"
                        onClick={props.onClose}
                        >
                        </button>

                    {props.children}
                   
                </div>
            </div>
        </div>
    </div>
    
  );
}

export default PopupWithOutForm;
