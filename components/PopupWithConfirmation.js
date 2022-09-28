import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupConfiguration) {
    super(popupSelector, popupConfiguration);
    this._btn = this._popup.querySelector(".form__save_delete");
    this._popupButtonTextContent = this._btnPopup.textContent;
    this.onSubmit = () => {};
  }

  setListener = (onSubmit) => {
    this.onSubmit = onSubmit
    this._btn.removeEventListener('click', this.onListener, true)
    this._btn.addEventListener('click', this.onListener, true)
  }

  onListener = (evt) => {
    evt.preventDefault();
    this.onSubmit()
    this.close()
  }

  // renderLoadingWhileDeleting(isLoading) {
  //   if(isLoading) {
  //     this._btn.textContent = 'Сохранение...'
  //   } else {
  //     this._btn.textContent = this._popupButtonTextContent
  //   }
  // }
}
