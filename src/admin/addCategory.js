// добавление категории в админке:
import { postData, getData } from "../modules/api";


export const addCategory = () => {
      const nameInput = document.getElementById('category-name');
      const previewInput = document.getElementById('category-image');   // поле для загрузки картнки категории
      const saveButton = document.getElementById('category-add-btn');   //кнпока Добавить
      const container = document.getElementById('category-container');



      const categoryData = {  // этот объект будем отправлять на сервер, нач значения пустые поля
            "name": "",
            "preview": ""
      };


      // отрисовка таблицы категорий:
      const renderAdminCategory = (data) => {                // data = [ {id: , name: , preview: }, {}, {} ] с сервера  категрии
            container.innerHTML = '';

            data.forEach((categoryItem, index) => {

                  container.insertAdjacentHTML('beforeend', `
                      <tr>
                          <th scope="row">${index + 1}</th>
                          <td>${categoryItem.name}</td>
                          <td class="text-end">
                              <button type="button" class="btn btn-outline-danger btn-sm">
                                  удалить
                              </button>
                          </td>
                      </tr>
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



      const updateTable = () => {
            getData('/categories')
                  .then((data) => {
                        console.log('data from updateTable ', data);                 // data= [ { id: , name: , preview: }, {}, {} ] - ответ сервера
                        renderAdminCategory(data);
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


      saveButton.addEventListener('click', () => {  // после отправки запроса, данные запишутся в  db.json в categories
            postData('/categories',
                  {
                        method: 'POST',
                        body: JSON.stringify(categoryData),  // JSON.stringify() преврщает объект categoryData = {name":  , "preview": } в строку
                        headers: {                           // заголовки запроса
                              'Content-Type': 'application/json'
                        }
                  })
                  .then((data) => {                   // как только полуичм отвт(data) от сервера, выполнится этот then 
                        console.log('data from saveButton.addEventListener', data);            // {name, preview, id}
                        updateTable();
                  });
      });



      updateTable();  // отрисовка  таблицы категорий
      checkValues();


};


// остановилась на 00:48