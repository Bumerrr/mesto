export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(`.${this._containerSelector}`)
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }

  renderAll() {
    this._items.forEach(item => {
      // this.addItem(item);
    });
  }
}