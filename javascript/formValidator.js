class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
    this._saveButton = this._form.querySelector(`.${this._submitButtonSelector}`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = errorMessage;
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState(inputList, saveButton) {
    if (this._hasInvalidInput(inputList)) {
      saveButton.classList.add(this._inactiveButtonClass);
      saveButton.disabled = true;
    } else {
      saveButton.classList.remove(this._inactiveButtonClass);
      saveButton.disabled = false;
    }
  };

  enableValidation() {

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(this._inputList, this._saveButton);
      });
    });
    this._toggleButtonState(this._inputList, this._saveButton)
  }
  
  cleanForm = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(this._inputList, this._saveButton);
  }
}

export default FormValidator;