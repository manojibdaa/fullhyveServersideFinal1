"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serviceValues_1 = require("../models/models/serviceValues");
var constant_1 = require("../models/constants/constant");
var projectServices_1 = require("../models/services/projectServices");
var ValidateM = /** @class */ (function () {
    function ValidateM() {
    }
    // public static validateLoginInfo(req:any, res:express.Response, next:express.NextFunction){
    //     let loginInfo = req.validData;
    //     let validLoginInfo = {
    //         userName:loginInfo.userName,
    //         password:loginInfo.password
    //     }
    //     req.validLoginInfo = validLoginInfo;
    //     next();
    // }
    ValidateM.validateUpdateUser = function (userId, rUser) {
        var skills = [];
        for (var _i = 0, _a = rUser.skills; _i < _a.length; _i++) {
            var skill = _a[_i];
            skills.push({
                skill: skill,
                userId: userId
            });
        }
        return {
            image: rUser.image && rUser.image.trim() != '' ? rUser.image : constant_1.UserConst.DEFAULT_IMAGE,
            firstName: rUser.firstName,
            lastName: rUser.lastName,
            title: rUser.title,
            skills: skills,
            description: rUser.description
        };
    };
    // public static validateNewTaskImage(req:any, res:express.Response, next:express.NextFunction){
    //     let rTaskImage = req.body;
    //     console.log(req);
    //     let taskImage = {
    //         src:'',
    //         description:rTaskImage.description,
    //         taskId:rTaskImage.taskId
    //     }
    //     req.validData = taskImage;
    //     next();
    // }
    // completion
    ValidateM.validateNewUser = function (rUser) {
        var user = {
            userName: rUser.userName,
            password: rUser.password,
            firstName: rUser.firstName,
            lastName: rUser.lastName,
            image: constant_1.UserConst.DEFAULT_IMAGE
        };
        return user;
    };
    ValidateM.validateNewTeam = function (userId, rTeam) {
        return {
            name: rTeam.name,
            image: rTeam.image && rTeam.image.trim() != '' ? rTeam.image : constant_1.TeamConst.DEFAULT_IMAGE,
            focus: rTeam.focus,
            description: rTeam.description,
            leaderId: userId
        };
    };
    ValidateM.validateNewProject = function (userId, rProject) {
        return {
            name: rProject.name,
            image: rProject.image && rProject.image.trim() != '' ? rProject.image : constant_1.ProjectConst.DEFAULT_IMAGE,
            field: rProject.field,
            description: rProject.description,
            leaderId: userId
        };
    };
    ValidateM.validateNewTaskset = function (rTaskset) {
        return new Promise(function (resolve, reject) {
            projectServices_1.ProjectS.getNextTasksetNumber(rTaskset.projectId)
                .then(function (nextNumber) {
                if (nextNumber) {
                    var taskset = {
                        name: rTaskset.name,
                        number: nextNumber,
                        description: rTaskset.description,
                        assignmentDate: new Date(),
                        deadline: new Date(rTaskset.deadline),
                        teamId: rTaskset.teamId,
                        projectId: rTaskset.projectId
                    };
                    resolve(taskset);
                }
                else {
                    resolve();
                }
            });
        });
    };
    ValidateM.validateNewTask = function (rTask) {
        return new Promise(function (resolve, reject) {
            return projectServices_1.ProjectS.getNextTaskNumber(rTask.projectId, rTask.tasksetId)
                .then(function (nextNumber) {
                console.log("Next number--------------------------");
                console.log(nextNumber);
                if (nextNumber) {
                    var task = {
                        title: rTask.title,
                        number: nextNumber,
                        description: rTask.description,
                        assignmentDate: new Date(),
                        deadline: new Date(rTask.deadline),
                        assignerId: rTask.assignerId,
                        assigneeId: rTask.assigneeId,
                        assigneeTeamId: rTask.assigneeTeamId && rTask.assigneeTeamId > 0 ? rTask.assigneeTeamId : null,
                        tasksetId: rTask.tasksetId,
                        projectId: rTask.projectId,
                        status: serviceValues_1.TaskStatus.Waiting
                    };
                    resolve(task);
                }
                else {
                    resolve();
                }
            });
        });
    };
    return ValidateM;
}());
exports.ValidateM = ValidateM;
