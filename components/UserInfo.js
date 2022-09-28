export class UserInfo {
    constructor({ titleSelector, jobSelector, avatarSelector }) {
        this._titleSelector = titleSelector;
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
        this._titleElement = document.querySelector(`.${this._titleSelector}`);
        this._jobElement = document.querySelector(`.${this._jobSelector}`);
        this._avatarElement = document.querySelector(`.${this._avatarSelector}`);
    }

    setUserInfo = (data) => {
        this._titleElement.textContent = data.title || '';
        this._jobElement.textContent = data.job || '';
    }

    setAvatar = (data) => {
        this._avatarElement.src = data.image;
    }

    getUserInfo = () => {
        return {
            title: this._titleElement.textContent,
            job: this._jobElement.textContent,
        };
    }

    getAvatar = () => {
        return { image: this._avatarElement.src };
    }

    initUser = (data) => {
        this._titleElement.textContent = data.name || '';
        this._jobElement.textContent = data.about || '';
    }

    initAvatar = (data) => {
        this._avatarElement.src = data.avatar || '';
    }
}

