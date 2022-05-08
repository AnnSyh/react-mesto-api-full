import React from 'react';
import PopupWithOutForm from './PopupWithOutForm';
import checkedIcon from '../images/checked.svg';

function InfoTooltip(props) {

    return (

        <PopupWithOutForm
            name="info-tooltip"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
          <div className="form__field form__field-center">
            <img className="popup__img popup__img_icon"
                    src={checkedIcon}
                    alt='checked' />
            <h2 className="page-title popup__page-title text-center">
              {props.message}
              </h2>
          </div>
      </PopupWithOutForm>

    );
}

export default InfoTooltip;