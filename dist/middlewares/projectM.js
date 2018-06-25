"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var projectServices_1 = require("../models/services/projectServices");
var constant_1 = require("../models/constants/constant");
var validateM_1 = require("./validateM");
var ProjectM = /** @class */ (function () {
    function ProjectM() {
    }
    ProjectM.getMyProjects = function (req, callback) {
        var userId = req.thisUser.id;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        projectServices_1.ProjectS.getMyProjects(userId, offset, limit)
            .then(function (projects) {
            callback({ success: true, code: 200, message: null, data: projects });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.searchProjects = function (req, callback) {
        var userId = req.thisUser.id;
        var name = req.validData.name;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        projectServices_1.ProjectS.searchProjects(userId, offset, limit, name)
            .then(function (projects) {
            console.log(projects);
            callback({ success: true, code: 200, message: null, data: projects });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.getProjectProfile = function (req, callback) {
        var projectId = req.validData.projectId;
        projectServices_1.ProjectS.getProject(projectId)
            .then(function (project) {
            callback({ success: true, code: 200, message: null, data: project });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.getContributors = function (req, callback) {
        var projectId = req.validData.projectId;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        projectServices_1.ProjectS.getContributors(projectId, offset, limit)
            .then(function (contributors) {
            callback({ success: true, code: 200, message: null, data: contributors });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.getTaskSets = function (req, callback) {
        var userId = req.thisUser.id;
        var projectId = req.validData.projectId;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        projectServices_1.ProjectS.getTaskSets(userId, projectId, offset, limit)
            .then(function (tasksets) {
            callback({ success: true, code: 200, message: null, data: tasksets });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.getTasks = function (req, callback) {
        var tasksetId = req.validData.tasksetId;
        var offset = req.validData.offset;
        var limit = req.validData.limit;
        projectServices_1.ProjectS.getTasks(tasksetId, offset, limit)
            .then(function (tasks) {
            callback({ success: true, code: 200, message: null, data: tasks });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    // managing methods
    // Project management
    ProjectM.newProject = function (req, callback) {
        var userId = req.thisUser.id;
        var validData = validateM_1.ValidateM.validateNewProject(userId, req.validData);
        projectServices_1.ProjectS.newProject(validData)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.addIndividualContributor = function (req, callback) {
        var memberId = req.validData.memberId;
        var projectId = req.validData.projectId;
        projectServices_1.ProjectS.addIndividualContributor(memberId, projectId)
            .then(function (result) {
            callback({ success: true, code: 200, message: null, data: result });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.replyIndividualContributorJoinRequest = function (req, callback) {
        var accepted = req.validData.accepted;
        var decision = constant_1.UserConst.REQUEST.REJECTED;
        var requestId = req.validData.requestId;
        if (accepted) {
            decision = constant_1.UserConst.REQUEST.ACCEPTED;
        }
        projectServices_1.ProjectS.replyIndividualContributorJoinRequest(requestId, decision)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.addTeamContributor = function (req, callback) {
        var teamId = req.validData.teamId;
        var projectId = req.validData.projectId;
        projectServices_1.ProjectS.addTeamContributor(teamId, projectId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.replyTeamContributorJoinRequest = function (req, callback) {
        var accepted = req.validData.accepted;
        var decision = constant_1.UserConst.REQUEST.REJECTED;
        var requestId = req.validData.requestId;
        if (accepted) {
            decision = constant_1.UserConst.REQUEST.ACCEPTED;
        }
        projectServices_1.ProjectS.replyTeamContributorJoinRequest(requestId, decision)
            .then(function (status) {
            console.log("Status=============================================================================");
            console.log(status);
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.updateProjectLogo = function (req, callback) {
        var imageUrl = req.file.filename;
        var projectId = req.validData.projectId;
        projectServices_1.ProjectS.updateProjectLogo(projectId, imageUrl)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: { path: imageUrl } });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    // Set management
    ProjectM.newSet = function (req, callback) {
        var userId = req.thisUser.id;
        var validData = req.validData;
        validateM_1.ValidateM.validateNewTaskset(validData)
            .then(function (rTaskset) {
            return projectServices_1.ProjectS.newSet(userId, rTaskset);
        })
            .then(function (taskset) {
            callback({ success: true, code: 200, message: null, data: taskset });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.completeSet = function (req, callback) {
        var setId = req.validData.setId;
        projectServices_1.ProjectS.setSetCompleted(setId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.removeSet = function (req, callback) {
        var setId = req.validData.setId;
        projectServices_1.ProjectS.removeSet(setId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    // Task management
    ProjectM.newTask = function (req, callback) {
        var userId = req.thisUser.id;
        var validData = req.validData;
        validateM_1.ValidateM.validateNewTask(validData)
            .then(function (rTask) {
            return projectServices_1.ProjectS.newTask(rTask);
        })
            .then(function (data) {
            callback({ success: true, code: 200, message: null, data: data });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.startTask = function (req, callback) {
        var taskId = req.validData.taskId;
        projectServices_1.ProjectS.startTask(taskId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.completeTask = function (req, callback) {
        var taskId = req.validData.taskId;
        projectServices_1.ProjectS.completeTask(taskId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.changeTaskStatus = function (req, callback) {
        var taskId = req.validData.taskId;
        var rTaskStatus = req.validData.taskStatus;
        projectServices_1.ProjectS.changeTaskStatus(taskId, constant_1.ProjectConst.TASK_STATUS[rTaskStatus])
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.removeTask = function (req, callback) {
        var taskId = req.validData.taskId;
        projectServices_1.ProjectS.removeTask(taskId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.addContributors = function (req, callback) {
        var projectId = req.validData.projectId;
        var contributorIds = {
            individualIds: req.validData.individualIds,
            teamIds: req.validData.teamIds
        };
        console.log("ContributorIds=============================================================");
        console.log(contributorIds);
        projectServices_1.ProjectS.addContributors(projectId, contributorIds)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.removeContributors = function (req, callback) {
        var projectId = req.validData.projectId;
        var contributorIds = {
            individualIds: req.validData.individualIds,
            teamIds: req.validData.teamIds
        };
        projectServices_1.ProjectS.removeContributors(projectId, contributorIds)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.editProjectDetails = function (req, callback) {
        var projectId = req.validData.projectId;
        var projectData = req.validData.projectData;
        projectServices_1.ProjectS.editProjectDetails(projectId, projectData)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    ProjectM.deleteProject = function (req, callback) {
        var projectId = req.validData.projectId;
        projectServices_1.ProjectS.deleteProject(projectId)
            .then(function (status) {
            callback({ success: true, code: 200, message: null, data: null });
        })
            .catch(function (err) {
            callback({ success: false, code: 500, message: "Internal server error", data: null });
        });
    };
    return ProjectM;
}());
exports.ProjectM = ProjectM;
