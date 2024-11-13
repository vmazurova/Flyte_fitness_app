function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Alert, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledAlert, UncontrolledButtonDropdown, UncontrolledDropdown, UncontrolledTooltip } from '..';
import { testForDefaultClass } from '../testUtils';
import '@testing-library/jest-dom';
describe('UncontrolledAlert', function () {
  beforeEach(function () {
    jest.useFakeTimers();
  });
  afterEach(function () {
    jest.clearAllTimers();
  });
  it('should be an Alert', function () {
    testForDefaultClass(Alert, 'alert');
  });
  it('should be open by default', function () {
    render( /*#__PURE__*/React.createElement(UncontrolledAlert, null, "Yo!"));
    expect(screen.getByText('Yo!')).toBeInTheDocument();
  });
  it('should toggle when close is clicked', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            render( /*#__PURE__*/React.createElement(UncontrolledAlert, null, "Yo!"));
            _context.next = 3;
            return user.click(screen.getByLabelText('Close'));
          case 3:
            jest.advanceTimersByTime(1000);
            expect(screen.queryByText('Yo!')).not.toBeInTheDocument();
          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
describe('UncontrolledButtonDropdown', function () {
  beforeEach(function () {
    jest.useFakeTimers();
  });
  afterEach(function () {
    jest.clearAllTimers();
  });
  it('should be an ButtonDropdown', function () {
    testForDefaultClass(ButtonDropdown, 'btn-group');
  });
  it('should be open by default', function () {
    render( /*#__PURE__*/React.createElement(UncontrolledButtonDropdown, null, "Yo!"));
    expect(screen.getByText('Yo!')).toBeInTheDocument();
  });
  it('should toggle isOpen when toggle is called', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            render( /*#__PURE__*/React.createElement(UncontrolledButtonDropdown, null, /*#__PURE__*/React.createElement(DropdownToggle, {
              caret: true
            }, "Dropdown"), /*#__PURE__*/React.createElement(DropdownMenu, null, /*#__PURE__*/React.createElement(DropdownItem, {
              header: true
            }, "Header"))));
            _context2.next = 3;
            return user.click(screen.getByText('Dropdown'));
          case 3:
            jest.advanceTimersByTime(1000);
            expect(screen.getByRole('menu')).toHaveClass('show');
          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});
describe('UncontrolledDropdown', function () {
  beforeEach(function () {
    jest.useFakeTimers();
  });
  afterEach(function () {
    jest.clearAllTimers();
  });
  it('should be an Dropdown', function () {
    testForDefaultClass(UncontrolledDropdown, 'dropdown');
  });
  it('should be closed by default', function () {
    render( /*#__PURE__*/React.createElement(UncontrolledDropdown, null, /*#__PURE__*/React.createElement(DropdownToggle, {
      caret: true
    }, "Dropdown"), /*#__PURE__*/React.createElement(DropdownMenu, {
      "data-testid": "sandman"
    }, /*#__PURE__*/React.createElement(DropdownItem, {
      header: true
    }, "Header"))));
    expect(screen.getByTestId('sandman')).not.toHaveClass('show');
  });
  it('should toggle on button click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            render( /*#__PURE__*/React.createElement(UncontrolledDropdown, null, /*#__PURE__*/React.createElement(DropdownToggle, {
              caret: true
            }, "Dropdown"), /*#__PURE__*/React.createElement(DropdownMenu, {
              "data-testid": "sandman"
            }, /*#__PURE__*/React.createElement(DropdownItem, {
              header: true
            }, "Header"))));
            expect(screen.getByTestId('sandman')).not.toHaveClass('show');
            _context3.next = 4;
            return user.click(screen.getByText('Dropdown'));
          case 4:
            jest.advanceTimersByTime(1000);
            expect(screen.getByTestId('sandman')).toHaveClass('show');
          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  describe('onToggle', function () {
    beforeEach(function () {
      jest.useFakeTimers();
    });
    afterEach(function () {
      // handleToggle.mockClear();

      jest.clearAllTimers();
    });
    it('should be closed on document body click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              render( /*#__PURE__*/React.createElement(UncontrolledDropdown, {
                defaultOpen: true
              }, /*#__PURE__*/React.createElement(DropdownToggle, {
                id: "toggle"
              }, "Toggle"), /*#__PURE__*/React.createElement(DropdownMenu, {
                "data-testid": "sandman"
              }, /*#__PURE__*/React.createElement(DropdownItem, null, "Test"), /*#__PURE__*/React.createElement(DropdownItem, {
                id: "divider",
                divider: true
              }))));
              expect(screen.getByTestId('sandman')).toHaveClass('show');
              _context4.next = 4;
              return user.click(document.body);
            case 4:
              jest.advanceTimersByTime(1000);
              expect(screen.getByTestId('sandman')).not.toHaveClass('show');
            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should be closed on container click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var _render, container;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _render = render( /*#__PURE__*/React.createElement(UncontrolledDropdown, {
                id: "test",
                defaultOpen: true
              }, /*#__PURE__*/React.createElement(DropdownToggle, {
                id: "toggle"
              }, "Toggle"), /*#__PURE__*/React.createElement(DropdownMenu, {
                "data-testid": "dream"
              }, /*#__PURE__*/React.createElement(DropdownItem, null, "Test"), /*#__PURE__*/React.createElement(DropdownItem, {
                id: "divider",
                divider: true
              })))), container = _render.container;
              expect(screen.getByTestId('dream')).toHaveClass('show');
              _context5.next = 4;
              return user.click(container);
            case 4:
              jest.advanceTimersByTime(1000);
              expect(screen.getByTestId('dream')).not.toHaveClass('show');
            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should toggle when toggle button is clicked', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              render( /*#__PURE__*/React.createElement(UncontrolledDropdown, {
                id: "test",
                defaultOpen: false
              }, /*#__PURE__*/React.createElement(DropdownToggle, {
                id: "toggle"
              }, "Toggle"), /*#__PURE__*/React.createElement(DropdownMenu, {
                "data-testid": "lucien"
              }, /*#__PURE__*/React.createElement(DropdownItem, null, "Test"), /*#__PURE__*/React.createElement(DropdownItem, {
                id: "divider",
                divider: true
              }))));
              expect(screen.getByTestId('lucien')).not.toHaveClass('show');
              _context6.next = 4;
              return user.click(screen.getByText('Toggle'));
            case 4:
              jest.advanceTimersByTime(1000);
              expect(screen.getByTestId('lucien')).toHaveClass('show');
            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('onToggle should be called on toggler click when opened', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              render( /*#__PURE__*/React.createElement(UncontrolledDropdown, {
                id: "test",
                defaultOpen: true
              }, /*#__PURE__*/React.createElement(DropdownToggle, {
                id: "toggle"
              }, "Toggle"), /*#__PURE__*/React.createElement(DropdownMenu, {
                "data-testid": "lucien"
              }, /*#__PURE__*/React.createElement(DropdownItem, null, "Test"), /*#__PURE__*/React.createElement(DropdownItem, {
                id: "divider",
                divider: true
              }))));
              expect(screen.getByTestId('lucien')).toHaveClass('show');
              _context7.next = 4;
              return user.click(screen.getByText('Toggle'));
            case 4:
              jest.advanceTimersByTime(1000);
              expect(screen.getByTestId('lucien')).not.toHaveClass('show');
            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('onToggle should be called on key closing', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var handleToggle;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              handleToggle = jest.fn();
              render( /*#__PURE__*/React.createElement(UncontrolledDropdown, {
                id: "test",
                onToggle: handleToggle,
                defaultOpen: true
              }, /*#__PURE__*/React.createElement(DropdownToggle, {
                id: "toggle"
              }, "Toggle"), /*#__PURE__*/React.createElement(DropdownMenu, null, /*#__PURE__*/React.createElement(DropdownItem, null, "Test"), /*#__PURE__*/React.createElement(DropdownItem, {
                id: "divider",
                divider: true
              }))));
              screen.getByText('Toggle').focus();
              expect(handleToggle.mock.calls.length).toBe(0);
              _context8.next = 6;
              return user.keyboard('{esc}');
            case 6:
              expect(handleToggle.mock.calls.length).toBe(1);
            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('onToggle should be called on key opening', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var handleToggle;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              handleToggle = jest.fn();
              render( /*#__PURE__*/React.createElement(UncontrolledDropdown, {
                id: "test",
                onToggle: handleToggle,
                defaultOpen: false
              }, /*#__PURE__*/React.createElement(DropdownToggle, {
                id: "toggle"
              }, "Toggle"), /*#__PURE__*/React.createElement(DropdownMenu, null, /*#__PURE__*/React.createElement(DropdownItem, null, "Test"), /*#__PURE__*/React.createElement(DropdownItem, {
                id: "divider",
                divider: true
              }))));
              screen.getByText('Toggle').focus();
              expect(handleToggle.mock.calls.length).toBe(0);
              _context9.next = 6;
              return user.keyboard('[ArrowDown]');
            case 6:
              expect(handleToggle.mock.calls.length).toBe(1);
            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
});
describe('UncontrolledTooltip', function () {
  it('tooltip should not be rendered by default', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            render( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
              href: "#",
              id: "dream"
            }, "sandman"), /*#__PURE__*/React.createElement(UncontrolledTooltip, {
              target: "dream"
            }, "king of dream world")));
            expect(screen.queryByText('king of dream world')).not.toBeInTheDocument();
          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it('tooltip should not be rendered on hover', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            render( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
              href: "#",
              id: "dream"
            }, "sandman"), /*#__PURE__*/React.createElement(UncontrolledTooltip, {
              target: "dream"
            }, "king of dream world")));
            _context11.next = 3;
            return fireEvent.mouseOver(screen.getByText('sandman'));
          case 3:
            jest.advanceTimersByTime(1000);
            expect(screen.getByText('king of dream world')).toBeInTheDocument();
          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('should render correctly with a ref object as the target', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    var target;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            target = /*#__PURE__*/React.createRef(null);
            render( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
              href: "#",
              ref: target
            }, "sandman"), /*#__PURE__*/React.createElement(UncontrolledTooltip, {
              target: target
            }, "king of dream world")));
            _context12.next = 4;
            return fireEvent.mouseOver(screen.getByText('sandman'));
          case 4:
            jest.advanceTimersByTime(1000);
            expect(screen.queryByText('king of dream world')).toBeInTheDocument();
          case 6:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
});