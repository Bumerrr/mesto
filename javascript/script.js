/*массив*/
const сardsContainer = [
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
const popupEditingOpenButton = document.querySelector(".profile__info-button");
const popupEdit = document.querySelector(".popup_editing");

const formPopupEditing = popupEdit.querySelector(".form");
const popupEditContainer = popupEdit.querySelector('.popup__container');
const nameInputPopupEditing = popupEdit.querySelector(".popup__info_type_name");
const jobInputPopupEditing = popupEdit.querySelector(".popup__info_type_text");
const nameProfile = document.querySelector(".profile__info-name");
const textProfile = document.querySelector(".profile__info-text");
const popupEditCloseButtonOnSaved = popupEdit.querySelector(".form__save");

/*переменные для попап add */
const popupAdd = document.querySelector(".popup_add");
const popupAddOpenButton = document.querySelector(".profile__button-add");
const popupAddCloseButtonOnSaved = popupAdd.querySelector(".form__save");
const formPopupAdd = popupAdd.querySelector(".form");
const popupAddContainer = popupAdd.querySelector('.popup__container');
const inputPlaceTitlePopupAdd = popupAdd.querySelector('.popup__info_type_title');
const inputPlaceLinkPopupAdd = popupAdd.querySelector('.popup__info_type_link');

/*переменные для закрытия */
const buttonsClose = document.querySelectorAll('.popup__close');

/*переменные для генерации */
const cardsBlock = document.querySelector('.elements__list');
const templateCard = document.querySelector('#elements-add').content.querySelector('.elements__item');

/*переменные для попап Window */
const popupWindowBigImage = document.querySelector('.popup_window');
const popupWindowContainer = popupWindowBigImage.querySelector('.popup__container-window');
const popupWindowImg = popupWindowBigImage.querySelector('.popup__image-window');
const popupWindowTitle = popupWindowBigImage.querySelector('.popup__title-window');





/*функция открытия попап */ 
const openPopup = popup => {
  popup.classList.add('popup_opened');
}

/*функция закрытия попап */ 
const closePopup = popup => {
  popup.classList.remove('popup_opened');
}

/*функция открытия формы попап Editing с преобразованием значений*/ 
const changeNameProfile = evt => {
  evt.preventDefault();
  nameProfile.textContent = nameInputPopupEditing.value;
  textProfile.textContent = jobInputPopupEditing.value;
  closePopup(popupEdit);
}

/*функция открытия формы попап Editing с сохранением значений*/ 
const openFormEdit = () => {
  nameInputPopupEditing.value = nameProfile.textContent;
  jobInputPopupEditing.value = textProfile.textContent;
  openPopup(popupEdit);
}

/*функция открытия формы попап Editing с сохранением значений*/ 
const createNewCardAddFormSubmit = evt => {
  evt.preventDefault();
  showCard(
    {name: inputPlaceTitlePopupAdd.value, link: inputPlaceLinkPopupAdd.value}
  );
  popupAddCloseButtonOnSaved.disabled = true;
  popupAddCloseButtonOnSaved.classList.add('form__save_disabled');
  closePopup(popupAdd);
   inputPlaceTitlePopupAdd.value = '';
   inputPlaceLinkPopupAdd.value = '';
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
const showCard = cardContent => cardsBlock.prepend(generateItem(cardContent));

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
сardsContainer.forEach(cardContent => showCard(cardContent));

/*функция закрытия попап*/
buttonsClose.forEach((type) => {
    const popup = type.closest('.popup');
    type.addEventListener('click', () => closePopup(popup));
});

const popupList = document.querySelectorAll('.popup');
popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
       closePopup(popup)
    }
  })
}); 

function closeEsc (evt) {
  if(evt.key === "Escape") {
    closePopup(popupEdit);
    closePopup(popupAdd);
    closePopup(popupWindowBigImage);
  }
}
document.addEventListener("keydown", closeEsc);



/*обработчик собитий для попап editing*/
popupEditingOpenButton.addEventListener('click', openFormEdit);
// popupEdit.addEventListener('click', () => closePopup(popupEdit));
formPopupEditing.addEventListener('submit', changeNameProfile);
popupEditContainer.addEventListener('click', popup => popup.stopPropagation());

/*обработчик собитий для попап add*/
popupAddOpenButton.addEventListener('click', () => openPopup(popupAdd));
// popupAdd.addEventListener('click', () => closePopup(popupAdd));
formPopupAdd.addEventListener('submit', createNewCardAddFormSubmit);
popupAddContainer.addEventListener('click', popup => popup.stopPropagation());

/*обработчик собитий для попап Window*/
// popupWindowBigImage.addEventListener('click', () => closePopup(popupWindowBigImage));
popupWindowContainer.addEventListener('click', popup => popup.stopPropagation());