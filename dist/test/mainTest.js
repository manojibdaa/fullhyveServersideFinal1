"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testdb_1 = require("./testdb");
// import { TestValidation } from './testValidation';
var state;
(function (state) {
    state[state["connected"] = 0] = "connected";
    state[state["disconnected"] = 1] = "disconnected";
})(state = exports.state || (exports.state = {}));
var MainTest = /** @class */ (function () {
    function MainTest() {
    }
    MainTest.init = function () {
        testdb_1.TestDb.init(true);
        //TestTeam.init();
        //TestChat.init();
        //TestSearch.init();
        //TestProject.init();
        //TestValidation.init();
    };
    return MainTest;
}());
exports.MainTest = MainTest;
