// отрисовка  списка карточек товаров:
import { getData, postData } from "./api";




export const prodocutsFunc = () => {

      const container = document.getElementById('products-container');
      container.innerHTML = "";

      const renderProducts = (data) => {                //  data  = [ {id, category, name, price, preview }, {}, {} ] массив товаров
            console.log('data products', data);

            data.forEach((product) => {
                  //  insertAdjacentHTML  добавляет элементы в container: кнопке Корзина добавили дата атрибут  data-product="${item.id}", чоы знать каки етовары добавить в корзину
                  container.insertAdjacentHTML('beforeend', `    
                        <div class="col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
                              <a href="#" class="card-link">
                                    <div class="card">
                                          <img src="${product.preview}" class="card-img-top" alt="phone-1">
                                          <div class="card-body">
                                                <span class="mb-2 d-block text-secondary">${product.title}</span>
                                                <h6 class="card-title mb-3">${product.name}</h6>

                                                <div class="row">
                                                      <div class="col d-flex align-itemns-center justify-content-between">
                                                      <h4>${product.price} ₽</h4>
                                                      <button type="button" class="btn btn-outline-dark" data-product="${item.id}">
                                                            <img src="/images/icon/shopping-cart-big.svg" alt="login">
                                                      </button>
                                                      </div>
                                                </div>
                                          </div>      
                                    </div>
                              </a>
                        </div>
                  `);
            });
      };


      // нажаьтие на кнопку Добавить в корзину:
      // навешиеваем обработчик   не на каждую кнопку корзины товара, а на его родителя. это называется делегирование:
      container.addEventListener('click', (evt) => {                          // evt-объект события

            if (evt.target.closest('button')) {                //   есь ли у элемента/его родителя на котрый нажалаи тэг button. Если есть, то возваращается этот элемент
                  const id = evt.target.closest('button').dataset.product;          // сохраняем значение дата атрибута  data-product
                  //console.log('evt.target ', evt.target);

                  getData(`/products/${id}`)
                        .then((product) => {                                     // то что вернул сервер  product  =  {id, category, categoryName, name, price, preview }
                              postData('/cart', {
                                    name: product.name,
                                    count: 1,
                                    price: product.price
                              })
                                    .then(() => {
                                          console.log('получили товар');
                                    })
                        })
                        .catch((error) => {
                              console.error('Произошла ошибка');
                        });
            }

      });




      const init = () => {   //  ОТСЮДА НАЧИНАЕТСЯ
            //console.log(window.location);                                   // выведет инфрмацию об урле
            const params = window.location.search                             // вывдеет query-параметры ?id=2
            const urlSearchParams = new URLSearchParams(params);
            const id = urlSearchParams.get('id');                             // получим значение query-параметра id
            const url = id ? `/products?category=${id}` : `/products`;        // в db.json есть  массив products,поэтому в урле пишем products.  У его элементов есть свойсвто category, поэтому queryParametr навазли category . https://www.npmjs.com/package/json-server#filter 

            getData(url)
                  .then((data) => {             // товары конкретной категории:  data  = [ {id, category, categoryName, name, price, preview }, {}, {} ]
                        renderProducts(data);
                  })
                  .catch((error) => {
                        console.error('Произошла ошибка');
                  });
      }

      init();

};