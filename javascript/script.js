const openPopupButton = document.querySelector(".profile__info-button");
const popupCloseButton = document.querySelector(".popup__close");
const popupCloseButtonOnSaved = document.querySelector(".popup__saved");
const form = document.querySelector(".popup__content");
let formElement = document.querySelector(".popup");
let nameInput = document.querySelector(".popup_name");
let jobInput = document.querySelector(".popup_text");
let nameProfile = document.querySelector(".profile__info-name");
let textProfile = document.querySelector(".profile__info-text");
nameInput.value = nameProfile.textContent;
jobInput.value = textProfile.textContent;

function popupOpenToogle() {
    formElement.classList.toggle("popup_opened");
}

function popupCloseOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        formElement.classList.remove("popup_opened");
    }
}

openPopupButton.addEventListener("click", popupOpenToogle);
popupCloseButton.addEventListener("click", popupOpenToogle);
popupCloseButtonOnSaved.addEventListener("click", popupOpenToogle);
formElement.addEventListener("click", popupCloseOverlay);

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    textProfile.textContent = jobInput.value;
   
}

form.addEventListener("submit", formSubmitHandler);
