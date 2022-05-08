import React from 'react';

function PopupWithForm(props) {

  return (

    <div className={`${props.name}`}>
        <div className={`popup ${props.name}__popup  ${props.isOpen && "popup_opened"}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <div className="popup__container">
                <form className="form popup__form"
                    name={`${props.name}`}
                    onSubmit={props.onSubmit}
                    // noValidate
                    >
                    <button 
                        className={`popup__close popup__close_${props.name}`}
                        type="button"
                        onClick={props.onClose}
                        >
                        </button>
                    <h2 className="page-title popup__page-title  text-overflow">{props.title}</h2>

                    {props.children}
                    
                    <button className="popup__btn"
                        name="btn"
                        type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    </div>
    
  );
}

export default PopupWithForm;
