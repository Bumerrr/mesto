/*массив*/
const initialCards = [
  {
    name: 'Blue',
    link: './image/bmw.jpg'
  },
  {
    name: 'Yellow',
    link: './image/audi.jpg'
  },
  {
    name: 'Red',
    link: './image/bmwred.jpg'
  },
  {
    name: 'Grey',
    link: './image/mers.jpg'
  },
  {
    name: 'Different',
    link: './image/allcar.jpg'
  },
  {
    name: 'Black',
    link: './image/mst.jpg'
  }
];


/*переменные для попап editing */
const openEditingPopupButton = document.querySelector(".profile__info-button");
const popupCloseButtonOnSaved = document.querySelector(".popup__saved");
const formEdit = document.querySelector(".popup__content");
const popupEdit = document.querySelector(".popup_editing");
const popupEditContainer = popupEdit.querySelector('.popup__container');
const nameInput = document.querySelector(".popup__info_type_name");
const jobInput = document.querySelector(".popup__info_type_text");
const nameProfile = document.querySelector(".profile__info-name");
const textProfile = document.querySelector(".profile__info-text");

/*переменные для попап add */
const openAddPopupButton = document.querySelector(".profile__button-add");
const popupAdd = document.querySelector(".popup_add");
const formAdd = popupAdd.querySelector(".popup__content");
const popupAddContainer = popupAdd.querySelector('.popup__container');
const inputPlaceTitle = popupAdd.querySelector('.popup__info_type_title');
const inputPlaceLink = popupAdd.querySelector('.popup__info_type_link');
const popupAddCloseButtonOnSaved = popupAdd.querySelector(".popup__saved");

/*переменные для закрытия */
const closeButtons = document.querySelectorAll('.popup__close');

/*переменные для генерации */
const cardsBlock = document.querySelector('.elements__list');
const templateCard = document.querySelector('#elements-add').content.querySelector('.elements__item');

/*переменные для попап Window */
const popupWindowBigImage = document.querySelector('.popup_window');
const popupWindowContainer = popupWindowBigImage.querySelector('.popup__container-window');
const popupWindowImg = popupWindowBigImage.querySelector('.popup__image-window');
const popupWindowTitle = popupWindowBigImage.querySelector('.popup__title-window');

/*функция открытия попап */ 
const openPopup = visible => {
  visible.classList.add('popup_opened');
}

/*функция закрытия попап */ 
const closePopup = hidden => {
  hidden.classList.remove('popup_opened');
}

/*функция открытия формы попап Editing с преобразованием значений*/ 
const modifiedNameProfile = evt => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  textProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

/*функция открытия формы попап Editing с сохранением значений*/ 
const openFormEdit = () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = textProfile.textContent;
  openPopup(popupEdit);
}

/*функция открытия формы попап Editing с сохранением значений*/ 
const createNewCardAddFormSubmit = evt => {
  evt.preventDefault();
  visibilityCard(
    {name: inputPlaceTitle.value, link: inputPlaceLink.value}
  );
  closePopup(popupAdd);
   inputPlaceTitle.value = inputPlaceLink.value = '';
}

/*функция лайка*/
const likeAdd = evt => evt.currentTarget.classList.toggle('elements__card-button_active');

/*генерация карточки*/
const generateItem = main => {
  const cardCreate = templateCard.cloneNode(true);
  const imageNewCard = cardCreate.querySelector('.elements__image');
  const titleNewCard = cardCreate.querySelector('.elements__card-title');
  const newCardLikeBtn = cardCreate.querySelector('.elements__card-button');
  const newCardDeleteBtn = cardCreate.querySelector('.elements__delete');
  imageNewCard.src = main.link;
  imageNewCard.alt = main.name;
  titleNewCard.textContent = main.name;
  imageNewCard.addEventListener('click', () => openImage(main));
  newCardLikeBtn.addEventListener('click', likeAdd);
  newCardDeleteBtn.addEventListener('click', deleteCard);
  return cardCreate;
}

/*активация карточек*/
const visibilityCard = sixCard => cardsBlock.prepend(generateItem(sixCard));

/*удаление карточки*/
const deleteCard = evt => evt.target.closest('.elements__item').remove();

/*попап изображение*/
const openImage = cardInfo => {
    popupWindowImg.src = cardInfo.link;
    popupWindowImg.alt = cardInfo.name
    popupWindowTitle.textContent = cardInfo.name;
    openPopup(popupWindowBigImage);
}
/*создания массива карточек*/
initialCards.forEach(sixCard => visibilityCard(sixCard));

/*функция закрытия попап*/
closeButtons.forEach((type) => {
    const popup = type.closest('.popup');
    type.addEventListener('click', () => closePopup(popup));
});



/*обработчик собитий для попап editing*/
openEditingPopupButton.addEventListener('click', openFormEdit);
popupEdit.addEventListener('click', () => closePopup(popupEdit));
formEdit.addEventListener('submit', modifiedNameProfile);
popupEditContainer.addEventListener('click', visible => visible.stopPropagation());

/*обработчик собитий для попап add*/
openAddPopupButton.addEventListener('click', () => openPopup(popupAdd));
popupAdd.addEventListener('click', () => closePopup(popupAdd));
formAdd.addEventListener('submit', createNewCardAddFormSubmit);
popupAddContainer.addEventListener('click', visible => visible.stopPropagation());

/*обработчик собитий для попап Window*/
popupWindowBigImage.addEventListener('click', () => openPopup(popupWindowBigImage));
popupWindowBigImage.addEventListener('click', () => closePopup(popupWindowBigImage));
popupWindowContainer.addEventListener('click', visible => visible.stopPropagation());
