"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validationInfo_1 = require("./validationInfo");
var Validation = /** @class */ (function () {
    function Validation() {
    }
    Validation.validate = function (req, res, next) {
        var action = req.originalUrl.split('/')[2];
        var result = Validation.validateData(req.body, validationInfo_1.actionRequiredFields[action]);
        if (result.status) {
            req.validData = result.data.validData;
            next();
        }
        else {
            res.status(400).json(result);
        }
    };
    Validation.validateReal = function (action, data) {
        if (validationInfo_1.actionRequiredFields[action]) {
            return Validation.validateData(data, validationInfo_1.actionRequiredFields[action]);
        }
        return null;
    };
    Validation.validateField = function (field, reqFieldAlias, data, validationCriteria) {
        if (validationCriteria === void 0) { validationCriteria = validationInfo_1.validationCriterias; }
        for (var rule in validationCriteria[reqFieldAlias]) {
            if (!Validation.validators(data[field], rule, validationCriteria[reqFieldAlias][rule])) {
                return false;
            }
        }
        return true;
    };
    Validation.validateData = function (data, requiredFields, validationCriteria) {
        if (validationCriteria === void 0) { validationCriteria = validationInfo_1.validationCriterias; }
        var validData = null;
        var missingFields = {};
        var invalidFields = {};
        for (var _i = 0, _a = requiredFields.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            var reqFieldAlias = field;
            if (requiredFields.alias && requiredFields.alias.hasOwnProperty(field)) {
                reqFieldAlias = requiredFields.alias[field];
            }
            if (data.hasOwnProperty(field)) {
                if (typeof (data[field]) == 'object') {
                    for (var i = 0; i < data[field].length; i++) {
                        if (typeof (data[field][i]) == 'string') {
                            data[field][i] = data[field][i].trim();
                        }
                        for (var rule in validationCriteria[reqFieldAlias]) {
                            if (!Validation.validators(data[field][i], rule, validationCriteria[reqFieldAlias][rule])) {
                                invalidFields[field] = false;
                                break;
                            }
                        }
                    }
                }
                else {
                    if (typeof (data[field]) == 'string') {
                        data[field] = data[field].trim();
                    }
                    if (!Validation.validateField(field, reqFieldAlias, data)) {
                        invalidFields[field] = false;
                    }
                }
            }
            else {
                missingFields[field] = false;
            }
        }
        var status = false;
        if (Object.keys(invalidFields).length == 0 && Object.keys(missingFields).length == 0) {
            status = true;
            validData = data;
            if (Object.keys(data).length > requiredFields.fields.length) {
                validData = {};
                for (var _b = 0, _c = requiredFields.fields; _b < _c.length; _b++) {
                    var field = _c[_b];
                    validData[field] = data[field];
                }
            }
            invalidFields = null;
        }
        if (Object.keys(missingFields).length == 0) {
            missingFields = null;
        }
        return { status: status, data: { validData: validData, invalidFields: invalidFields, missingFields: missingFields } };
    };
    Validation.validators = function (inputValue, rule, argument) {
        switch (rule) {
            case 'string': {
                return typeof (inputValue) == 'string';
            }
            case 'boolean': {
                return typeof (inputValue) == 'boolean';
            }
            case 'required': {
                if (typeof (inputValue) == 'string') {
                    return inputValue != null && inputValue != '';
                }
                return inputValue != null;
            }
            case 'onlyTxt': {
                return !inputValue.search(/\W|\d|\0/);
            }
            case 'ns': {
                return !inputValue.search(/\s/);
            }
            case 'number': {
                return typeof (inputValue) == 'number';
            }
            case 'int': {
                return typeof (inputValue) == 'number' && Math.ceil(inputValue) - Math.floor(inputValue) == 0;
            }
            case 'date': {
                return false;
            }
            case 'dateCustom': {
                return false;
            }
            case 'dateInt': {
                return false;
            }
            case 'listval': {
                return argument.indexOf(inputValue.toLowerCase()) != -1;
            }
            case 'pattern': {
                var pattern = argument;
                return pattern.test(inputValue);
            }
            case 'email': {
                var pattern = /[\d|\w]+@[\w|\d]+.[\w|\d]+/;
                return pattern.test(inputValue) && inputValue.search(/\s/) == -1;
            }
            case 'maxLen': {
                return typeof (inputValue) == 'string' && inputValue.length <= argument;
            }
            case 'minLen': {
                return typeof (inputValue) == 'string' && inputValue.length >= argument;
            }
            case 'maxVal': {
                return typeof (inputValue) == 'number' && inputValue <= argument;
            }
            case 'minVal': {
                return typeof (inputValue) == 'number' && inputValue >= argument;
            }
            case 'positive': {
                return typeof (inputValue) == 'number' && inputValue > 0;
            }
            case 'array': {
                // return inputValue instanceof Array;
                return true;
            }
            default: {
                return false;
            }
        }
    };
    Validation.composeErrorMsg = function (fieldName, arg) {
        switch (fieldName) {
            case 'required': {
                return fieldName + " must have a value";
            }
            case 'onlyTxt': {
                return fieldName + " accepts only letters";
            }
            case 'number': {
                return fieldName + " accepts only numbers";
            }
            case 'int': {
                return fieldName + " accepts only integers";
            }
            case 'date': {
                return fieldName + " accepts only letters";
            }
            case 'dateCustom': {
                return fieldName + " accepts only letters";
            }
            case 'dateInt': {
                return fieldName + " must be in the range " + arg.minDate + " to " + arg.maxDate;
            }
            case 'listval': {
                return "Value of " + fieldName + " must be in list of allowed values";
            }
            case 'pattern': {
                return fieldName + " must be of the form " + arg.samplePattern;
            }
            case 'email': {
                return fieldName + " isn't a valid email";
            }
            case 'maxLen': {
                return "Maximum length of " + fieldName + " exceeded";
            }
            case 'minLen': {
                return fieldName + " must have a minimum of " + arg.minLen + " charcaters";
            }
            case 'maxVal': {
                return fieldName + " must be less or equal to " + arg.maxVal;
            }
            case 'minVal': {
                return fieldName + " must be greater or equal to " + arg.minVal;
            }
        }
    };
    Validation.validateDate = function (date) {
    };
    Validation.validateDateInterval = function (date, minDate, maxDate) {
    };
    return Validation;
}());
exports.Validation = Validation;
