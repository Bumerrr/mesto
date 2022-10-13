export class UserInfo {
    constructor({ titleSelector, jobSelector, avatarSelector }) {
        this._titleSelector = titleSelector;
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
        this._titleElement = document.querySelector(`.${this._titleSelector}`);
        this._jobElement = document.querySelector(`.${this._jobSelector}`);
        this._avatarElement = document.querySelector(`.${this._avatarSelector}`);
    }

    setUserInfo = ({ name, about }) => {
        this._titleElement.textContent = name || '';
        this._jobElement.textContent = about || '';
    }

    setAvatar = ({ avatar }) => {
        this._avatarElement.src = avatar || '';
    }

    getUserInfo = () => {
        return {
            name: this._titleElement.textContent,
            about: this._jobElement.textContent,
        }
    }

    getAvatar = () => {
<<<<<<< HEAD
        return { image: this._avatarElement.src };
    }

=======
        return { avatar: this._avatarElement.src };
    }
>>>>>>> gh-pages
}

