import '../pages/index.css'
import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import {
  initialCards,
  validatorConfig,
  formValidators,
  popupEditingOpenButton,
  popupAddOpenButton,
  templateCards,
  cardsBlock,
  formConfiguration,
  popupConfiguration,
  cardsContainerSelector,
  newPlacePopupSelector,
  profileFormName,
  newPlaceFormName,
  profileConfiguration,
  profilePopupSelector,
  imagePopupSelector,
  bigImagePopupConfiguration,
} from "../scripts/constants.js";

import PopupWithForm from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";

function renderCard(cardElement) {
  cardsBlock.prepend(cardElement);
};

Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(validatorConfig, formElement);
  formValidators[formElement.name].enableValidation();
});

  const bigImagePopup = new PopupWithImage(imagePopupSelector, popupConfiguration, bigImagePopupConfiguration);
  bigImagePopup.setEventListeners();

  function createCard(item) {
    const card = new Card({item}, templateCards, bigImagePopup.open);
    return card.generateCard();
  }
  
  initialCards.forEach((item) => {
    renderCard(createCard(item));
  });
  
const cardsContainer = new Section({
  items: initialCards.reverse(),
  renderer: createCard,
},
  cardsContainerSelector
);

cardsContainer.renderAll();

const handleCardSubmit = (item) => {
  cardsContainer.addItem(item);
}

const newCardPopup = new PopupWithForm(
  newPlacePopupSelector,
  newPlaceFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[newPlaceFormName].cleanForm,
  handleCardSubmit,
  );
newCardPopup.setEventListeners();

const user = new UserInfo(profileConfiguration);

const addCardSubmitHandler = () => {
  newCardPopup.open();
}

function handleProfileFormSubmit(data) {
  user.setUserInfo(data);
}

const profilePopup = new PopupWithForm(
  profilePopupSelector,
  profileFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[profileFormName].cleanForm,
  handleProfileFormSubmit,
  user.getUserInfo,
  );

profilePopup.setEventListeners();

const handlePforilePopupOpen = () => {
  profilePopup.open();
}

popupEditingOpenButton.addEventListener('click', handlePforilePopupOpen); // открытие попап редактирования
popupAddOpenButton.addEventListener('click', addCardSubmitHandler); // открытие попап добавления карточки5