/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  table;
  constructor(rows) {
    this.rows = rows;
    this.createTable();
  }

  get elem() {
    console.log(this.table);
    return this.table;
  }

  createTable() {
    this.table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    this.table.append(thead);
    this.table.append(tbody);

    this.addHeader(thead);
    this.addRows(tbody);
  }

  addHeader(thead) {
    let newRow = document.createElement("tr");
    for (let key in this.rows[0]) {
      let newCell = document.createElement('td');
      newCell.innerHTML = key[0].toUpperCase() + key.slice(1);
      newRow.append(newCell);
    }
    thead.append(newRow);
  }

  addRows(tbody) {
    for (let i of this.rows) {
      const newRow = document.createElement("tr");
      const id = this.rows.indexOf(i);
      newRow.setAttribute("id", id);
      for (let c in i) {
        newRow.innerHTML = `
        <td>${i.name}</td>
        <td>${i.age}</td>
        <td>${i.salary}</td>
        <td>${i.city}</td>
        `;
      }
      let deleteCell = document.createElement('td');
      let deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = "X";

      deleteBtn.addEventListener('click', () => {
        newRow.remove();
      });

      deleteCell.append(deleteBtn);
      newRow.append(deleteCell);
      tbody.append(newRow);
    }
  }
}
