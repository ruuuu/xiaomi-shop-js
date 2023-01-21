// авторзиация:
import { openModal, closeModal } from "./modals";
import { getData } from "./api";


export const authFunc = () => {

      const authBtn = document.getElementById('open-auth-btn');         // кнопка Войти
      const modal = document.getElementById('auth-modal');              // окно авторзиации
      const closeBtns = modal.querySelectorAll('.close-btn');           // кнопки Отмена и кретсик, получим псевдомасив , NodeList = [button.btn-close, button.btn btn-outline-dark close-btn]
      const loginBtn = modal.querySelector('.login-btn');               // кноппка Войти в модалке
      const openCartBtn = document.getElementById('open-cart-btn');  // кнопка Корзина
      const logoutBtn = document.getElementById('logout-btn');          // кнопка Выйти
      const cartModal = document.getElementById('cart-modal')           // модалка Корзина


      const login = () => {                           // отобраажет состояние  при авторизации
            authBtn.classList.add('d-none');
            openCartBtn.classList.remove('d-none');   //  d-none bootstrap-ский класс
            logoutBtn.classList.remove('d-none');
            closeModal(modal);

      }



      const logout = () => {                           // отобраажет состояние  при разлогине 
            authBtn.classList.remove('d-none');          // authBtn.style.display = 'block';
            openCartBtn.classList.add('d-none');      //  d-none bootstrap-ский класс
            logoutBtn.classList.add('d-none');
      }


      const checkAuth = () => {

            //console.log(JSON.parse(localStorage.getItem('auth')));          // переврдим из строки в  json
            const user = JSON.parse(localStorage.getItem('auth'));            // {"login": "то что ввел бзер" , "password": "то что ввел юзер"}

            if (user) {
                  getData('/profile')
                        .then((data) => {                                      // data={login: "admin", passsword: "1234"} ответ сервера

                              if ((data.login === user.login) && (data.password === user.password)) {
                                    login();
                              }
                        });
            }

      }




      authBtn.addEventListener('click', () => {
            openModal(modal);
      });


      closeBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                  closeModal(modal);
            });
      });


      loginBtn.addEventListener('click', () => {            // нажатие на Войти

            const loginInput = modal.querySelector('#login-control');  // по id нашли
            const passwordInput = modal.querySelector('#password-control');
            const user = {
                  login: loginInput.value,
                  password: passwordInput.value
            }

            getData('/profile')
                  .then((data) => {                                     // либо через then() обрбаотываем промис,  либо ставим async/await
                        console.log(data);                              // то что вернет сервер  data={login: "admin", password: "1234"}
                        if ((data.login === user.login) && (data.password === user.password)) {
                              localStorage.setItem('auth', JSON.stringify(user));               //   JSON.stringify(user) преводит объект в строку. в localStorae храним все в ввиде строки
                              login();
                        }
                        else {
                              alert('неудасча');
                        }
                  });

      });



      logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('auth');                // удаляем ключ из localSoage
            logout();
      });


      openCartBtn.addEventListener('click', () => {  // вешаем собтиые на кнопку Корзина
            openModal(cartModal);
      });


      checkAuth(); // проверяем есть ли данные в localStorage

}
