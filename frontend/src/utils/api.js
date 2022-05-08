
const handleError = res => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};



class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      // body: JSON.stringify()
    })
      .then(handleError);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      // body: JSON.stringify()
    })
      .then(handleError);
  }


  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(handleError);
  }



  postUser(user){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(user)
    })
      .then(handleError);
  }
  postAvatar(avatar){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(handleError);
  }


  postCreateCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(handleError);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(handleError);
  }

  postLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(handleError);
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(handleError);
  }

  changeLike(id, like){
    if(!id) {
      console.error("Api.changeLike не передан обязательный аргумент cardId. Такой запрос не пройдет.");
      return;
    }
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: (like ? 'PUT' : 'DELETE'),
      headers: this._headers
    })
      .then(handleError);
  }


}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
  authorization: "1690dfea-cbda-42f6-a87e-a16c1f76892e",
  "Content-Type": "application/json",
  },
});

export default api;