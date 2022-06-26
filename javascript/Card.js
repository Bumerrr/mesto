
class Card {
  constructor(data, cardSelector, openHandler) {
    const { name, link } = data;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    // console.log(this._cardSelector)
    this._openHandler = openHandler;
    // console.log(this._openHandler)
  }
  // клонирование шаблона template
  _getTemplate() {
    const cardElement = document.querySelector('#elements-add').content.querySelector('.elements__item').cloneNode(true);
    //  console.log(cardElement);
    return cardElement;
  }
  _buttonAddingLike = (evt) => {
    evt.target.classList.toggle("elements__card-button_active");
  }
  _btnDeletHandler = () => {
    this._element.remove();
  }
  _handleImgClick = () => {
    this._openHandler({link: this._link, name: this._name});
  }
  // // функция откр попап картинки
  // функция закр попап картинки
  // заполнение карточек
  generateCard() {
    this._element = this._getTemplate();
    this._cardElement = this._element.querySelector('.elements__item');
    this._likeCard = this._element.querySelector('.elements__card-button');
    this._deleteCard = this._element.querySelector('.elements__delete');
    // console.log(this._deleteCard)
    this._imageNewCard = this._element.querySelector('.elements__image');
    // console.log(this._imageNewCard)
    this._titleCard = this._element.querySelector('.elements__card-title');
    this._imageNewCard.src = this._link;
    this._imageNewCard.alt = this._name;
    this._titleCard.textContent = this._name;
    this._setEventListeners();
    // console.log(this._element);
    return this._element;
    
  }
  // слушатель событий
  _setEventListeners() {
    // лайк карточки
    this._likeCard.addEventListener("click", this._buttonAddingLike)
    // удаление карточек
    this._deleteCard.addEventListener('click', this._btnDeletHandler)
    // // откр попап картинки
    this._imageNewCard.addEventListener('click', this._handleImgClick)
  }
}

//     _getTemplate() {
//       const cardElement = document.querySelector('#elements-add').content.querySelector('.elements__item').cloneNode(true);
//       return cardElement;

//     }

//     generateCard() {
//         this._element = this._getTemplate();
//         this._elementsList = this
//         this._cardElement = this._element.querySelector('.elements__item');
//         this._likeCard = this._element.querySelector('.elements__card-button');
//         this._deleteCard = this._element.querySelector('.elements__delete');
//         this._imageNewCard = this._element.querySelector('.elements__image');
//         this._titleCard = this._element.querySelector('.elements__card-title');
//         this._imageNewCard.src = this._link;
//         this._imageNewCard.alt = this._name;
//         this._titleCard.textContent = this._name;
//         return this._element;
//     }
//   }
//   сardsContainer.forEach((item)=> {
//     const card = new Card(item.name, item.link);
//     const cardElementCard = card.generateCard();

//     document.querySelector('.elements__list').append(cardElementCard);
//     console.log(document.querySelector('.elements__list').append(cardElementCard))
//   });
export default Card;