import '../pages/index.css';
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
  popupDeleteOpenButton,
  avatarSelector,
  btnSavePopupSelector
} from "../components/constants.js";

import PopupWithForm from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import Popup from '../components/Popup';


async function init() {
  const api = new Api({
    userUrl: 'https://nomoreparties.co/v1/cohort-51/users/me',
    cardUrl: 'https://mesto.nomoreparties.co/v1/cohort-51/cards',
    token: 'b84ca8c8-70d1-421e-a05d-8cb603f10d20'
  });
  let userId = null;
  const user = new UserInfo(profileConfiguration);

  Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      // console.log(userId);
      // user.setUserInfo(userData);
      cardsContainer.renderAll(cards);
      // console.log(cardsContainer)
      // cardsContainer.reverse(cards),
      console.log(cards)
    })
    .catch((err) => {
      console.log(`Ошибка Promise all:${err}`);
    })
  // function renderCard(cardElement) {
  //   cardsBlock.append(cardElement);
  // }

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
    const card = new Card(
      {
        item,
        handleLikeClick: () => {
          card.setLike()
        },
        // clickLike : () => {
        //   card.isLiked()
        // }
      },
      templateCards,
      bigImagePopup.open,
      openCardDelete,
      userId,
      api,

    );
    // console.log(userId)

    return card.generateCard();
  }

  let cardId, cardElement

  const deletePopup = new PopupWithConfirmation(
    deletePopupSelector,
    popupConfiguration
  );

  deletePopup.setEventListeners();

  const openCardDelete = (cardId2, cardElement2) => {
    console.log("openCardDelete", cardId2, cardElement2)

    cardId = cardId2
    cardElement = cardElement2

    deletePopup.setListener(submitCardDelete)
    deletePopup.open()
  }

  const submitCardDelete = () => {
    console.log("submitCardDelete", cardId, cardElement)

    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        cardElement = null;
      })
      .catch(err => console.log(`Ошибка при удалении:${err}`))
  }
  // const cards = await api.getCards()

  // cards.forEach((item) => {
  //   renderCard(createCard(item));
  // });

  const cardsContainer = new Section({
    // items: cards.reverse(),
    renderer: createCard,
  },
    cardsContainerSelector
  );

  const handleCardSubmit = async (item) => {
    const dataa = await api.createCard(item)
    cardsContainer.addItem(dataa);
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

  const addCardSubmitHandler = () => {
    newCardPopup.open();
  }

  const userInfo = await api.getUserInfo()

  // const user = new UserInfo(profileConfiguration);
  user.initUser(userInfo)

  async function handleProfileFormSubmit(data) {
    user.setUserInfo(data);
    await api.changeUserInfo(data)
    // console.log(user.setUserInfo(data))
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

  async function handleAvatarFormSubmit(data) {
    user.setAvatar(data);
    await api.changeAvatar(data)
  }

  user.initAvatar(userInfo)

  const avatarPopup = new PopupWithForm(
    avatarPopupSelector,
    profileAvatar,
    popupConfiguration,
    formConfiguration,
    formValidators[profileAvatar].cleanForm,
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

