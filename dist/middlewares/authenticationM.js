"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var db_1 = require("../models/db/db");
var constant_1 = require("../models/constants/constant");
var bcrypt = require("bcrypt");
//import * as bodyParser from "body-parser";
var Authentication = /** @class */ (function () {
    function Authentication() {
    }
    Authentication.createToken = function (req, callback) {
        // console.log("working now");
        var userName = req.validData.userName;
        var password = req.validData.password;
        // console.log('p2');
        db_1.DB.User.findOne({
            where: {
                userName: userName
            }
        }).then(function (user) {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        var payload = {
                            userId: user.id
                        };
                        var token = jwt.sign(payload, constant_1.AuthConst.SECRET, {
                            expiresIn: "30000000d",
                        });
                        console.log("new token: -- -- -- " + token);
                        //res.setHeader("Authorization",`Bearer ${token}`);
                        var resp = {
                            token: token
                        };
                        db_1.DB.UserLog.create({
                            userId: user.id
                        });
                        callback({ success: true, code: 200, message: "Successfully logged-in", data: resp });
                    }
                    else {
                        callback({ success: false, code: 401, message: "Incorrect username and/or password", data: null });
                    }
                });
            }
            else {
                callback({ success: false, code: 401, message: "Incorrect username and/or password", data: null });
            }
            console.log("p1");
        }).catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    Authentication.verifyToken = function (req, res, next) {
        if (req.headers.hasOwnProperty('authorization')) {
            var token = req.header('Authorization').split(' ')[1];
            jwt.verify(token, constant_1.AuthConst.SECRET, function (err, decoded) {
                if (err) {
                    res.status(403).send();
                }
                else {
                    console.log("Decoded token-----------------------------------");
                    console.log(decoded);
                    req.thisUser = {};
                    req.thisUser.id = decoded.userId;
                    next();
                }
            });
        }
        else {
            res.status(200).send();
        }
    };
    Authentication.hashPassword = function (password) {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    resolve();
                }
                else {
                    resolve(hash);
                }
            });
        });
    };
    Authentication.verifyTokenReal = function (token) {
        return new Promise(function (resolve, reject) {
            jwt.verify(token, constant_1.AuthConst.SECRET, function (err, decoded) {
                if (err) {
                    resolve();
                }
                else {
                    resolve({ thisUser: { id: decoded.userId } });
                }
            });
        });
    };
    return Authentication;
}());
exports.Authentication = Authentication;
