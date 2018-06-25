"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var projectM_1 = require("../middlewares/projectM");
var validateM_1 = require("../middlewares/validateM");
var authorizationM_1 = require("../middlewares/authorizationM");
// const routers: express.Router = express.Router();
// // get all my teams including ones i created
// routers.post('/getMyProjects', ProjectM.getMyProjects);
// routers.post('/searchProjects', ProjectM.searchProjects);
// routers.post('/getContributors', Authorization.verifyProjectContributor, ProjectM.getContributors);
// routers.post('/getTasksets', Authorization.verifyProjectContributor, ProjectM.getTaskSets);
// routers.post('/getTasks', Authorization.verifyProjectContributor, ProjectM.getTasks);
// // managing routes
// // Project
// routers.post('/newProject', ValidateM.validateNewProject, ProjectM.newProject);
// // joined
// //==========
// routers.post('/addIndividualContributor', Authorization.verifyProjectLeadership, ProjectM.addIndividualContributor);
// routers.post('/addTeamContributor', Authorization.verifyProjectLeadership, ProjectM.addTeamContributor);
// //===========
// routers.post('/replyIndividualContributorJoinRequest/:decision', Authorization.verifyIndividualContributorRequestReceiver, ProjectM.replyIndividualContributorJoinRequest);
// routers.post('/replyTeamContributorJoinRequest/:decision', Authorization.verifyTeamContributorRequestReceiver, ProjectM.replyTeamContributorJoinRequest);
// // Set
// routers.post('/newTaskset', Authorization.verifyProjectLeadership, ValidateM.validateNewTaskset, ProjectM.newSet);
// routers.post('/deleteTaskset', Authorization.verifyProjectLeadership, ProjectM.removeSet);
// // Task
// routers.post('/newTask', Authorization.verifyTaskAssignable, ValidateM.validateNewTask, ProjectM.newTask);
// routers.post('/startTask', Authorization.verifyTaskAssignee, ProjectM.startTask);
// routers.post('/completeTask', Authorization.verifyTaskAssignee, ProjectM.completeTask);
// routers.post('/changeTaskStatus/:taskStatus', Authorization.verifyProjectLeadership, ProjectM.changeTaskStatus);
// routers.post('/deleteTask', Authorization.verifyProjectLeadership, ProjectM.removeTask);
// // to be added
// routers.post('/addContributors', Authorization.verifyProjectLeadership, ProjectM.addContributors);
// routers.post('/removeContributors', Authorization.verifyProjectLeadership, ProjectM.removeContributors);
// routers.post('/editProjectDetails', Authorization.verifyProjectLeadership, ProjectM.editProjectDetails);
// routers.post('/deleteProject', Authorization.verifyProjectLeadership, ProjectM.deleteProject);
// routers.post('/getMyProjectProfile', Authorization.verifyProjectLeadership, ProjectM.getProjectProfile);
// export = routers;
var ProjectR = /** @class */ (function () {
    function ProjectR() {
    }
    ProjectR.init = function () {
        var routers = express.Router();
        // get all my teams including ones i created
        routers.post('/getMyProjects', projectM_1.ProjectM.getMyProjects);
        routers.post('/searchProjects', projectM_1.ProjectM.searchProjects);
        routers.post('/getContributors', authorizationM_1.Authorization.verifyProjectContributor, projectM_1.ProjectM.getContributors);
        routers.post('/getTasksets', authorizationM_1.Authorization.verifyProjectContributor, projectM_1.ProjectM.getTaskSets);
        routers.post('/getTasks', authorizationM_1.Authorization.verifyProjectContributor, projectM_1.ProjectM.getTasks);
        // managing routes
        // Project
        routers.post('/newProject', validateM_1.ValidateM.validateNewProject, projectM_1.ProjectM.newProject);
        // joined
        //==========
        routers.post('/addIndividualContributor', authorizationM_1.Authorization.verifyProjectLeadership, projectM_1.ProjectM.addIndividualContributor);
        routers.post('/addTeamContributor', authorizationM_1.Authorization.verifyProjectLeadership, projectM_1.ProjectM.addTeamContributor);
        //===========
        routers.post('/replyIndividualContributorJoinRequest/:decision', authorizationM_1.Authorization.verifyIndividualContributorRequestReceiver, projectM_1.ProjectM.replyIndividualContributorJoinRequest);
        routers.post('/replyTeamContributorJoinRequest/:decision', authorizationM_1.Authorization.verifyTeamContributorRequestReceiver, projectM_1.ProjectM.replyTeamContributorJoinRequest);
        // Set
        routers.post('/newTaskset', authorizationM_1.Authorization.verifyProjectLeadership, validateM_1.ValidateM.validateNewTaskset, projectM_1.ProjectM.newSet);
        routers.post('/deleteTaskset', authorizationM_1.Authorization.verifyProjectLeadership, projectM_1.ProjectM.removeSet);
        // Task
        routers.post('/newTask', authorizationM_1.Authorization.verifyTaskAssignable, validateM_1.ValidateM.validateNewTask, projectM_1.ProjectM.newTask);
        routers.post('/startTask', authorizationM_1.Authorization.verifyTaskAssignee, projectM_1.ProjectM.startTask);
        routers.post('/completeTask', authorizationM_1.Authorization.verifyTaskAssignee, projectM_1.ProjectM.completeTask);
        routers.post('/changeTaskStatus/:taskStatus', authorizationM_1.Authorization.verifyProjectLeadership, projectM_1.ProjectM.changeTaskStatus);
        routers.post('/deleteTask', authorizationM_1.Authorization.verifyProjectLeadership, projectM_1.ProjectM.removeTask);
        // to be added
        routers.post('/addContributors', authorizationM_1.Authorization.verifyProjectLeadership, projectM_1.ProjectM.addContributors);
        routers.post('/removeContributors', authorizationM_1.Authorization.verifyProjectLeadership, projectM_1.ProjectM.removeContributors);
        routers.post('/editProjectDetails', authorizationM_1.Authorization.verifyProjectLeadership, projectM_1.ProjectM.editProjectDetails);
        routers.post('/deleteProject', authorizationM_1.Authorization.verifyProjectLeadership, projectM_1.ProjectM.deleteProject);
        routers.post('/getMyProjectProfile', authorizationM_1.Authorization.verifyProjectLeadership, projectM_1.ProjectM.getProjectProfile);
        return routers;
    };
    return ProjectR;
}());
exports.ProjectR = ProjectR;
