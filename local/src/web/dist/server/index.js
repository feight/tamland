require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"index": 0
/******/ 	}
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"routes-home-page":1,"routes-x-page":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "" + chunkId + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + chunkId + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./route/index.ts":
/*!************************!*\
  !*** ./route/index.ts ***!
  \************************/
/*! exports provided: Route */
/*! exports used: Route */
/*! ModuleConcatenation bailout: Module uses eval() */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Route; });
/* harmony import */ var _tamland_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tamland/core */ "@tamland/core");
/* harmony import */ var _tamland_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tamland_core__WEBPACK_IMPORTED_MODULE_0__);

class Route extends _tamland_core__WEBPACK_IMPORTED_MODULE_0__["Route"] {
  loadable() {
    /*
     * Webpack's static analyzer needs a single variable to figurer out a
     * dynamic lazy loading path. Don't use this.id, use the variable id.
     */
    const id = this.id;
    /*
     * Needed for @loadable/components to wrap this during babel transpilation
     *
     * https://www.smooth-code.com/open-source/loadable-components/docs/babel-plugin/#magic-comments
     *
     */
    // eslint-disable-next-line no-inline-comments

    return {
      chunkName() {
        return "routes-".concat(id, "-page").replace(/[^a-zA-Z0-9_!§$()=\-^°]+/g, "-");
      },

      isReady(props) {
        if (true) {
          return !!__webpack_require__.m[this.resolve(props)];
        }

        return false;
      },

      requireAsync: () => __webpack_require__("./routes lazy recursive ^\\.\\/.*\\/page$")("./".concat(id, "/page")),

      requireSync(props) {
        const id = this.resolve(props);

        if (true) {
          return __webpack_require__(id);
        }

        return eval('module.require')(id);
      },

      resolve() {
        if (true) {
          return /*require.resolve*/(__webpack_require__("./routes weak recursive ^\\.\\/.*\\/page$").resolve("./".concat(id, "/page")));
        }

        return eval('require.resolve')("./../routes/".concat(id, "/page"));
      }

    };
  }

}

/***/ }),

/***/ "./routes lazy recursive ^\\.\\/.*\\/page$":
/*!*****************************************************!*\
  !*** ./routes lazy ^\.\/.*\/page$ namespace object ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./home/page": [
		"./routes/home/page.tsx",
		"routes-home-page"
	],
	"./pageNotFound/page": [
		"./routes/pageNotFound/page.tsx",
		"routes-pageNotFound-page"
	],
	"./x/page": [
		"./routes/x/page.tsx",
		"routes-x-page"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./routes lazy recursive ^\\.\\/.*\\/page$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./routes weak recursive ^\\.\\/.*\\/page$":
/*!************************************!*\
  !*** ./routes weak ^\.\/.*\/page$ ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./home/page": "./routes/home/page.tsx",
	"./pageNotFound/page": "./routes/pageNotFound/page.tsx",
	"./x/page": "./routes/x/page.tsx"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	if(!__webpack_require__.m[id]) {
		var e = new Error("Module '" + req + "' ('" + id + "') is not available (weak dependency)");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
webpackContext.id = "./routes weak recursive ^\\.\\/.*\\/page$";
module.exports = webpackContext;

/***/ }),

/***/ "./server/index.ts":
/*!*************************************!*\
  !*** ./server/index.ts + 5 modules ***!
  \*************************************/
/*! no exports provided */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./route/index.ts (<- Module uses eval()) */
/*! ModuleConcatenation bailout: Cannot concat with external "@tamland/core" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@tamland/core"
var core_ = __webpack_require__("@tamland/core");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("react");

// EXTERNAL MODULE: ./route/index.ts
var route = __webpack_require__("./route/index.ts");

// CONCATENATED MODULE: ./routes/home/index.tsx
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class home_HomeRoute extends route["a" /* Route */] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "id", "home");

    _defineProperty(this, "path", "/");
  }

  getData() {
    return new Promise(resolve => {
      resolve({
        test: "Home page"
      });
    });
  }

}
// CONCATENATED MODULE: ./routes/pageNotFound/index.ts
function pageNotFound_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class pageNotFound_PageNotFoundRoute extends route["a" /* Route */] {
  constructor() {
    super(...arguments);

    pageNotFound_defineProperty(this, "id", "pageNotFound");

    pageNotFound_defineProperty(this, "path", "*");
  }

  getData() {
    return new Promise(resolve => {
      resolve({
        test: "Page not found page"
      });
    });
  }

}
// CONCATENATED MODULE: ./routes/x/index.ts
function x_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class x_XRoute extends route["a" /* Route */] {
  constructor() {
    super(...arguments);

    x_defineProperty(this, "id", "x");

    x_defineProperty(this, "path", "/x/");
  }

  getData() {
    return new Promise(resolve => {
      resolve({
        test: "x page"
      });
    });
  }

}
// CONCATENATED MODULE: ./routes/index.ts



const routes = [new home_HomeRoute(), new x_XRoute(), new pageNotFound_PageNotFoundRoute()];
// CONCATENATED MODULE: ./app/index.tsx
var _jsxFileName = "/Users/sweetlikepete/code/newsteam/tamland/example/src/web/app/index.tsx";



class app_App extends external_react_["PureComponent"] {
  render() {
    return external_react_["createElement"]("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: this
    }, external_react_["createElement"](core_["Router"], {
      routes: routes,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }));
  }

}
// CONCATENATED MODULE: ./server/index.ts



const server = new core_["Server"](app_App, {
  hostname: "www.sweetlikepete.com",
  jwt: {
    secret: "ndB2N7l2sqSpvRNJBXtNdmKfvj6up1VN"
  },
  manifest: {
    backgroundColor: "#fff",
    description: "",
    display: "standalone",
    icons: [{
      sizes: "192x192",
      src: "/images/icons-192.png",
      type: "image/png"
    }, {
      sizes: "512x512",
      src: "/images/icons-512.png",
      type: "image/png"
    }],
    name: "Example",
    shortName: "Example shortname",
    startUrl: "/",
    themeColor: "#fff"
  },
  routes: routes
});
server.start();

/***/ }),

/***/ "@tamland/core":
/*!********************************!*\
  !*** external "@tamland/core" ***!
  \********************************/
/*! no static exports found */
/*! exports used: Helmet, Route, Router, Server */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("@tamland/core");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/*! exports used: PureComponent, createElement, default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map