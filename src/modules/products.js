// отрисовка  списка карточек:
import { getData } from "./api";



export const prodocutsFunc = () => {

      const container = document.getElementById('products-container');
      container.innerHTML = "";

      const renderProducts = (data) => {                //  data  = [ {id, category, name, price, preview }, {}, {} ]

            data.forEach((product) => {
                  //  insertAdjacentHTML  добавляет элементы в container
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
                                                      <button type="button" class="btn btn-outline-dark">
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
      }




      const init = () => {   //  отсюда начинается
            //console.log(window.location);                                   // выведет инфрмацию об урле
            const params = window.location.search                             // вывдеет query параметры ?id=2
            const urlSearchParams = new URLSearchParams(params);
            const id = urlSearchParams.get('id');                             // получим значение query-параметра id
            const url = id ? `/products?category=${id}` : `/products`;        // в db.json есть  массив products,поэтому в урле пишем products.  У его элементов есть свойсвто category, поэтому queryParametr навазли category . https://www.npmjs.com/package/json-server#filter 

            getData(url)
                  .then((data) => {  // data  = [ {id, category, categoryName, name, price, preview }, {}, {} ]
                        renderProducts(data);
                  })
                  .catch((error) => {
                        console.error('Произошла ошибка');
                  });
      }

      init();

};