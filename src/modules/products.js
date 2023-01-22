// отрисовка  списка карточек:
import { getData } from "./api";



export const prodocutsFunc = () => {

      const container = document.getElementById('products-container');
      container.innerHTML = "";

      const renderProducts = (data) => {                //  data  = [ {id, category, categoryName, name, price, preview }, {}, {} ]

            data.forEach((product) => {
                  //  insertAdjacentHTML  добавляет элементы в container
                  container.insertAdjacentHTML('beforeend', `    
                        <div class="col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
                              <a href="#" class="card-link">
                                    <div class="card">
                                          <img src="${product.preview}" class="card-img-top" alt="phone-1">
                                          <div class="card-body">
                                                <span class="mb-2 d-block text-secondary">${product.categoryName}</span>
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


      getData('/products')
            .then((data) => {  // data  = [ {id, category, categoryName, name, price, preview }, {}, {} ]
                  renderProducts(data);
            })
            .catch((error) => {
                  console.error('Произошла ошибка');
            });

};