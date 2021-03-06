'use strict';

class CoolTable {
  /**
   *  properties
   *  @param [array] _tableClass - CSS класс таблицы
   *  @param [array] data  - Данные
   *  @param [array] attributes - Выводимые данные
   *  @param [array] _element  - Куда выводить таблицу
   *  @param [array] _caption  - Заголовок таблицы
   */

  constructor() {
    this._caption = '';
    this._tableClass = [];
    this._element = 'body';
    this._attributes = [];
  }

  /**
  *  Set element
  */
  setElement(element) {
    if (document.querySelector(element)) {
      this._element = element;
      return true;
    }
    return false;
  }

  /**
   *  Set caption
   */
  setCaption(caption) {
    if (typeof caption === 'string' && caption.trim() != '') {
      this._caption = caption.trim();
      return true;
    }
    return false;
  }

  /**
  *  Set table classes
  */
  setTableClass(tableClass) {
    if (typeof tableClass === 'object') {
      this._tableClass = tableClass;
      return true;
    }
    return false;
  }

  render(data) {
    this.setElement(data.element);
    this.setTableClass(data.tableClass);
    this.attributes = data.attributes;
    this.data = data.data;

    /**
     * Create table
     */
    const table = document.createElement('table');
    this._tableClass.forEach(cssClass => {
      table.classList.add(cssClass);
    });

    /**
     * Create caption
     */
    this.setCaption(data.caption);
    if (this._caption) {
      const caption = document.createElement('caption');
      caption.textContent = this._caption;
      table.append(caption);
    }

    /**
    * Create table header
    */
    let tableHeaderRow = document.createElement('tr');
    for (let key in this.attributes) {
      let newTh = document.createElement('th');
      if (this.attributes[key].label) {
        newTh.textContent = this.attributes[key].label;
      } else {
        newTh.textContent = key;
      }
      tableHeaderRow.append(newTh);
    }
    table.append(tableHeaderRow);

    /**
    * Create table rows
    */
    for (let i = 0; i < this.data.length; i++) {
      let tableRowData = this.data[i];
      let newTr = document.createElement('tr');
      for (let key in this.attributes) {
        let newTd = document.createElement('td');
        let value = tableRowData[key];
        // If there's a function in value
        if (this.attributes[key].value) {
          value = this.attributes[key].value(tableRowData);
        }
        // It there's src attribute
        if (this.attributes[key].src) {
          newTd.innerHTML = value;
        } else {
          newTd.textContent = value;
        }
        newTr.append(newTd);
      }
      table.append(newTr);
    }

    document.querySelector(this._element).append(table);
  }
}
