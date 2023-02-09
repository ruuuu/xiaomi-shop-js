// отрисовка  корзины:
import { getData, putData } from "./api";
import { openModal, closeModal } from "./modals";




export const cartFunc = () => {
      const cartModal = document.getElementById('cart-modal')                 // модалка Корзина
      const openCartBtn = document.getElementById('open-cart-btn');           // кнопка Корзина
      const closeBtns = cartModal.querySelectorAll('.close-btn');             // кнопки Отмена и кретсик, псевдомассив Nodelist


      const container = document.getElementById('cart-container');
      container.innerHTML = "";                       // очищаем корзину 

      const render = (data) => {                // data = [ {id, name, count, price}, {}, {} ]-корзина товаров

            data.forEach((cartProduct) => {
                  // кнопкам +/- задаем дата-атрибуты  data-id, data-name, data-count, data-price чтобы отправить их в  метод PUT. Методом PUT  тк у товара(объекта) меняется свойство count:
                  container.insertAdjacentHTML('beforeend', `
                        <div class="row border-bottom pb-3 pt-3">
                              <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">${cartProduct.name}</div>
                              <div class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                                    <h4 class="me-3 d-flex align-itemns-center">${cartProduct.price} ₽</h4>
                                    <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                                          id="control-dec" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-count="${item.count}">
                                          -
                                    </button>
                                    <h6 class="cart-item-count me-3 ms-3">${cartProduct.count}</h6>
                                    <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                                          id="control-inc" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-count="${item.count}">
                                          +
                                    </button>
                              </div>
                        </div>
                  `);
            });
      };



      // обновление корзины(увелич/уменьш count у товара):
      const updateCart = () => {

            getData('/cart')   // тк в db.json есть свойство  cart, то поэтому в  урле указываем cart
                  .then((data) => {   // ответ от сервера  data  = [ {id, name, count, price}, {}, {} ] - товары в коризне
                        render(data);
                  })
                  .catch((error) => {
                        console.error('Произошла ошибка');
                  });
      };



      // вешаем обработчик события на кнопку Корзина:
      openCartBtn.addEventListener('click', () => {
            updateCart();
            openModal(cartModal);
      });



      closeBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                  closeModal(cartModal);
            });
      });



      // навешиеваем обработчик не на каждую кнопку +/- товара корзины, а на их родителя. Это называется делегирование:
      container.addEventListener('click', (evt) => {

            if (evt.target.closest('button')) {
                  if (evt.target.id && evt.target.id === 'control-inc') {           // если это кнопка "+"
                        const id = evt.target.dataset.id;
                        const name = evt.target.dataset.name;
                        const price = evt.target.dataset.price;
                        const count = Number(evt.target.dataset.count);

                        const item = {  //   товар корзины, у котрого count изменили
                              id: id,
                              name: name,
                              price: price,
                              count: count + 1
                        }

                        // put запрос отправляем:
                        putData(`/cart/${item.id}`, item)     // у db.json есть свойтво cart, а у cart есть  id
                              .then(() => {
                                    updateCart();
                              })

                  }
                  else
                        if (evt.target.id && evt.target.id === 'control-dec') {     // если это кнопка "-"
                              const id = evt.target.dataset.id;
                              const name = evt.target.dataset.name;
                              const price = evt.target.dataset.price;
                              const count = evt.target.dataset.count;

                              const item = {  //  создаем  товар корзины
                                    id: id,
                                    name: name,
                                    price: price,
                                    count: count - 1
                              }

                              // put запрос отправляем:
                              putData(`/cart/${item.id}`, item)     // у db.json есть свойтво cart, а у cart есть  id
                                    .then(() => {
                                          updateCart();
                                    })
                        }

            }

      });
};