import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';


function EditProfilePopup(props){
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription ] =useState('');


    function handleChangeName(evt) {
        setName(evt.target.value);
    };

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    };

//передаем введенный в поля текст
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault(evt);
        props.onUpdateUser({
            name: name,
            about: description
        });
    };

// валидация полей формы
const[userName, setUserName] = useState('');
const[userAbout, setUserAbout] = useState(''); 
const[userNameDirty, setUserNameDirty] = useState('');
const[userAboutDirty, setUserAboutDirty] = useState(''); 
const[userNameError, setUserNameError] = useState('Поле name не может быть пустым');
const[userAboutError, setUserAboutError] = useState('Поле about не может быть пустым');

const blurHandler = (e) =>{
    switch(e.target.name){
      case 'title':
        setUserNameDirty(true);
        break
      case 'subtitle':
        setUserAboutDirty(true);
        break
    }
  }

  const nameHandler = (e) =>{
    setUserName(e.target.value)
    const re = /^[a-zA-Zа-яА-Я]+$/ui;
    if (!re.test(String(e.target.value).toLowerCase())){
      setUserNameError('Не корректное имя')
    } else {
      setUserNameError('')
    }
  }
  const aboutHandler = (e) =>{
    setUserAbout(e.target.value)
    const re = /^[a-zA-Zа-яА-Я]+$/ui;
    if (!re.test(String(e.target.value).toLowerCase())){
      setUserAboutError('Не корректное имя')
    } else {
      setUserAboutError('')
    }
  }  


    return(
        <PopupWithForm 
            name="edit-profile"
            title="Редактировать профиль"
            button="profile"
            buttonText={
                props.IsSubmit
                ? 'Сохранить профиль...'
                : 'Сохранить профиль'
              }
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
          <div className="form__field">
            <input 
                placeholder="Имя" 
                type="text"
                id="user-title" 
                className="popup__input popup__input_user-title" 
                name="title" 
                required 
                minLength="2"
                maxLength="40" 
                value={name|| ''}
                onChange={e => {
                    handleChangeName(e)
                    nameHandler(e)
                  }}
                onBlur={e => blurHandler(e)}
              />
             {(userNameDirty && userNameError) && <span className="popup__input-error place-title-input-error">{userNameError}</span>}
          </div>
          <div className="form__field">
              <input    placeholder="О себе" 
                        type="text"
                        id="user-subtitle" 
                        className="popup__input popup__input_user-subtitle" 
                        name="subtitle" 
                        required 
                        minLength="2" 
                        maxLength="200" 
                        value={description || ''}
                        onChange={e => {
                            handleChangeDescription(e)
                            aboutHandler(e)
                          }}                         
                        onBlur={e => blurHandler(e)}  
                />
             {(userAboutDirty && userAboutError) && <span className="popup__input-error place-title-input-error">{userAboutError}</span>}
          </div>
        </PopupWithForm>
    )
        
}

export default EditProfilePopup;