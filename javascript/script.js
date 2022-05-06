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
/*переменная для popup */
const popup = document.querySelector(".popup");

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
nameInput.value = nameProfile.textContent;
jobInput.value = textProfile.textContent;

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
const popupWindow = document.querySelector('.popup_window');
const popupWindowContainer = popupWindow.querySelector('.popup__container-window');
const popupWindowImg = popupWindow.querySelector('.popup__image-window');
const popupWindowTitle = popupWindow.querySelector('.popup__title-window');

/*функция открытия попап */ 
const openPopup = open => {
  open.classList.add('popup_opened');
}

/*функция закрытия попап */ 
const popupClose = close => {
  close.classList.remove('popup_opened');
}

/*функция открытия формы попап Editing с преобразованием значений*/ 
const changeNameProfile = evt => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  textProfile.textContent = jobInput.value;
  popupClose(popupEdit);
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
  inputPlaceTitle.value = inputPlaceLink.value = '';
  popupClose(popupAdd);
}

/*функция лайка*/
const likeAdd = evt => evt.currentTarget.classList.toggle('elements__card-button_active');

/*генерация карточки*/
const generateItem = main => {
  const createCard = templateCard.cloneNode(true);
  const imageNewCard = createCard.querySelector('.elements__image');
  const titleNewCard = createCard.querySelector('.elements__card-title');
  const newCardLikeBtn = createCard.querySelector('.elements__card-button');
  const newCardDeleteBtn = createCard.querySelector('.elements__delete');
  imageNewCard.src = main.link;
  imageNewCard.alt = titleNewCard.textContent = main.name;
  imageNewCard.addEventListener('click', () => openImage(main));
  newCardLikeBtn.addEventListener('click', likeAdd);
  newCardDeleteBtn.addEventListener('click', deleteCard);
  return createCard;
}

/*активация карточек*/
const visibilityCard = sixCard => cardsBlock.prepend(generateItem(sixCard));

/*удаление карточки*/
const deleteCard = evt => evt.target.closest('.elements__item').remove();

/*попап изображение*/
const openImage = cardInfo => {
    popupWindowImg.src = cardInfo.link;
    popupWindowImg.alt = popupWindowTitle.textContent = cardInfo.name;
    openPopup(popupWindow);
}
/*создания массива карточек*/
initialCards.forEach(sixCard => visibilityCard(sixCard));

/*функция закрытия попап*/
closeButtons.forEach((type) => {
    const popup = type.closest('.popup');
    type.addEventListener('click', () => popupClose(popup));
});



/*обработчик собитий для попап editing*/
openEditingPopupButton.addEventListener('click', openFormEdit);
popupEdit.addEventListener('click', () => popupClose(popupEdit));
formEdit.addEventListener('submit', changeNameProfile);
popupEditContainer.addEventListener('click', open => open.stopPropagation());

/*обработчик собитий для попап add*/
openAddPopupButton.addEventListener('click', () => openPopup(popupAdd));
popupAdd.addEventListener('click', () => popupClose(popupAdd));
formAdd.addEventListener('submit', createNewCardAddFormSubmit);
popupAddContainer.addEventListener('click', open => open.stopPropagation());

/*обработчик собитий для попап Window*/
popupWindow.addEventListener('click', () => openPopup(popupWindow));
popupWindow.addEventListener('click', () => popupClose(popupWindow));
popupWindowContainer.addEventListener('click', open => open.stopPropagation());
