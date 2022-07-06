// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const bmw = new URL('../image/bmw.jpg', import.meta.url);
const audi = new URL('../image/audi.jpg', import.meta.url);
const bmwRed = new URL('../image/bmwred.jpg', import.meta.url)
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const mers = new URL('../image/mers.jpg', import.meta.url);
const allCar = new URL('../image/allcar.jpg', import.meta.url);
const mst = new URL('../image/mst.jpg', import.meta.url)

export const initialCards = [
  {
    name: 'Blue',
    link: bmw
  },
  {
    name: 'Yellow',
    link: audi
  },
  {
    name: 'Red',
    link: bmwRed
  },
  {
    name: 'Grey',
    link: mers
  },
  {
    name: 'Different',
    link: allCar
  },
  {
    name: 'Black',
    link: mst
  }
];

export const ValidatorConfig = {
    formSelector: "form",
    inputSelector: "form__input",
    submitButtonSelector: "form__save",
    inactiveButtonClass: "form__save_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__active-error_visible",
  };
