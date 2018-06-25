"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db/db");
var constant_1 = require("../constants/constant");
var serviceValues_1 = require("../models/serviceValues");
/**
 * get projects my teams are member of
 * get projects I own
 * get projects I individually work on
 */
var ProjectDb = /** @class */ (function () {
    function ProjectDb() {
    }
    ProjectDb.getProject = function (projectId) {
        return db_1.DB.Project.findById(projectId, {
            include: [{
                    model: db_1.DB.User,
                    include: [db_1.DB.Skill]
                }]
        });
    };
    ProjectDb.getFastSearchRes = function (nameCriteria, limit) {
        if (limit === void 0) { limit = constant_1.ProjectConst.PROJECTS_FAST_SEARCH_LIMIT; }
        return db_1.DB.Project.findAll({
            limit: limit,
            where: {
                name: {
                    like: "%" + nameCriteria + "%"
                }
            }
        });
    };
    ProjectDb.getMyProjectIds = function (userId) {
        return db_1.DB.User.findById(userId, {
            include: [{
                    model: db_1.DB.Project,
                    as: 'myProjects',
                }, {
                    model: db_1.DB.Project,
                    as: 'individualProjects'
                }, {
                    model: db_1.DB.Team,
                    as: 'leader',
                    include: [{
                            model: db_1.DB.Project,
                        }]
                }, {
                    model: db_1.DB.Team,
                    as: 'teams',
                    include: [{
                            model: db_1.DB.Project,
                        }]
                }]
        });
    };
    ProjectDb.getUserOwnedProjects = function (userId, nameCriteria) {
        if (nameCriteria === void 0) { nameCriteria = ''; }
        return db_1.DB.User.findById(userId, {
            include: [{
                    model: db_1.DB.Project,
                    where: {
                        name: {
                            like: "%" + nameCriteria + "%"
                        },
                    },
                    as: 'myProjects',
                    include: [{
                            model: db_1.DB.User,
                            include: [db_1.DB.Skill]
                        }, {
                            model: db_1.DB.Team,
                            include: [{
                                    model: db_1.DB.User,
                                    as: 'members'
                                }]
                        }]
                }]
        });
    };
    ProjectDb.getIndividualProjects = function (userId, nameCriteria) {
        if (nameCriteria === void 0) { nameCriteria = ''; }
        return db_1.DB.User.findById(userId, {
            include: [{
                    model: db_1.DB.Project,
                    where: {
                        name: {
                            like: "%" + nameCriteria + "%"
                        },
                    },
                    as: 'individualProjects',
                    include: [{
                            model: db_1.DB.User,
                            include: [db_1.DB.Skill]
                        }, {
                            model: db_1.DB.Team,
                            include: [{
                                    model: db_1.DB.User,
                                    as: 'members'
                                }]
                        }]
                }]
        });
    };
    // get all the projects a user works on through a team as member or leader
    ProjectDb.getTeamsProjects = function (userId, nameCriteria) {
        if (nameCriteria === void 0) { nameCriteria = ''; }
        return db_1.DB.User.findById(userId, {
            include: [{
                    model: db_1.DB.Team,
                    as: 'leader',
                    include: [{
                            model: db_1.DB.Project,
                            where: {
                                name: {
                                    like: "%" + nameCriteria + "%"
                                },
                            },
                            include: [{
                                    model: db_1.DB.User,
                                    include: [db_1.DB.Skill]
                                }, {
                                    model: db_1.DB.Team,
                                    include: [{
                                            model: db_1.DB.User,
                                            as: 'members'
                                        }]
                                }]
                        }]
                }, {
                    model: db_1.DB.Team,
                    as: 'teams',
                    include: [{
                            model: db_1.DB.Project,
                            where: {
                                name: {
                                    like: "%" + nameCriteria + "%"
                                },
                            },
                            include: [{
                                    model: db_1.DB.User,
                                    include: [db_1.DB.Skill]
                                }, {
                                    model: db_1.DB.Team,
                                    include: [{
                                            model: db_1.DB.User,
                                            as: 'members'
                                        }]
                                }]
                        }]
                }]
        });
    };
    // get all projects a team works on
    ProjectDb.getTeamProjects = function (teamId, nameCriteria) {
        if (nameCriteria === void 0) { nameCriteria = ''; }
        return db_1.DB.Team.findById(teamId, {
            include: [{
                    model: db_1.DB.Project,
                    where: {
                        name: {
                            like: "%" + nameCriteria + "%"
                        }
                    },
                    include: [{
                            model: db_1.DB.User,
                            include: [db_1.DB.Skill]
                        }, {
                            model: db_1.DB.Team,
                            include: [{
                                    model: db_1.DB.User,
                                    as: 'members'
                                }]
                        }, {
                            model: db_1.DB.User,
                            as: 'individualMembers'
                        }]
                }]
        });
    };
    // get all the projects with the given project ids
    ProjectDb.getProjectContributors = function (projectId, nameCriteria) {
        if (nameCriteria === void 0) { nameCriteria = ''; }
        return db_1.DB.Project.findById(projectId, {
            include: [{
                    model: db_1.DB.User,
                    as: 'individualMembers',
                    include: [db_1.DB.Skill]
                }, {
                    model: db_1.DB.Team,
                    include: [{
                            model: db_1.DB.User,
                            as: 'members'
                        }, {
                            model: db_1.DB.User,
                            include: [db_1.DB.Skill]
                        }]
                }, {
                    model: db_1.DB.User,
                    include: [db_1.DB.Skill]
                }]
        });
    };
    // get all the projects with the given project ids
    ProjectDb.getMyProjects = function (myProjectIds, nameCriteria) {
        if (nameCriteria === void 0) { nameCriteria = ''; }
        return db_1.DB.Project.findAll({
            where: {
                name: {
                    like: "%" + nameCriteria + "%"
                },
                id: {
                    in: myProjectIds
                }
            },
            include: [{
                    model: db_1.DB.User,
                    include: [db_1.DB.Skill]
                }, {
                    model: db_1.DB.User,
                    as: 'individualMembers'
                }, {
                    model: db_1.DB.Team,
                    include: [{
                            model: db_1.DB.User,
                            as: 'members'
                        }]
                }]
        });
    };
    // get projects that are not related to the user in any way
    ProjectDb.getPublicProjects = function (myProjectIds, nameCriteria) {
        if (nameCriteria === void 0) { nameCriteria = ''; }
        return db_1.DB.Project.findAll({
            where: {
                name: {
                    like: "%" + nameCriteria + "%"
                },
                id: {
                    notIn: myProjectIds
                }
            },
            include: [{
                    model: db_1.DB.User,
                    include: [db_1.DB.Skill]
                }, {
                    model: db_1.DB.User,
                    as: 'individualMembers'
                }, {
                    model: db_1.DB.Team,
                    include: [{
                            model: db_1.DB.User,
                            as: 'members'
                        }]
                }]
        });
    };
    ProjectDb.getProjectSets = function (projectId) {
        return db_1.DB.Project.findById(projectId, {
            include: [{
                    model: db_1.DB.TaskSets,
                    include: [{
                            model: db_1.DB.Task
                        }]
                }]
        });
    };
    ProjectDb.getSetTasks = function (setId) {
        return db_1.DB.TaskSets.findById(setId, {
            include: [{
                    model: db_1.DB.Task,
                    include: [{
                            model: db_1.DB.User,
                            as: 'assigner',
                            include: [db_1.DB.Skill]
                        }, {
                            model: db_1.DB.User,
                            as: 'assignee',
                            include: [db_1.DB.Skill]
                        }, {
                            model: db_1.DB.Team,
                            as: 'assigneeTeam',
                            include: [{
                                    model: db_1.DB.User,
                                    as: 'members'
                                }, {
                                    model: db_1.DB.User,
                                    include: [db_1.DB.Skill]
                                }]
                        }]
                }]
        });
    };
    // Project management
    //********************************* */
    ProjectDb.newProject = function (projectData) {
        return new Promise(function (resolve, reject) {
            db_1.DB.Project.create(projectData)
                .then(function (project) {
                if (project) {
                    resolve(project.id);
                }
                else {
                    resolve();
                }
            });
        });
    };
    ProjectDb.removeProject = function (projectId) {
        return db_1.DB.Project.destroy({
            where: {
                id: projectId
            }
        });
    };
    ProjectDb.setProjectLogo = function (imageUrl) {
        return db_1.DB.Project.update({
            imageUrl: imageUrl
        });
    };
    //[{userId:1,projectId:1},{}]
    ProjectDb.addIndividualContributors = function (individualContributorData) {
        return db_1.DB.ProjectUser.bulkCreate(individualContributorData);
    };
    ProjectDb.replyIndividualContributorJoinRequest = function (requestId, decision) {
        return db_1.DB.ProjectUser.update({
            request: decision,
            seen: true
        }, {
            where: {
                id: requestId
            }
        });
    };
    ProjectDb.removeIndividualContributors = function (projectId, userIds) {
        return db_1.DB.ProjectUser.destroy({
            where: {
                userId: {
                    in: userIds
                },
                projectId: projectId
            }
        });
    };
    //[{projectId:1,teamId:1},{}]
    ProjectDb.addTeamContributors = function (teamContributorData) {
        return db_1.DB.ProjectTeam.bulkCreate(teamContributorData);
    };
    ProjectDb.replyTeamContributorJoinRequest = function (requestId, decision) {
        return db_1.DB.ProjectTeam.update({
            request: decision,
            seen: true
        }, {
            where: {
                id: requestId
            }
        });
    };
    ProjectDb.removeTeamContributors = function (projectId, teamIds) {
        return db_1.DB.ProjectTeam.destroy({
            where: {
                teamId: {
                    in: teamIds
                },
                projectId: projectId
            }
        });
    };
    ProjectDb.setProjectCompleted = function (projectId) {
        return db_1.DB.Project.update({
            completionDate: new Date()
        }, {
            where: {
                id: projectId
            }
        });
    };
    ProjectDb.updateProjectLogo = function (projectId, imageUrl) {
        return db_1.DB.Project.update({
            imageUrl: imageUrl
        }, {
            where: {
                id: projectId
            }
        });
    };
    // Set managment
    //******************************** */
    ProjectDb.newSet = function (setData) {
        return db_1.DB.TaskSets.findOne({
            order: [['number', 'DESC']],
            where: {
                projectId: setData.projectId,
            }
        })
            .then(function (lastSet) {
            var number = 1;
            if (lastSet) {
                number = lastSet.number + 1;
            }
            setData.number = number;
            return db_1.DB.TaskSets.create(setData);
        });
    };
    ProjectDb.removeSet = function (setId) {
        return db_1.DB.TaskSets.destroy({
            where: {
                id: setId
            }
        });
    };
    ProjectDb.setSetCompleted = function (setId) {
        return db_1.DB.TaskSets.update({
            completionDate: new Date()
        }, {
            where: {
                id: setId
            }
        });
    };
    // Task managment
    //********************************** */
    ProjectDb.newTask = function (taskData) {
        return db_1.DB.Task.create(taskData);
    };
    ProjectDb.removeTask = function (taskId) {
        return db_1.DB.Task.destroy({
            where: {
                id: taskId
            }
        });
    };
    ProjectDb.setTaskCompleted = function (taskId) {
        return db_1.DB.Task.update({
            completionDate: new Date(),
            status: serviceValues_1.TaskStatus.PendingEvaluation
        }, {
            where: {
                id: taskId
            }
        });
    };
    ProjectDb.setTaskStart = function (taskId) {
        return db_1.DB.Task.update({
            startDate: new Date(),
            status: serviceValues_1.TaskStatus.InProgress
        }, {
            where: {
                id: taskId
            }
        });
    };
    ProjectDb.setTaskStatus = function (taskId, status) {
        return db_1.DB.Task.update({
            status: status
        }, {
            where: {
                id: taskId
            }
        });
    };
    ProjectDb.getIncompleteTasks = function (userId) {
        return db_1.DB.TaskSets.findAll({
            include: [{
                    model: db_1.DB.Task,
                    where: {
                        assigneeId: userId,
                        completionDate: null
                    },
                    include: [{
                            model: db_1.DB.User,
                            as: 'assigner',
                            include: [db_1.DB.Skill]
                        }, {
                            model: db_1.DB.User,
                            as: 'assignee',
                            include: [db_1.DB.Skill]
                        }, {
                            model: db_1.DB.Team,
                            as: 'assigneeTeam',
                            include: [{
                                    model: db_1.DB.User,
                                    as: 'members'
                                }, {
                                    model: db_1.DB.User,
                                    include: [db_1.DB.Skill]
                                }]
                        }]
                }, {
                    model: db_1.DB.Project
                }]
        });
    };
    ProjectDb.getUnseenTasks = function (userId) {
        return new Promise(function (resolve, reject) {
            var tasksR;
            db_1.DB.TaskSets.findAll({
                include: [{
                        model: db_1.DB.Task,
                        where: {
                            assigneeId: userId,
                            seen: false
                        }
                    }, {
                        model: db_1.DB.Project
                    }]
            })
                .then(function (tasks) {
                // console.log("Tasks-=====================================================");
                // console.log(userId);
                // console.log(tasks);
                tasksR = tasks;
                return db_1.DB.Task.update({
                    seen: true
                }, {
                    where: {
                        assigneeId: userId
                    }
                });
            })
                .then(function () {
                resolve(tasksR);
            });
        });
    };
    ProjectDb.getUnseenTeamProjectJoinRequests = function (teamsId) {
        return db_1.DB.ProjectTeam.findAll({
            where: {
                teamId: {
                    in: teamsId
                },
                request: constant_1.UserConst.REQUEST.UNDECIDED,
            }
        });
    };
    ProjectDb.getProjects = function (projectsId) {
        return db_1.DB.Project.findAll({
            where: {
                id: {
                    in: projectsId
                }
            }
        });
    };
    ProjectDb.getUnseenIndividualProjectJoinRequests = function (userId) {
        return db_1.DB.ProjectUser.findAll({
            where: {
                userId: userId,
                request: constant_1.UserConst.REQUEST.UNDECIDED
            }
        });
    };
    ProjectDb.editProjectDetails = function (projectId, projectData) {
        return db_1.DB.Project.update(projectData, {
            where: {
                id: projectId
            }
        });
    };
    ProjectDb.deleteProject = function (projectId) {
        return db_1.DB.Project.destroy({
            where: {
                id: projectId
            }
        });
    };
    // extra
    // =====================================================================
    ProjectDb.getNextTasksetNumber = function (projectId) {
        return db_1.DB.TaskSets.count({
            where: {
                projectId: projectId
            }
        });
    };
    ProjectDb.getNextTaskNumber = function (projectId, tasksetId) {
        return db_1.DB.Task.count({
            where: {
                projectId: projectId,
                tasksetId: tasksetId
            }
        });
    };
    // =====================================================================
    // Authorization
    // =================================================================
    ProjectDb.checkProjectLeadership = function (userId, projectId) {
        return db_1.DB.Project.findOne({
            where: {
                id: projectId,
                leaderId: userId
            }
        });
    };
    ProjectDb.checkIndividualContributor = function (userId, projectId) {
        return db_1.DB.ProjectUser.findOne({
            where: {
                userId: userId,
                projectId: projectId,
                request: constant_1.UserConst.REQUEST.ACCEPTED
            }
        });
    };
    ProjectDb.checkTeamContributor = function (teamsId, projectId) {
        return db_1.DB.ProjectTeam.findOne({
            where: {
                teamId: {
                    in: teamsId
                },
                projectId: projectId,
                request: constant_1.UserConst.REQUEST.ACCEPTED
            }
        });
    };
    ProjectDb.checkIndividualContributorRequestReceiver = function (userId, requestId) {
        return db_1.DB.ProjectUser.findOne({
            where: {
                id: requestId,
                userId: userId,
                request: constant_1.UserConst.REQUEST.UNDECIDED
            }
        });
    };
    ProjectDb.checkTeamContributorRequestReceiver = function (requestId) {
        return db_1.DB.ProjectTeam.findOne({
            where: {
                id: requestId,
                request: constant_1.UserConst.REQUEST.UNDECIDED
            }
        });
    };
    ProjectDb.checkTaskAssignee = function (userId, taskId) {
        return db_1.DB.Task.findOne({
            where: {
                id: taskId,
                assigneeId: userId
            }
        });
    };
    return ProjectDb;
}());
exports.ProjectDb = ProjectDb;
