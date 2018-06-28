"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var CustomAssertion_1 = require("./CustomAssertion");
var TestData_1 = require("./TestData");
var io = require("socket.io-client");
var tasksToTest = CustomAssertion_1.CustomAssertion.generateTaskList(TestData_1.taskOrder);
// let tasksToTest:string[] = ['replyAnnouncement'];
var DEFAULT_TOKEN = TestData_1.Users.samwolde.token;
var currentUserToken = TestData_1.Users.samwolde.token;
var custAssert = new CustomAssertion_1.CustomAssertion();
var conn;
function emitListen(act, rTestData) {
    return new Promise(function (resolve, reject) {
        conn.on('validationError', function (data) {
            resolve(data);
        });
        conn.on('authenticationError', function (data) {
            resolve(data);
        });
        conn.on('authorizationError', function (data) {
            resolve(data);
        });
        conn.emit(act, rTestData, function (data) {
            resolve(data);
        });
    });
}
describe("Fullhyve route test", function () {
    this.timeout(5000);
    before(function () {
        conn = io.connect('http://localhost:8000/chat', { forceNew: true });
    });
    var _loop_1 = function (act) {
        currentUserToken = DEFAULT_TOKEN;
        if (TestData_1.TestData[act].hasOwnProperty('token')) {
            currentUserToken = TestData_1.TestData[act].token;
        }
        describe(act, function () {
            if (TestData_1.TestData[act].data) {
                var _loop_2 = function (j) {
                    var inData = TestData_1.TestData[act].data[j];
                    var expData = TestData_1.TestData[act].expectedOutput[j];
                    var rTestData = custAssert.generateReqData(act, inData, currentUserToken);
                    it(custAssert.generateArgs(TestData_1.TestData[act].fields, inData), function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, emitListen(act, rTestData)];
                                    case 1:
                                        res = _a.sent();
                                        custAssert.assertResponse(res, expData);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                };
                for (var j = 0; j < TestData_1.TestData[act].data.length; j++) {
                    _loop_2(j);
                }
            }
            else {
                var rTestData_1 = custAssert.generateReqData(act, null, currentUserToken);
                var expData_1 = TestData_1.TestData[act].expectedOutput[0];
                it("No args", function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, emitListen(act, rTestData_1)];
                                case 1:
                                    res = _a.sent();
                                    custAssert.assertResponse(res, expData_1);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            }
        });
    };
    for (var _i = 0, tasksToTest_1 = tasksToTest; _i < tasksToTest_1.length; _i++) {
        var act = tasksToTest_1[_i];
        _loop_1(act);
    }
    after(function () {
        if (conn && conn.connected) {
            conn.disconnect();
        }
    });
});
