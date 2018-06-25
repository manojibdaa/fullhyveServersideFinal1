"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require('multer');
var fileType = require('file-type');
var fs = require('fs');
var app = express();
var router = express.Router();
var UploadM = /** @class */ (function () {
    function UploadM() {
    }
    UploadM.upload = function (req, res, callback) {
        console.log("In multer");
        (multer({
            dest: __dirname + "/../../public/images/",
            limits: { fileSize: 10000000, files: 1 },
            fileFilter: function (req, file, callback) {
                console.log("In here");
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return callback(new Error('Only Images are allowed !'), false);
                }
                callback(null, true);
            }
        }).single('image'))(req, res, callback);
    };
    UploadM.uploadMet = function (req, res, next) {
        console.log("Uploading");
        UploadM.upload(req, res, function (err) {
            if (err) {
                console.log(err);
                res.status(400).json({ message: err.message });
            }
            else {
                //next();
                console.log('success');
                res.status(200).json({ path: req.file.filename });
            }
        });
    };
    UploadM.getMet = function (req, res, next) {
        // if(req.params.length>0){
        //     let imagename = req.params.imagename;
        //     if(imagename != null && imagename != undefined && imagename.trim()!=''){
        //         let imagepath = __dirname + "/../../public/images/" + imagename;
        //         let image = fs.readFileSync(imagepath);
        //         let mime = fileType(image).mime;
        //         res.writeHead(200, {'Content-Type': mime })
        //         res.end(image, 'binary');
        //     }
        // }
        //  else{
        //     res.status(404).send();
        // }
        console.log("Image requested");
        var imagename = req.params.imagename;
        if (imagename != null && imagename != undefined && imagename.trim() != '') {
            var imagepath = __dirname + "/../../public/images/" + imagename;
            var image = fs.readFileSync(imagepath);
            var mime_1 = fileType(image).mime;
            res.writeHead(200, { 'Content-Type': mime_1 });
            res.end(image, 'binary');
        }
    };
    return UploadM;
}());
exports.UploadM = UploadM;
