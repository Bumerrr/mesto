class Card {
  constructor({item}, cardSelector, openHandler) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._openHandler = openHandler;
  }

  _getTemplate() {
    this._card = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
    return this._card; 
  }

  _buttonAddingLike = () => {
    this._likeCard.classList.toggle("elements__card-button_active");
  }

  _btnDeletHandler = () => {
    this._element.remove();
    this._element = null
  }
  
  _handleImgClick = () => {
    this._openHandler({ name: this._name, link: this._link });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardElement = this._element.querySelector('.elements__item');
    this._likeCard = this._element.querySelector('.elements__card-button');
    this._deleteCard = this._element.querySelector('.elements__delete');
    this._imageNewCard = this._element.querySelector('.elements__image');
    this._titleCard = this._element.querySelector('.elements__card-title');
    this._imageNewCard.src = this._link;
    this._imageNewCard.alt = this._name;
    this._titleCard.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }


  _setEventListeners() {
    this._likeCard.addEventListener("click", this._buttonAddingLike)
    this._deleteCard.addEventListener('click', this._btnDeletHandler)
    this._imageNewCard.addEventListener('click', this._handleImgClick)
  }
}

export default Card;