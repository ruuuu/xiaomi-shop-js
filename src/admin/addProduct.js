// Добалвение товара в админке admin.html:
import { getData, postData, deleteData } from "../modules/api";


export const addProduct = () => {
      const nameInput = document.getElementById('product-name');
      const previewInput = document.getElementById('product-image');     // поле для загрузки картнки товара
      const titleInput = document.getElementById('product-title');       // назване подкатеогрии
      const priceInput = document.getElementById('product-price');
      const saveButton = document.getElementById('product-add-btn');     // кнпока Добавить
      const selectCategory = document.getElementById('product-category');      // выпадающий список катеогрий
      const container = document.getElementById('product-container');        // <table> для продуктов



      const productData = {         // этот объект будем отправлять на сервер, нач значения пустые поля. Заполнят будем в обработчиках
            "name": "",             // названия свойств ввзяли из db.json.products
            "preview": "",
            "price": 0,
            "title": "",           // это свойство добвится в  db.json.products
            "category": 0           // это свойство добвится в  db.json.products
      };



      const renderAdminProducts = (data) => {                // data = [ {  name: , preview: , price:, title: }, {}, {} ] с сервера(db.json) продкуты
            container.innerHTML = '';                        // очищаем изначально
            // кнопке Удалить добвили дата-атрибут data-product, чтобы знть какой продукт удалили
            data.forEach((productItem, index) => {

                  container.insertAdjacentHTML('beforeend', `
                        <tr>
                              <th scope="row">${index + 1}</th>
                              <td>${productItem.title}</td>
                              <td>${productItem.name}</td>
                              <td>${productItem.price} ₽</td>
                              <td class="text-end">
                                    <button type="button" class="btn btn-outline-danger btn-sm" data-product="${productItem.id}"> Удалить </button>
                              </td>
                        </tr> 
                  `);

            });
      };



      const checkValues = () => {         // если поля незаполнены, то дизейбл кнопки Добавить
            if (nameInput.value === '' || previewInput === '' || titleInput === '' || Number(priceInput.value) === 0 || selectCategory.value === 'default') {
                  saveButton.disabled = true;         // дизейбл кнопки Добавить, disabled -свойстов
            }
            else {
                  saveButton.disabled = false;
            }
      };



      selectCategory.addEventListener('change', () => {           // обрабочик выпадающ списка Катеогрия:  change- собыие выбора элемента из выпадающего спсика
            //console.log(selectCategory.value);
            productData.category = selectCategory.value;          // сохранем выбранный вариант из выпадающего списка
            const url = selectCategory.value !== 'default' ? `/products?category=${selectCategory.value}` : `/products`;              // в db.json есть  массив products,поэтому в урле пишем products.  У его элементов есть свойсвто category, поэтому queryParametr навазли category . https://www.npmjs.com/package/json-server#filter 

            getData(url)                                                            // products- свойство в  db.json
                  .then((data) => {
                        console.log('data after filter ', data);                    // data= [ { id: , name: , preview: }, {}, {} ] - ответ сервера(db.json)
                        renderAdminProducts(data);
                  });

            checkValues();
      });


      nameInput.addEventListener('input', () => {     // вешам обработчик на тектсовое поле, пр  вводе символа в поле, вызывается коллбэк
            productData.name = nameInput.value;
            checkValues();
      });


      titleInput.addEventListener('input', () => {          // название Подкатегории
            productData.title = titleInput.value;
            checkValues();
      });



      priceInput.addEventListener('input', () => {
            productData.price = Number(priceInput.value);         // превращаем из строки в число
            checkValues();
      });





      previewInput.addEventListener('input', () => {              //  вешаем обработчик события загрузки картинки(их храним в бд, в base64)

            // console.log(previewInput.files);                   // files - массив
            const file = previewInput.files[0];
            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                  const reader = new FileReader();           // превращаем файл в строку base64
                  // console.log('reader ', reader);

                  reader.addEventListener('load', () => {         //  onload - событие загрузкифайла. Когда загрузиим файл, выполнится коллбэк
                        productData.preview = reader.result;
                  });

                  reader.addEventListener('error', () => {         //  ели при загруке полуим ошибку
                        productData.preview = '';                  // очищаем 
                  });

                  reader.readAsDataURL(file);
            }
            else {
                  previewInput.value = '';                          // очищаем поле

            }
      });




      // рисуем таблицу продуктов:
      const updateTable = () => {
            getData('/products')                                                       // products- свойство в  db.json
                  .then((data) => {
                        console.log('data from updateTable ', data);                 // data= [ { id: , name: , preview: }, {}, {} ] - ответ сервера(db.json)
                        renderAdminProducts(data);                                    // рисуем таблицу продуктов
                  });
      };


      // создание  Продукта(запондение формы):
      saveButton.addEventListener('click', () => {  // после отправки запроса, данные запишутся в  db.json в сво-во products

            console.log(productData);

            postData('/products',                           // products - свойство в db.json
                  {
                        method: 'POST',
                        body: JSON.stringify(productData),  // JSON.stringify() преврщает объект productData = { name":  , "preview": , "category": , "categoryName": , "price": , "title": } в строку
                        headers: {
                              'Content-Type': 'application/json'
                        }
                  })
                  .then((data) => {                   // как только полуичм отвт(data) от сервера(db.json), выполнится этот then 
                        //console.log('data from saveButton.addEventListener', data);            // { name":  , "preview": , "category": , "categoryName": , "price": , "title": }
                        nameInput.value = '';         // очищаем поля после отправки данных
                        previewInput.value = '';
                        priceInput.value = '';
                        titleInput.value = '';

                        updateTable();
                  });
      });


      // Удаление продукта:  вместо того чтобы вешать обработчик на каждую кнпоку Удалить у продукта, вешаем на  родителя продуктов
      container.addEventListener('click', (evt) => {              // evt нужен чтобы знать  какую катгеорию надо удалить

            if (evt.target.tagName === 'BUTTON') {                //   если нажали на кнопку Удалить
                  const id = evt.target.dataset.product;          // сохраняем значение дата атрибута  data-product
                  deleteData(`/products/${id}`)                       // products - свойство в db.json
                        .then((data) => {                         // data-то что полуилии от сервера 
                              updateTable();
                        })
            }
      });

      updateTable();
      checkValues();
};


