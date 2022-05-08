import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault(evt);
    props.onUpdateAvatar(inputRef.current.value);
  };

// очищаем поля
 useEffect(() => {
    inputRef.current.value = '';
  }, [props.isOpen]);

  // валидация полей формы
  const[link, setLink] = useState('');
  const[linkDirty, setLinkDirty] = useState('');
  const[linkError, setLinkError] = useState('Поле не может быть пустым');

  const blurHandler = (e) =>{
    switch(e.target.name){
      case 'avatar-src':
        setLinkDirty(true);
        break
    }
  }
  const linkHandler = (e) =>{
    setLink(e.target.value)
    const re = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
    if (!re.test(String(e.target.value).toLowerCase())){
      setLinkError('Не корректная ссылка на картинку')
    } else {
      setLinkError('')
    }
  }

  return (
    <PopupWithForm
      name="new-avatar"
      title="Обновить аватар"
      button="profile"
      buttonText={
        props.IsSubmit
        ? 'Сохранить...'
        : 'Сохранить'
      }
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__field">
        <input
          placeholder="ссылка на изображение аватара"
          type="url"
          id="avatar-input"
          className="popup__input popup__input_avatar-img"
          name="avatar-src"
          required
          ref={inputRef}

          onChange={e => {
            linkHandler(e)
          }}
          onBlur={e => blurHandler(e)}
          value={link}          
        />
        {(linkDirty && linkError) && <span className="popup__input-error place-title-input-error">{linkError}</span>}
      </div>
    </PopupWithForm>
  )

}

export default EditAvatarPopup;