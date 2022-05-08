import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api.js';
import PageNotFound from './PageNotFound';
import Register from './Register';
import Login from './Login';
import CurrentUserContext from '../contexts/CurrentUserContext';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import ProtectedRoute from './ProtectedRoute';

import * as auth from '../utils/auth';


function App() {
  const [cards, setCards] = useState([]);
  //получаем массив карточек
  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));

  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и удаляем карточку 
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    const name = card.name;
    const link = card.link;
    setIsSubmitting(true);
    // buttonText = "Сохраняется...";
    // Отправляем запрос в API и добавляем карточку 
    api
      .postCreateCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(
        () => {
          setIsSubmitting(false);
          // buttonText = "Сохранить";
        }
      );
  }

  //  Отправляем запрос в API и устанавливаем текущего юзера
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    api
      .getUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  // открытие всплывающих попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isFailInfoTooltipOpen, setisFailInfoTooltipOpen] = useState(false)
  const [isSuccessInfoTooltipOpen, setisSuccessInfoTooltipOpen] = useState(false)
  // ...(на submit)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleConfirmClick = () => {
    setIsConfirmPopupOpen(true)
  }
  const handleImagePopupOpen = () => {
    setIsImagePopupOpen(true)
  }
  const handleFailInfoTooltipOpen = () => {
    setisFailInfoTooltipOpen(true)
  }
  const handleSuccessInfoTooltipOpen = () => {
    setisSuccessInfoTooltipOpen(true)
  }

  //открываем попап с картинкой
  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setSelectedCard(card)       //передаем  данные карточки
    setIsImagePopupOpen(true)   //открываем попап скартинкой
  };

  //закрываем все попапы
  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setisFailInfoTooltipOpen(false);
    setisSuccessInfoTooltipOpen(false);
  };

  // кнопка Escape
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  // Функция обновления пользователя 
  function handleUpdateUser(user) {
    setIsSubmitting(true);
    // buttonText = "Сохраняется...";
    api
      .postUser(user)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(
        () => {
          setIsSubmitting(false);
          // buttonText = "Сохранить";
        }
      );
  }

  // Функция обновления аватара 
  function handleUpdateAvatar(avatar) {
    setIsSubmitting(true);
    // buttonText = "Сохраняется...";
    api
      .postAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(
        () => {
          setIsSubmitting(false);
          // buttonText = "Сохранить";
        }
      );
  }

  //Регистрация
  const [loggedIn, setLoggedIn] = useState(false)

  const [userData, setUserData] = useState({
    username: '',
    email: '',
  })
  const history = useHistory();

  useEffect(() => tokenCheck(), [])
  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn])

  function handleLogin(username, password) {
    auth
      .authorize(username, password)
      .then((data) => {
          const userData = { username, password }
          localStorage.setItem('token', data.token);  // в localStorage записываем текущий token
          setUserData(userData)                       // устанавливаем данные юзера
          setLoggedIn(true)                           // меняем состояние на залогинен
      })
      .catch((err) => {
        setisFailInfoTooltipOpen(true);
        console.log(err);
      })
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setisSuccessInfoTooltipOpen(true);
        history.push('/sign-in')
      })
      .catch((err) => {
        setisFailInfoTooltipOpen(true);
        console.log(err);
      })
  }

  //Функция проверки токена в локальном хранилище
  const tokenCheck = () => {
    //Получаем токен из локального хранилища
    const token = localStorage.getItem('token');

    if (localStorage.getItem('token')) {
      auth.getContent(token).then((res) => {
        if (res) {

console.log('res = ',res);

          const { _id, email, message } = res.data;
          const userData = { _id, email }
          setUserData(userData)
          setLoggedIn(true)
          history.push('/');
        }
      });
    }
  }

  //разлогинивание
  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        signOut={signOut}
        userData={userData}
      />
      <Switch>
        <Route exact path="/sign-up">
          <Register
            handleRegister={handleRegister}
            handleFailInfoTooltipOpen={handleFailInfoTooltipOpen}
            handleSuccessInfoTooltipOpen={handleSuccessInfoTooltipOpen}
          />
        </Route>
        <Route exact path="/sign-in">
          <Login handleLogin={handleLogin} />
        </Route>

        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn}
          component={Main}

          handleEditAvatarClick={handleEditAvatarClick}
          handleEditProfileClick={handleEditProfileClick}
          handleAddPlaceClick={handleAddPlaceClick}
          handleConfirmClick={handleConfirmClick}
          handleImagePopupOpen={handleImagePopupOpen}
          handleCardClick={handleCardClick}

          cards={cards}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
        >

          <Footer />
        </ProtectedRoute>

        {/* стр не найдена */}
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>

      {/* /попап для не успешной регистрации */}
      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isFailInfoTooltipOpen}
        message={'Что-то пошло не так! Попробуйте ещё раз.'}
      />
      {/* /попап для успешной регистрации */}
      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isSuccessInfoTooltipOpen}
        message={'Поздравляю! Вы зарегистрировались'}
      />

      {/* /попап для картинки карточки */}
      <ImagePopup
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        name={selectedCard.name}
        link={selectedCard.link}
      />
      {/* попап Редактировать профиль */}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        IsSubmit={isSubmitting}
      />
      {/* попап добавления карточки       */}
      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        IsSubmit={isSubmitting}
      />
      {/* попап Обновить аватар       */}
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        IsSubmit={isSubmitting}
      />

      {/* попап с удалением карточки */}
      <PopupWithForm onClose={closeAllPopups}
        isOpen={isConfirmPopupOpen}
        title='Вы уверены?'
        name='confirmation'
        buttonText='Сохранить'
      >
      </PopupWithForm>

    </CurrentUserContext.Provider>
  );
}

export default App;
