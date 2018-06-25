import * as sinon from 'sinon';
import * as mocha from 'mocha';
import * as chai from 'chai';
import { TeamS } from "../models/services/teamServices";
import { TeamDb } from '../models/db/teamDb';
import {UtilMethods} from'../models/util/util'; 

describe('Check if getTeam works', function(){
    let label:any, responses:any, TeamDbStub:any, teamReturn, utilStub:any, teamServ:any, DbReturn:any;

    before(function(){
        label = 'teamId';
        responses = {
            // DbReturn :{
            //     teamId:'string',
            //     otherAttributes:'object'
            // },
            // teamReturn : {
            //     teamId:'string'
            // }
            DbReturn : new Promise((resolve, reject) => {
                resolve({
                    teamId:'string',
                    otherAttributes:'object'
                })
                // reject(null)
            }),
            teamReturn : {
                teamId:'string'
            }
        }
         TeamDbStub = sinon.stub(TeamDb, 'getTeam').callsFake(async function(){
            console.log("Working in getTeam");
            return responses.DbReturn;
        });

        // TeamDbStub = sinon.stub(TeamDb, 'getTeam');
        // TeamDbStub.onCall().returns(responses.DbReturn);


        utilStub = sinon.stub(UtilMethods,'getTeamAttr')
        .callsFake(function(){
            console.log("Working");
            return responses.teamReturn.teamId;
        });
        utilStub.onCall().returns(responses.teamReturn.DbReturn);
    });

    it('Should return same data with the value of utilStub', function(done) {
            // this.timeout(5000);
            return TeamS.getTeam(label)

            .then((res)=>{
                chai.assert(res,responses.teamReturn.teamId);
            })
            

            // done();
    });

    after(function(){
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