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
describe('Check if getTeam works', function () {
    var label, responses, TeamDbStub, teamReturn, utilStub, teamServ, DbReturn;
    before(function () {
        label = 'teamId';
        responses = {
            // DbReturn :{
            //     teamId:'string',
            //     otherAttributes:'object'
            // },
            // teamReturn : {
            //     teamId:'string'
            // }
            DbReturn: new Promise(function (resolve, reject) {
                resolve({
                    teamId: 'string',
                    otherAttributes: 'object'
                });
                // reject(null)
            }),
            teamReturn: {
                teamId: 'string'
            }
        };
        TeamDbStub = sinon.stub(teamDb_1.TeamDb, 'getTeam').callsFake(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("Working in getTeam");
                    return [2 /*return*/, responses.DbReturn];
                });
            });
        });
        // TeamDbStub = sinon.stub(TeamDb, 'getTeam');
        // TeamDbStub.onCall().returns(responses.DbReturn);
        utilStub = sinon.stub(util_1.UtilMethods, 'getTeamAttr')
            .callsFake(function () {
            console.log("Working");
            return responses.teamReturn.teamId;
        });
        utilStub.onCall().returns(responses.teamReturn.DbReturn);
    });
    it('Should return same data with the value of utilStub', function (done) {
        // this.timeout(5000);
        return teamServices_1.TeamS.getTeam(label)
            .then(function (res) {
            chai.assert(res, responses.teamReturn.teamId);
        });
        // done();
    });
    after(function () {
        TeamDbStub.restore();
        utilStub.restore();
    });
});
/*
describe('Check if getTeamIdList works', function(){
    let label:any, responses:any, TeamDbStub:any, teamReturn, TeamDbStub2:any, teamServ:any, DbReturn;

    before(function(){
        label = 'teamId';
        responses = {
            DbGetLeaderReturn :[{
                id:'string',
                name:'string'
            }],
            DbGetUserReturn :[{
                teamId:'string'
            }],
            teamIdsReturn : [
                'string','string'
            ]
        }

        TeamDbStub = sinon.stub(TeamDb, 'getLeaderTeam').callsFake(function(){
            return responses.DbGetLeaderReturn;
        });

        TeamDbStub2 = sinon.stub(TeamDb,'getUserTeam').callsFake(function(){
            return responses.DbGetUserReturn;
        });

    });

    it('Should return an array of both stub id values', (done) => {
        TeamS.getTeamIdList(label).then(function(data){
            chai.assert(data,responses.teamIdsReturn);
            done();
        });
    });

    after(function(){
        TeamDbStub.restore();
        TeamDbStub2.restore();
    });
});

describe('Check if getMemberIdList works', function(){
    let label:any, responses:any, TeamDbStub:any,memberIdsReturn, DbReturn;

    before(function(){
        label = 'teamId';
        responses = {
            DbReturn :{
                teamId:'string',
                members:[{id:'string',otherparameters:'object'}],
                user:{
                    id:'string'
                }
            },
            memberIdsReturn : ['string','string']
        }
         TeamDbStub = sinon.stub(TeamDb, 'getTeam').callsFake(function(){
            return responses.DbReturn;
        });
    });

    it('Should return same data with the value of fetched team members id and user id', (done) => {
        TeamS.getMemberIdList(label).then(function(data){
            chai.assert(data,responses.memberIdsReturn);
            done();
        });
    });

    after(function(){
        TeamDbStub.restore();
    });
});

describe('Check if getMyTeams works', function(){
    let label:any, responses:any, TeamDbStub:any, teamReturn, utilStub:any, teamServ:any, DbReturn;

    before(function(){
        label = {userId:'number',offset:'number', limit:'number', name:'string'};
        responses = {
            DbReturn :{
                teamId:'string',
                otherAttributes:'object'
            },
            teamReturn : {
                teamId:'string'
            }
        }
         TeamDbStub = sinon.stub(TeamS, 'getTeamIdList').callsFake(function(){
            return responses.DbReturn;
        });

        utilStub = sinon.stub(UtilMethods,'getTeamAttr').callsFake(function(){
            return responses.teamReturn.teamId;
        });
    });

    it('Should return same data with the value of utilStub', (done) => {
        TeamS.getMyTeams(label.userId, label.offset, label.limit, label.name).then(function(data){
            chai.assert(data,responses.teamReturn.teamId);
            done();
        });
    });

    after(function(){
        TeamDbStub.restore();
        utilStub.restore();
    });
});*/ 
