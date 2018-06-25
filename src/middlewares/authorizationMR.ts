import * as express from 'express';
import { ChatS } from '../models/services/chatServices';
import { TeamS } from '../models/services/teamServices';
import { ProjectS } from '../models/services/projectServices';
import {Validation} from '../models/util/validate';
import { UserS } from '../models/services/userServices';
import { UserConst } from '../models/constants/constant';

export class Authorization{
    // verify if the user is the recipient of the friend request
    static verifyFriendRequestReceiver(req:any){
        let userId:number = req.thisUser.id;
        let requestId:number = req.validData.requestId;

        return UserS.checkFriendRequestReceiver(userId, requestId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        }) 
    }

    // ============================================================================================

    // chat
    static verifyFriendship(req:any){
        let userId:number = req.thisUser.id;
        let friendId:number = req.validData.friendId;

        return ChatS.checkFriendship(userId,friendId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    static verifyMessageSender(req:any){
        let userId:number = req.thisUser.id;
        let messageId:number = req.validData.messageId;

        return ChatS.checkMessageSender(userId,messageId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    static verifyMessageReceiver(req:any){
        let userId:number = req.thisUser.id;
        let friendId:number = req.validData.friendId;
        let messageId:number = req.validData.messageId;

        ChatS.getContactId(userId, friendId, UserConst.REQUEST.ACCEPTED)
        
        .then((contactId:any):any=>{
            if(contactId){
                return Promise.all([ChatS.checkMessageSender(userId, messageId), ChatS.checkMessageRecSend(contactId, messageId)]);
            }
            return false;
        })

        .then((result:any)=>{
            if(result && (!result[0] || result[1])){
                return true;
            } else{
                return false;
            }
        })
    }

    static verifyMessageRecSend(req:any){
        let userId:number = req.thisUser.id;
        let friendId:number = req.validData.friendId;
        let messageId:number = req.validData.messageId;

        ChatS.getContactId(userId, friendId, UserConst.REQUEST.ACCEPTED)

        .then((contactId:any)=>{
            if(contactId){
                return ChatS.checkMessageRecSend(contactId, messageId);
            }
            return false;
        })

        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    static verifyMessageRecSendNew(req:any){
        let userId:number = req.thisUser.id;
        let messageId:number = req.validData.messageId;

        return ChatS.getContactIdFromMessageId(messageId)

        .then((contactId:any)=>{
            console.log("Contact id===============================");
            console.log(contactId);
            if(contactId){
                return ChatS.checkMessageRecSendNew(contactId, messageId);
            }
            return false;
        })

        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    

    // teams
    static verifyTeamLeadership(req:any){
        let userId:number = req.thisUser.id;
        let teamId:number = req.validData.teamId;

        return TeamS.checkTeamLeadership(userId,teamId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    static verifyTeamMembership(req:any){
        let userId:number = req.thisUser.id;
        let teamId:number = req.validData.teamId;

        return TeamS.checkTeamMembership(userId,teamId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    static verifyAnnouncementOrReplyOwnership(req:any){
        let userId:number = req.thisUser.id;
        let announcementId:number = 0;

        if(req.validData.hasOwnProperty('announcementId')){
            announcementId = req.validData.announcementId;
        } else if(req.validData.hasOwnProperty('replyId')){
            announcementId = req.validData.replyId;
        }

        return TeamS.checkAnnouncementOrReplyOwnership(userId,announcementId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    // verify if the user is the recipient of the team join request
    static verifyTeamJoinRequestReceiver(req:any){
        let userId:number = req.thisUser.id;
        let requestId:number = req.validData.requestId;

        return TeamS.checkTeamJoinRequestReceiver(userId, requestId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    // project
    static verifyProjectLeadership(req:any){
        let userId:number = req.thisUser.id;
        let projectId:number = req.validData.projectId;

        return ProjectS.checkProjectLeadership(userId, projectId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    static verifyProjectContributor(req:any){
        let userId:number = req.thisUser.id;
        let projectId:number = req.validData.projectId;

        return ProjectS.checkContributor(userId, projectId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    // verify if the user is the recipient of the individual project join request
    static verifyIndividualContributorRequestReceiver(req:any){
        let userId:number = req.thisUser.id;
        let requestId:number = req.validData.requestId;

        return ProjectS.checkIndividualContributorRequestReceiever(userId, requestId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    // verify if the user is the leader of the recipient team of the team project join request
    static verifyTeamContributorRequestReceiver(req:any){
        let userId:number = req.thisUser.id;
        let requestId:number = req.validData.requestId;

        return ProjectS.checkTeamContributorRequestReceiever(userId, requestId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    // verify if a task is assigned to a user
    static verifyTaskAssignee(req:any){
        let userId:number = req.thisUser.id;
        let taskId:number = req.validData.taskId;

        return ProjectS.checkTaskAssignee(userId, taskId)
        
        .then((status:boolean)=>{
            if(status){
                return true;
            } else{
                return false;
            }
        })
    }

    // verify if a task is assigned to a user
    static verifyTaskAssignable(req:any){
        let userId:number = req.thisUser.id;
        let assigneeId:number = req.validData.assigneeId;
        let teamId:number = req.validData.teamId;
        let projectId:number = req.validData.projectId;

        return Promise.all([ProjectS.checkProjectLeadership(userId,projectId), ProjectS.checkTeamContributor(teamId, projectId), TeamS.checkTeamMembership(assigneeId, teamId)])
        
        .then((result:any)=>{
            if(result[0] && result[1] && result[2]){
                return true;
            } else{
                return false;
            }
        })
    }
}