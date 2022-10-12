import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupConfiguration) {
    super(popupSelector, popupConfiguration);
    this.onSubmit = () => {};
    this._btn = this._popup.querySelector(".form__save");
    this._popupButtonTextContent = this._btn.textContent
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

  renderLoading(isLoading) {
    if(isLoading) {
      this._btn.textContent = 'Сохранение...'
    } else {
      this._btn.textContent = this._popupButtonTextContent
    }
  }
}
