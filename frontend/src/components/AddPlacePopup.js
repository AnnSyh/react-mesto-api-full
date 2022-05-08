import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  // console.log('props = ',props);
  // console.log('props.isSubmit = ',props.IsSubmit);

  const [nameCard, setNameCard] = useState('');
  const [linkCard, setLinkCard] = useState('');

  function handleСhangeCardName(e) {
    setNameCard(e.target.value);
  }

  function handleСhangeCardLink(e) {
    setLinkCard(e.target.value);
  }
  
  function handleSubmit(evt) {
    evt.preventDefault(evt);

    props.onAddPlace({
      name: nameCard,
      link: linkCard
    });

  }

   // очищаем поля
   useEffect(() => {
    setNameCard("");
    setLinkCard("");
  }, [props.isOpen])

// валидация полей формы
  const[name, setName] = useState('');
  const[link, setLink] = useState('');
  const[nameDirty, setNameDirty] = useState('');
  const[linkDirty, setLinkDirty] = useState('');
  const[nameError, setNameError] = useState('Поле name не может быть пустым');
  const[linkError, setLinkError] = useState('Поле link не может быть пустым');

  const blurHandler = (e) =>{
    switch(e.target.name){
      case 'name':
        setNameDirty(true);
        break
      case 'link':
        setLinkDirty(true);
        break
    }
  }
  const nameHandler = (e) =>{
    setName(e.target.value)
    const re = /^[a-zA-Zа-яА-Я]+$/ui;
    if (!re.test(String(e.target.value).toLowerCase())){
      setNameError('Не корректное имя')
    } else {
      setNameError('')
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
      title='Новое место'
      name='add-plaсe'
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
            placeholder="название" 
            id="place-title-input" 
            className="popup__input popup__input_plaсe-title" 
            name="name" 
            required 
            minLength="2" 
            maxLength="30" 
            value={nameCard}
            onChange={e => {
              handleСhangeCardName(e)
              nameHandler(e)
            }}
            onBlur={e => blurHandler(e)}
        />
        {(nameDirty && nameError) && <span className="popup__input-error place-title-input-error">{nameError}</span>}
        
      </div>
      <div className="form__field">
        <input 
          placeholder="ссылка на картинку" 
          id="plaсe-img-input" 
          className="popup__input popup__input_plaсe-img" 
          name="link" 
          required 
          type="url" 
          value={linkCard}
          onChange={e => {
            handleСhangeCardLink(e)
            linkHandler(e)
          }}
          onBlur={e => blurHandler(e)}
        />
       {(linkDirty && linkError) && <span className="popup__input-error place-title-input-error">{linkError}</span>}
      </div>
    </PopupWithForm>
  )

}

export default AddPlacePopup;