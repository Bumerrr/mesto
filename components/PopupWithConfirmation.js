import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupConfiguration) {
    super(popupSelector, popupConfiguration);
    // this._popupButtonTextContent = this._btnPopup.textContent;
    this.onSubmit = () => {};
    // this._btn = this._popup.querySelector(".form__save");
    // this._popupButtonTextContent = this._btn.textContent
    // console.log(this._popupButtonTextContent, "BOOOOOOOOOOOT")
  }

  setListener = (onSubmit) => {
    this.onSubmit = onSubmit;
    this._btn.removeEventListener('click', this._onListener)
    this._btn.addEventListener('click', this._onListener)
  }

  _onListener = (evt) => {
    evt.preventDefault();
    this.onSubmit()
    this.close()
  }

  // renderLoading(isLoading) {
  //   if(isLoading) {
  //     this._btn.textContent = 'Сохранение...'
  //     console.log(this._popupButtonTextContent, "BOOOOOOOOOOOT")
  //   } else {
  //     this._btn.textContent = this._popupButtonTextContent
  //   }
  // }
}
