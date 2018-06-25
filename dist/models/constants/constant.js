"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serviceValues_1 = require("../models/serviceValues");
//module.exports.DB = "projecttracker1";
exports.DBConst = {
    DB_NAME: "projecttrackerfinal",
    DB_USER: "root",
    DB_PASSWORD: "",
    HOST: "localhost",
    DB_SERVER: "mysql"
};
var AuthConst = /** @class */ (function () {
    function AuthConst() {
    }
    AuthConst.SECRET = "thisissecret";
    return AuthConst;
}());
exports.AuthConst = AuthConst;
exports.UserConst = {
    START_ID: 0,
    USERS_SEARCH_LIMIT: 30,
    USERS_FAST_SEARCH_LIMIT: 10,
    REQUEST: {
        ACCEPTED: 'Accepted',
        REJECTED: 'Rejected',
        UNDECIDED: 'Undecided',
        REMOVED: 'Removed'
    },
    DEFAULT_IMAGE: 'default_user'
};
exports.TeamConst = {
    START_ID: 0,
    TEAMS_SEARCH_LIMIT: 30,
    TEAMS_FAST_SEARCH_LIMIT: 10,
    MEMBERS_SEARCH_LIMIT: 30,
    DEFAULT_IMAGE: 'default_team.png'
};
exports.ProjectConst = {
    START_ID: 0,
    PROJECTS_SEARCH_LIMIT: 30,
    PROJECTS_FAST_SEARCH_LIMIT: 10,
    TASK_STATUS: {
        'approve': serviceValues_1.TaskStatus.Approved,
        'revise': serviceValues_1.TaskStatus.Revise
    },
    DEFAULT_IMAGE: 'default_team.png'
};
exports.AnnouncementConst = {
    START_ID: 0,
    ANNOUNCEMENT_SHOWN_ONCE: 30
};
exports.StatConst = {
    TEAM_PERFORMANCE_DURATION: 2,
};
exports.ExcludeAuthentication = {
    signin: true,
    signup: true,
    checkUserName: true
};
