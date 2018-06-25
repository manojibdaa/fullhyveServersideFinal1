"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db/db");
var serviceValues_1 = require("../models/serviceValues");
var util_1 = require("../util/util");
var constant_1 = require("../constants/constant");
var chatServices_1 = require("../services/chatServices");
var teamDb_1 = require("../db/teamDb");
var projectDb_1 = require("../db/projectDb");
var SearchS = /** @class */ (function () {
    function SearchS() {
    }
    // static searchFast(userId:any, name:string){
    //     return new Promise((resolve, reject)=>{
    //         let searchReturn:any = {
    //             users:[],
    //             teams:[],
    //             projects:[]
    //         }
    //         SearchS.searchUsersFast(userId, name)
    //         .then((users:any)=>{
    //             searchReturn.users = users;
    //             return SearchS.searchTeamsFast(name);
    //         })  
    //         .then((teams:any)=>{
    //             searchReturn.teams = teams;
    //             return SearchS.searchProjectsFast(name);
    //         })
    //         .then((projects:any)=>{
    //             searchReturn.projects = projects;
    //             resolve(searchReturn);
    //         })
    //     })
    // }
    SearchS.searchUsersFast = function (userId, name, limit) {
        if (limit === void 0) { limit = constant_1.UserConst.USERS_FAST_SEARCH_LIMIT; }
        var nameCriteria = name.trim().split(' ');
        return new Promise(function (resolve, reject) {
            return db_1.DB.User.findAll({
                limit: limit,
                where: db_1.DB.Sequelize.and(db_1.DB.Sequelize.or({
                    firstName: {
                        like: "%" + nameCriteria[0] + "%"
                    }
                }, {
                    lastName: {
                        like: "%" + nameCriteria[1] + "%"
                    }
                }), {
                    id: {
                        ne: userId
                    }
                })
            })
                .then(function (users) {
                resolve(util_1.UtilMethods.getFastUserAttr(users));
            });
        });
    };
    // static searchTeamsFast(name:string,limit=TeamConst.TEAMS_FAST_SEARCH_LIMIT):Promise<FastSearchResult[]>{
    //     let nameCriteria = name.trim();
    //     return new Promise((resolve, reject)=>{
    //         TeamDb.getFastSearchRes(nameCriteria,limit)
    //         .then((teams:any)=>{
    //             resolve(UtilMethods.getTeamProjectAttr(teams));
    //         })
    //     })
    // }
    SearchS.searchProjectsFast = function (name, limit) {
        if (limit === void 0) { limit = constant_1.ProjectConst.PROJECTS_FAST_SEARCH_LIMIT; }
        var nameCriteria = name.trim();
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.getFastSearchRes(nameCriteria, limit)
                .then(function (projects) {
                resolve(util_1.UtilMethods.getTeamProjectAttr(projects));
            });
        });
    };
    SearchS.search = function (userId, name) {
        return new Promise(function (resolve, reject) {
            var searchReturn = {
                users: {},
                teams: {},
                projects: {}
            };
            SearchS.searchUsers(userId, name)
                .then(function (users) {
                searchReturn.users = users;
                return SearchS.searchTeams(userId, name);
            })
                .then(function (teams) {
                searchReturn.teams = teams;
                //resolve(searchReturn);
                return SearchS.searchProjects(userId, name);
            })
                .then(function (projects) {
                searchReturn.projects = projects;
                resolve(searchReturn);
            });
        });
    };
    // detail search results
    SearchS.searchUsers = function (userId, name, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.UserConst.USERS_SEARCH_LIMIT; }
        var nameCriteria = name.trim().split(' ');
        var firstName = nameCriteria.length > 0 ? nameCriteria[0] : "";
        var lastName = nameCriteria.length > 1 ? nameCriteria[1] : "";
        var usersReturn = {
            friends: [],
            users: []
        };
        var friendsId = [];
        return new Promise(function (resolve, reject) {
            chatServices_1.ChatS.getUsers(userId, [constant_1.UserConst.REQUEST.ACCEPTED], name)
                .then(function (friends) {
                usersReturn.friends = friends;
                return chatServices_1.ChatS.getUsers(userId, [constant_1.UserConst.REQUEST.UNDECIDED, constant_1.UserConst.REQUEST.REJECTED], name);
            })
                .then(function (users) {
                usersReturn.users = users;
                resolve(usersReturn);
            });
        });
    };
    SearchS.getMyTeams = function (userId, name, searchFor, offset, limit) {
        if (name === void 0) { name = ''; }
        if (searchFor === void 0) { searchFor = serviceValues_1.SearchFor.General; }
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.TeamConst.TEAMS_SEARCH_LIMIT; }
        var teams = [];
        var nameCriteria = name.trim();
        return new Promise(function (resolve, reject) {
            teamDb_1.TeamDb.getMemberTeams(userId, nameCriteria)
                .then(function (user) {
                if (user) {
                    teams = teams.concat(user.teams);
                }
                return teamDb_1.TeamDb.getLeaderTeams(userId, nameCriteria);
            })
                .then(function (user) {
                if (user) {
                    teams = teams.concat(user.leader);
                }
                resolve(teams);
            });
        });
    };
    SearchS.searchTeams = function (userId, name, searchFor, offset, limit) {
        if (searchFor === void 0) { searchFor = serviceValues_1.SearchFor.General; }
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.TeamConst.TEAMS_SEARCH_LIMIT; }
        var teams = [];
        var nameCriteria = name.trim();
        var teamsReturn = {
            myTeams: [],
            teams: []
        };
        var teamIds = [];
        return new Promise(function (resolve, reject) {
            SearchS.getMyTeams(userId, nameCriteria)
                .then(function (teams) {
                if (teams.length > 0) {
                    for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
                        var team = teams_1[_i];
                        var request = 'Founder';
                        if (team.hasOwnProperty('TeamUsers')) {
                            request = team.TeamUsers.request;
                        }
                        var teamR = void 0;
                        if (searchFor == serviceValues_1.SearchFor.Specific && (request == 'Accepted' || request == 'Founder')) {
                            teamR = util_1.UtilMethods.getTeamAttr([team])[0];
                        }
                        else {
                            teamR = util_1.UtilMethods.getTeamAttr([team])[0];
                            if (searchFor == serviceValues_1.SearchFor.General) {
                                teamR.request = request;
                            }
                        }
                        if (request == 'Accepted' || request == 'Founder') {
                            teamsReturn.myTeams.push(teamR);
                        }
                        else {
                            teamsReturn.teams.push(teamR);
                        }
                        teamIds.push(team.id);
                    }
                }
            })
                .then(function () {
                return teamDb_1.TeamDb.getPublicTeams(teamIds, nameCriteria);
            })
                .then(function (teams) {
                if (teams && teams.length > 0) {
                    for (var _i = 0, teams_2 = teams; _i < teams_2.length; _i++) {
                        var team = teams_2[_i];
                        var teamR = util_1.UtilMethods.getTeamAttr([team])[0];
                        if (team.leaderId == userId) {
                            // if(searchFor==SearchFor.General){
                            //     teamR.request = 'Founder';
                            // }
                            // teamsReturn.myTeams.push(teamR);
                        }
                        else {
                            if (searchFor == serviceValues_1.SearchFor.General) {
                                teamR.request = 'Unsent';
                            }
                            teamsReturn.teams.push(teamR);
                        }
                    }
                }
                resolve(teamsReturn);
            });
        });
    };
    SearchS.getProjectR = function (project, request, through) {
        var projectR = util_1.UtilMethods.getProjectAttr([project])[0];
        projectR.through = through;
        projectR.request = request;
        return projectR;
    };
    SearchS.searchProjects = function (userId, name, searchFor, offset, limit) {
        if (searchFor === void 0) { searchFor = serviceValues_1.SearchFor.General; }
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = constant_1.ProjectConst.PROJECTS_SEARCH_LIMIT; }
        var nameCriteria = name.trim();
        var projectsReturn = {
            myProjects: [],
            projects: []
        };
        var projectIds = [];
        var projectIdsR = {};
        return new Promise(function (resolve, reject) {
            projectDb_1.ProjectDb.getUserOwnedProjects(userId, nameCriteria)
                .then(function (user) {
                if (user) {
                    var projectR = void 0;
                    for (var _i = 0, _a = user.myProjects; _i < _a.length; _i++) {
                        var project = _a[_i];
                        projectIdsR[project.id] = true; // record project id to use it to search public projects
                        if (searchFor == serviceValues_1.SearchFor.Specific) {
                            projectsReturn.myProjects.push(util_1.UtilMethods.getProjectAttr([project])[0]);
                        }
                        else {
                            projectsReturn.myProjects.push(SearchS.getProjectR(project, 'Founder', 'Founder'));
                        }
                    }
                }
                return projectDb_1.ProjectDb.getIndividualProjects(userId, nameCriteria);
            })
                .then(function (user) {
                if (user) {
                    var projectR = void 0;
                    for (var _i = 0, _a = user.individualProjects; _i < _a.length; _i++) {
                        var project = _a[_i];
                        projectIdsR[project.id] = true; // record project id to use it to search public projects
                        var request = project.projectUsers.request;
                        if (searchFor == serviceValues_1.SearchFor.Specific) {
                            var returnAttrType = request == 'Accepted' ? serviceValues_1.ReturnAttrType.Private : serviceValues_1.ReturnAttrType.Public;
                            projectsReturn.myProjects.push(util_1.UtilMethods.getProjectAttr([project])[0]);
                        }
                        else {
                            projectsReturn.myProjects.push(SearchS.getProjectR(project, request, 'Individual'));
                        }
                    }
                }
                return projectDb_1.ProjectDb.getTeamsProjects(userId, nameCriteria);
            })
                .then(function (user) {
                if (user) {
                    var projectR = void 0;
                    for (var _i = 0, _a = user.teams; _i < _a.length; _i++) {
                        var team = _a[_i];
                        if (team.TeamUsers.request == 'Accepted') {
                            for (var _b = 0, _c = team.projects; _b < _c.length; _b++) {
                                var project = _c[_b];
                                projectIdsR[project.id] = true; // record project id to use it to search public projects
                                var request = project.projectTeams.request;
                                if (searchFor == serviceValues_1.SearchFor.Specific) {
                                    var returnAttrType = request == 'Accepted' ? serviceValues_1.ReturnAttrType.Private : serviceValues_1.ReturnAttrType.Public;
                                    projectsReturn.myProjects.push(util_1.UtilMethods.getProjectAttr([project])[0]);
                                }
                                else {
                                    projectsReturn.myProjects.push(SearchS.getProjectR(project, request, 'Team'));
                                }
                            }
                        }
                    }
                    for (var _d = 0, _e = user.teams; _d < _e.length; _d++) {
                        var team = _e[_d];
                        for (var _f = 0, _g = team.projects; _f < _g.length; _f++) {
                            var project = _g[_f];
                            projectIdsR[project.id] = true; // record project id to use it to search public projects
                            var request = project.projectTeams.request;
                            if (searchFor == serviceValues_1.SearchFor.Specific) {
                                var returnAttrType = request == 'Accepted' ? serviceValues_1.ReturnAttrType.Private : serviceValues_1.ReturnAttrType.Public;
                                projectsReturn.myProjects.push(util_1.UtilMethods.getProjectAttr([project])[0]);
                            }
                            else {
                                projectsReturn.myProjects.push(SearchS.getProjectR(project, request, 'Team'));
                            }
                        }
                    }
                }
                projectIds = Object.keys(projectIdsR);
                return projectDb_1.ProjectDb.getPublicProjects(projectIds);
            })
                .then(function (projects) {
                if (projects && projects.length > 0) {
                    for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
                        var project = projects_1[_i];
                        if (searchFor == serviceValues_1.SearchFor.Specific) {
                            projectsReturn.projects.push(util_1.UtilMethods.getProjectAttr([project])[0]);
                        }
                        else {
                            projectsReturn.projects.push(SearchS.getProjectR(project, 'Unsent', ''));
                        }
                    }
                }
                resolve(projectsReturn);
            });
        });
    };
    return SearchS;
}());
exports.SearchS = SearchS;
