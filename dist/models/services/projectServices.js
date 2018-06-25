"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var projectDb_1 = require("../db/projectDb");
var teamServices_1 = require("./teamServices");
var util_1 = require("../util/util");
var serviceValues_1 = require("../models/serviceValues");
var teamDb_1 = require("../db/teamDb");
var constant_1 = require("../constants/constant");
var ProjectS = /** @class */ (function () {
    function ProjectS() {
    }
    ProjectS.getProject = function (projectId) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.getProject(projectId)
                .then(function (project) {
                var projectReturn = null;
                if (project) {
                    projectReturn = util_1.UtilMethods.getProjectAttr([project]);
                }
                resolve(projectReturn);
            });
        });
    };
    ProjectS.getMyProjectsIds = function (userId) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.getMyProjectIds(userId)
                .then(function (user) {
                var returnProjectIds = {};
                var individualProjects = user.individualProjects;
                for (var _i = 0, individualProjects_1 = individualProjects; _i < individualProjects_1.length; _i++) {
                    var project = individualProjects_1[_i];
                    if (project.projectUsers.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                        returnProjectIds[project.id] = true;
                    }
                }
                for (var _a = 0, _b = user.teams; _a < _b.length; _a++) {
                    var team = _b[_a];
                    if (team.TeamUsers.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                        for (var _c = 0, _d = team.projects; _c < _d.length; _c++) {
                            var project = _d[_c];
                            if (project.projectTeams.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                                returnProjectIds[project.id] = true;
                            }
                        }
                    }
                }
                for (var _e = 0, _f = user.leader; _e < _f.length; _e++) {
                    var team = _f[_e];
                    for (var _g = 0, _h = team.projects; _g < _h.length; _g++) {
                        var project = _h[_g];
                        if (project.projectTeams.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                            returnProjectIds[project.id] = true;
                        }
                    }
                }
                for (var _j = 0, _k = user.myProjects; _j < _k.length; _j++) {
                    var project = _k[_j];
                    returnProjectIds[project.id] = true;
                }
                resolve(Object.keys(returnProjectIds));
            });
        });
    };
    ProjectS.getMyProjects = function (userId, offset, limit, nameCriteria) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.ProjectConst.PROJECTS_SEARCH_LIMIT; }
        if (nameCriteria === void 0) { nameCriteria = ''; }
        var projectsReturn = {
            myProjects: [],
            count: 0
        };
        return new Promise(function (resolve, reject) {
            ProjectS.getMyProjectsIds(userId)
                .then(function (projectIds) {
                return projectDb_1.ProjectDb.getMyProjects(projectIds, nameCriteria);
            })
                .then(function (projects) {
                projectsReturn = util_1.UtilMethods.sliceCustom({ myProjects: projects, count: 0 }, ["myProjects"], offset, limit);
                projectsReturn.myProjects = util_1.UtilMethods.getProjectAttr(projectsReturn.myProjects);
                resolve(projectsReturn);
            });
        });
    };
    ProjectS.searchProjects = function (userId, offset, limit, nameCriteria) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.ProjectConst.PROJECTS_SEARCH_LIMIT; }
        if (nameCriteria === void 0) { nameCriteria = ''; }
        var projectsReturn = {
            myProjects: [],
            projects: [],
            count: 0
        };
        return new Promise(function (resolve, reject) {
            ProjectS.getMyProjectsIds(userId)
                .then(function (projectIds) {
                return Promise.all([projectDb_1.ProjectDb.getMyProjects(projectIds, nameCriteria), projectDb_1.ProjectDb.getPublicProjects(projectIds, nameCriteria)]);
            })
                .then(function (result) {
                projectsReturn = util_1.UtilMethods.sliceCustom({ myProjects: result[0], projects: result[1], count: 0 }, ["myProjects", "projects"], offset, limit);
                projectsReturn.myProjects = util_1.UtilMethods.getProjectAttr(projectsReturn.myProjects);
                projectsReturn.projects = util_1.UtilMethods.getProjectAttr(projectsReturn.projects);
                resolve(projectsReturn);
            });
        });
    };
    ProjectS.getContributors = function (projectId, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.ProjectConst.PROJECTS_SEARCH_LIMIT; }
        return new Promise(function (resolve, reject) {
            var contributorsReturn = {
                teams: [],
                individuals: [],
                count: 0
            };
            projectDb_1.ProjectDb.getProjectContributors(projectId)
                .then(function (project) {
                if (project) {
                    //console.log(UtilMethods.getUserAttr([project.get('user')]));         
                    contributorsReturn.individuals.push(project.user);
                    for (var _i = 0, _a = project.teams; _i < _a.length; _i++) {
                        var team = _a[_i];
                        if (team.projectTeams.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                            contributorsReturn.teams.push(team);
                        }
                    }
                    for (var _b = 0, _c = project.individualMembers; _b < _c.length; _b++) {
                        var user = _c[_b];
                        if (user.projectUsers.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                            contributorsReturn.individuals.push(user);
                        }
                    }
                    contributorsReturn = util_1.UtilMethods.sliceCustom(contributorsReturn, ["teams", "individuals"], offset, limit);
                    contributorsReturn.teams = util_1.UtilMethods.getTeamAttr(contributorsReturn.teams);
                    contributorsReturn.individuals = util_1.UtilMethods.getUserAttr(contributorsReturn.individuals);
                }
                resolve(contributorsReturn);
            });
        });
    };
    ProjectS.getTaskSets = function (userId, projectId, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.ProjectConst.PROJECTS_SEARCH_LIMIT; }
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.getProjectSets(projectId)
                .then(function (project) {
                var tasksetsReturn = { tasksets: [], count: 0 };
                if (project) {
                    tasksetsReturn = util_1.UtilMethods.sliceCustom({ tasksets: project.tasksets, count: 0 }, ["tasksets"], offset, limit);
                    tasksetsReturn.tasksets = util_1.UtilMethods.getTasksetAttr(userId, project.tasksets);
                }
                resolve(tasksetsReturn);
            });
        });
    };
    ProjectS.getTasks = function (setId, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.ProjectConst.PROJECTS_SEARCH_LIMIT; }
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.getSetTasks(setId)
                .then(function (taskset) {
                // console.log(taskset.tasks);
                var tasksReturn = { tasks: [], count: 0 };
                if (taskset) {
                    tasksReturn = util_1.UtilMethods.sliceCustom({ tasks: taskset.tasks, count: 0 }, ["tasks"], offset, limit);
                    tasksReturn.tasks = util_1.UtilMethods.getTaskAttr(taskset.tasks);
                }
                // console.log(tasksReturn);
                resolve(tasksReturn);
            });
        });
    };
    // managing methods
    // project managing methods
    //******************************************************************** */
    ProjectS.newProject = function (projectData) {
        return new Promise(function (resolve, reject) {
            var rProjectId;
            projectDb_1.ProjectDb.newProject(projectData)
                .then(function (project) {
                if (project) {
                    return ProjectS.getProject(project.id);
                }
                resolve();
            })
                .then(function (project) {
                resolve(project);
            })
                .catch(function (err) {
                reject(500);
            });
        });
    };
    ProjectS.addContributors = function (projectId, contributorIds) {
        var individualContributorData = [];
        var teamContributorData = [];
        for (var _i = 0, _a = contributorIds.individualIds; _i < _a.length; _i++) {
            var contributorId = _a[_i];
            individualContributorData.push({ userId: contributorId, projectId: projectId });
        }
        for (var _b = 0, _c = contributorIds.teamIds; _b < _c.length; _b++) {
            var contributorId = _c[_b];
            teamContributorData.push({ teamId: contributorId, projectId: projectId });
        }
        return Promise.all([projectDb_1.ProjectDb.addIndividualContributors(individualContributorData), projectDb_1.ProjectDb.addTeamContributors(teamContributorData)]);
    };
    ProjectS.removeContributors = function (projectId, contributorIds) {
        var individualContributorIds = [];
        var teamContributorIds = [];
        for (var _i = 0, _a = contributorIds.individualIds; _i < _a.length; _i++) {
            var contributorId = _a[_i];
            individualContributorIds.push(contributorId);
        }
        for (var _b = 0, _c = contributorIds.teamIds; _b < _c.length; _b++) {
            var contributorId = _c[_b];
            teamContributorIds.push(contributorId);
        }
        return Promise.all([projectDb_1.ProjectDb.removeIndividualContributors(projectId, individualContributorIds), projectDb_1.ProjectDb.removeTeamContributors(projectId, teamContributorIds)]);
    };
    ProjectS.addIndividualContributor = function (memberId, projectId) {
        return projectDb_1.ProjectDb.addIndividualContributors([{ userId: memberId, projectId: projectId }]);
    };
    ProjectS.replyIndividualContributorJoinRequest = function (requestId, decision) {
        return projectDb_1.ProjectDb.replyIndividualContributorJoinRequest(requestId, decision);
    };
    ProjectS.addTeamContributor = function (teamId, projectId) {
        return projectDb_1.ProjectDb.addTeamContributors([{ teamId: teamId, projectId: projectId }]);
    };
    ProjectS.replyTeamContributorJoinRequest = function (requestId, decision) {
        return projectDb_1.ProjectDb.replyTeamContributorJoinRequest(requestId, decision);
    };
    ProjectS.updateProjectLogo = function (projectId, imageUrl) {
        return projectDb_1.ProjectDb.updateProjectLogo(projectId, imageUrl);
    };
    ProjectS.editProjectDetails = function (projectId, projectData) {
        return projectDb_1.ProjectDb.editProjectDetails(projectId, projectData);
    };
    ProjectS.deleteProject = function (projectId) {
        return projectDb_1.ProjectDb.deleteProject(projectId);
    };
    // set managing methods
    //********************************************************** */
    ProjectS.newSet = function (userId, setData) {
        return projectDb_1.ProjectDb.newSet(setData)
            .then(function (taskset) {
            taskset['tasks'] = [];
            return util_1.UtilMethods.getTasksetAttr(userId, [taskset])[0];
        });
    };
    ProjectS.removeSet = function (setId) {
        return projectDb_1.ProjectDb.removeSet(setId);
    };
    ProjectS.setSetCompleted = function (setId) {
        return projectDb_1.ProjectDb.setSetCompleted(setId);
    };
    // task managing methods
    //******************************************************** */
    ProjectS.newTask = function (taskData) {
        return projectDb_1.ProjectDb.newTask(taskData);
    };
    ProjectS.removeTask = function (taskId) {
        return projectDb_1.ProjectDb.removeTask(taskId);
    };
    ProjectS.startTask = function (taskId) {
        return projectDb_1.ProjectDb.setTaskStart(taskId);
    };
    ProjectS.completeTask = function (taskId) {
        return projectDb_1.ProjectDb.setTaskCompleted(taskId);
    };
    ProjectS.changeTaskStatus = function (taskId, status) {
        return projectDb_1.ProjectDb.setTaskStatus(taskId, status);
    };
    // notification
    ProjectS.getUnseenTasks = function (userId) {
        return new Promise(function (resolve, reject) {
            var messagesReturn = [];
            projectDb_1.ProjectDb.getUnseenTasks(userId)
                .then(function (sets) {
                // console.log("Sets=========================================");
                // console.log(sets);
                var projects = {};
                for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
                    var set = sets_1[_i];
                    var tasks = set.tasks;
                    for (var _a = 0, tasks_1 = tasks; _a < tasks_1.length; _a++) {
                        var task = tasks_1[_a];
                        if (projects.hasOwnProperty(set.projectId)) {
                            projects[set.projectId].count++;
                        }
                        else {
                            projects[set.projectId] = {
                                count: 1,
                                name: set.project.name,
                                image: set.project.image
                            };
                        }
                    }
                }
                if (Object.keys(projects).length > 0) {
                    messagesReturn = util_1.UtilMethods.getUnseenTasksAttr(projects);
                }
                resolve(messagesReturn);
            });
        });
    };
    ProjectS.getUnseenTeamContributorJoinRequest = function (userId) {
        return new Promise(function (resolve, reject) {
            var requestsReturn = [];
            var projectsId = {};
            var requestsR = {};
            var teamsId = {};
            teamDb_1.TeamDb.getLeaderTeam(userId)
                .then(function (teams) {
                if (teams.length > 0) {
                    for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
                        var team = teams_1[_i];
                        teamsId[team.id] = {
                            name: team.name
                        };
                    }
                    console.log("Team id - " + teamsId);
                    return projectDb_1.ProjectDb.getUnseenTeamProjectJoinRequests(Object.keys(teamsId));
                }
                return [];
            })
                .then(function (requests) {
                if (requests.length > 0) {
                    for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
                        var request = requests_1[_i];
                        projectsId[request.projectId] = {
                            reqId: request.id,
                            teamId: request.teamId
                        };
                    }
                    return projectDb_1.ProjectDb.getProjects(Object.keys(projectsId));
                }
                return [];
            })
                .then(function (projects) {
                if (projects.length > 0) {
                    for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
                        var project = projects_1[_i];
                        var teamId = projectsId[project.id].teamId;
                        var team = teamsId[teamId].name;
                        requestsReturn.push({
                            id: projectsId[project.id].reqId,
                            image: project.image,
                            comment: "Team " + team + " is invited to work in project " + project.name + ".",
                            options: util_1.UtilMethods.getOptions(serviceValues_1.NotificationType.ProjectTeamRequest, projectsId[project.id].reqId)
                        });
                    }
                }
                resolve(requestsReturn);
            });
        });
    };
    ProjectS.getUnseenIndividualContributorJoinRequest = function (userId) {
        return new Promise(function (resolve, reject) {
            var requestsReturn = [];
            var projectsId = {};
            var requestsR = {};
            var teamsId = {};
            projectDb_1.ProjectDb.getUnseenIndividualProjectJoinRequests(userId)
                .then(function (requests) {
                if (requests.length > 0) {
                    for (var _i = 0, requests_2 = requests; _i < requests_2.length; _i++) {
                        var request = requests_2[_i];
                        projectsId[request.projectId] = request.id;
                    }
                    return projectDb_1.ProjectDb.getProjects(Object.keys(projectsId));
                }
                return [];
            })
                .then(function (projects) {
                if (projects.length > 0) {
                    for (var _i = 0, projects_2 = projects; _i < projects_2.length; _i++) {
                        var project = projects_2[_i];
                        requestsReturn.push({
                            id: projectsId[project.id],
                            image: project.image,
                            comment: "You are invited to work in project " + project.name + ".",
                            options: util_1.UtilMethods.getOptions(serviceValues_1.NotificationType.ProjectIndividualRequest, projectsId[project.id])
                        });
                    }
                }
                resolve(requestsReturn);
            });
        });
    };
    // fetch next numbers
    ProjectS.getNextTasksetNumber = function (projectId) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.getNextTasksetNumber(projectId)
                .then(function (count) {
                if (count) {
                    resolve(++count);
                }
                else {
                    resolve(1);
                }
            });
        });
    };
    ProjectS.getNextTaskNumber = function (projectId, tasksetId) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.getNextTaskNumber(projectId, tasksetId)
                .then(function (count) {
                if (count) {
                    resolve(++count);
                }
                else {
                    resolve(1);
                }
            });
        });
    };
    // Authorization
    ProjectS.checkProjectLeadership = function (userId, projectId) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.checkProjectLeadership(userId, projectId)
                .then(function (project) {
                if (project) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    ProjectS.checkContributor = function (userId, projectId) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.checkProjectLeadership(userId, projectId)
                .then(function (status) {
                if (status) {
                    console.log("Project leader========================================================================");
                    resolve(true);
                }
                return projectDb_1.ProjectDb.checkIndividualContributor(userId, projectId);
            })
                .then(function (project) {
                if (project) {
                    console.log("Individual contributor======================================================================");
                    resolve(true);
                }
                return teamServices_1.TeamS.getTeamIdList(userId);
            })
                .then(function (teamsId) {
                if (teamsId.length > 0) {
                    return projectDb_1.ProjectDb.checkTeamContributor(teamsId, projectId);
                }
            })
                .then(function (project) {
                if (project) {
                    console.log("Team contributor =============================================================================");
                    resolve(true);
                }
                else {
                    console.log("Not authorized==============================================================================");
                    resolve(false);
                }
            });
        });
    };
    ProjectS.checkTeamContributor = function (teamId, projectId) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.checkTeamContributor([teamId], projectId)
                .then(function (project) {
                if (project) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    ProjectS.checkIndividualContributorRequestReceiever = function (userId, requestId) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.checkIndividualContributorRequestReceiver(userId, requestId)
                .then(function (result) {
                if (result) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    ProjectS.checkTeamContributorRequestReceiever = function (userId, requestId) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.checkTeamContributorRequestReceiver(requestId)
                .then(function (request) {
                if (request) {
                    return teamDb_1.TeamDb.checkTeamLeadership(userId, request.teamId);
                }
                resolve(false);
            })
                .then(function (team) {
                if (team) {
                    resolve(true);
                }
                resolve(false);
            });
        });
    };
    ProjectS.checkTaskAssignee = function (userId, taskId) {
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.checkTaskAssignee(userId, taskId)
                .then(function (task) {
                if (task) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    return ProjectS;
}());
exports.ProjectS = ProjectS;
