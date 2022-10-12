export default class Api {
  constructor(options) {
    this._userUrl = options.userUrl;
    this._cardUrl = options.cardUrl;
    this._token = options.token;
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      fetch(this._userUrl, {
        method: "GET",
        headers: {
          authorization: this._token
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((result) => {
          console.log(result);
          resolve(result)
        })
        .catch((err) => {
          console.log(err);
          alert('данные не получены');
          reject(err)
        })
    })

  }

  getCards() {
    return new Promise((resolve, reject) => {
      fetch(this._cardUrl, {
        method: "GET",
        headers: {
          authorization: this._token
        }
      })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          resolve(result)
        })
        .catch((err) => {
          console.log(err);
          alert('данные карточек не получены');
          reject(err)
        })
    })

  }

  createCard(data) {
    return fetch(this._cardUrl, {
      method: "POST",
      headers: {
        authorization: this._token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": data.name,
        "link": data.link,
      })
    })
    .then((res) => this._checkServer(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._cardUrl}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      }
    })
    .then((res) => this._checkServer(res));
  }

  changeUserInfo(data) {
    return fetch(this._userUrl, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.title,
          about: data.job,
        })
    })
        .then((res) => this._checkServer(res));
}

  likeCard(cardId) {
    return fetch(`${this._cardUrl}/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => this._checkServer(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._cardUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      }
    })
    .then((res) => this._checkServer(res));
  }

  changeAvatar(data) {
    return fetch(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.image,
      })
    })
      .then((res) => this._checkServer(res));
  }

  _checkServer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

}
