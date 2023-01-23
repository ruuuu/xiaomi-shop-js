// отрисовка  корзины:
import { getData } from "./api";
import { openModal, closeModal } from "./modals";




export const cartFunc = () => {
      const cartModal = document.getElementById('cart-modal')           // модалка Корзина
      const openCartBtn = document.getElementById('open-cart-btn');     // кнопка Корзина
      const closeBtns = cartModal.querySelectorAll('.close-btn');           // кнопки Отмена и кретсик, псевдомассив Nodelist


      const container = document.getElementById('cart-container');
      container.innerHTML = "";                       // очищаем корзину 

      const render = (data) => {                // data = [ {id, name, count, price}, {}, {} ]

            data.forEach((cartProduct) => {

                  container.insertAdjacentHTML('beforeend', `
                        <div class="row border-bottom pb-3 pt-3">
                              <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">${cartProduct.name}</div>
                              <div class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                                    <h4 class="me-3 d-flex align-itemns-center">${cartProduct.price} ₽</h4>
                                    <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                                          id="control-dec">
                                          -
                                    </button>
                                    <h6 class="cart-item-count me-3 ms-3">${cartProduct.count}</h6>
                                    <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                                          id="control-inc">
                                          +
                                    </button>
                              </div>
                        </div>
                  `);
            });
      }





      openCartBtn.addEventListener('click', () => {  // вешаем обработчик события на кнопку Корзина
            openModal(cartModal);

            getData('/cart')              // тк в db.json есть массив cart, то поэтому в  урле указываем cart
                  .then((data) => {       // data  = [ {id, name, count, price}, {}, {} ]
                        render(data);
                  })
                  .catch((error) => {
                        console.error('Произошла ошибка');
                  });
      });


      closeBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                  closeModal(cartModal);
            });
      });

};