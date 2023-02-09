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
export const postData = (path, dataObj) => {    //    dataObj = тело запроса

      return fetch(apiPath + path, {
            method: 'POST',
            body: JSON.stringify(dataObj),                  // JSON.stringify() преврщает объект dataObj в строку
            headers: {
                  'Content-Type': 'application/json'
            }
      })
            .then(response => {                             // как только данные полуим от сервера, выполнится метод then(), он обрабатывает промис
                  if (!response.ok) {
                        throw new Error('Ошибка получения  данных');
                  }
                  return response.json();
            });
};



// метод PUT: для изменения числа товара в корзине
export const putData = (path, dataObj) => {

      return fetch(apiPath + path, {
            method: 'PUT',
            body: JSON.stringify(dataObj),                  // JSON.stringify() преврщает объект dataObj в строку
            headers: {
                  'Content-Type': 'application/json'
            }
      })
            .then(response => {                             // как только данные полуим от сервера, выполнится метод then(), он обрабатывает промис
                  if (!response.ok) {
                        throw new Error('Ошибка получения  данных');
                  }
                  return response.json();
            });
};


// PATCH:
export const patchData = (path, dataObj) => {

      return fetch(apiPath + path, {
            method: 'PATCH',
            body: JSON.stringify(dataObj),                  // JSON.stringify() преврщает объект dataObj в строку
            headers: {
                  'Content-Type': 'application/json'
            }
      })
            .then(response => {                             // как только данные полуим от сервера, выполнится метод then(), он обрабатывает промис
                  if (!response.ok) {
                        throw new Error('Ошибка получения  данных');
                  }
                  return response.json();
            });
};


// удаение категории админке  методом DELETE:
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


