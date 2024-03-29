import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
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
  popupAvatarOpenButton,
  avatarPopupSelector,
  profileAvatar,
  deletePopupSelector,
} from "../utils/constants.js";

import PopupWithForm from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import Popup from '../components/Popup';


async function init() {
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
    headers: {
      authorization: 'b84ca8c8-70d1-421e-a05d-8cb603f10d20',
      'Content-Type': 'application/json'
    },
  });
  let userId = null;
  const user = new UserInfo(profileConfiguration);

  Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      console.log(userData)
      console.log(cards)
      cardsContainer.renderAll(cards);
      user.setUserInfo(userData);
      user.setAvatar(userData)
    })
    .catch((err) => {
      console.log(`Ошибка Promise all:${err}`);
    })

  Array.from(document.forms).forEach((formElement) => {
    formValidators[formElement.name] = new FormValidator(validatorConfig, formElement);
    formValidators[formElement.name].enableValidation();
  });

  const bigImagePopup = new PopupWithImage(
    imagePopupSelector,
    popupConfiguration,
    bigImagePopupConfiguration);

  bigImagePopup.setEventListeners();

  function createCard(item) {
    if (item === undefined) {
    }
    const card = new Card(
      {
        item,
        handleLikeClick: () => {
          card.setLike()
        },
      },
      templateCards,
      bigImagePopup.open,
      openCardDelete,
      userId,
      api,

    );

    return card.generateCard();
  }

  let cardId, cardElement

  const deletePopup = new PopupWithConfirmation(
    deletePopupSelector,
    popupConfiguration
  );

  deletePopup.setEventListeners()

  const openCardDelete = (cardId2, cardElement2) => {
    console.log("openCardDelete", cardId2, cardElement2)
    cardId = cardId2
    cardElement = cardElement2
    deletePopup.setListener(submitCardDelete)
    deletePopup.open();
  }

  const submitCardDelete = () => {
    console.log("submitCardDelete", cardId, cardElement)
    deletePopup.renderLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        cardElement = null;
        deletePopup.close()
      })
      .catch(err => console.log(`Ошибка при удалении:${err}`))
      .finally(() => {
        deletePopup.renderLoading(false);
      })
  }

  const cardsContainer = new Section({
    renderer: createCard,
  },
    cardsContainerSelector
  );

  const handleCardSubmit = async (item) => {
    newCardPopup.renderLoading(true);
    await api.createCard(item)
      .then((res) => {
        cardsContainer.addItem(res);
        newCardPopup.close()
      })
      .catch(err => console.log(`Ошибка при добавлении карточки:${err}`))
      .finally(() => {
        newCardPopup.renderLoading(false);
      })
  }

  const newCardPopup = new PopupWithForm(
    newPlacePopupSelector,
    newPlaceFormName,
    popupConfiguration,
    formConfiguration,
    formValidators[newPlaceFormName].resetValidation,
    handleCardSubmit,
  );
  newCardPopup.setEventListeners();

  const addCardSubmitHandler = () => {
    newCardPopup.open();
  }

  async function handleProfileFormSubmit(data) {
    profilePopup.renderLoading(true);
    await api.changeUserInfo(data)
      .then((res) => {
        console.log(res);
        user.setUserInfo(data);
        profilePopup.close()
      })
      .catch(err => console.log(`Ошибка при смене имени:${err}`))
      .finally(() => {
        profilePopup.renderLoading(false);
      })
  }

  const profilePopup = new PopupWithForm(
    profilePopupSelector,
    profileFormName,
    popupConfiguration,
    formConfiguration,
    formValidators[profileFormName].resetValidation,
    handleProfileFormSubmit,
    user.getUserInfo,
  );
  profilePopup.setEventListeners();

  const handlePforilePopupOpen = () => {
    profilePopup.open();
  }

  async function handleAvatarFormSubmit(data) {
    avatarPopup.renderLoading(true)
    await api.changeAvatar(data)
      .then((res) => {
        console.log(res);
        user.setAvatar(data);
        avatarPopup.close()
      })
      .catch(err => console.log(`Ошибка при смене аватара:${err}`))
      .finally(() => {
        avatarPopup.renderLoading(false);
      })
  }

  const avatarPopup = new PopupWithForm(
    avatarPopupSelector,
    profileAvatar,
    popupConfiguration,
    formConfiguration,
    formValidators[profileAvatar].resetValidation,
    handleAvatarFormSubmit,
    user.getAvatar,
  );

  avatarPopup.setEventListeners();

  const changeAvatarPopupAvatar = () => {
    avatarPopup.open();
  }

  popupEditingOpenButton.addEventListener('click', handlePforilePopupOpen); // открытие попап редактирования
  popupAddOpenButton.addEventListener('click', addCardSubmitHandler); // открытие попап добавления карточки
  popupAvatarOpenButton.addEventListener('click', changeAvatarPopupAvatar); // открытие попап аватар

}

init();

