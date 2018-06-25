"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var uploadImageM_1 = require("../middlewares/uploadImageM");
// router.post('/upload', UploadM.uploadMet);
// router.get('/:imagename', UploadM.getMet);
// module.exports = router;
var UploadR = /** @class */ (function () {
    function UploadR() {
    }
    UploadR.init = function () {
        var routers = express.Router();
        routers.post('/upload', uploadImageM_1.UploadM.uploadMet);
        routers.get('/:imagename', uploadImageM_1.UploadM.getMet);
        return routers;
    };
    return UploadR;
}());
exports.UploadR = UploadR;
