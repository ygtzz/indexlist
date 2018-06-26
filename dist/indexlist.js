(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IndexList = undefined;

var _objectAssign = __webpack_require__(1);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IndexList(opts) {
    opts = (0, _objectAssign2.default)({
        container: '.indexc',
        indexc: '.indexs',
        navc: '.index-navs',
        indicator: '.index-indicator',
        navAttr: 'data-nav',
        threshold: 100
    }, opts);
    this.opts = opts;

    var self = this;
    self.opts.navSel = '[' + self.opts.navAttr + ']';
    self.container = document.querySelector(opts.container);
    self.indexc = document.querySelector(opts.indexc);
    self.navc = document.querySelector(opts.navc);
    self.indexTitles = Array.prototype.slice.call(self.indexc.querySelectorAll(opts.navSel) || []);
    self.navs = self.navc.querySelectorAll(opts.navSel);
    self.indexSections = self.indexTitles.map(function (item) {
        return item.getBoundingClientRect().top - self.indexc.getBoundingClientRect().top;
    });
    self.indicator = document.querySelector(opts.indicator);
    self.threshold = opts.threshold;

    //注册scroll事件，在滚动时候显示中间的导航toast
    self.container.addEventListener('scroll', function () {
        self._changeIndicatorThrottle();
        self._showIndicatorDebounce(false);
    });
    //注册点击事件，在点击右侧导航时候显示相应的内容区域
    self.navc.addEventListener('click', function (e) {
        var target = e.target;
        if (target.matches('.nav-item')) {
            var dataNav = target.getAttribute(self.opts.navAttr),
                indexTitle = document.querySelector('[' + self.opts.navAttr + '=' + dataNav + ']');
            self.container.scrollTop = indexTitle.getBoundingClientRect().top - self.indexc.getBoundingClientRect().top;
        }
    });
}

IndexList.prototype._showIndicator = function (show) {
    this.indicator.style.display = show ? 'inline-block' : 'none';
};
IndexList.prototype._showIndicatorDebounce = debounce(IndexList.prototype._showIndicator, 1000);
IndexList.prototype._changeIndicator = function () {
    var scrollTop = this.container.scrollTop,
        indexSections = this.indexSections,
        len = indexSections.length,
        threshold = this.threshold,
        indicator = this.indicator,
        indexTitles = this.indexTitles,
        navAttr = this.opts.navAttr;
    this._showIndicator(true);
    for (var i = 0; i < len; i++) {
        if (scrollTop >= indexSections[len - 1] - threshold) {
            indicator.innerHTML = indexTitles[len - 1].getAttribute(navAttr);
        } else if (indexSections[i] - threshold <= scrollTop && scrollTop < indexSections[i + 1] - threshold) {
            indicator.innerHTML = indexTitles[i].getAttribute(navAttr);
        }
    }
};
IndexList.prototype._changeIndicatorThrottle = throttle(IndexList.prototype._changeIndicator, 100);

function debounce(fn, delay) {
    var timer;
    return function () {
        var ctx = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(ctx, args);
        }, delay);
    };
}

function throttle(fn, interval) {
    var last = 0;
    return function () {
        var ctx = this,
            args = arguments,
            cur = +new Date();
        if (cur - last >= interval) {
            fn.apply(ctx, args);
            cur = last;
        }
    };
}

exports.IndexList = IndexList;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ })
/******/ ]);
});