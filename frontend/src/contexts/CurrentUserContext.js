import React from 'react';
import avatar from '../images/avatar.jpg';

const CurrentUserContext = React.createContext();

// умолчальные данные
const currentUser = {
    name: 'Имя пользователя',
    about: 'О пользователе',
    avatar: {avatar},
}; 

// console.log('Provider value = ',CurrentUserContext.value)
// console.log('currentUser = ',currentUser)

export default CurrentUserContext;