// добавление категории в админке:
import { postData, getData, deleteData } from "../modules/api";


export const addCategory = () => {
      const nameInput = document.getElementById('category-name');
      const previewInput = document.getElementById('category-image');   // поле для загрузки картнки категории
      const saveButton = document.getElementById('category-add-btn');   // кнпока Добавить
      const container = document.getElementById('category-container');   // <table>
      const categoryList = document.getElementById('product-category');


      const categoryData = {        // этот объект будем отправлять на сервер, нач значения пустые поля. Заполнят будем в обработчиках
            "name": "",             // названия свойств ввзяли из db.json.categories
            "preview": ""
      };


      // отрисовка таблицы категорий:
      const renderAdminCategory = (data) => {                // data = [ {id: , name: , preview: }, {}, {} ] с сервера(db.json)  категрии
            container.innerHTML = '';

            data.forEach((categoryItem, index) => {

                  //  кнопке Удалить добавили дата-атрибут  data-category, чтобы знать какой атрибут удалять 
                  container.insertAdjacentHTML('beforeend', `
                      <tr>
                          <th scope="row">${index + 1}</th>
                          <td>${categoryItem.name}</td>
                          <td class="text-end">
                              <button type="button" class="btn btn-outline-danger btn-sm" data-category="${categoryItem.id}">
                                  удалить
                              </button>
                          </td>
                      </tr>
                  `);


                  // созданную категорию добляем в выпадащий спсик категлрий:
                  categoryList.insertAdjacentHTML('beforeend', ` 
                         <option value="${categoryItem.id}">${categoryItem.name}</option>
                  `);
            });
      };





      const checkValues = () => {         // если поля незаполнены, то дизейбл кнопки Добавить
            if (nameInput.value === '' || previewInput === '') {
                  saveButton.disabled = true;         // дизейбл кнопки Добавить, disabled -свойстов
            }
            else {
                  saveButton.disabled = false;
            }
      };


      //  рисуем таблицу категорий:
      const updateTable = () => {
            getData('/categories')                                                      // categories- свойство в  db.json
                  .then((data) => {
                        //console.log('data from updateTable ', data);                 // data= [ { id: , name: , preview: }, {}, {} ] - ответ сервера
                        renderAdminCategory(data);                                    // рисуем таблицу категерий
                  });
      };



      nameInput.addEventListener('input', () => {     // вешам обработчик на тектсовое поле, пр  вводе символа в поле, вызывается коллбэк
            categoryData.name = nameInput.value;
            checkValues();
      });



      previewInput.addEventListener('input', () => {  //  вешаем обработчик события загрузки картинки(их храним в бд, в base64)

            // console.log(previewInput.files);       // files - массив
            const file = previewInput.files[0];
            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                  const reader = new FileReader();           // превращаем файл в строку base64
                  // console.log('reader ', reader);

                  reader.addEventListener('load', () => {         //  onload - событие загрузкифайла. Когда загрузиим файл, выполнится коллбэк
                        categoryData.preview = reader.result;
                  });

                  reader.addEventListener('error', () => {         //  ели при загруке полуим ошибку
                        categoryData.preview = '';                // очищаем 
                  });

                  reader.readAsDataURL(file);
            }
            else {
                  previewInput.value = '';                        // очищаем поле
                  previewInput.value = '';
            }
      });



      saveButton.addEventListener('click', () => {  // после отправки запроса, данные запишутся в  db.json в сво-во categories
            postData('/categories',                         // categories - свойство в db.json
                  {
                        method: 'POST',
                        body: JSON.stringify(categoryData),  // JSON.stringify() преврщает объект categoryData = { name":  , "preview": } в строку
                        headers: {                           // заголовки запроса
                              'Content-Type': 'application/json'
                        }
                  })
                  .then((data) => {                   // как только полуичм отвт(data) от сервера, выполнится этот then 
                        //console.log('data from saveButton.addEventListener', data);            // { name, preview, id}
                        nameInput.value = '';         // очищаем поле после отправки данных
                        previewInput.value = '';
                        updateTable();
                  });
      });



      // вместо того чтобы вешать обработчик на каждую кнпоку Удалить у катеогории, вешаем на  родителя категорий
      container.addEventListener('click', (evt) => {              // evt нужен чтобы знать  какую катгеорию надо удалить

            if (evt.target.tagName === 'BUTTON') {                //   если нажали на кнопку Удалить
                  const id = evt.target.dataset.category;         // сохраняем значение data-category
                  deleteData(`/categories/${id}`)                       // categories - свойство в db.json
                        .then((data) => {                         // data-то что полуилии от сервера 
                              updateTable();
                        })
            }
      });



      updateTable();  // отрисовка  таблицы категорий (в админке)
      checkValues();


};

