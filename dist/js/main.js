/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/auth */ \"./modules/auth.js\");\n/* harmony import */ var _modules_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cart */ \"./modules/cart.js\");\n/* harmony import */ var _modules_categories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/categories */ \"./modules/categories.js\");\n// точка входа для index.html:\n  // импорт фукнции authFunc\n\n\n\n\n(0,_modules_auth__WEBPACK_IMPORTED_MODULE_0__.authFunc)();\n(0,_modules_categories__WEBPACK_IMPORTED_MODULE_2__.categoriesFunc)();       // отрисовка категорий\n(0,_modules_cart__WEBPACK_IMPORTED_MODULE_1__.cartFunc)();\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./modules/api.js":
/*!************************!*\
  !*** ./modules/api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData)\n/* harmony export */ });\n// отпрака запроса на сервер по урлу path:\nconst apiPath = 'http://localhost:3001';\n\nconst getData = (path) => {\n\n      return fetch(apiPath + path)                          // асинхронный меод, для обработки асинхрнного кода\n            .then(response => {                             // как только данные полуим от сервера, выполнится метод then(), он обрабатывает промис\n                  if (!response.ok) {\n                        throw new Error('Ошибка получения  данных');\n                  }\n                  return response.json();\n            });\n\n};\n\n//# sourceURL=webpack:///./modules/api.js?");

/***/ }),

/***/ "./modules/auth.js":
/*!*************************!*\
  !*** ./modules/auth.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authFunc\": () => (/* binding */ authFunc)\n/* harmony export */ });\n/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ \"./modules/modals.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"./modules/api.js\");\n// авторзиация:\n\n\n\n\nconst authFunc = () => {\n\n      const authBtn = document.getElementById('open-auth-btn');         // кнопка Войти\n      const modal = document.getElementById('auth-modal');              // окно авторзиации\n      const closeBtns = modal.querySelectorAll('.close-btn');           // кнопки Отмена и кретсик, получим псевдомасив , NodeList = [button.btn-close, button.btn btn-outline-dark close-btn]\n      const loginBtn = modal.querySelector('.login-btn');               // кноппка Войти в модалке\n      const openCartBtn = document.getElementById('open-cart-btn');     // кнопка Корзина\n      const logoutBtn = document.getElementById('logout-btn');          // кнопка Выйти\n\n\n      const login = () => {                           // отобраажет состояние  при авторизации\n            authBtn.classList.add('d-none');\n            openCartBtn.classList.remove('d-none');   //  d-none bootstrap-ский класс\n            logoutBtn.classList.remove('d-none');\n            (0,_modals__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modal);\n\n      }\n\n\n\n      const logout = () => {                           // отобраажет состояние  при разлогине \n            authBtn.classList.remove('d-none');          // authBtn.style.display = 'block';\n            openCartBtn.classList.add('d-none');      //  d-none bootstrap-ский класс\n            logoutBtn.classList.add('d-none');\n      }\n\n\n      const checkAuth = () => {\n\n            //console.log(JSON.parse(localStorage.getItem('auth')));          // переврдим из строки в  json\n            const user = JSON.parse(localStorage.getItem('auth'));            // { \"login\": \"то что ввел бзер\",  \"password\": \"то что ввел юзер\" }\n\n            if (user) {\n                  (0,_api__WEBPACK_IMPORTED_MODULE_1__.getData)('/profile')\n                        .then((data) => {                                      // data = { login: \"admin\",  passsword: \"1234\" } ответ сервера\n                              if ((data.login === user.login) && (data.password === user.password)) {\n                                    login();\n                              }\n                        });\n            }\n\n      }\n\n\n\n\n      authBtn.addEventListener('click', () => {\n            ;(0,_modals__WEBPACK_IMPORTED_MODULE_0__.openModal)(modal);\n      });\n\n\n      closeBtns.forEach((btn) => {\n            btn.addEventListener('click', () => {\n                  (0,_modals__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modal);\n            });\n      });\n\n\n      loginBtn.addEventListener('click', () => {            // нажатие на Войти\n\n            const loginInput = modal.querySelector('#login-control');  // по id нашли\n            const passwordInput = modal.querySelector('#password-control');\n            const user = {\n                  login: loginInput.value,\n                  password: passwordInput.value\n            }\n\n            ;(0,_api__WEBPACK_IMPORTED_MODULE_1__.getData)('/profile')\n                  .then((data) => {                                     // либо через then() обрбаотываем промис,  либо ставим async/await\n                        console.log(data);                              // то что вернет сервер  data={login: \"admin\", password: \"1234\"}\n                        if ((data.login === user.login) && (data.password === user.password)) {\n                              localStorage.setItem('auth', JSON.stringify(user));               //   JSON.stringify(user) преводит объект в строку. в localStorae храним все в ввиде строки\n                              login();\n                        }\n                        else {\n                              alert('неудасча');\n                        }\n                  });\n\n      });\n\n\n\n      logoutBtn.addEventListener('click', () => {\n            localStorage.removeItem('auth');                // удаляем ключ из localSoage\n            logout();\n      });\n\n\n\n\n\n      checkAuth(); // проверяем есть ли данные в localStorage\n\n}\n\n\n//# sourceURL=webpack:///./modules/auth.js?");

/***/ }),

/***/ "./modules/cart.js":
/*!*************************!*\
  !*** ./modules/cart.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cartFunc\": () => (/* binding */ cartFunc)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./modules/api.js\");\n/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modals */ \"./modules/modals.js\");\n// отрисовка  корзины:\n\n\n\n\n\n\nconst cartFunc = () => {\n      const cartModal = document.getElementById('cart-modal')           // модалка Корзина\n      const openCartBtn = document.getElementById('open-cart-btn');     // кнопка Корзина\n      const closeBtns = cartModal.querySelectorAll('.close-btn');           // кнопки Отмена и кретсик, псевдомассив Nodelist\n\n\n      const container = document.getElementById('cart-container');\n      container.innerHTML = \"\";                       // очищаем корзину \n\n      const render = (data) => {                // data = [ {id, name, count, price}, {}, {} ]\n\n            data.forEach((cartProduct) => {\n\n                  container.insertAdjacentHTML('beforeend', `\n                        <div class=\"row border-bottom pb-3 pt-3\">\n                              <div class=\"col col-12 col-md-6 mb-3 mb-md-0 fs-4\">${cartProduct.name}</div>\n                              <div class=\"col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap\">\n                                    <h4 class=\"me-3 d-flex align-itemns-center\">${cartProduct.price} ₽</h4>\n                                    <button type=\"button\" class=\"btn btn-outline-dark btn-sm cart-item-controls\"\n                                          id=\"control-dec\">\n                                          -\n                                    </button>\n                                    <h6 class=\"cart-item-count me-3 ms-3\">${cartProduct.count}</h6>\n                                    <button type=\"button\" class=\"btn btn-outline-dark btn-sm cart-item-controls\"\n                                          id=\"control-inc\">\n                                          +\n                                    </button>\n                              </div>\n                        </div>\n                  `);\n            });\n      }\n\n\n\n\n\n      openCartBtn.addEventListener('click', () => {  // вешаем обработчик события на кнопку Корзина\n            ;(0,_modals__WEBPACK_IMPORTED_MODULE_1__.openModal)(cartModal);\n\n            (0,_api__WEBPACK_IMPORTED_MODULE_0__.getData)('/cart')              // тк в db.json есть массив cart, то поэтому в  урле указываем cart\n                  .then((data) => {       // data  = [ {id, name, count, price}, {}, {} ]\n                        render(data);\n                  })\n                  .catch((error) => {\n                        console.error('Произошла ошибка');\n                  });\n      });\n\n\n      closeBtns.forEach((btn) => {\n            btn.addEventListener('click', () => {\n                  (0,_modals__WEBPACK_IMPORTED_MODULE_1__.closeModal)(cartModal);\n            });\n      });\n\n};\n\n//# sourceURL=webpack:///./modules/cart.js?");

/***/ }),

/***/ "./modules/categories.js":
/*!*******************************!*\
  !*** ./modules/categories.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"categoriesFunc\": () => (/* binding */ categoriesFunc)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./modules/api.js\");\n// получение категорий:\n\n\n\n\nconst categoriesFunc = () => {\n      const container = document.getElementById('categories-container');\n\n\n      const render = (data) => {                // data = [ {id, name, preview}, {}, {} ]\n\n            data.forEach((category) => {\n                  container.insertAdjacentHTML('beforeend', `\n                        <div class=\"col col-12 col-md-6 col-lg-4 mb-3\">\n                              <a href=\"/catalog.html?id=${category.id}\" class=\"card-link\">\n                                    <div class=\"card\">\n                                          <img src=\"${category.preview}\" class=\"card-img-top\" alt=\"phones\">\n                                          <div class=\"card-body\">\n                                                <h5 class=\"card-title\">${category.name}</h5>\n                                          </div>\n                                    </div>\n                               </a>\n                        </div>\n                  `);\n            });\n      }\n\n\n      ;(0,_api__WEBPACK_IMPORTED_MODULE_0__.getData)('/categories')\n            .then((data) => {  // data  = [ {id, name, preview}, {}, {} ]\n                  render(data);\n            })\n            .catch((error) => {\n                  console.error('Произошла ошибка');\n            });\n\n};\n\n//# sourceURL=webpack:///./modules/categories.js?");

/***/ }),

/***/ "./modules/modals.js":
/*!***************************!*\
  !*** ./modules/modals.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"closeModal\": () => (/* binding */ closeModal),\n/* harmony export */   \"openModal\": () => (/* binding */ openModal)\n/* harmony export */ });\n// открытие/закрытие мод  окна\n\nconst openModal = (modal) => {\n      // вместо след четырех строк можно использваоть  метод insertAdjacmentHTML:\n      const layout = document.createElement('div');   //  оверлей для модалки(затемненая облатсь вокруг модалки)\n      layout.classList.add('modal-backdrop');\n      layout.classList.add('fade');\n      document.body.append(layout);\n\n\n\n\n      setTimeout(() => {  // переданная фукнция отрабоатет через 0.1 с (100ms)\n            //const layout = document.querySelector('.modal-backdrop');\n            if (layout) {\n                  layout.classList.add('show');\n            }\n\n            modal.classList.add('show');\n      }, 100);\n\n\n\n\n      modal.classList.add('d-block');     //  d-block bootstrap-ский класс\n\n      setTimeout(() => {  // переданная фукнция отрабоатет через 0.1 с (100ms)\n            modal.classList.add('show');\n      }, 100);\n}\n\n\n\n\n// закррытие окна\nconst closeModal = (modal) => {\n      const layout = document.querySelector('.modal-backdrop');\n      modal.classList.remove('show');\n      if (layout) {\n            layout.classList.remove('show');\n      }\n\n\n\n      setTimeout(() => {\n            modal.style.display = 'none';\n            if (layout) {\n                  layout.remove();              // удаляем элемент из верстки\n            }\n      }, 500);\n\n}\n\n//# sourceURL=webpack:///./modules/modals.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;