class Card {
  constructor({ item, handleLikeClick }, cardSelector, openHandler, deletePopup, userId, api) {
    this._name = item.name;
    this._link = item.link;
    this._owner = item.owner._id;
    this._cardId = item._id;
    this._likes = item.likes;
    this._cardSelector = cardSelector;
    this._openHandler = openHandler;
    this._deletePopup = deletePopup;
    this._userId = userId;
    this._api = api;
    this._handleLikeClick = handleLikeClick;
    // this._clickLike = clickLike;
  }

  _getTemplate() {
    this._card = document
      .querySelector(this._cardSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);
    return this._card;
  }

  setLike() {
    if (!this._likeButton.classList.contains('elements__card-button_active')) {
      this._api.likeCard(this._cardId)
        .then(card => {
          this._likes = card.likes;
          this._likeButton.classList.add('elements__card-button_active');
          this._likesNumber.textContent = this._likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._api.deleteLike(this._cardId)
        .then(card => {
          this._likes = card.likes;
          this._likeButton.classList.remove('elements__card-button_active');
          this._likesNumber.textContent = this._likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка при удалении:${err}`);
        })
    }
  }

  _handleImageClick = () => {
    this._openHandler({ name: this._name, link: this._link });
  }

  isLiked() {
    this._likes.forEach(element => {
      if (element._id === this._userId) {
        this._likeButton.classList.add('elements__card-button_active')
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardElement = this._element.querySelector('.elements__item');
    this._likeButton = this._element.querySelector('.elements__card-button');
    this._imageNewCard = this._element.querySelector('.elements__image');
    this._deleteCard = this._element.querySelector('.elements__delete')
    this._titleCard = this._element.querySelector('.elements__card-title');
    this._likesNumber = this._element.querySelector('.elements__card-number');
    this._likesNumber.textContent = this._likes.length;
    this._imageNewCard.src = this._link;
    this._imageNewCard.alt = this._name;
    this._titleCard.textContent = this._name;
    this.isLiked()
    this._setEventListeners();
    if (this._owner === this._userId) {
      return this._element;
    } else {
      this._deleteCard.remove();
      return this._element;
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => { this._handleLikeClick() })
    this._deleteCard.addEventListener('click', () => {
      this._deletePopup(this._cardId, this._card)
    })
    this._imageNewCard.addEventListener('click', this._handleImageClick)
  }

}

export default Card;
