import * as sinon from 'sinon';
import * as mocha from 'mocha';
import * as chai from 'chai';
import { TeamS } from "../models/services/teamServices";
import { TeamDb } from '../models/db/teamDb'
import {UtilMethods} from'../models/util/util'; 
import { List } from 'lodash';
import { reject } from 'bluebird'; //Promise
import { resolve } from 'path';
import { ProjectDb } from '../models/db/projectDb';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { ProjectS } from '../models/services/projectServices';

//========================================================================================
//****************************** TEAM SERVICES TEST **************************************
//========================================================================================


describe('Check if getTeam works', function(){
    let label:any, responses:any, responses2:any, TeamDbStub:any, teamReturn, utilStub:any, teamServ:any, DbReturn;

    before(function(){
        label = 'teamId';
        responses = {
            DbReturn :['teamId',
            'otherAttributes'],
            teamReturn : ['teamId']
        }

        responses2 = {
            DbReturn :null,
            teamReturn : null
        }

         TeamDbStub = sinon.stub(TeamDb, 'getTeam').callsFake( async function(value){
            return value;
        });

        utilStub = sinon.stub(UtilMethods,'getTeamAttr').callsFake(function(){
            return responses.teamReturn;
        });
    });

    it('Should return the team with its attributes if the team was found', async function() {
            let result = await TeamS.getTeam(responses.DbReturn);
            chai.assert(result,(responses.teamReturn)[0]);
    });

    it('Should return the a null value if the team doesnt exist or was not found', async function() {
        let result = await TeamS.getTeam(responses2.DbReturn);
        chai.assert(result == responses2.teamReturn);
    });

    after(function(){
        TeamDbStub.restore();
        utilStub.restore();
    });
});

describe('Check if getTeamIdList works', function(){
    let label:any, responses:any, responses2:any, TeamDbStub:any, teamReturn, TeamDbStub2:any, teamServ:any, DbReturn;

    before(function(){
        label = 'userId';
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

        TeamDbStub = sinon.stub(TeamDb, 'getLeaderTeam').callsFake(async function(){
            return responses.DbGetLeaderReturn;
        });

        TeamDbStub2 = sinon.stub(TeamDb,'getUserTeam').callsFake(async function(){
            return responses.DbGetUserReturn;
        });

    });

    it('Should return an array of both stub id values', async function(){
        let data = await TeamS.getTeamIdList(label);
        chai.assert(data,responses.teamIdsReturn);
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
                members:[{id:'memberId1',TeamUsers: { request:'Accepted'},otherparameters:'object'},{id:'memberId2',TeamUsers: { request:'Rejected'}, otherparameters:'object'}],
                user:{
                    id:'userId'
                }
            },
            memberIdsReturn : ['memberId1','userId']
        }
         TeamDbStub = sinon.stub(TeamDb, 'getTeam').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return same data with the value of fetched team members id and user id', async function(){
        let data = await TeamS.getMemberIdList(label);
        chai.assert(data,responses.memberIdsReturn);
    });

});

describe('Check if getMyTeams works', function(){
    let label:any, responses:any, getTeamIdListStub:any,sliceCustomStub:any,getTeamAttrStub:any, teamReturn, getTeamsDetailStub:any, teamServ:any, DbReturn;

    before(function(){
        label = {userId:'number',offset:'number', limit:'number', name:'string'};
        responses = {
            getTeamIdListReturn : [
                1,2
            ],
            getTeamsDetail : [{
                members:['member1','member2'],
                skill:[['skill1','skill2'],['skill1','skill2']],
                announcememnt:['announcement1','announcement2']
            },{
                members:['member1'],
                skill:[['skill1','skill2']],
                announcememnt:['announcement1','announcement2']
            }],
            sliceCustomReturn:{
                teams: {
                members:['member1','member2'],
                skill:[['skill1','skill2'],['skill1','skill2']],
                announcememnt:['announcement1','announcement2']
            },
            myTeams:{
                members:['member1'],
                skill:[['skill1','skill2']],
                announcememnt:['announcement1','announcement2']
            }},
            getTeamAttrReturn:["Return List of Teams which the user is currently involved in"]
        }

        getTeamIdListStub = sinon.stub(TeamS, 'getTeamIdList').callsFake( async function(){
            return responses.getTeamIdListReturn;
        });

        getTeamsDetailStub = sinon.stub(TeamDb,'getTeamsDetail').callsFake(async function(){
            return responses.getTeamsDetail;
        });

        sliceCustomStub = sinon.stub(UtilMethods, 'sliceCustom').callsFake( async function(){
            return responses.sliceCustomReturn;
        });

        getTeamAttrStub = sinon.stub(UtilMethods, 'getTeamAttr').callsFake( async function(){
            return responses.getTeamAttrReturn;
        });

    });

    it('Should return Teams of the user is involved in', async function(){
        let data = await TeamS.getMyTeams(label.userId, label.offset, label.limit, label.name);
        chai.assert(data,responses.sliceCustomReturn);
    });

    after(function(){
        getTeamIdListStub.restore();
        getTeamsDetailStub.restore();
        sliceCustomStub.restore();
        getTeamAttrStub.restore();
    });
});

describe('Check if SearchTeams works', function(){
    let label:any, responses:any, teamReturn, teamServ:any, DbReturn;
    let TeamDbStub:any,getTeamIdListStub:any,getTeamsDetailStub:any,getPublicTeamsStub:any,sliceCustomStub:any,getTeamAttrStub:any;

    before(function(){
        label = {userId:'number',offset:'number', limit:'number', name:'string'};
        responses = {
            getTeamIdListReturn :[1,2],
            getTeamsDetailReturn :["result1","result2"],
            getPublicTeamsReturn:["return what team details are available to see publicly"],
            sliceCustomReturn : {
                teams:["Teams not members of"],
                myTeams:["Teams member of"]
            },
            getTeamAttrReturn:["set teams based on membership"]
        }

        getTeamIdListStub = sinon.stub(TeamS, 'getTeamIdList').callsFake( async function(){
            return responses.getTeamIdListReturn;
        });

        getTeamsDetailStub = sinon.stub(TeamDb,'getTeamsDetail').callsFake(async function(){
            return responses.getTeamsDetailReturn;
        });

        getPublicTeamsStub = sinon.stub(TeamDb,'getPublicTeams').callsFake(async function(){
            return responses.getPublicTeamsReturn;
        });

        sliceCustomStub = sinon.stub(UtilMethods, 'sliceCustom').callsFake( async function(){
            return responses.sliceCustomReturn;
        });
        
        getTeamAttrStub = sinon.stub(UtilMethods, 'getTeamAttr').callsFake( async function(){
            return responses.getTeamAttrReturn;
        });

    });

    it('Should return an array of both stub id values', async function(){
        let data = await TeamS.searchTeams(label.userId, label.offset, label.limit, label.name);
        chai.assert(data,responses.sliceCustomReturn);
    });

    after(function(){
        getTeamIdListStub.restore();
        getTeamsDetailStub.restore();
        getPublicTeamsStub.restore();
        sliceCustomStub.restore();
        getTeamAttrStub.restore();
    });
});

describe('Check if getTeamAnnouncement works', function(){
    let label:any, responses:any, teamReturn, teamServ:any, DbReturn;
    let getTeamAnnouncementStub:any,getLastAnnIdStub:any,getAnnouncementAttrStub:any,sliceCustomStub:any;

    before(function(){
        label = {teamId:'any',userId:'any',offset:'number', limit:'number', lastAnnId:'any'};
        responses = {
            getTeamAnnouncementReturn :["announcement1","announcement2"],
            getLastAnnIdReturn :{
                lastSeenAnnouncementId: 2
            },
            sliceCustomReturn : [{
                unseen: ["announcements"],
                announcements:["announcements attributes"]
            }],
            getNewAnnouncementAttrReturn: ["announcements attributes"]
        }

        getTeamAnnouncementStub = sinon.stub(TeamDb,'getTeamAnnouncement').callsFake(async function(){
            return responses.getTeamAnnouncementReturn;
        });

        getLastAnnIdStub = sinon.stub(TeamDb,'getLastAnnId').callsFake(async function(){
            return responses.getLastAnnIdReturn;
        });

        sliceCustomStub = sinon.stub(UtilMethods, 'sliceCustom').callsFake( async function(){
            return responses.sliceCustomReturn;
        });
        
        getAnnouncementAttrStub = sinon.stub(UtilMethods, 'getAnnouncementAttr').callsFake( async function(){
            return responses.getNewAnnouncementAttrReturn;
        });

    });

    it('Should return an array of all team announcements', async function(){
        let data = await TeamS.getTeamAnnouncement(label.teamId, label.userId, label.offset, label.limit, label.lastAnnId);
        chai.assert(data,responses.sliceCustomReturn);
    });

    after(function(){
        getTeamAnnouncementStub.restore();
        getLastAnnIdStub.restore();
        sliceCustomStub.restore();
        getAnnouncementAttrStub.restore();
    });
});

describe('Check if getUnseenTeamAnnouncement', function(){
    let label:any, responses:any, teamReturn, teamServ:any, DbReturn;
    let getTeamAnnouncementStub:any,getLastAnnIdStub:any,getAnnouncementAttrStub:any;

    before(function(){
        label = {teamId:'any', userId:'any', limit:'number'};
        responses = {
            getLastAnnIdReturn :[{
                lastSeenAnnouncementId:2
            }],
            getTeamAnnouncementReturn :["Announcement1","Announcement2"],
            getAnnouncementAttrReturn : [
                "Attributes", "Attributes"
            ]
        }

        getLastAnnIdStub = sinon.stub(TeamDb,'getLastAnnId').callsFake(async function(){
            return responses.getLastAnnIdReturn;
        });

        getTeamAnnouncementStub = sinon.stub(TeamDb,'getTeamAnnouncement').callsFake(async function(){
            return responses.getTeamAnnouncementReturn;
        });

        getAnnouncementAttrStub = sinon.stub(UtilMethods, 'getAnnouncementAttr').callsFake( async function(){
            return responses.getAnnouncementAttrReturn;
        });

    });

    it('Should return an array of all unseen team announcements', async function(){
        let data = await TeamS.getUnseenTeamAnnouncement(label.teamId, label.userId, label.limit);
        chai.assert(data,responses.getAnnouncementAttrReturn);
    });

    after(function(){
        getTeamAnnouncementStub.restore();
        getLastAnnIdStub.restore();
        getAnnouncementAttrStub.restore();
    });
});

describe('Check if getTeamProjects works', function(){
    let label:any, responses:any;
    let getTeamProjectsStub:any, sliceCustomStub:any, getProjectAttrStub:any;

    before(function(){
        label = {teamId:'any', offset:'number', limit:'number'};
        responses = {
            getTeamProjectsReturn :["Project1","Project2"],
            sliceCustomReturn : {
                projects:["Project1","Project2"],
                count:2
            },
            getProjectAttrReturn: ["Project1","Project2"]
        }
        getTeamProjectsStub = sinon.stub(ProjectDb, 'getTeamProjects').callsFake( async function(){
            return responses.getTeamProjectsReturn;
        });

        sliceCustomStub = sinon.stub(UtilMethods, 'sliceCustom').callsFake( async function(){
            return responses.sliceCustomReturn;
        });

        getProjectAttrStub = sinon.stub(UtilMethods, 'getProjectAttr').callsFake( async function(){
            return responses.getProjectAttrReturn;
        });
    });

    it('Should return the specified teams Projects', async function() {
            let result = await TeamS.getTeamProjects(label.teamId, label.offset, label.limit);
            chai.assert(result,responses.sliceCustomReturn);

    });

    after(function(){
        getTeamProjectsStub.restore();
        sliceCustomStub.restore();
        getProjectAttrStub.restore();
    });
});

//
//managing Methods
//

describe('Check if announceAndReply works', function(){
    let label:any, responses:any;
    let announceStub:any, getNewAnnouncementAttrStub:any;

    before(function(){
        label = {teamId:'any', userId:'any', message:'string', mainAnnouncementId:'any'};
        responses = {
            announceReturn :["Announcement"],
            getNewAnnouncementAttrReturn : ["Announcement Attributes"]
        }
        announceStub = sinon.stub(TeamDb, 'announce').callsFake( async function(){
            return responses.announceReturn;
        });

        getNewAnnouncementAttrStub = sinon.stub(UtilMethods, 'getNewAnnouncementAttr').callsFake( async function(){
            return responses.getNewAnnouncementAttrReturn;
        });

    });

    it('Should return the resulting new announcement', async function() {
            let result = await TeamS.announceAndReply(label.teamId, label.userId, label.message, label.mainAnnouncementId);
            chai.assert(result,responses.getAnnouncementAttrReturn);

    });

    after(function(){
        announceStub.restore();
        getNewAnnouncementAttrStub.restore();
    });
});

describe('Check if Reply works', function(){
    let label:any, responses:any;
    let replyStub:any, getNewAnnouncementAttrStub:any;

    before(function(){
        label = {userId:'any', teamId:'number', message:'string', mainAnnouncementId:'any'};
        responses = {
            replyReturn :["announcement"],
            getNewAnnouncementAttrReturn : ['attributes of the announcement']
        }
        replyStub = sinon.stub(TeamDb, 'reply').callsFake( async function(){
            return responses.replyReturn;
        });

        getNewAnnouncementAttrStub = sinon.stub(UtilMethods, 'getNewAnnouncementAttr').callsFake( async function(){
            return responses.getNewAnnouncementAttrReturn;
        });

    });

    it('Should return the replyed announcement', async function() {
            let result = await TeamS.reply(label.userId, label.teamId, label.message, label.mainAnnouncementId);
            chai.assert(result,responses.getNewAnnouncementAttrReturn);

    });

    after(function(){
        replyStub.restore();
        getNewAnnouncementAttrStub.restore();
    });
});

describe('Check if updateAnnouncementSeen works', function(){
    let label:any, responses:any;
    let updateAnnouncementSeenStub:any;

    before(function(){
        label = {teamId:'any',userId:'any', lastSeenAnnId:'any'};
        responses = {
            updateAnnouncementSeenReturn :["Seen"]
        }
        updateAnnouncementSeenStub = sinon.stub(TeamDb, 'updateAnnouncementSeen').callsFake(function(){
            return responses.updateAnnouncementSeenReturn;
        });
    });

    it('Should return the seen updated announcement', function() {
            let result = TeamS.updateAnnouncementSeen(label.teamId, label.userId,label.lastSeenAnnId);
            chai.assert(result,responses.updateAnnouncementSeenReturn);

    });

    after(function(){
        updateAnnouncementSeenStub.restore();
    });
});

describe('Check if newTeam works', function(){
    let label:any, responses:any;
    let newTeamStub:any;

    before(function(){
        label = {teamData:'any'};
        responses = {
            newTeamReturn :["New Team"]
        }
        newTeamStub = sinon.stub(TeamDb, 'newTeam').callsFake( async function(){
            return responses.newTeamReturn;
        });

    });

    it('Should return the created team', async function() {
            let result = await TeamS.newTeam(label);
            chai.assert(result,responses.newTeamReturn);

    });

    after(function(){
        newTeamStub.restore();
    });
});

describe('Check if editTeamProfile works', function(){
    let label:any, responses:any;
    let editTeamProfileStub:any;

    before(function(){
        label = {teamId:'number', teamData:'any'};
        responses = {
            editTeamProfileReturn :["Edited"]
        }
        editTeamProfileStub = sinon.stub(TeamDb, 'editTeamProfile').callsFake(function(){
            return responses.editTeamProfileReturn;
        });

    });

    it('Should return True or False', function() {
            let result = TeamS.editTeamProfile(label.teamId, label.teamData);
            chai.assert(result,responses.editTeamProfileReturn);

    });

    after(function(){
        editTeamProfileStub.restore();
    });
});

describe('Check if deleteTeam works', function(){
    let label:any, responses:any;
    let deleteTeamStub:any;

    before(function(){
        label = {teamId:'number'};
        responses = {
            deleteTeamReturn :["Deleted"]
        }
        deleteTeamStub = sinon.stub(TeamDb, 'deleteTeam').callsFake(function(){
            return responses.deleteTeamReturn;
        });

    });

    it('Should return True or False',function() {
            let result = TeamS.deleteTeam(label);
            chai.assert(result,responses.deleteTeamReturn);

    });

    after(function(){
        deleteTeamStub.restore();
    });
});

describe('Check if addTeamMember works', function(){
    let label:any, responses:any;
    let addTeamMemberStub:any;

    before(function(){
        label = {teamId:'number', userId:'number'};
        responses = {
            addTeamMemberReturn :["Added Team Memeber"]
        }
        addTeamMemberStub = sinon.stub(TeamDb, 'addTeamMembers').callsFake(function(){
            return responses.addTeamMemberReturn;
        });

    });

    it('Should return True or False',function() {
            let result = TeamS.addTeamMember(label.teamId, label.userId);
            chai.assert(result,responses.addTeamMemberReturn);

    });

    after(function(){
        addTeamMemberStub.restore();
    });
});

describe('Check if removeTeamMember works', function(){
    let label:any, responses:any;
    let removeTeamMemberStub:any;

    before(function(){
        label = {teamId:'number', userId:'number[]'};
        responses = {
            removeTeamMemberReturn :["Team Member Removed"]
        }
        removeTeamMemberStub = sinon.stub(TeamDb, 'removeTeamMember').callsFake(function(){
            return responses.removeTeamMemberReturn;
        });

    });

    it('Should return True or False',function() {
            let result = TeamS.removeTeamMember(label.teamId, label.userId);
            chai.assert(result,responses.removeTeamMemberReturn);

    });

    after(function(){
        removeTeamMemberStub.restore();
    });
});

describe('Check if replyTeamJoinRequest works', function(){
    let label:any, responses:any;
    let replyTeamJoinRequestStub:any;

    before(function(){
        label = {requestId:'any', decision:'any'};
        responses = {
            replyTeamJoinRequestReturn :["Reply"]
        }
        replyTeamJoinRequestStub = sinon.stub(TeamDb, 'replyTeamJoinRequest').callsFake(function(){
            return responses.replyTeamJoinRequestReturn;
        });

    });

    it('Should return True or False',function() {
            let result = TeamS.replyTeamJoinRequest(label.requestId, label.decision);
            chai.assert(result,responses.replyTeamJoinRequestReturn);

    });

    after(function(){
        replyTeamJoinRequestStub.restore();
    });
});

describe('Check if editAnnouncementReply works', function(){
    let label:any, responses:any;
    let editAnnouncementReplyStub:any;

    before(function(){
        label = {announcementId:'number', newAnnouncement:'string'};
        responses = {
            editAnnouncementReplyReturn :["Announcement Edited"]
        }
        editAnnouncementReplyStub = sinon.stub(TeamDb, 'editAnnouncementReply').callsFake(function(){
            return responses.editAnnouncementReplyReturn;
        });

    });

    it('Should return True or False',function() {
            let result = TeamS.editAnnouncementReply(label.announcementId, label.newAnnouncement);
            chai.assert(result,responses.editAnnouncementReply);

    });

    after(function(){
        editAnnouncementReplyStub.restore();
    });
});

describe('Check if removeAnnouncement works', function(){
    let label:any, responses:any;
    let removeAnnouncementReplyStub:any;

    before(function(){
        label = {announcementId:'number'};
        responses = {
            removeAnnouncementReplyReturn :["Announcement Removed"]
        }
        removeAnnouncementReplyStub = sinon.stub(TeamDb, 'removeAnnouncementReply').callsFake( function(){
            return responses.removeAnnouncementReplyReturn;
        });

    });

    it('Should return True or False', function() {
            let result = TeamS.removeAnnouncement(label);
            chai.assert(result,responses.removeAnnouncementReplyReturn);

    });

    after(function(){
        removeAnnouncementReplyStub.restore();
    });
});

describe('Check if removeReply works', function(){
    let label:any, responses:any;
    let removeAnnouncementReplyStub:any;

    before(function(){
        label = {replyId:'number'};
        responses = {
            removeAnnouncementReplyReturn :["Reply Removed"]
        }
        removeAnnouncementReplyStub = sinon.stub(TeamDb, 'removeAnnouncementReply').callsFake(function(){
            return responses.removeAnnouncementReplyReturn;
        });

    });

    it('Should return True or False', function() {
            let result = TeamS.removeReply(label);
            chai.assert(result,responses.removeAnnouncementReplyReturn);

    });

    after(function(){
        removeAnnouncementReplyStub.restore();
    });
});

//Authorization
//

describe('Check if checkTeamMembership works', function(){
    let label:any, responses:any;
    let checkTeamLeadershipStub:any,checkTeamMembershipStub:any;

    before(function(){
        label = {userId:'any', teamId:'any'};
        responses = {
            checkTeamLeadershipReturn :["is Leader"],
            checkTeamMembershipReturn : ["is Member"],
            finalReturn: true
        }

        checkTeamLeadershipStub = sinon.stub(TeamDb, 'checkTeamLeadership').callsFake( async function(){
            return responses.checkTeamLeadershipReturn;
        });

        checkTeamMembershipStub = sinon.stub(TeamDb, 'checkTeamMembership').callsFake( async function(){
            return responses.checkTeamMembershipReturn;
        });


    });

    it('Should return true for the existance of the members', async function() {
            let result = await TeamS.checkTeamMembership(label.userId, label.teamId);
            chai.assert(result,responses.finalReturn);

    });

    before(function(){
        label = {userId:'any', teamId:'any'};
        responses = {
            checkTeamLeadershipReturn :[],
            checkTeamMembershipReturn : [],
            finalReturn: false
        }
    });

    it('Should return false for the existance of the no members', async function() {
            let result = await TeamS.checkTeamMembership(label.userId, label.teamId);
            chai.assert(result,responses.finalReturn);

    });

    after(function(){
        checkTeamLeadershipStub.restore();
        checkTeamMembershipStub.restore();
    });
});

//didnt work
describe('Check if checkTeamLeadership works', function(){
    let label:any, responses:any;
    let checkTeamLeadershipStub:any;

    before(function(){
        label = {userId:'any', teamId:'any'};
        responses = {
            checkTeamLeadershipReturn :["Team Leader"],
            finalReturn: true
        }

        checkTeamLeadershipStub = sinon.stub(TeamDb, 'checkTeamLeadership').callsFake( async function(){
            return responses.checkTeamLeadershipReturn;
        });

    });

    it('Should return true if the user is the leader of the team', async function() {
            let result = await TeamS.checkTeamLeadership(label.userId, label.teamId);
            chai.assert(result,responses.finalReturn);

    });

    before(function(){
        label = {userId:'number', teamId:'number'};
        responses = {
            checkTeamLeadershipReturn :[],
            finalReturn: false
        }
    });

    it('Should return false if the user is not the leader of the team', async function() {
            let result = await TeamS.checkTeamLeadership(label.userId, label.teamId);
            chai.assert(result,responses.finalReturn);

    });

    after(function(){
        checkTeamLeadershipStub.restore();
    });
});
//
describe('Check if checkAnnouncementOrReplyOwnership works', function(){
    let label:any, responses:any;
    let checkAnnouncementOrReplyOwnershipStub:any;

    before(function(){
        label = {userId:'number', annId:'number'};
        responses = {
            CheckReturn :["Owner"],
            finalReturn: true
        }

        checkAnnouncementOrReplyOwnershipStub = sinon.stub(TeamDb, 'checkAnnouncementOrReplyOwnership').callsFake( async function(){
            return responses.CheckReturn;
        });

    });

    it('Should return true the user is the owner of the announcement', async function() {
            let result = await TeamS.checkAnnouncementOrReplyOwnership(label.userId, label.annId);
            chai.assert(result,responses.finalReturn);

    });

    before(function(){
        label = {userId:'number', annId:'number'};
        responses = {
            CheckReturn :[],
            finalReturn: false
        }
    });

    it('Should return false if the user is not the owner of the announcement', async function() {
            let result = await TeamS.checkAnnouncementOrReplyOwnership(label.userId, label.annId);
            chai.assert(result,responses.finalReturn);

    });

    after(function(){
        checkAnnouncementOrReplyOwnershipStub.restore();
    });
});

describe('Check if checkTeamJoinRequestReceiver works', function(){
    let label:any, responses:any;
    let checkTeamJoinRequestReceiverStub:any;

    before(function(){
        label = {userId:'number', requestId:'number'};
        responses = {
            CheckReturn :["Recieved"],
            finalReturn: true
        }

        checkTeamJoinRequestReceiverStub = sinon.stub(TeamDb, 'checkTeamJoinRequestReceiver').callsFake( async function(){
            return responses.CheckReturn;
        });

    });

    it('Should return true if valid join request', async function() {
            let result = await TeamS.checkTeamJoinRequestReceiver(label.userId, label.requestId);
            chai.assert(result,responses.finalReturn);

    });

    before(function(){
        label = {userId:'number', requestId:'number'};
        responses = {
            CheckReturn :[],
            finalReturn: false
        }
    });

    it('Should return false if invalid join request',async function() {
            let result = await TeamS.checkTeamJoinRequestReceiver(label.userId, label.requestId);
            chai.assert(result,responses.finalReturn);

    });

    after(function(){
        checkTeamJoinRequestReceiverStub.restore();
    });
});






















//========================================================================================
//****************************** PROJECT SERVICES TEST **************************************
//========================================================================================

describe('Check if getProject works', function(){
    let label:any, responses:any, ProjectDbStub:any, projectReturn, utilStub:any, teamServ:any, DbReturn;

    before(function(){
        label = 'projectId';
        responses = {
            DbReturn :['projectId',
            'otherAttributes']
            ,
            projectReturn : ['projectId']
        
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'getProject').callsFake( async function(){
            return responses.DbReturn;
        });

        utilStub = sinon.stub(UtilMethods,'getProjectAttr')
        .callsFake(function(){
            return responses.projectReturn;
        });
    });

    it('Should return project with given projectId', async function() {
            let result = await ProjectS.getProject(label);
            chai.assert.equal(result,(responses.projectReturn)[0]);
    });

    after(function(){
        ProjectDbStub.restore();
        utilStub.restore();
    });
});



describe('Check if newProject works', function(){
    let label:any, responses:any, ProjectDbStub:any, ProjectSStub:any;

    before(function(){
        label = 'userId';
        responses = {
            DbReturn :{
                projectId:'string'
            }
            ,
            projectsReturn : {
                projectId:'string'
            },
            SReturn : {
                projectId:'string'
            }
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'newProject').callsFake( async function(){
            return responses.DbReturn;
        });
        ProjectSStub = sinon.stub(ProjectS, 'getProject').callsFake(async function(){
            return responses.SReturn;
        });
    });

    it('Should return the created project', async function() {
            let result = await ProjectS.newProject(label)
            chai.assert.typeOf(result,'object');
            chai.assert.containsAllKeys(result,['projectId']);
    });

    after(function(){
        ProjectDbStub.restore();
        ProjectSStub.restore();
    });
});

describe('Check if addContributors works', function(){
    let label:any, responses:any, ProjectDbStub:any, ProjectDbStub2:any;

    before(function(){
        label = {projectId:'userId', contributorIds:{individualIds:['contributorId','huhu'],teamIds:['tid','tid2']}};
        responses = {
            DbReturn :{
                projectId:'string'
            }
            ,
            projectsReturn : {
                projectId:'string'
            }
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'addIndividualContributors').callsFake( async function(){
            return responses.DbReturn;
        });
        ProjectDbStub2 = sinon.stub(ProjectDb, 'addTeamContributors').callsFake( async function(){
            return responses.DbReturn;
        });
    });

    it('Should exist', async function() {
            let result = await ProjectS.addContributors(label.projectId, label.contributorIds);
            chai.assert.exists(result);
    });
    it('Should contain the projectId', async function() {
        let result = await ProjectS.addContributors(label.projectId, label.contributorIds);
        chai.assert.containsAllKeys(result,['0']);
});

    after(function(){
        ProjectDbStub.restore();
        ProjectDbStub2.restore();
    });
});

describe('Check if removeContributors works', function(){
    let label:any, responses:any, ProjectDbStub:any, ProjectDbStub2:any;

    before(function(){
        label = {projectId:'userId', contributorIds:{individualIds:['contributorId','huhu'],teamIds:['tid','tid2']}};
        responses = {
            DbReturn :{
                projectId:'string'
            }
            ,
            projectsReturn : {
                projectId:'string'
            }
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'removeIndividualContributors').callsFake( async function(){
            return responses.DbReturn;
        });
        ProjectDbStub2 = sinon.stub(ProjectDb, 'removeTeamContributors').callsFake( async function(){
            return responses.DbReturn;
        });
    });

    it('Should remove contributor given id', async function() {
            let result = await ProjectS.removeContributors(label.projectId, label.contributorIds);
            chai.assert.exists(result);
    });

    after(function(){
        ProjectDbStub.restore();
        ProjectDbStub2.restore();
    });
});

describe('Check if addIndividualContributor works', function(){
    let label:any, label2:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'memberId';
        label2 = 'projectId';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'addIndividualContributors').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should be true', async function(){
        let data = await ProjectS.addIndividualContributor(label, label2);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if replyIndividualContributorJoinRequest works', function(){
    let label:any, label2:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'label';
        label2 = 'label';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'replyIndividualContributorJoinRequest').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true', async function(){
        let data = await ProjectS.replyIndividualContributorJoinRequest(label, label2);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});
describe('Check if addTeamContributor works', function(){
    let label:any, label2:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'teamid';
        label2 = 'projectid';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'addTeamContributors').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true', async function(){
        let data = await ProjectS.addTeamContributor(label, label2);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if replyTeamContributorJoinRequest works', function(){
    let label:any, label2:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'requestid';
        label2 = 'decision';

        responses = {
            DbReturn :[{
                teamId:'string',
                other: 'other'
            }],
            projectsReturn : [{
                teamId:'string',
                other: 'other'
            }]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'replyTeamContributorJoinRequest').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true', async function(){
        let data = await ProjectS.replyTeamContributorJoinRequest(label, label2);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});
describe('Check if updateProjectLogo works', function(){
    let label:any, label2:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'projectid';
        label2 = 'imageurl';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'updateProjectLogo').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true', async function(){
        let data = await ProjectS.updateProjectLogo(label, label2);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if editProjectDetails works', function(){
    let label:any, label2:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'projectid';
        label2 = 'projectdata';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'editProjectDetails').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true', async function(){
        let data = await ProjectS.editProjectDetails(label, label2);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if deleteProject works', function(){
    let label:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'projectid';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'deleteProject').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true', async function(){
        let data = await ProjectS.deleteProject(label);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if newSet works', function(){
    let label:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, UtilStub:any;

    before(function(){
        label = {userId: 4, setData: {}};

        responses = {
            DbReturn : {
                tasks : [],
                other : 'others'
            },
            projectsReturn : [
                'string','string'
            ],
            utilreturn : [{id: 'id', name: 'name'}]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'newSet').callsFake(async function(){
            return responses.DbReturn;
        });
        UtilStub = sinon.stub(UtilMethods, 'getTasksetAttr').callsFake(async function(){
            return responses.utilreturn;
        });
    });

    it('Should return a set', async function(){
        let data = await ProjectS.newSet(label.userId, label.setData);
        
        chai.assert.isNotNull(data);
    });

    after(function(){
        ProjectDbStub.restore();
        UtilStub.restore();
    });
});

describe('Check if removeSet works', function(){
    let label:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'projectid';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'removeSet').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true if set removed', async function(){
        let data = await ProjectS.removeSet(label);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if setSetCompleted works', function(){
    let label:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'projectid';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'setSetCompleted').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true on complete', async function(){
        let data = await ProjectS.setSetCompleted(label);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if newTask works', function(){
    let label:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'projectid';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'newTask').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return created task', async function(){
        let data = await ProjectS.newTask(label);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if removeTask works', function(){
    let label:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'taskid';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'removeTask').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true when task removed', async function(){
        let data = await ProjectS.removeTask(label);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if startTask works', function(){
    let label:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'taskid';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'setTaskStart').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true on start', async function(){
        let data = await ProjectS.startTask(label);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if completeTask works', function(){
    let label:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'taskid';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'setTaskCompleted').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return true if done', async function(){
        let data = await ProjectS.completeTask(label);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if changeTaskStatus works', function(){
    let label:any, label2:any, responses:any, ProjectDbStub:any, teamReturn, teamServ:any, DbReturn;

    before(function(){
        label = 'taskid';
        label2 = 'status';

        responses = {
            DbReturn :[{
                teamId:'string'
            }],
            projectsReturn : [
                'string','string'
            ]
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'setTaskStatus').callsFake(async function(){
            return responses.DbReturn;
        });
    });

    it('Should return something', async function(){
        let data = await ProjectS.changeTaskStatus(label, label2);
        chai.assert.exists(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});


describe('Check if getNextTasksetNumber works', function(){
    let label:any, responses:any, ProjectDbStub:any;

    before(function(){
        label = 'projectId';
        responses = {
            DbReturn : 4,
            projectsReturn : 5
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'getNextTasksetNumber').callsFake(async function(){
            return responses.DbReturn;
        });

        
    });

    it('Should return true of existence', async function(){
        let data = await ProjectS.getNextTasksetNumber(label);
        chai.assert.equal(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if getNextTaskNumber works', function(){
    let label:any, responses:any, ProjectDbStub:any;

    before(function(){
        label = {projectId:3, tasksetId:3};
        responses = {
            DbReturn : 4,
            projectsReturn : 5
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'getNextTaskNumber').callsFake(async function(){
            return responses.DbReturn;
        });

        
    });

    it('Should return an array of both stub id values', async function(){
        let data = await ProjectS.getNextTaskNumber(label.projectId, label.tasksetId);
        chai.assert.equal(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if checkProjectLeadership works', function(){
    let label:any, responses:any, ProjectDbStub:any;

    before(function(){
        label = {userId:3, projectId:3};
        responses = {
            DbReturn : {
                projectId: 'someid',
                otherAttributes: 'any'
            },
            projectsReturn : true
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'checkProjectLeadership').callsFake(async function(){
            return responses.DbReturn;
        });

        
    });

    it('Should return an array of both stub id values', async function(){
        let data = await ProjectS.checkProjectLeadership(label.userId, label.projectId);
        chai.assert.equal(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if checkContributor works', function(){
    let label:any, responses:any, ProjectDbStub:any, ProjectDbStub2:any, ProjectDbStub3: any,TeamSStub:any;

    before(function(){
        label = {userId:3, projectId:3};
        responses = {
            DbReturn : {
                projectId: 'someid',
                otherAttributes: 'any'
            },
            DbReturn2:[2,3,1,4],
            DbReturn3:{
                projectId: 'someid',
                otherAttributes: 'any'
            },
            projectsReturn : true
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'checkIndividualContributor').callsFake(async function(){
            return responses.DbReturn;
        });
        ProjectDbStub2 = sinon.stub(ProjectDb, 'checkTeamContributor').callsFake(async function(){
            return responses.DbReturn;
        });
        ProjectDbStub3 = sinon.stub(ProjectDb,  'checkProjectLeadership').callsFake(async function(){
            return responses.DbReturn;
        });
        TeamSStub = sinon.stub(TeamS, 'getTeamIdList').callsFake(async function(){
            return responses.DbReturn;
        });
        
    });

    it('Should return true', async function(){
        let data = await ProjectS.checkContributor(label.userId, label.projectId);
        chai.assert.equal(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
        ProjectDbStub2.restore();
        TeamSStub.restore();
    });
});

describe('Check if checkTeamContributor works', function(){
    let label:any, responses:any, ProjectDbStub:any;

    before(function(){
        label = {userId:3, projectId:3};
        responses = {
            DbReturn : {
                projectId: 'someid',
                otherAttributes: 'any'
            },
            projectsReturn : true
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'checkTeamContributor').callsFake(async function(){
            return responses.DbReturn;
        });

        
    });

    it('Should return true', async function(){
        let data = await ProjectS.checkTeamContributor(label.userId, label.projectId);
        chai.assert.equal(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});

describe('Check if checkTaskAssignee works', function(){
    let label:any, responses:any, ProjectDbStub:any;

    before(function(){
        label = {userId:3, projectId:3};
        responses = {
            DbReturn : {
                taskId: 'someid',
                otherAttributes: 'any'
            },
            projectsReturn : true
        }
        ProjectDbStub = sinon.stub(ProjectDb, 'checkTaskAssignee').callsFake(async function(){
            return responses.DbReturn;
        });

        
    });

    it('Should return true on existence', async function(){
        let data = await ProjectS.checkTaskAssignee(label.userId, label.projectId);
        chai.assert.equal(data,responses.projectsReturn);
    });

    after(function(){
        ProjectDbStub.restore();
    });
});