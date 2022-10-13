import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formName, popupConfig, { inputSelector, submitButtonSelector, formSelector }, errorResetCallBack, submitCallBack, getterCallBack = null){
        super(popupSelector, popupConfig);
        this._formName = formName;
        this._submitCallBack = submitCallBack;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._getterCallBack = getterCallBack;
        this._formSelector = formSelector;
        this._formElement = document.forms[this._formName];
        this._inputs = Array.from(this._formElement.querySelectorAll(`.${this._inputSelector}`));
        this._submitBtn = this._formElement.querySelector(`.${this._submitButtonSelector}`);
        this._errorResetCallBack = errorResetCallBack;
        this._btn = this._popup.querySelector(".form__save");
        this._popupButtonTextContent = this._btn.textContent;
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach((inputElement) => {
            values[inputElement.id.slice(6)] = inputElement.value;
        })
        return values;
    }

    _setInputValues(values) {
        this._inputs.forEach((inputElement) => {
            inputElement.value = values[inputElement.id.slice(6)];
        })
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._submitCallBack(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._handleSubmit)
    }

    open() {
        if (this._getterCallBack) {
            this._setInputValues(this._getterCallBack());
        } else {
            this._formElement.reset();
        }
        this._errorResetCallBack();
        super.open();
    }

    renderLoading(isLoading) {
        if(isLoading) {
          this._btn.textContent = 'Сохранение...'
        } else {
          this._btn.textContent = this._popupButtonTextContent
        }
      }

    close() {
        super.close();
        this._formElement.reset();
    }

}
