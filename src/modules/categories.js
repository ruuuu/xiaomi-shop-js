// получение и отрисовка  категорий:
import { getData } from "./api";



export const categoriesFunc = () => {
      const container = document.getElementById('categories-container');
      const searchInput = document.querySelector('.catalog-search');


      const render = (data) => {                // data = [ {id, name, preview}, {}, {} ]
            container.innerHTML = '';           // очищем контенер, иначе будут картчоки мнодиться
            console.log('category data', data);

            data.forEach((category) => {

                  container.insertAdjacentHTML('beforeend', `
                        <div class="col col-12 col-md-6 col-lg-4 mb-3">
                              <a href="/catalog.html?id=${category.id}" class="card-link">
                                    <div class="card">
                                          <img src="${category.preview}" class="card-img-top" alt="phones">
                                          <div class="card-body">
                                                <h5 class="card-title">${category.name}</h5>
                                          </div>
                                    </div>
                               </a>
                        </div>
                  `);
            });
      };



      // поиск по катеогриям:
      searchInput.addEventListener('input', (evt) => {            // при каждом ввде символа, будет срабатывать событие
            getData(`/categories?q=${evt.target.value}`)          //evt.target.value то что мы ввели в поло
                  .then((response) => {
                        render(response);                         // отобразит карточки категрий
                  })
                  .catch((error) => {
                        console.log('error ', error);
                        console.error('Произошла ошибка');
                  });
      });



      getData('/categories')        // categories -это свойстов в db.json, ГЕТ запрос http://localhost:3001/categories
            .then((data) => {       //data ответ от сервера,  data  = [ {id, name, preview}, {}, {} ]
                  render(data);     // отрисует категории
            })
            .catch((error) => {
                  console.log('error ', error);
                  console.error('Произошла ошибка');
            });

};