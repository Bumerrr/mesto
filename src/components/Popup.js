export default class Popup {
    constructor(popupSelector, popupConfiguration) {
        this._popupSelector = popupSelector;
        this._activeModifier = popupConfiguration.activeModifier;
        this._closeButtonSelector = popupConfiguration.closeButtonSelector;
        this._popup = document.querySelector(`.${this._popupSelector}`);
        this._closeBtn = this._popup.querySelector(`.${this._closeButtonSelector}`);
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleCloseButtontnClick = () => {
        this.close();
    }

    _handleCloseOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }

    open () {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add(this._activeModifier);
    }

    close () {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove(this._activeModifier);
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleCloseOverlayClick);
        this._closeBtn.addEventListener('click', this._handleCloseButtontnClick);
    }
}