System.register(["jimu-core/emotion","jimu-core","jimu-ui/advanced/setting-components","jimu-ui"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE__emotion_react_jsx_runtime__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_core__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_ui__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE__emotion_react_jsx_runtime__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_core__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_ui__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				__WEBPACK_EXTERNAL_MODULE__emotion_react_jsx_runtime__["default"] = module["default"] || module;
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE__emotion_react_jsx_runtime__[key] = module[key];
				});
			},
			function(module) {
				__WEBPACK_EXTERNAL_MODULE_jimu_core__["default"] = module["default"] || module;
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_core__[key] = module[key];
				});
			},
			function(module) {
				__WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__["default"] = module["default"] || module;
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__[key] = module[key];
				});
			},
			function(module) {
				__WEBPACK_EXTERNAL_MODULE_jimu_ui__["default"] = module["default"] || module;
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_ui__[key] = module[key];
				});
			}
		],
		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./your-extensions/widgets/centro-mando-ungrd/src/setting/translations/default.ts"
/*!****************************************************************************************!*\
  !*** ./your-extensions/widgets/centro-mando-ungrd/src/setting/translations/default.ts ***!
  \****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    mapSection: 'Mapa conectado',
    mapHint: 'El panel detecta en este mapa las capas de Agua, Educación, Energía, Salud y Transporte por su título.',
    displaySection: 'Visualización',
    titleLabel: 'Título',
    subtitleLabel: 'Subtítulo',
    effectMode: 'Lo que no cumple el filtro en el mapa',
    dim: 'Atenuar (gris translúcido)',
    hide: 'Ocultar',
    extentDefault: 'Filtrar por la vista del mapa al iniciar',
    topCount: 'Municipios en el ranking'
});


/***/ },

/***/ "jimu-core"
/*!****************************!*\
  !*** external "jimu-core" ***!
  \****************************/
(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_core__;

/***/ },

/***/ "@emotion/react/jsx-runtime"
/*!************************************!*\
  !*** external "jimu-core/emotion" ***!
  \************************************/
(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__emotion_react_jsx_runtime__;

/***/ },

/***/ "jimu-ui"
/*!**************************!*\
  !*** external "jimu-ui" ***!
  \**************************/
(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_ui__;

/***/ },

/***/ "jimu-ui/advanced/setting-components"
/*!******************************************************!*\
  !*** external "jimu-ui/advanced/setting-components" ***!
  \******************************************************/
(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__;

/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
(() => {
/*!******************************************!*\
  !*** ./jimu-core/lib/set-public-path.ts ***!
  \******************************************/
/**
 * Webpack will replace __webpack_public_path__ with __webpack_require__.p to set the public path dynamically.
 * The reason why we can't set the publicPath in webpack config is: we change the publicPath when download.
 * */
__webpack_require__.p = window.jimuConfig.baseUrl;

})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!****************************************************************************!*\
  !*** ./your-extensions/widgets/centro-mando-ungrd/src/setting/setting.tsx ***!
  \****************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __set_webpack_public_path__: () => (/* binding */ __set_webpack_public_path__),
/* harmony export */   "default": () => (/* binding */ Setting)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "@emotion/react/jsx-runtime");
/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-core */ "jimu-core");
/* harmony import */ var jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jimu-ui/advanced/setting-components */ "jimu-ui/advanced/setting-components");
/* harmony import */ var jimu_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jimu-ui */ "jimu-ui");
/* harmony import */ var _translations_default__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./translations/default */ "./your-extensions/widgets/centro-mando-ungrd/src/setting/translations/default.ts");





function Setting(props) {
    const { id, config, useMapWidgetIds, onSettingChange } = props;
    const setConfig = (key, value) => { onSettingChange({ id, config: config.set(key, value) }); };
    return ((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: 'widget-setting-centro-mando-ungrd', children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingSection, { title: _translations_default__WEBPACK_IMPORTED_MODULE_4__["default"].mapSection, children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingRow, { children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.MapWidgetSelector, { useMapWidgetIds: useMapWidgetIds, onSelect: (ids) => { onSettingChange({ id, useMapWidgetIds: ids }); } }) }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingRow, { children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { style: { fontSize: 12, opacity: 0.8 }, children: _translations_default__WEBPACK_IMPORTED_MODULE_4__["default"].mapHint }) })] }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingSection, { title: _translations_default__WEBPACK_IMPORTED_MODULE_4__["default"].displaySection, children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingRow, { flow: 'wrap', label: _translations_default__WEBPACK_IMPORTED_MODULE_4__["default"].titleLabel, children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_3__.TextInput, { size: 'sm', className: 'w-100', defaultValue: config.title, onAcceptValue: (v) => { setConfig('title', v); } }) }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingRow, { flow: 'wrap', label: _translations_default__WEBPACK_IMPORTED_MODULE_4__["default"].subtitleLabel, children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_3__.TextInput, { size: 'sm', className: 'w-100', defaultValue: config.subtitle, onAcceptValue: (v) => { setConfig('subtitle', v); } }) }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingRow, { flow: 'wrap', label: _translations_default__WEBPACK_IMPORTED_MODULE_4__["default"].effectMode, children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(jimu_ui__WEBPACK_IMPORTED_MODULE_3__.Select, { size: 'sm', value: config.effectMode || 'dim', onChange: (e) => { setConfig('effectMode', e.target.value); }, children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_3__.Option, { value: 'dim', children: _translations_default__WEBPACK_IMPORTED_MODULE_4__["default"].dim }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_3__.Option, { value: 'hide', children: _translations_default__WEBPACK_IMPORTED_MODULE_4__["default"].hide })] }) }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingRow, { label: _translations_default__WEBPACK_IMPORTED_MODULE_4__["default"].extentDefault, children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_3__.Switch, { checked: !!config.extentDefault, onChange: (e) => { setConfig('extentDefault', e.target.checked); } }) }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingRow, { label: _translations_default__WEBPACK_IMPORTED_MODULE_4__["default"].topCount, children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(jimu_ui__WEBPACK_IMPORTED_MODULE_3__.NumericInput, { size: 'sm', style: { width: 80 }, min: 5, max: 30, value: config.topCount, onAcceptValue: (v) => { setConfig('topCount', v || 12); } }) })] })] }));
}
function __set_webpack_public_path__(url) { __webpack_require__.p = url; }

})();

/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy9jZW50cm8tbWFuZG8tdW5ncmQvZGlzdC9zZXR0aW5nL3NldHRpbmcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFlO0lBQ2IsVUFBVSxFQUFFLGdCQUFnQjtJQUM1QixPQUFPLEVBQUUsd0dBQXdHO0lBQ2pILGNBQWMsRUFBRSxlQUFlO0lBQy9CLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLGFBQWEsRUFBRSxXQUFXO0lBQzFCLFVBQVUsRUFBRSx1Q0FBdUM7SUFDbkQsR0FBRyxFQUFFLDRCQUE0QjtJQUNqQyxJQUFJLEVBQUUsU0FBUztJQUNmLGFBQWEsRUFBRSwwQ0FBMEM7SUFDekQsUUFBUSxFQUFFLDBCQUEwQjtDQUNyQzs7Ozs7Ozs7Ozs7O0FDWEQsdUQ7Ozs7Ozs7Ozs7O0FDQUEsd0U7Ozs7Ozs7Ozs7O0FDQUEscUQ7Ozs7Ozs7Ozs7O0FDQUEsaUY7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7V0NOQSwyQjs7Ozs7Ozs7OztBQ0FBOzs7S0FHSztBQUNMLHFCQUF1QixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSmxCO0FBRWtFO0FBQzFCO0FBRXJCO0FBRXJDLFNBQVMsT0FBTyxDQUFFLEtBQXNDO0lBQ3JFLE1BQU0sRUFBRSxFQUFFLEVBQUUs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QUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFDbkYsYUFBYSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsR0FBRyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUksR0FDM0QsSUFDRSxJQUNiLENBQ1A7QUFDSCxDQUFDO0FBRU8sU0FBUywyQkFBMkIsQ0FBQyxHQUFHLElBQUkscUJBQXVCLEdBQUcsR0FBRyxFQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvY2VudHJvLW1hbmRvLXVuZ3JkL3NyYy9zZXR0aW5nL3RyYW5zbGF0aW9ucy9kZWZhdWx0LnRzIiwid2VicGFjazovL2V4Yi1jbGllbnQvZXh0ZXJuYWwgc3lzdGVtIFwiamltdS1jb3JlXCIiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC9leHRlcm5hbCBzeXN0ZW0gXCJqaW11LWNvcmUvZW1vdGlvblwiIiwid2VicGFjazovL2V4Yi1jbGllbnQvZXh0ZXJuYWwgc3lzdGVtIFwiamltdS11aVwiIiwid2VicGFjazovL2V4Yi1jbGllbnQvZXh0ZXJuYWwgc3lzdGVtIFwiamltdS11aS9hZHZhbmNlZC9zZXR0aW5nLWNvbXBvbmVudHNcIiIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vamltdS1jb3JlL2xpYi9zZXQtcHVibGljLXBhdGgudHMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL3lvdXItZXh0ZW5zaW9ucy93aWRnZXRzL2NlbnRyby1tYW5kby11bmdyZC9zcmMvc2V0dGluZy9zZXR0aW5nLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG1hcFNlY3Rpb246ICdNYXBhIGNvbmVjdGFkbycsXG4gIG1hcEhpbnQ6ICdFbCBwYW5lbCBkZXRlY3RhIGVuIGVzdGUgbWFwYSBsYXMgY2FwYXMgZGUgQWd1YSwgRWR1Y2FjacOzbiwgRW5lcmfDrWEsIFNhbHVkIHkgVHJhbnNwb3J0ZSBwb3Igc3UgdMOtdHVsby4nLFxuICBkaXNwbGF5U2VjdGlvbjogJ1Zpc3VhbGl6YWNpw7NuJyxcbiAgdGl0bGVMYWJlbDogJ1TDrXR1bG8nLFxuICBzdWJ0aXRsZUxhYmVsOiAnU3VidMOtdHVsbycsXG4gIGVmZmVjdE1vZGU6ICdMbyBxdWUgbm8gY3VtcGxlIGVsIGZpbHRybyBlbiBlbCBtYXBhJyxcbiAgZGltOiAnQXRlbnVhciAoZ3JpcyB0cmFuc2zDumNpZG8pJyxcbiAgaGlkZTogJ09jdWx0YXInLFxuICBleHRlbnREZWZhdWx0OiAnRmlsdHJhciBwb3IgbGEgdmlzdGEgZGVsIG1hcGEgYWwgaW5pY2lhcicsXG4gIHRvcENvdW50OiAnTXVuaWNpcGlvcyBlbiBlbCByYW5raW5nJ1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2ppbXVfY29yZV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fZW1vdGlvbl9yZWFjdF9qc3hfcnVudGltZV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qaW11X3VpX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2ppbXVfdWlfYWR2YW5jZWRfc2V0dGluZ19jb21wb25lbnRzX187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7IiwiLyoqXHJcbiAqIFdlYnBhY2sgd2lsbCByZXBsYWNlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHdpdGggX193ZWJwYWNrX3JlcXVpcmVfXy5wIHRvIHNldCB0aGUgcHVibGljIHBhdGggZHluYW1pY2FsbHkuXHJcbiAqIFRoZSByZWFzb24gd2h5IHdlIGNhbid0IHNldCB0aGUgcHVibGljUGF0aCBpbiB3ZWJwYWNrIGNvbmZpZyBpczogd2UgY2hhbmdlIHRoZSBwdWJsaWNQYXRoIHdoZW4gZG93bmxvYWQuXHJcbiAqICovXHJcbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gd2luZG93LmppbXVDb25maWcuYmFzZVVybFxyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJ2ppbXUtY29yZSdcbmltcG9ydCB0eXBlIHsgQWxsV2lkZ2V0U2V0dGluZ1Byb3BzIH0gZnJvbSAnamltdS1mb3ItYnVpbGRlcidcbmltcG9ydCB7IFNldHRpbmdTZWN0aW9uLCBTZXR0aW5nUm93LCBNYXBXaWRnZXRTZWxlY3RvciB9IGZyb20gJ2ppbXUtdWkvYWR2YW5jZWQvc2V0dGluZy1jb21wb25lbnRzJ1xuaW1wb3J0IHsgU3dpdGNoLCBUZXh0SW5wdXQsIFNlbGVjdCwgT3B0aW9uLCBOdW1lcmljSW5wdXQgfSBmcm9tICdqaW11LXVpJ1xuaW1wb3J0IHR5cGUgeyBJTUNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCBkZWZhdWx0TWVzc2FnZXMgZnJvbSAnLi90cmFuc2xhdGlvbnMvZGVmYXVsdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2V0dGluZyAocHJvcHM6IEFsbFdpZGdldFNldHRpbmdQcm9wczxJTUNvbmZpZz4pIHtcbiAgY29uc3QgeyBpZCwgY29uZmlnLCB1c2VNYXBXaWRnZXRJZHMsIG9uU2V0dGluZ0NoYW5nZSB9ID0gcHJvcHNcbiAgY29uc3Qgc2V0Q29uZmlnID0gKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB7IG9uU2V0dGluZ0NoYW5nZSh7IGlkLCBjb25maWc6IGNvbmZpZy5zZXQoa2V5LCB2YWx1ZSkgfSkgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J3dpZGdldC1zZXR0aW5nLWNlbnRyby1tYW5kby11bmdyZCc+XG4gICAgICA8U2V0dGluZ1NlY3Rpb24gdGl0bGU9e2RlZmF1bHRNZXNzYWdlcy5tYXBTZWN0aW9ufT5cbiAgICAgICAgPFNldHRpbmdSb3c+XG4gICAgICAgICAgPE1hcFdpZGdldFNlbGVjdG9yIHVzZU1hcFdpZGdldElkcz17dXNlTWFwV2lkZ2V0SWRzfSBvblNlbGVjdD17KGlkczogc3RyaW5nW10pID0+IHsgb25TZXR0aW5nQ2hhbmdlKHsgaWQsIHVzZU1hcFdpZGdldElkczogaWRzIH0pIH19IC8+XG4gICAgICAgIDwvU2V0dGluZ1Jvdz5cbiAgICAgICAgPFNldHRpbmdSb3c+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBvcGFjaXR5OiAwLjggfX0+e2RlZmF1bHRNZXNzYWdlcy5tYXBIaW50fTwvc3Bhbj5cbiAgICAgICAgPC9TZXR0aW5nUm93PlxuICAgICAgPC9TZXR0aW5nU2VjdGlvbj5cblxuICAgICAgPFNldHRpbmdTZWN0aW9uIHRpdGxlPXtkZWZhdWx0TWVzc2FnZXMuZGlzcGxheVNlY3Rpb259PlxuICAgICAgICA8U2V0dGluZ1JvdyBmbG93PSd3cmFwJyBsYWJlbD17ZGVmYXVsdE1lc3NhZ2VzLnRpdGxlTGFiZWx9PlxuICAgICAgICAgIDxUZXh0SW5wdXQgc2l6ZT0nc20nIGNsYXNzTmFtZT0ndy0xMDAnIGRlZmF1bHRWYWx1ZT17Y29uZmlnLnRpdGxlfSBvbkFjY2VwdFZhbHVlPXsodjogc3RyaW5nKSA9PiB7IHNldENvbmZpZygndGl0bGUnLCB2KSB9fSAvPlxuICAgICAgICA8L1NldHRpbmdSb3c+XG4gICAgICAgIDxTZXR0aW5nUm93IGZsb3c9J3dyYXAnIGxhYmVsPXtkZWZhdWx0TWVzc2FnZXMuc3VidGl0bGVMYWJlbH0+XG4gICAgICAgICAgPFRleHRJbnB1dCBzaXplPSdzbScgY2xhc3NOYW1lPSd3LTEwMCcgZGVmYXVsdFZhbHVlPXtjb25maWcuc3VidGl0bGV9IG9uQWNjZXB0VmFsdWU9eyh2OiBzdHJpbmcpID0+IHsgc2V0Q29uZmlnKCdzdWJ0aXRsZScsIHYpIH19IC8+XG4gICAgICAgIDwvU2V0dGluZ1Jvdz5cbiAgICAgICAgPFNldHRpbmdSb3cgZmxvdz0nd3JhcCcgbGFiZWw9e2RlZmF1bHRNZXNzYWdlcy5lZmZlY3RNb2RlfT5cbiAgICAgICAgICA8U2VsZWN0IHNpemU9J3NtJyB2YWx1ZT17Y29uZmlnLmVmZmVjdE1vZGUgfHwgJ2RpbSd9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maWcoJ2VmZmVjdE1vZGUnLCBlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICA8T3B0aW9uIHZhbHVlPSdkaW0nPntkZWZhdWx0TWVzc2FnZXMuZGltfTwvT3B0aW9uPlxuICAgICAgICAgICAgPE9wdGlvbiB2YWx1ZT0naGlkZSc+e2RlZmF1bHRNZXNzYWdlcy5oaWRlfTwvT3B0aW9uPlxuICAgICAgICAgIDwvU2VsZWN0PlxuICAgICAgICA8L1NldHRpbmdSb3c+XG4gICAgICAgIDxTZXR0aW5nUm93IGxhYmVsPXtkZWZhdWx0TWVzc2FnZXMuZXh0ZW50RGVmYXVsdH0+XG4gICAgICAgICAgPFN3aXRjaCBjaGVja2VkPXshIWNvbmZpZy5leHRlbnREZWZhdWx0fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q29uZmlnKCdleHRlbnREZWZhdWx0JywgZS50YXJnZXQuY2hlY2tlZCkgfX0gLz5cbiAgICAgICAgPC9TZXR0aW5nUm93PlxuICAgICAgICA8U2V0dGluZ1JvdyBsYWJlbD17ZGVmYXVsdE1lc3NhZ2VzLnRvcENvdW50fT5cbiAgICAgICAgICA8TnVtZXJpY0lucHV0IHNpemU9J3NtJyBzdHlsZT17eyB3aWR0aDogODAgfX0gbWluPXs1fSBtYXg9ezMwfSB2YWx1ZT17Y29uZmlnLnRvcENvdW50fVxuICAgICAgICAgICAgb25BY2NlcHRWYWx1ZT17KHY6IG51bWJlcikgPT4geyBzZXRDb25maWcoJ3RvcENvdW50JywgdiB8fCAxMikgfX0gLz5cbiAgICAgICAgPC9TZXR0aW5nUm93PlxuICAgICAgPC9TZXR0aW5nU2VjdGlvbj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4gZXhwb3J0IGZ1bmN0aW9uIF9fc2V0X3dlYnBhY2tfcHVibGljX3BhdGhfXyh1cmwpIHsgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSB1cmwgfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==