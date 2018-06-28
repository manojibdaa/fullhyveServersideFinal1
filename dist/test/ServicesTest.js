"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var chai = require("chai");
var teamServices_1 = require("../models/services/teamServices");
var teamDb_1 = require("../models/db/teamDb");
var util_1 = require("../models/util/util");
var projectDb_1 = require("../models/db/projectDb");
var projectServices_1 = require("../models/services/projectServices");
//========================================================================================
//****************************** TEAM SERVICES TEST **************************************
//========================================================================================
describe('Check if getTeam works', function () {
    var label, responses, responses2, TeamDbStub, teamReturn, utilStub, teamServ, DbReturn;
    before(function () {
        label = 'teamId';
        responses = {
            DbReturn: ['teamId',
                'otherAttributes'],
            teamReturn: ['teamId']
        };
        responses2 = {
            DbReturn: null,
            teamReturn: null
        };
        TeamDbStub = sinon.stub(teamDb_1.TeamDb, 'getTeam').callsFake(function (value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, value];
                });
            });
        });
        utilStub = sinon.stub(util_1.UtilMethods, 'getTeamAttr').callsFake(function () {
            return responses.teamReturn;
        });
    });
    it('Should return the team with its attributes if the team was found', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.getTeam(responses.DbReturn)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, (responses.teamReturn)[0]);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Should return the a null value if the team doesnt exist or was not found', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.getTeam(responses2.DbReturn)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result == responses2.teamReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        TeamDbStub.restore();
        utilStub.restore();
    });
});
describe('Check if getTeamIdList works', function () {
    var label, responses, responses2, TeamDbStub, teamReturn, TeamDbStub2, teamServ, DbReturn;
    before(function () {
        label = 'userId';
        responses = {
            DbGetLeaderReturn: [{
                    id: 'string',
                    name: 'string'
                }],
            DbGetUserReturn: [{
                    teamId: 'string'
                }],
            teamIdsReturn: [
                'string', 'string'
            ]
        };
        TeamDbStub = sinon.stub(teamDb_1.TeamDb, 'getLeaderTeam').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbGetLeaderReturn];
                });
            });
        });
        TeamDbStub2 = sinon.stub(teamDb_1.TeamDb, 'getUserTeam').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbGetUserReturn];
                });
            });
        });
    });
    it('Should return an array of both stub id values', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.getTeamIdList(label)];
                    case 1:
                        data = _a.sent();
                        chai.assert(data, responses.teamIdsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        TeamDbStub.restore();
        TeamDbStub2.restore();
    });
});
describe('Check if getMemberIdList works', function () {
    var label, responses, TeamDbStub, memberIdsReturn, DbReturn;
    before(function () {
        label = 'teamId';
        responses = {
            DbReturn: {
                teamId: 'string',
                members: [{ id: 'memberId1', TeamUsers: { request: 'Accepted' }, otherparameters: 'object' }, { id: 'memberId2', TeamUsers: { request: 'Rejected' }, otherparameters: 'object' }],
                user: {
                    id: 'userId'
                }
            },
            memberIdsReturn: ['memberId1', 'userId']
        };
        TeamDbStub = sinon.stub(teamDb_1.TeamDb, 'getTeam').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return same data with the value of fetched team members id and user id', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.getMemberIdList(label)];
                    case 1:
                        data = _a.sent();
                        chai.assert(data, responses.memberIdsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe('Check if getMyTeams works', function () {
    var label, responses, getTeamIdListStub, sliceCustomStub, getTeamAttrStub, teamReturn, getTeamsDetailStub, teamServ, DbReturn;
    before(function () {
        label = { userId: 'number', offset: 'number', limit: 'number', name: 'string' };
        responses = {
            getTeamIdListReturn: [
                1, 2
            ],
            getTeamsDetail: [{
                    members: ['member1', 'member2'],
                    skill: [['skill1', 'skill2'], ['skill1', 'skill2']],
                    announcememnt: ['announcement1', 'announcement2']
                }, {
                    members: ['member1'],
                    skill: [['skill1', 'skill2']],
                    announcememnt: ['announcement1', 'announcement2']
                }],
            sliceCustomReturn: {
                teams: {
                    members: ['member1', 'member2'],
                    skill: [['skill1', 'skill2'], ['skill1', 'skill2']],
                    announcememnt: ['announcement1', 'announcement2']
                },
                myTeams: {
                    members: ['member1'],
                    skill: [['skill1', 'skill2']],
                    announcememnt: ['announcement1', 'announcement2']
                }
            },
            getTeamAttrReturn: ["Return List of Teams which the user is currently involved in"]
        };
        getTeamIdListStub = sinon.stub(teamServices_1.TeamS, 'getTeamIdList').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getTeamIdListReturn];
                });
            });
        });
        getTeamsDetailStub = sinon.stub(teamDb_1.TeamDb, 'getTeamsDetail').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getTeamsDetail];
                });
            });
        });
        sliceCustomStub = sinon.stub(util_1.UtilMethods, 'sliceCustom').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.sliceCustomReturn];
                });
            });
        });
        getTeamAttrStub = sinon.stub(util_1.UtilMethods, 'getTeamAttr').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getTeamAttrReturn];
                });
            });
        });
    });
    it('Should return Teams of the user is involved in', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.getMyTeams(label.userId, label.offset, label.limit, label.name)];
                    case 1:
                        data = _a.sent();
                        chai.assert(data, responses.sliceCustomReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        getTeamIdListStub.restore();
        getTeamsDetailStub.restore();
        sliceCustomStub.restore();
        getTeamAttrStub.restore();
    });
});
describe('Check if SearchTeams works', function () {
    var label, responses, teamReturn, teamServ, DbReturn;
    var TeamDbStub, getTeamIdListStub, getTeamsDetailStub, getPublicTeamsStub, sliceCustomStub, getTeamAttrStub;
    before(function () {
        label = { userId: 'number', offset: 'number', limit: 'number', name: 'string' };
        responses = {
            getTeamIdListReturn: [1, 2],
            getTeamsDetailReturn: ["result1", "result2"],
            getPublicTeamsReturn: ["return what team details are available to see publicly"],
            sliceCustomReturn: {
                teams: ["Teams not members of"],
                myTeams: ["Teams member of"]
            },
            getTeamAttrReturn: ["set teams based on membership"]
        };
        getTeamIdListStub = sinon.stub(teamServices_1.TeamS, 'getTeamIdList').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getTeamIdListReturn];
                });
            });
        });
        getTeamsDetailStub = sinon.stub(teamDb_1.TeamDb, 'getTeamsDetail').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getTeamsDetailReturn];
                });
            });
        });
        getPublicTeamsStub = sinon.stub(teamDb_1.TeamDb, 'getPublicTeams').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getPublicTeamsReturn];
                });
            });
        });
        sliceCustomStub = sinon.stub(util_1.UtilMethods, 'sliceCustom').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.sliceCustomReturn];
                });
            });
        });
        getTeamAttrStub = sinon.stub(util_1.UtilMethods, 'getTeamAttr').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getTeamAttrReturn];
                });
            });
        });
    });
    it('Should return an array of both stub id values', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.searchTeams(label.userId, label.offset, label.limit, label.name)];
                    case 1:
                        data = _a.sent();
                        chai.assert(data, responses.sliceCustomReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        getTeamIdListStub.restore();
        getTeamsDetailStub.restore();
        getPublicTeamsStub.restore();
        sliceCustomStub.restore();
        getTeamAttrStub.restore();
    });
});
describe('Check if getTeamAnnouncement works', function () {
    var label, responses, teamReturn, teamServ, DbReturn;
    var getTeamAnnouncementStub, getLastAnnIdStub, getAnnouncementAttrStub, sliceCustomStub;
    before(function () {
        label = { teamId: 'any', userId: 'any', offset: 'number', limit: 'number', lastAnnId: 'any' };
        responses = {
            getTeamAnnouncementReturn: ["announcement1", "announcement2"],
            getLastAnnIdReturn: {
                lastSeenAnnouncementId: 2
            },
            sliceCustomReturn: [{
                    unseen: ["announcements"],
                    announcements: ["announcements attributes"]
                }],
            getNewAnnouncementAttrReturn: ["announcements attributes"]
        };
        getTeamAnnouncementStub = sinon.stub(teamDb_1.TeamDb, 'getTeamAnnouncement').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getTeamAnnouncementReturn];
                });
            });
        });
        getLastAnnIdStub = sinon.stub(teamDb_1.TeamDb, 'getLastAnnId').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getLastAnnIdReturn];
                });
            });
        });
        sliceCustomStub = sinon.stub(util_1.UtilMethods, 'sliceCustom').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.sliceCustomReturn];
                });
            });
        });
        getAnnouncementAttrStub = sinon.stub(util_1.UtilMethods, 'getAnnouncementAttr').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getNewAnnouncementAttrReturn];
                });
            });
        });
    });
    it('Should return an array of all team announcements', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.getTeamAnnouncement(label.teamId, label.userId, label.offset, label.limit, label.lastAnnId)];
                    case 1:
                        data = _a.sent();
                        chai.assert(data, responses.sliceCustomReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        getTeamAnnouncementStub.restore();
        getLastAnnIdStub.restore();
        sliceCustomStub.restore();
        getAnnouncementAttrStub.restore();
    });
});
describe('Check if getUnseenTeamAnnouncement', function () {
    var label, responses, teamReturn, teamServ, DbReturn;
    var getTeamAnnouncementStub, getLastAnnIdStub, getAnnouncementAttrStub;
    before(function () {
        label = { teamId: 'any', userId: 'any', limit: 'number' };
        responses = {
            getLastAnnIdReturn: [{
                    lastSeenAnnouncementId: 2
                }],
            getTeamAnnouncementReturn: ["Announcement1", "Announcement2"],
            getAnnouncementAttrReturn: [
                "Attributes", "Attributes"
            ]
        };
        getLastAnnIdStub = sinon.stub(teamDb_1.TeamDb, 'getLastAnnId').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getLastAnnIdReturn];
                });
            });
        });
        getTeamAnnouncementStub = sinon.stub(teamDb_1.TeamDb, 'getTeamAnnouncement').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getTeamAnnouncementReturn];
                });
            });
        });
        getAnnouncementAttrStub = sinon.stub(util_1.UtilMethods, 'getAnnouncementAttr').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getAnnouncementAttrReturn];
                });
            });
        });
    });
    it('Should return an array of all unseen team announcements', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.getUnseenTeamAnnouncement(label.teamId, label.userId, label.limit)];
                    case 1:
                        data = _a.sent();
                        chai.assert(data, responses.getAnnouncementAttrReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        getTeamAnnouncementStub.restore();
        getLastAnnIdStub.restore();
        getAnnouncementAttrStub.restore();
    });
});
describe('Check if getTeamProjects works', function () {
    var label, responses;
    var getTeamProjectsStub, sliceCustomStub, getProjectAttrStub;
    before(function () {
        label = { teamId: 'any', offset: 'number', limit: 'number' };
        responses = {
            getTeamProjectsReturn: ["Project1", "Project2"],
            sliceCustomReturn: {
                projects: ["Project1", "Project2"],
                count: 2
            },
            getProjectAttrReturn: ["Project1", "Project2"]
        };
        getTeamProjectsStub = sinon.stub(projectDb_1.ProjectDb, 'getTeamProjects').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getTeamProjectsReturn];
                });
            });
        });
        sliceCustomStub = sinon.stub(util_1.UtilMethods, 'sliceCustom').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.sliceCustomReturn];
                });
            });
        });
        getProjectAttrStub = sinon.stub(util_1.UtilMethods, 'getProjectAttr').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getProjectAttrReturn];
                });
            });
        });
    });
    it('Should return the specified teams Projects', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.getTeamProjects(label.teamId, label.offset, label.limit)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.sliceCustomReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        getTeamProjectsStub.restore();
        sliceCustomStub.restore();
        getProjectAttrStub.restore();
    });
});
//
//managing Methods
//
describe('Check if announceAndReply works', function () {
    var label, responses;
    var announceStub, getNewAnnouncementAttrStub;
    before(function () {
        label = { teamId: 'any', userId: 'any', message: 'string', mainAnnouncementId: 'any' };
        responses = {
            announceReturn: ["Announcement"],
            getNewAnnouncementAttrReturn: ["Announcement Attributes"]
        };
        announceStub = sinon.stub(teamDb_1.TeamDb, 'announce').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.announceReturn];
                });
            });
        });
        getNewAnnouncementAttrStub = sinon.stub(util_1.UtilMethods, 'getNewAnnouncementAttr').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getNewAnnouncementAttrReturn];
                });
            });
        });
    });
    it('Should return the resulting new announcement', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.announceAndReply(label.teamId, label.userId, label.message, label.mainAnnouncementId)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.getAnnouncementAttrReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        announceStub.restore();
        getNewAnnouncementAttrStub.restore();
    });
});
describe('Check if Reply works', function () {
    var label, responses;
    var replyStub, getNewAnnouncementAttrStub;
    before(function () {
        label = { userId: 'any', teamId: 'number', message: 'string', mainAnnouncementId: 'any' };
        responses = {
            replyReturn: ["announcement"],
            getNewAnnouncementAttrReturn: ['attributes of the announcement']
        };
        replyStub = sinon.stub(teamDb_1.TeamDb, 'reply').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.replyReturn];
                });
            });
        });
        getNewAnnouncementAttrStub = sinon.stub(util_1.UtilMethods, 'getNewAnnouncementAttr').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.getNewAnnouncementAttrReturn];
                });
            });
        });
    });
    it('Should return the replyed announcement', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.reply(label.userId, label.teamId, label.message, label.mainAnnouncementId)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.getNewAnnouncementAttrReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        replyStub.restore();
        getNewAnnouncementAttrStub.restore();
    });
});
describe('Check if updateAnnouncementSeen works', function () {
    var label, responses;
    var updateAnnouncementSeenStub;
    before(function () {
        label = { teamId: 'any', userId: 'any', lastSeenAnnId: 'any' };
        responses = {
            updateAnnouncementSeenReturn: ["Seen"]
        };
        updateAnnouncementSeenStub = sinon.stub(teamDb_1.TeamDb, 'updateAnnouncementSeen').callsFake(function () {
            return responses.updateAnnouncementSeenReturn;
        });
    });
    it('Should return the seen updated announcement', function () {
        var result = teamServices_1.TeamS.updateAnnouncementSeen(label.teamId, label.userId, label.lastSeenAnnId);
        chai.assert(result, responses.updateAnnouncementSeenReturn);
    });
    after(function () {
        updateAnnouncementSeenStub.restore();
    });
});
describe('Check if newTeam works', function () {
    var label, responses;
    var newTeamStub;
    before(function () {
        label = { teamData: 'any' };
        responses = {
            newTeamReturn: ["New Team"]
        };
        newTeamStub = sinon.stub(teamDb_1.TeamDb, 'newTeam').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.newTeamReturn];
                });
            });
        });
    });
    it('Should return the created team', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.newTeam(label)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.newTeamReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        newTeamStub.restore();
    });
});
describe('Check if editTeamProfile works', function () {
    var label, responses;
    var editTeamProfileStub;
    before(function () {
        label = { teamId: 'number', teamData: 'any' };
        responses = {
            editTeamProfileReturn: ["Edited"]
        };
        editTeamProfileStub = sinon.stub(teamDb_1.TeamDb, 'editTeamProfile').callsFake(function () {
            return responses.editTeamProfileReturn;
        });
    });
    it('Should return True or False', function () {
        var result = teamServices_1.TeamS.editTeamProfile(label.teamId, label.teamData);
        chai.assert(result, responses.editTeamProfileReturn);
    });
    after(function () {
        editTeamProfileStub.restore();
    });
});
describe('Check if deleteTeam works', function () {
    var label, responses;
    var deleteTeamStub;
    before(function () {
        label = { teamId: 'number' };
        responses = {
            deleteTeamReturn: ["Deleted"]
        };
        deleteTeamStub = sinon.stub(teamDb_1.TeamDb, 'deleteTeam').callsFake(function () {
            return responses.deleteTeamReturn;
        });
    });
    it('Should return True or False', function () {
        var result = teamServices_1.TeamS.deleteTeam(label);
        chai.assert(result, responses.deleteTeamReturn);
    });
    after(function () {
        deleteTeamStub.restore();
    });
});
describe('Check if addTeamMember works', function () {
    var label, responses;
    var addTeamMemberStub;
    before(function () {
        label = { teamId: 'number', userId: 'number' };
        responses = {
            addTeamMemberReturn: ["Added Team Memeber"]
        };
        addTeamMemberStub = sinon.stub(teamDb_1.TeamDb, 'addTeamMembers').callsFake(function () {
            return responses.addTeamMemberReturn;
        });
    });
    it('Should return True or False', function () {
        var result = teamServices_1.TeamS.addTeamMember(label.teamId, label.userId);
        chai.assert(result, responses.addTeamMemberReturn);
    });
    after(function () {
        addTeamMemberStub.restore();
    });
});
describe('Check if removeTeamMember works', function () {
    var label, responses;
    var removeTeamMemberStub;
    before(function () {
        label = { teamId: 'number', userId: 'number[]' };
        responses = {
            removeTeamMemberReturn: ["Team Member Removed"]
        };
        removeTeamMemberStub = sinon.stub(teamDb_1.TeamDb, 'removeTeamMember').callsFake(function () {
            return responses.removeTeamMemberReturn;
        });
    });
    it('Should return True or False', function () {
        var result = teamServices_1.TeamS.removeTeamMember(label.teamId, label.userId);
        chai.assert(result, responses.removeTeamMemberReturn);
    });
    after(function () {
        removeTeamMemberStub.restore();
    });
});
describe('Check if replyTeamJoinRequest works', function () {
    var label, responses;
    var replyTeamJoinRequestStub;
    before(function () {
        label = { requestId: 'any', decision: 'any' };
        responses = {
            replyTeamJoinRequestReturn: ["Reply"]
        };
        replyTeamJoinRequestStub = sinon.stub(teamDb_1.TeamDb, 'replyTeamJoinRequest').callsFake(function () {
            return responses.replyTeamJoinRequestReturn;
        });
    });
    it('Should return True or False', function () {
        var result = teamServices_1.TeamS.replyTeamJoinRequest(label.requestId, label.decision);
        chai.assert(result, responses.replyTeamJoinRequestReturn);
    });
    after(function () {
        replyTeamJoinRequestStub.restore();
    });
});
describe('Check if editAnnouncementReply works', function () {
    var label, responses;
    var editAnnouncementReplyStub;
    before(function () {
        label = { announcementId: 'number', newAnnouncement: 'string' };
        responses = {
            editAnnouncementReplyReturn: ["Announcement Edited"]
        };
        editAnnouncementReplyStub = sinon.stub(teamDb_1.TeamDb, 'editAnnouncementReply').callsFake(function () {
            return responses.editAnnouncementReplyReturn;
        });
    });
    it('Should return True or False', function () {
        var result = teamServices_1.TeamS.editAnnouncementReply(label.announcementId, label.newAnnouncement);
        chai.assert(result, responses.editAnnouncementReply);
    });
    after(function () {
        editAnnouncementReplyStub.restore();
    });
});
describe('Check if removeAnnouncement works', function () {
    var label, responses;
    var removeAnnouncementReplyStub;
    before(function () {
        label = { announcementId: 'number' };
        responses = {
            removeAnnouncementReplyReturn: ["Announcement Removed"]
        };
        removeAnnouncementReplyStub = sinon.stub(teamDb_1.TeamDb, 'removeAnnouncementReply').callsFake(function () {
            return responses.removeAnnouncementReplyReturn;
        });
    });
    it('Should return True or False', function () {
        var result = teamServices_1.TeamS.removeAnnouncement(label);
        chai.assert(result, responses.removeAnnouncementReplyReturn);
    });
    after(function () {
        removeAnnouncementReplyStub.restore();
    });
});
describe('Check if removeReply works', function () {
    var label, responses;
    var removeAnnouncementReplyStub;
    before(function () {
        label = { replyId: 'number' };
        responses = {
            removeAnnouncementReplyReturn: ["Reply Removed"]
        };
        removeAnnouncementReplyStub = sinon.stub(teamDb_1.TeamDb, 'removeAnnouncementReply').callsFake(function () {
            return responses.removeAnnouncementReplyReturn;
        });
    });
    it('Should return True or False', function () {
        var result = teamServices_1.TeamS.removeReply(label);
        chai.assert(result, responses.removeAnnouncementReplyReturn);
    });
    after(function () {
        removeAnnouncementReplyStub.restore();
    });
});
//Authorization
//
describe('Check if checkTeamMembership works', function () {
    var label, responses;
    var checkTeamLeadershipStub, checkTeamMembershipStub;
    before(function () {
        label = { userId: 'any', teamId: 'any' };
        responses = {
            checkTeamLeadershipReturn: ["is Leader"],
            checkTeamMembershipReturn: ["is Member"],
            finalReturn: true
        };
        checkTeamLeadershipStub = sinon.stub(teamDb_1.TeamDb, 'checkTeamLeadership').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.checkTeamLeadershipReturn];
                });
            });
        });
        checkTeamMembershipStub = sinon.stub(teamDb_1.TeamDb, 'checkTeamMembership').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.checkTeamMembershipReturn];
                });
            });
        });
    });
    it('Should return true for the existance of the members', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.checkTeamMembership(label.userId, label.teamId)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.finalReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    before(function () {
        label = { userId: 'any', teamId: 'any' };
        responses = {
            checkTeamLeadershipReturn: [],
            checkTeamMembershipReturn: [],
            finalReturn: false
        };
    });
    it('Should return false for the existance of the no members', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.checkTeamMembership(label.userId, label.teamId)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.finalReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        checkTeamLeadershipStub.restore();
        checkTeamMembershipStub.restore();
    });
});
//didnt work
describe('Check if checkTeamLeadership works', function () {
    var label, responses;
    var checkTeamLeadershipStub;
    before(function () {
        label = { userId: 'any', teamId: 'any' };
        responses = {
            checkTeamLeadershipReturn: ["Team Leader"],
            finalReturn: true
        };
        checkTeamLeadershipStub = sinon.stub(teamDb_1.TeamDb, 'checkTeamLeadership').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.checkTeamLeadershipReturn];
                });
            });
        });
    });
    it('Should return true if the user is the leader of the team', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.checkTeamLeadership(label.userId, label.teamId)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.finalReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    before(function () {
        label = { userId: 'number', teamId: 'number' };
        responses = {
            checkTeamLeadershipReturn: [],
            finalReturn: false
        };
    });
    it('Should return false if the user is not the leader of the team', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.checkTeamLeadership(label.userId, label.teamId)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.finalReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        checkTeamLeadershipStub.restore();
    });
});
//
describe('Check if checkAnnouncementOrReplyOwnership works', function () {
    var label, responses;
    var checkAnnouncementOrReplyOwnershipStub;
    before(function () {
        label = { userId: 'number', annId: 'number' };
        responses = {
            CheckReturn: ["Owner"],
            finalReturn: true
        };
        checkAnnouncementOrReplyOwnershipStub = sinon.stub(teamDb_1.TeamDb, 'checkAnnouncementOrReplyOwnership').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.CheckReturn];
                });
            });
        });
    });
    it('Should return true the user is the owner of the announcement', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.checkAnnouncementOrReplyOwnership(label.userId, label.annId)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.finalReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    before(function () {
        label = { userId: 'number', annId: 'number' };
        responses = {
            CheckReturn: [],
            finalReturn: false
        };
    });
    it('Should return false if the user is not the owner of the announcement', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.checkAnnouncementOrReplyOwnership(label.userId, label.annId)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.finalReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        checkAnnouncementOrReplyOwnershipStub.restore();
    });
});
describe('Check if checkTeamJoinRequestReceiver works', function () {
    var label, responses;
    var checkTeamJoinRequestReceiverStub;
    before(function () {
        label = { userId: 'number', requestId: 'number' };
        responses = {
            CheckReturn: ["Recieved"],
            finalReturn: true
        };
        checkTeamJoinRequestReceiverStub = sinon.stub(teamDb_1.TeamDb, 'checkTeamJoinRequestReceiver').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.CheckReturn];
                });
            });
        });
    });
    it('Should return true if valid join request', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.checkTeamJoinRequestReceiver(label.userId, label.requestId)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.finalReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    before(function () {
        label = { userId: 'number', requestId: 'number' };
        responses = {
            CheckReturn: [],
            finalReturn: false
        };
    });
    it('Should return false if invalid join request', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, teamServices_1.TeamS.checkTeamJoinRequestReceiver(label.userId, label.requestId)];
                    case 1:
                        result = _a.sent();
                        chai.assert(result, responses.finalReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        checkTeamJoinRequestReceiverStub.restore();
    });
});
//========================================================================================
//****************************** PROJECT SERVICES TEST **************************************
//========================================================================================
describe('Check if getProject works', function () {
    var label, responses, ProjectDbStub, projectReturn, utilStub, teamServ, DbReturn;
    before(function () {
        label = 'projectId';
        responses = {
            DbReturn: ['projectId',
                'otherAttributes'],
            projectReturn: ['projectId']
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'getProject').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
        utilStub = sinon.stub(util_1.UtilMethods, 'getProjectAttr')
            .callsFake(function () {
            return responses.projectReturn;
        });
    });
    it('Should return project with given projectId', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.getProject(label)];
                    case 1:
                        result = _a.sent();
                        chai.assert.equal(result, (responses.projectReturn)[0]);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
        utilStub.restore();
    });
});
describe('Check if newProject works', function () {
    var label, responses, ProjectDbStub, ProjectSStub;
    before(function () {
        label = 'userId';
        responses = {
            DbReturn: {
                projectId: 'string'
            },
            projectsReturn: {
                projectId: 'string'
            },
            SReturn: {
                projectId: 'string'
            }
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'newProject').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
        ProjectSStub = sinon.stub(projectServices_1.ProjectS, 'getProject').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.SReturn];
                });
            });
        });
    });
    it('Should return the created project', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.newProject(label)];
                    case 1:
                        result = _a.sent();
                        chai.assert.typeOf(result, 'object');
                        chai.assert.containsAllKeys(result, ['projectId']);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
        ProjectSStub.restore();
    });
});
describe('Check if addContributors works', function () {
    var label, responses, ProjectDbStub, ProjectDbStub2;
    before(function () {
        label = { projectId: 'userId', contributorIds: { individualIds: ['contributorId', 'huhu'], teamIds: ['tid', 'tid2'] } };
        responses = {
            DbReturn: {
                projectId: 'string'
            },
            projectsReturn: {
                projectId: 'string'
            }
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'addIndividualContributors').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
        ProjectDbStub2 = sinon.stub(projectDb_1.ProjectDb, 'addTeamContributors').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should exist', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.addContributors(label.projectId, label.contributorIds)];
                    case 1:
                        result = _a.sent();
                        chai.assert.exists(result);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Should contain the projectId', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.addContributors(label.projectId, label.contributorIds)];
                    case 1:
                        result = _a.sent();
                        chai.assert.containsAllKeys(result, ['0']);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
        ProjectDbStub2.restore();
    });
});
describe('Check if removeContributors works', function () {
    var label, responses, ProjectDbStub, ProjectDbStub2;
    before(function () {
        label = { projectId: 'userId', contributorIds: { individualIds: ['contributorId', 'huhu'], teamIds: ['tid', 'tid2'] } };
        responses = {
            DbReturn: {
                projectId: 'string'
            },
            projectsReturn: {
                projectId: 'string'
            }
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'removeIndividualContributors').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
        ProjectDbStub2 = sinon.stub(projectDb_1.ProjectDb, 'removeTeamContributors').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should remove contributor given id', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.removeContributors(label.projectId, label.contributorIds)];
                    case 1:
                        result = _a.sent();
                        chai.assert.exists(result);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
        ProjectDbStub2.restore();
    });
});
describe('Check if addIndividualContributor works', function () {
    var label, label2, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'memberId';
        label2 = 'projectId';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'addIndividualContributors').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should be true', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.addIndividualContributor(label, label2)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if replyIndividualContributorJoinRequest works', function () {
    var label, label2, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'label';
        label2 = 'label';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'replyIndividualContributorJoinRequest').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.replyIndividualContributorJoinRequest(label, label2)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if addTeamContributor works', function () {
    var label, label2, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'teamid';
        label2 = 'projectid';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'addTeamContributors').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.addTeamContributor(label, label2)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if replyTeamContributorJoinRequest works', function () {
    var label, label2, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'requestid';
        label2 = 'decision';
        responses = {
            DbReturn: [{
                    teamId: 'string',
                    other: 'other'
                }],
            projectsReturn: [{
                    teamId: 'string',
                    other: 'other'
                }]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'replyTeamContributorJoinRequest').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.replyTeamContributorJoinRequest(label, label2)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if updateProjectLogo works', function () {
    var label, label2, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'projectid';
        label2 = 'imageurl';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'updateProjectLogo').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.updateProjectLogo(label, label2)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if editProjectDetails works', function () {
    var label, label2, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'projectid';
        label2 = 'projectdata';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'editProjectDetails').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.editProjectDetails(label, label2)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if deleteProject works', function () {
    var label, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'projectid';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'deleteProject').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.deleteProject(label)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if newSet works', function () {
    var label, responses, ProjectDbStub, teamReturn, teamServ, UtilStub;
    before(function () {
        label = { userId: 4, setData: {} };
        responses = {
            DbReturn: {
                tasks: [],
                other: 'others'
            },
            projectsReturn: [
                'string', 'string'
            ],
            utilreturn: [{ id: 'id', name: 'name' }]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'newSet').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
        UtilStub = sinon.stub(util_1.UtilMethods, 'getTasksetAttr').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.utilreturn];
                });
            });
        });
    });
    it('Should return a set', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.newSet(label.userId, label.setData)];
                    case 1:
                        data = _a.sent();
                        chai.assert.isNotNull(data);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
        UtilStub.restore();
    });
});
describe('Check if removeSet works', function () {
    var label, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'projectid';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'removeSet').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true if set removed', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.removeSet(label)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if setSetCompleted works', function () {
    var label, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'projectid';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'setSetCompleted').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true on complete', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.setSetCompleted(label)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if newTask works', function () {
    var label, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'projectid';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'newTask').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return created task', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.newTask(label)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if removeTask works', function () {
    var label, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'taskid';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'removeTask').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true when task removed', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.removeTask(label)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if startTask works', function () {
    var label, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'taskid';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'setTaskStart').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true on start', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.startTask(label)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if completeTask works', function () {
    var label, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'taskid';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'setTaskCompleted').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true if done', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.completeTask(label)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if changeTaskStatus works', function () {
    var label, label2, responses, ProjectDbStub, teamReturn, teamServ, DbReturn;
    before(function () {
        label = 'taskid';
        label2 = 'status';
        responses = {
            DbReturn: [{
                    teamId: 'string'
                }],
            projectsReturn: [
                'string', 'string'
            ]
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'setTaskStatus').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return something', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.changeTaskStatus(label, label2)];
                    case 1:
                        data = _a.sent();
                        chai.assert.exists(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if getNextTasksetNumber works', function () {
    var label, responses, ProjectDbStub;
    before(function () {
        label = 'projectId';
        responses = {
            DbReturn: 4,
            projectsReturn: 5
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'getNextTasksetNumber').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true of existence', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.getNextTasksetNumber(label)];
                    case 1:
                        data = _a.sent();
                        chai.assert.equal(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if getNextTaskNumber works', function () {
    var label, responses, ProjectDbStub;
    before(function () {
        label = { projectId: 3, tasksetId: 3 };
        responses = {
            DbReturn: 4,
            projectsReturn: 5
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'getNextTaskNumber').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return an array of both stub id values', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.getNextTaskNumber(label.projectId, label.tasksetId)];
                    case 1:
                        data = _a.sent();
                        chai.assert.equal(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if checkProjectLeadership works', function () {
    var label, responses, ProjectDbStub;
    before(function () {
        label = { userId: 3, projectId: 3 };
        responses = {
            DbReturn: {
                projectId: 'someid',
                otherAttributes: 'any'
            },
            projectsReturn: true
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'checkProjectLeadership').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return an array of both stub id values', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.checkProjectLeadership(label.userId, label.projectId)];
                    case 1:
                        data = _a.sent();
                        chai.assert.equal(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if checkContributor works', function () {
    var label, responses, ProjectDbStub, ProjectDbStub2, ProjectDbStub3, TeamSStub;
    before(function () {
        label = { userId: 3, projectId: 3 };
        responses = {
            DbReturn: {
                projectId: 'someid',
                otherAttributes: 'any'
            },
            DbReturn2: [2, 3, 1, 4],
            DbReturn3: {
                projectId: 'someid',
                otherAttributes: 'any'
            },
            projectsReturn: true
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'checkIndividualContributor').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
        ProjectDbStub2 = sinon.stub(projectDb_1.ProjectDb, 'checkTeamContributor').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
        ProjectDbStub3 = sinon.stub(projectDb_1.ProjectDb, 'checkProjectLeadership').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
        TeamSStub = sinon.stub(teamServices_1.TeamS, 'getTeamIdList').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.checkContributor(label.userId, label.projectId)];
                    case 1:
                        data = _a.sent();
                        chai.assert.equal(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
        ProjectDbStub2.restore();
        TeamSStub.restore();
    });
});
describe('Check if checkTeamContributor works', function () {
    var label, responses, ProjectDbStub;
    before(function () {
        label = { userId: 3, projectId: 3 };
        responses = {
            DbReturn: {
                projectId: 'someid',
                otherAttributes: 'any'
            },
            projectsReturn: true
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'checkTeamContributor').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.checkTeamContributor(label.userId, label.projectId)];
                    case 1:
                        data = _a.sent();
                        chai.assert.equal(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
describe('Check if checkTaskAssignee works', function () {
    var label, responses, ProjectDbStub;
    before(function () {
        label = { userId: 3, projectId: 3 };
        responses = {
            DbReturn: {
                taskId: 'someid',
                otherAttributes: 'any'
            },
            projectsReturn: true
        };
        ProjectDbStub = sinon.stub(projectDb_1.ProjectDb, 'checkTaskAssignee').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
    });
    it('Should return true on existence', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, projectServices_1.ProjectS.checkTaskAssignee(label.userId, label.projectId)];
                    case 1:
                        data = _a.sent();
                        chai.assert.equal(data, responses.projectsReturn);
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        ProjectDbStub.restore();
    });
});
