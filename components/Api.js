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
        .then(res => res.json())
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


  async createCard(data) {

    try {
      const rawResponse = await fetch(this._cardUrl, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": data.name,
          "link": data.link,
        })
      });
      const content = await rawResponse.json();
      return content
    } catch (e) {
      alert('Дичь произошла')
      console.log(e)
    }

    return []
  }

  deleteCard(cardId) {
    return fetch(`${this._cardUrl}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
  }

  async changeUserInfo(data) {
    try {
      const res = await fetch(this._userUrl, {
        method: "PATCH",
        headers: {
          authorization: this._token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.title,
          about: data.job,
        })
      });
      return await res.json();
    } catch (e) {
      alert('Дичь произошла')
      console.log(e)
    }

    return []
  }

  async changeAvatar(data) {
    try {
      const avatar = await fetch(`${this._userUrl}/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data.image,
        })
      });
      const content = await avatar.json();
      return content
    } catch (e) {
      alert('аватар не загрузился')
      console.log(e)
    }

    return []
  }

  likeCard(cardId) {
    return fetch(`${this._cardUrl}/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
  }

  deleteLike(cardId) {
    return fetch(`${this._cardUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
  }

}
