// отпрака запроса на сервер по урлу path:
const apiPath = 'http://localhost:3001';



export const getData = (path) => {

      return fetch(apiPath + path)                          // отправляем запрос, асинхронный меод, для обработки асинхрнного кода
            .then(response => {                             // как только данные полуим от сервера, выполнится метод then(), он обрабатывает промис
                  if (!response.ok) {
                        throw new Error('Ошибка получения  данных');
                  }
                  return response.json();
            });
};



// отправка данных на сервер(форма создания категории в админке)
export const postData = (path, dataObj) => {    //    dataObj = { "name": ,  "preview": }

      return fetch(apiPath + path, dataObj)
            .then(response => {                             // как только данные полуим от сервера, выполнится метод then(), он обрабатывает промис
                  if (!response.ok) {
                        throw new Error('Ошибка получения  данных');
                  }
                  return response.json();
            });
};



// удаение категрии методом DELETE:
export const deleteData = (path) => {

      return fetch(apiPath + path,
            {
                  method: 'DELETE'
            })
            .then(response => {                             // как только данные полуим от сервера, выполнится метод then(), он обрабатывает промис
                  if (!response.ok) {
                        throw new Error('Ошибка получения  данных');
                  }
                  return response.json();
            });
};


