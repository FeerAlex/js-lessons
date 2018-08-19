/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

const homeworkContainer = document.querySelector('#homework-container');
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
const addNameInput = homeworkContainer.querySelector('#add-name-input');
const addValueInput = homeworkContainer.querySelector('#add-value-input');
const addButton = homeworkContainer.querySelector('#add-button');
const listTable = homeworkContainer.querySelector('#list-table tbody');

let isMatching = (full, chunk) => full.toUpperCase().indexOf(chunk.toUpperCase()) !== -1;

let getCookies = (filter) => {
    let cookies = document.cookie.split('; ').reduce((p, c) => {
        const [name, value] = c.split('=');

        p.push({ name, value });

        return p;
    }, []);

    cookies = cookies.filter(cookie => isMatching(cookie.name, filter) || isMatching(cookie.value, filter));

    return cookies;
}

let setCookie = (name, value, expires) => {
    let cookie = `${name}=${value}`;

    if (expires) {
        cookie = `${cookie}; expires=${expires}`;
    }
  
    document.cookie = cookie;
}

let deleteCookie = (name) => {
    setCookie(name, '', 'Thu, 01 Jan 1970 00:00:01 GMT');

    renderTable();
}

let addCookie = () => {
    setCookie(addNameInput.value, addValueInput.value);

    addNameInput.value = '';
    addValueInput.value = '';

    renderTable();
}

let createRow = (name, value) => {
    let tableRow = document.createElement('tr');
    let nameTD = document.createElement('td');
    let valueTD = document.createElement('td');
    let deleteTD = document.createElement('td');
    let deleteButton = document.createElement('button');

    nameTD.innerHTML = name;
    valueTD.innerHTML = value;
    deleteButton.innerHTML = 'удалить';

    deleteButton.addEventListener('click', () => {
        deleteCookie(name);
    });

    tableRow.appendChild(nameTD);
    tableRow.appendChild(valueTD);
    tableRow.appendChild(deleteTD);
    deleteTD.appendChild(deleteButton);
    
    return tableRow;
}

let renderTable = () => {
    let filter = filterNameInput.value;
    let cookies = getCookies(filter);

    listTable.innerHTML = '';

    if (!cookies[0]) {
        return;
    }

    cookies.forEach(cookie => listTable.appendChild(createRow(cookie.name, cookie.value)));
}

filterNameInput.addEventListener('keyup', renderTable);

addButton.addEventListener('click', addCookie);

// renderTable();
