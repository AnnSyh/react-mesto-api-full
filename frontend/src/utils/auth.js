export const BASE_URL = 'https://auth.nomoreparties.co';

const handleResponse = response => {
if (response.ok) { 
  return response.json();
}

return Promise.reject(`Ошибка ${response.status}`);
};

//Функция регистрация пользователя
export const register = (email, password) => {

  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(handleResponse);
};

//Функция авторизация пользователя
export const authorize = (email, password) => {

  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(handleResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then(handleResponse)
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => data)
}