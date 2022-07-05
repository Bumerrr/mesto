import { initialCards, ValidatorConfig } from "./constans.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const popupEditingOpenButton = document.querySelector(".profile__info-button");
const popupEdit = document.querySelector(".popup_editing");
const formPopupEditing = popupEdit.querySelector(".form");
const popupEditContainer = popupEdit.querySelector('.popup__container');
const nameInputPopupEditing = popupEdit.querySelector(".popup__info_type_name");
const jobInputPopupEditing = popupEdit.querySelector(".popup__info_type_text");
const nameProfile = document.querySelector(".profile__info-name");
const textProfile = document.querySelector(".profile__info-text");
const popupEditCloseButtonOnSaved = popupEdit.querySelector(".form__save");
const popupAdd = document.querySelector(".popup_add");
const popupAddOpenButton = document.querySelector(".profile__button-add");
const formPopupAdd = popupAdd.querySelector(".form");
const popupAddContainer = popupAdd.querySelector('.popup__container');
const inputPlaceTitlePopupAdd = popupAdd.querySelector('.popup__info_type_title');
const inputPlaceLinkPopupAdd = popupAdd.querySelector('.popup__info_type_link');
const containerItems = document.querySelector(".elements__item");
const templateCards = document.querySelector('#elements-add');
const formAdd = document.querySelector('.form_add-card');
const formEdit = document.querySelector('.popup__form-profile');
const buttonsClose = document.querySelectorAll('.popup__close');
const cardsBlock = document.querySelector('.elements__list');
const templateCard = document.querySelector('#elements-add').content.querySelector('.elements__item');
const popupWindowBigImage = document.querySelector('.popup_window');
const popupWindowContainer = popupWindowBigImage.querySelector('.popup__container-window');
const popupWindowImg = popupWindowBigImage.querySelector('.popup__image-window');
const popupWindowTitle = popupWindowBigImage.querySelector('.popup__title-window');
const popupList = document.querySelectorAll('.popup');

const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closeByEsc);
}

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeByEsc);
}

const changeNameProfile = evt => {
  evt.preventDefault();
  nameProfile.textContent = nameInputPopupEditing.value;
  textProfile.textContent = jobInputPopupEditing.value;
  closePopup(popupEdit);
}

const openFormEdit = () => {
  nameInputPopupEditing.value = nameProfile.textContent;
  jobInputPopupEditing.value = textProfile.textContent;
}

function openImage(data) {
  const { name, link } = data;
  popupWindowImg.src = link;
  popupWindowImg.alt = name;
  popupWindowTitle.textContent = name;
  openPopup(popupWindowBigImage);
}

popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })

});

function createCard(data) {
  const card = new Card(data, templateCard, openImage);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(cardElement) {
  cardsBlock.prepend(cardElement);
};

initialCards.forEach((item) => {
  renderCard(createCard(item));
});

function createNewCardAddFormSubmit(evt) {
  evt.preventDefault();
  const card = createCard({ name: inputPlaceTitlePopupAdd.value, link: inputPlaceLinkPopupAdd.value });
  renderCard(card);
  closePopup(popupAdd);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};
const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(ValidatorConfig, formElement);
  formValidators[formElement.name].enableValidation();
});

function openProfilePopup(){
  openFormEdit();
  openPopup(popupEdit)
  formValidators[formEdit.name].cleanForm();
}

function openProfilePopupAdd(){
  formAdd.reset();
  formValidators[formAdd.name].cleanForm();
  openPopup(popupAdd)
}

popupEditingOpenButton.addEventListener('click', openProfilePopup);

formPopupEditing.addEventListener('submit', changeNameProfile);

 popupAddOpenButton.addEventListener('click', openProfilePopupAdd);

formPopupAdd.addEventListener('submit', createNewCardAddFormSubmit);
