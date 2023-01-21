// отпрака запроса на сервер по урлу path:
const apiPath = 'http://localhost:3001';

export const getData = (path) => {

      return fetch(apiPath + path)                          // асинхронный меод, для обработки асинхрнного кода
            .then(response => {                             // как только данные полуим от сервера, выполнится метод then(), он обрабатывает промис
                  if (!response.ok) {
                        throw new Error('Ошибка получения  данных');
                  }
                  return response.json();
            });

};