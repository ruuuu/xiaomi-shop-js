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

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _admin_addCategory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin/addCategory */ \"./admin/addCategory.js\");\n/* harmony import */ var _admin_addProduct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin/addProduct */ \"./admin/addProduct.js\");\n// точка входа для admin.html http://localhost:8081/admin.html:\n\n\n\n\n(0,_admin_addCategory__WEBPACK_IMPORTED_MODULE_0__.addCategory)();\n(0,_admin_addProduct__WEBPACK_IMPORTED_MODULE_1__.addProduct)();\n\n//# sourceURL=webpack:///./admin.js?");

/***/ }),

/***/ "./admin/addCategory.js":
/*!******************************!*\
  !*** ./admin/addCategory.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addCategory\": () => (/* binding */ addCategory)\n/* harmony export */ });\nconst addCategory = () => {\n      const nameInput = document.getElementById('category-name');\n      const previewInput = document.getElementById('category-image');   // поле для загрузки картнки категории\n      const saveButton = document.getElementById('category-add-btn');\n\n      const categoryObj = {  // этот объект будем отправлять на сервер, нач значения пустые поля\n            \"name\": \"\",\n            \"preview\": \"\"\n      }\n\n\n      const checkValues = () => {\n            if (nameInput.value === '' || previewInput === '') {\n                  saveButton.disabled = true;   // дизебл кнопки\n            }\n            else {\n                  saveButton.false = true;\n            }\n      }\n\n\n      nameInput.addEventListener('input', () => {     // вешам обработик на тектсовое поле, пр  вводе символа в поле, вызывается коллбэк\n            checkValues();\n            categoryObj.name = nameInput.value;\n      });\n\n\n\n      previewInput.addEventListener('input', () => {  //вешаем обработчик события загрузки картинки\n\n            //console.log(previewInput.files);       // files - массив\n            const file = previewInput.files[0];\n            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {\n                  const reader = new FileReader();      // превращаем файл в строку\n                  reader.readAsDataURL(file);\n                  reportError.onload  //  onload -событие\n            }\n            else {\n                  previewInput.value = '';            // очищаем поле\n            }\n\n            checkValues();\n\n\n      });\n\n      checkValues();\n\n};\n\n//# sourceURL=webpack:///./admin/addCategory.js?");

/***/ }),

/***/ "./admin/addProduct.js":
/*!*****************************!*\
  !*** ./admin/addProduct.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addProduct\": () => (/* binding */ addProduct)\n/* harmony export */ });\nconst addProduct = () => {\n\n};\n\n//# sourceURL=webpack:///./admin/addProduct.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./admin.js");
/******/ 	
/******/ })()
;