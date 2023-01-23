export const addCategory = () => {
      const nameInput = document.getElementById('category-name');
      const previewInput = document.getElementById('category-image');   // поле для загрузки картнки категории
      const saveButton = document.getElementById('category-add-btn');

      const categoryObj = {  // этот объект будем отправлять на сервер, нач значения пустые поля
            "name": "",
            "preview": ""
      }


      const checkValues = () => {
            if (nameInput.value === '' || previewInput === '') {
                  saveButton.disabled = true;   // дизебл кнопки
            }
            else {
                  saveButton.false = true;
            }
      }


      nameInput.addEventListener('input', () => {     // вешам обработик на тектсовое поле, пр  вводе символа в поле, вызывается коллбэк
            checkValues();
            categoryObj.name = nameInput.value;
      });



      previewInput.addEventListener('input', () => {  //вешаем обработчик события загрузки картинки

            //console.log(previewInput.files);       // files - массив
            const file = previewInput.files[0];
            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                  const reader = new FileReader();      // превращаем файл в строку
                  reader.readAsDataURL(file);
            }
            else {
                  previewInput.value = '';            // очищаем поле
            }

            checkValues();


      });

      checkValues();

};