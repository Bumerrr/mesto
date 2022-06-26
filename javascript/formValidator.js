class FormValidator {
    constructor(config, form) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._form = form;
    }
  
    _showInputError (inputElement, errorMessage) {
      const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
      // console.log(errorElement) 
      inputElement.classList.add(this._inputErrorClass);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = errorMessage;
    };
  
    _hideInputError (inputElement){
      const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._errorClass);
    };
  
    _checkInputValidity (inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };
  
    _hasInvalidInput (inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };
  
    _toggleButtonState (inputList, saveButton){
      if (this._hasInvalidInput(inputList)) {
        saveButton.classList.add(this._inactiveButtonClass);
        saveButton.disabled = true
      } else {
        saveButton.classList.remove(this._inactiveButtonClass);
        saveButton.disabled = false
      }
    };
  
    enableValidation () {
      const formList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
      // console.log(formList)
      const buttonElement = this._form.querySelector(`.${this._submitButtonSelector}`);
      // console.log(buttonElement)
      formList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement)
          this._toggleButtonState(formList, buttonElement);
        });
      });
      this._toggleButtonState(formList, buttonElement)
    }

    cleanUpForm = () =>{
      const inputList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`))
      // console.log(inputList)
      const saveButton = this._form.querySelector(`${this._submitButtonSelector}`);
      // console.log(saveButton)
      inputList.forEach((inputElement)=>{
        this._hideInputError(inputElement);
      });
      this._toggleButtonState(inputList, saveButton);
    }
  }
  
    export default FormValidator;