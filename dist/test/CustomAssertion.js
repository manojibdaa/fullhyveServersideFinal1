"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chai_1 = require("chai");
var TestData_1 = require("./TestData");
var expect = chai.expect;
var should = chai.should;
should();
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var CustomAssertion = /** @class */ (function () {
    function CustomAssertion() {
        this.testOrder = ['null', 'type', 'length', 'value'];
    }
    CustomAssertion.prototype.assertResponse = function (input, expectedOutput) {
        chai_1.assert.isNotNull(input, "Returned data can't be null");
        input.should.be.instanceOf(Object);
        input.should.have.keys(['success', 'code', 'message', 'data']);
        var inData = input.data;
        var expData;
        chai_1.assert.equal(expectedOutput[0], input.code, "Unmatching status code returned");
        if (expectedOutput.length == 2) {
            expData = expectedOutput[1];
        }
        else {
            expData = expectedOutput[2];
            chai_1.assert.isNotNull(input.message, "Response message not set");
            chai_1.assert.equal(expectedOutput[1], input.message, "Unmatching response message");
        }
        if (expData == null || expData == undefined) {
            chai_1.assert.isNull(inData, "Returned data must be null");
            return;
        }
        else {
            chai_1.assert.isNotNull(inData, "Returned data can't be null");
        }
        this.assertOut(inData, 'type', expData.type);
        if (expData.type == 'array') {
            this.assertOut(inData, 'length', expData.length);
            return;
        }
        this.assertOut(inData, 'contains', Object.keys(expData.contains));
        var contData = expData.contains;
        for (var field in contData) {
            if (typeof (contData[field]) == 'string') {
                this.assertOut(inData[field], 'type', contData[field]);
            }
            else if (typeof (contData[field]) == 'object') {
                for (var _i = 0, _a = this.testOrder; _i < _a.length; _i++) {
                    var subField = _a[_i];
                    if (contData[field].hasOwnProperty(subField)) {
                        this.assertOut(inData[field], subField, contData[field][subField]);
                        if (subField == 'null' && contData[field][subField]) {
                            break;
                        }
                    }
                }
            }
        }
    };
    CustomAssertion.prototype.generateReqData = function (action, inData, token) {
        if (token === void 0) { token = TestData_1.Users.samwolde.token; }
        var rData = {};
        if (inData != null) {
            for (var i = 0; i < TestData_1.TestData[action].fields.length; i++) {
                var actName = TestData_1.TestData[action].fields[i];
                rData[actName] = inData[i];
            }
        }
        return {
            'reqData': rData,
            'token': 'Bearer ' + token,
            'action': action
        };
    };
    CustomAssertion.prototype.assertOut = function (data, assertionType, criteria) {
        switch (assertionType) {
            case 'type': {
                switch (criteria) {
                    case 'string': {
                        chai_1.assert.isString(data);
                        return;
                    }
                    case 'object': {
                        chai_1.assert.isObject(data);
                        return;
                    }
                    case 'array': {
                        chai_1.assert.isArray(data);
                        return;
                    }
                    case 'number': {
                        chai_1.assert.isNumber(data);
                        return;
                    }
                }
                return;
            }
            case 'contains': {
                for (var _i = 0, criteria_1 = criteria; _i < criteria_1.length; _i++) {
                    var criteriaIn = criteria_1[_i];
                    data.should.have.property(criteriaIn);
                }
                return;
            }
            case 'length': {
                chai_1.assert.lengthOf(data, criteria);
                return;
            }
            case 'value': {
                chai_1.assert.equal(data, criteria);
                return;
            }
            case 'null': {
                if (criteria) {
                    chai_1.assert.isNull(data);
                }
                else {
                    chai_1.assert.isNotNull(data);
                }
                return;
            }
        }
    };
    CustomAssertion.prototype.generateArgs = function (fields, rData) {
        var args = "";
        for (var i = 0; i < 3 && i < fields.length; i++) {
            if (i > 0) {
                args += " -- ";
            }
            args += fields[i] + " : " + rData[i];
        }
        return args;
    };
    CustomAssertion.generateTaskList = function (lists) {
        var listR = [];
        for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
            var list = lists_1[_i];
            listR = listR.concat(list);
        }
        return listR;
    };
    return CustomAssertion;
}());
exports.CustomAssertion = CustomAssertion;
