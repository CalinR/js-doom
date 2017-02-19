/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(1);

var _view2 = _interopRequireDefault(_view);

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _map = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        window.deltaTime = 0;
        window.lastUpdate = Date.now();
        this.map = _map.map;
        this.absoluteView = new _view2.default(100, 100, 3);
        this.transformedView = new _view2.default(100, 100, 3);
        this.perspectiveView = new _view2.default(100, 100, 3);
        this.player = new _player2.default({ x: 50, y: 50, rotation: 0 });
        this.gameLoop();
    }

    _createClass(Main, [{
        key: 'gameLoop',
        value: function gameLoop() {
            var _this = this;

            var currentFrameTime = Date.now();
            window.deltaTime = (currentFrameTime - window.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
            window.lastUpdate = currentFrameTime;

            this.drawAbsoluteView();
            this.drawTransformedView();
            this.drawPerspectiveView();

            window.requestAnimationFrame(function () {
                return _this.gameLoop();
            });
        }
    }, {
        key: 'drawAbsoluteView',
        value: function drawAbsoluteView() {
            this.absoluteView.clear();
            this.drawPlayer(this.absoluteView, this.player.x, this.player.y, this.player.radians);
            this.absoluteView.context.beginPath();
            this.absoluteView.context.moveTo(this.map[0].x, this.map[0].y);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var point = _step.value;

                    this.absoluteView.context.lineTo(point.x, point.y);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.absoluteView.context.stroke();
            this.absoluteView.context.closePath();
        }
    }, {
        key: 'drawTransformedView',
        value: function drawTransformedView() {
            var x = this.transformedView.width / 2;
            var y = this.transformedView.height / 2;
            var rotation = -90 * Math.PI / 180;

            this.transformedView.clear();
            this.drawPlayer(this.transformedView, x, y, rotation);

            this.transformedView.context.beginPath();

            for (var i = 0; i < this.map.length; i++) {
                var radians = this.player.radians;
                var point = this.map[i];
                var pointX = point.x - this.player.x;
                var pointY = point.y - this.player.y;
                var transformedZ = pointX * Math.cos(radians) + pointY * Math.sin(radians);
                var transformedX = pointX * Math.sin(radians) - pointY * Math.cos(radians);

                if (i == 0) {
                    this.transformedView.context.moveTo(x - transformedX, y - transformedZ);
                } else {
                    this.transformedView.context.lineTo(x - transformedX, y - transformedZ);
                }
            }
            this.transformedView.context.stroke();
            this.transformedView.context.closePath();
        }
    }, {
        key: 'drawPerspectiveView',
        value: function drawPerspectiveView() {
            var x = this.perspectiveView.width / 2;
            var y = this.perspectiveView.height / 2;
            this.perspectiveView.clear();
            this.perspectiveView.context.beginPath();
            var previousPoints = [];

            for (var i = 0; i < this.map.length; i++) {
                var radians = this.player.radians;
                var point = this.map[i];
                var pointX = point.x - this.player.x;
                var pointY = point.y - this.player.y;
                var transformedZ = pointX * Math.cos(radians) + pointY * Math.sin(radians);
                var transformedX = pointX * Math.sin(radians) - pointY * Math.cos(radians);
                var x1 = -transformedX * 16 / transformedZ;
                var y1a = -x / transformedZ;
                var y1b = y / transformedZ;

                if (i == 0) {
                    this.perspectiveView.context.moveTo(x + x1, y + y1a);
                    this.perspectiveView.context.lineTo(x + x1, y + y1b);
                } else {
                    if (previousPoints.length) {
                        this.perspectiveView.context.moveTo(previousPoints[0], previousPoints[1]);
                    }
                    this.perspectiveView.context.lineTo(x + x1, y + y1a);
                    this.perspectiveView.context.lineTo(x + x1, y + y1b);
                    if (previousPoints.length) {
                        this.perspectiveView.context.lineTo(previousPoints[2], previousPoints[3]);
                    }
                }

                previousPoints = [x + x1, y + y1a, x + x1, y + y1b];
            }
            this.perspectiveView.context.stroke();
            this.perspectiveView.context.closePath();
        }
    }, {
        key: 'drawPlayer',
        value: function drawPlayer(view, x, y, rotation) {
            var width = 4;
            var height = 4;
            view.context.save();
            view.context.fillStyle = '#000';
            view.context.translate(x, y);
            view.context.fillRect(-width / 2, -height / 2, width, height);
            view.context.fillStyle = 'red';
            view.context.rotate(rotation);
            view.context.fillRect(4, -1, 6, 2);
            view.context.restore();
        }
    }]);

    return Main;
}();

new Main();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View(width, height, scale) {
        _classCallCheck(this, View);

        this.width = width;
        this.height = height;
        this.scale = scale || 1;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = this.width * this.scale + 'px';
        this.canvas.style.height = this.height * this.scale + 'px';
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
        document.body.appendChild(this.canvas);
    }

    _createClass(View, [{
        key: 'clear',
        value: function clear() {
            this.context.clearRect(0, 0, this.width, this.height);
        }
    }]);

    return View;
}();

exports.default = View;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameObject = __webpack_require__(3);

var _gameObject2 = _interopRequireDefault(_gameObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_GameObject) {
    _inherits(Player, _GameObject);

    function Player() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$x = _ref.x,
            x = _ref$x === undefined ? 0 : _ref$x,
            _ref$y = _ref.y,
            y = _ref$y === undefined ? 0 : _ref$y,
            _ref$rotation = _ref.rotation,
            rotation = _ref$rotation === undefined ? 0 : _ref$rotation;

        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, { x: x, y: y, rotation: rotation }));

        _this.speed = 0;
        _this.direction = 0;
        _this.moveSpeed = 50;
        _this.rotationSpeed = 90;

        _this.bindControls();
        return _this;
    }

    _createClass(Player, [{
        key: 'bindControls',
        value: function bindControls() {
            var _this2 = this;

            document.onkeydown = function (e) {
                var key = e.keyCode ? e.keyCode : e.which;

                switch (key) {
                    case 38:
                        // Up arrow
                        _this2.speed = 1;
                        break;
                    case 40:
                        // Down arrow
                        _this2.speed = -1;
                        break;
                    case 37:
                        // Left arrow
                        _this2.direction = -1;
                        break;
                    case 39:
                        // Right arrow
                        _this2.direction = 1;
                        break;
                }
            };

            document.onkeyup = function (e) {
                var key = e.keyCode ? e.keyCode : e.which;

                switch (key) {
                    case 38:
                        // Up arrow
                        _this2.speed = 0;
                        break;
                    case 40:
                        // Down arrow
                        _this2.speed = 0;
                        break;
                    case 37:
                        // Left arrow
                        _this2.direction = 0;
                        break;
                    case 39:
                        // Right arrow
                        _this2.direction = 0;
                        break;
                }
            };
        }
    }, {
        key: 'update',
        value: function update() {
            this.rotation += this.direction * this.rotationSpeed * window.deltaTime;

            if (this.rotation > 360) {
                this.rotation = 0;
            } else if (this.rotation < 0) {
                this.rotation += 360;
            }

            var moveStep = this.speed * this.moveSpeed;

            var moveX = Math.cos(this.radians) * moveStep;
            var moveY = Math.sin(this.radians) * moveStep;

            var newX = this.x + moveX * window.deltaTime;
            var newY = this.y + moveY * window.deltaTime;

            this.x = newX;
            this.y = newY;
        }
    }]);

    return Player;
}(_gameObject2.default);

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
    function GameObject() {
        var _this = this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$x = _ref.x,
            x = _ref$x === undefined ? 0 : _ref$x,
            _ref$y = _ref.y,
            y = _ref$y === undefined ? 0 : _ref$y,
            _ref$rotation = _ref.rotation,
            rotation = _ref$rotation === undefined ? 0 : _ref$rotation;

        _classCallCheck(this, GameObject);

        this.x = x;
        this.y = y;
        this.rotation = rotation;
        setTimeout(function () {
            _this.objectLoop();
        }, 100);
    }

    _createClass(GameObject, [{
        key: "update",
        value: function update() {}
    }, {
        key: "objectLoop",
        value: function objectLoop() {
            var _this2 = this;

            this.update();
            window.requestAnimationFrame(function () {
                return _this2.objectLoop();
            });
        }
    }, {
        key: "radians",
        get: function get() {
            return this.rotation * Math.PI / 180;
        },
        set: function set(radians) {
            this.rotation = radians * 180 / Math.PI;
        }
    }]);

    return GameObject;
}();

exports.default = GameObject;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.map = undefined;

var _vector = __webpack_require__(5);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = exports.map = [new _vector2.default(70, 20), new _vector2.default(70, 70)];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = function Vector2(x, y) {
    _classCallCheck(this, Vector2);

    this.x = x || 0;
    this.y = y || 0;
};

exports.default = Vector2;

/***/ })
/******/ ]);