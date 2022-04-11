const openPopupButton = document.querySelector('.profile__info_button');
const popupCloseButton = document.querySelector('.popup__close');
const popupCloseButtonOnSaved = document.querySelector('.popup__saved');
const form = document.querySelector('.popup__content');
let formElement = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__text');
let nameProfile = document.querySelector('.profile__info_name');
let textProfile = document.querySelector('.profile__info_text');

function popupOpenToogle(){
    formElement.classList.toggle('popup__opened');
} 

function popupCloseOverlay(evt) {
    if(evt.target === evt.currentTarget){
        formElement.classList.remove('popup__opened');
    }
}

openPopupButton.addEventListener('click', popupOpenToogle);
popupCloseButton.addEventListener('click', popupOpenToogle);
popupCloseButtonOnSaved.addEventListener('click', popupOpenToogle);
formElement.addEventListener('click', popupCloseOverlay);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value;
    textProfile.textContent = jobInput.value;
}

form.addEventListener('submit', formSubmitHandler);



