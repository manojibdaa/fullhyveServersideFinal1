import {IUser} from "../models/interfaces";
import {Team, TeamChatMessage, ReturnAttrType, SearchFor} from "../models/serviceValues";
import {DB} from "../db/db";
import {TeamConst, UserConst, AnnouncementConst} from '../constants/constant';
import {UtilMethods} from'../util/util'; 
import {TeamDb} from '../db/teamDb';
import {ProjectDb} from '../db/projectDb';
import { SearchS } from "../util/search";
import { ChatS } from "./chatServices";

export class TeamS{
    static getTeam(teamId:any){
        return new Promise((resolve, reject)=>{
            TeamDb.getTeam(teamId)

            .then((team:any)=>{
                console.log(team);
                let teamReturn:any = null;
                if(team){
                    teamReturn = UtilMethods.getTeamAttr([team])[0];
                }
                resolve(teamReturn);
            })
        })
        
    }

    // get ids of teams the user is either leader of or member of
    static getTeamIdList(userId:any):Promise<number[]>{
        return new Promise((resolve, reject)=>{
            let teamIdsReturn:number[] = [];
            TeamDb.getLeaderTeam(userId)

            .then((teamIds:any)=>{
                if(teamIds.length>0){
                    for(let i of teamIds){
                        teamIdsReturn.push(i.id);
                    }
                }
                return TeamDb.getUserTeam(userId);
            })
            
            .then((teamIds:any)=>{
                if(teamIds.length>0){
                    for(let i of teamIds){
                        teamIdsReturn.push(i.teamId);
                    }
                }
                
                resolve(teamIdsReturn);
            })
        })
    }

    static getMemberIdList(teamId:any){
        return new Promise((resolve, reject)=>{
            TeamDb.getTeam(teamId)

            .then((memberIds:any)=>{
                let memberIdsReturn:any = [];

                for(let i of memberIds.members){
                    if(i.TeamUsers.request == UserConst.REQUEST.ACCEPTED){
                        memberIdsReturn.push(i.id);
                    }
                    console.log();
                    
                }
                memberIdsReturn.push(memberIds.user.id);

                resolve(memberIdsReturn);
            })
        })
    }

    static getMyTeams(userId:number, offset:number=0, limit:number=TeamConst.TEAMS_SEARCH_LIMIT, name:string=''):Promise<any>{
        let teams:any = [];
        let nameCriteria = name==null?'':name;

        return new Promise((resolve, reject)=>{
            TeamS.getTeamIdList(userId)

            .then((teamsId:number[])=>{
                return TeamDb.getTeamsDetail(teamsId, nameCriteria)
            })

            .then((teams:any)=>{
                let values = {
                    myTeams:teams,
                    count:0
                }    
                values = UtilMethods.sliceCustom(values, ["myTeams"],offset, limit);
                values.myTeams = UtilMethods.getTeamAttr(values.myTeams, SearchFor.Specific);
                console.log(values);
                resolve(values);
            })
        })
    }

    static searchTeams(userId:number, offset:number=0, limit:number=TeamConst.TEAMS_SEARCH_LIMIT, name:string=''):Promise<any>{
        let teamsReturn:any = {teams:[],myTeams:[],count:0};
        let teams:any = [];
        let nameCriteria = name==null?'':name;

        return new Promise((resolve, reject)=>{
            TeamS.getTeamIdList(userId)

            .then((teamIds:number[])=>{
                return Promise.all([TeamDb.getTeamsDetail(teamIds, nameCriteria), TeamDb.getPublicTeams(teamIds, nameCriteria)]);
            })

            .then((result)=>{
                let values = {
                    myTeams:result[0],
                    teams:result[1],
                    count:0
                }    
                values = UtilMethods.sliceCustom(values, ["myTeams","teams"],offset, limit);
                values.myTeams = UtilMethods.getTeamAttr(values.myTeams);
                values.teams = UtilMethods.getTeamAttr(values.teams);
                resolve(values);
            })
        })
    }    

    static getTeamMembers(userId:number, teamId:any, offset:number=0,limit:number=TeamConst.MEMBERS_SEARCH_LIMIT):Promise<any>{
        let memberReturn:any = {members:[], count:0};
        return new Promise((resolve, reject)=>{
            TeamS.getMemberIdList(teamId)

            .then((memberIds:any)=>{
                return TeamDb.getTeamMembers(memberIds); 
            })

            .then((members:any)=>{
                if(members && members.length>0){
                    memberReturn = UtilMethods.sliceCustom({members:members, count:0}, ["members"], offset, limit);
                    memberReturn.members = UtilMethods.getUserAttr(memberReturn.members);
                }
                resolve(memberReturn);
                console.log(memberReturn);
            })
            
            .catch((err:any)=>{
                reject(err);
            })
        });
    }

    static getTeamAnnouncement(teamId:any, userId:any, offset:number=0, limit:number=AnnouncementConst.ANNOUNCEMENT_SHOWN_ONCE, lastAnnId:any=AnnouncementConst.START_ID,){
        let lastSeenAnnIdR:any;
        let announcementsR:any=[];
        let announcementReturn:any = {};

        return new Promise((resolve, reject)=>{
            TeamDb.getTeamAnnouncement([teamId],lastAnnId)
            
            .then((announcements:any)=>{
                announcementsR = announcements;
                return TeamDb.getLastAnnId(teamId, userId);
            })
            
            .then((lastAnn:any)=>{
                let lastSeenAnnouncementId:any = TeamConst.START_ID;
                if(lastAnn && announcementsR.length>0){
                    lastSeenAnnouncementId = lastAnn.lastSeenAnnouncementId;   
                }

                announcementReturn = UtilMethods.sliceCustom({announcements:announcementsR, count:0},["announcements"], offset, limit);
                announcementReturn.announcements = UtilMethods.getAnnouncementAttr(announcementReturn.announcements, userId, lastSeenAnnouncementId);
                
                resolve(announcementReturn);
            })
            
        });
    }

    static getUnseenTeamAnnouncement(teamId:any, userId:any, limit:number=AnnouncementConst.ANNOUNCEMENT_SHOWN_ONCE){
        return new Promise((resolve, reject)=>{
            let lastSeenAnnId:any = TeamConst.START_ID; 
            TeamDb.getLastAnnId(teamId, userId)

            .then((lastAnn:any)=>{
                if(lastAnn){
                    lastSeenAnnId = lastAnn.lastSeenAnnouncementId;
                    return TeamDb.getTeamAnnouncement([teamId],lastSeenAnnId);
                }
            })
            
            .then((announcements:any)=>{
                let announcementReturn:any = [];
                if(announcements){
                    announcementReturn = UtilMethods.getAnnouncementAttr(announcements, userId, lastSeenAnnId);
                }                
                resolve(announcementReturn);

            }).catch((err:any)=>{
                reject(err);
            })
        });
    }

    static getTeamProjects(teamId:any, offset:number, limit:number){
        return new Promise((resolve, reject)=>{
            ProjectDb.getTeamProjects(teamId)

            .then((team:any)=>{
                let projectsReturn:any = {projects:[],count:0};
                if(team){
                    projectsReturn = UtilMethods.sliceCustom({projects:team.projects,count:0},["projects"], offset, limit);
                    projectsReturn.projects = UtilMethods.getProjectAttr(projectsReturn.projects);

                }
                resolve(projectsReturn);
            })
        })
    }

    // managing methods
    static announceAndReply(teamId:any, userId:any, message:string, mainAnnouncementId?:any){
        return new Promise((resolve, reject)=>{
            TeamDb.announce(teamId, userId,message,mainAnnouncementId)
            
            .then((announcement:any)=>{
                let newAnnouncement:any = UtilMethods.getNewAnnouncementAttr(announcement,userId);
                
                resolve(newAnnouncement);
            });
        })
    }

    static reply(userId:any, teamId:number,message:string, mainAnnouncementId:any){
        return new Promise((resolve, reject)=>{
            TeamDb.reply(userId,teamId, message,mainAnnouncementId)
            
            .then((announcement:any)=>{
                let newAnnouncement:any = UtilMethods.getNewAnnouncementAttr(announcement,userId);
                resolve(newAnnouncement);
            });
        })
    }

    static updateAnnouncementSeen(teamId:any,userId:any, lastSeenAnnId:any){
        return TeamDb.updateAnnouncementSeen(teamId, userId,lastSeenAnnId);
    }

    static newTeam(teamData:any){
        return TeamDb.newTeam(teamData)

        .then((team:any)=>{
            if(team){
                return {
                    id:team.id,
                    name:team.name,
                    image:team.image,
                    focus:team.focus,
                    description:team.description,
                    memberCount:0
                }
            }
            // let teamMembers:any = [];
            // let members:any = teamData.members;
            // for(let member of members){
            //     teamMembers.push({
            //         userId:member,
            //         teamId:team.id
            //     })
            // }
            // return TeamDb.addTeamMembers(teamMembers);
            return null;
        })
    }

    static editTeamProfile(teamId:number, teamData:any){
        return TeamDb.editTeamProfile(teamId, teamData);
    }

    static deleteTeam(teamId:number){
        return TeamDb.deleteTeam(teamId);
    }

    static addTeamMember(teamId:number, memberIds:number[]){
        let userTeam:any = [];
        for(let userId of memberIds){
            userTeam.push({userId:userId,teamId:teamId});
        }
        return TeamDb.addTeamMembers(userTeam);
    }

    static removeTeamMember(teamId:number, userId:number[]){
        console.log("Remove team members======================================================");
        return TeamDb.removeTeamMember(teamId,userId);
    }

    static replyTeamJoinRequest(requestId:any, decision:any){
        return TeamDb.replyTeamJoinRequest(requestId, decision);
    }


    static editAnnouncementReply(announcementId:number, newAnnouncement:string){
        return TeamDb.editAnnouncementReply(announcementId, newAnnouncement);
    }

    static removeAnnouncement(announcementId:number){
        return TeamDb.removeAnnouncementReply(announcementId);
    }

    static removeReply(replyId:number){
        return TeamDb.removeAnnouncementReply(replyId, null);
    }

    // notification
    static getLastAnnIds(userId:any){
        return new Promise((resolve, reject)=>{
            let lastSeenAnnIdsReturn:any = null;
            TeamDb.getLastAnnIds(userId)

            .then((annIds:any)=>{
                if(annIds.length>0){
                    for(let annId of annIds){
                        lastSeenAnnIdsReturn[annId.teamId] = annId.lastSeenAnnouncementId;
                    }
                }
                resolve(lastSeenAnnIdsReturn);
            })
        })
    }

    static getUnseenAnnouncements(userId:any, limit:number=AnnouncementConst.ANNOUNCEMENT_SHOWN_ONCE){
        return new Promise((resolve, reject)=>{
            let lastSeenAnnIds:any = null;
            let announcementsReturn:any = [];

            TeamS.getLastAnnIds(userId)

            .then((lastAnnIds:any)=>{
                lastSeenAnnIds = lastAnnIds;
                return TeamS.getTeamIdList(userId);
            })

            .then((teamsId:any)=>{
                if(teamsId.length>0){
                    return TeamDb.getUnseenNotificationAnnouncements(teamsId);
                }
                return [];
            })

            .then((announcements:any)=>{
                if(announcements.length>0){
                    for(let announcement of announcements){
                        let lastSeenAnnId:any = AnnouncementConst.START_ID;
                        if(lastSeenAnnIds && lastSeenAnnIds.hasOwnProperty(announcement.teamId)){
                            lastSeenAnnId = lastSeenAnnIds[announcement.teamId];
                        }

                        if(announcement.id>lastSeenAnnId){
                            let ann:any = UtilMethods.getAnnouncementAttr([announcement],userId,lastSeenAnnId, false)[0];
                            delete ann.replies;
                            
                            let announcementR:any = {
                                team:{
                                    id:announcement.team.id,
                                    name:announcement.team.name,
                                    image:announcement.team.imageUrl
                                },
                                announcement:ann
                            }
                            announcementsReturn.push(announcementR);
                        }
                        
                    }
                }
                resolve(announcementsReturn);
            })
        });
    }

    static getUnseenTeamJoinRequests(userId:any){
        return new Promise((resolve, reject)=>{
            let teamJoinRequestsReturn:any = [];
            let teamsId:any = {};
            TeamDb.getUnseenTeamJoinRequests(userId)

            .then((requests:any)=>{
                if(requests.length>0){
                    for(let request of requests){
                        teamsId[request.teamId] = request.id;
                    }
                    return TeamDb.getTeams(Object.keys(teamsId));
                }
                return [];
            })

            .then((senders:any)=>{
                if(senders.length>0){
                    teamJoinRequestsReturn = UtilMethods.getTeamJoinRequestAttr(senders, teamsId);
                }
                resolve(teamJoinRequestsReturn);
            })
        })
    }





    // Authorization
    static checkTeamMembership(userId:any, teamId:any):Promise<boolean>{
        return new Promise((resolve, reject)=>{
            Promise.all([TeamDb.checkTeamLeadership(userId, teamId), TeamDb.checkTeamMembership(userId, teamId)])

            .then((result:any)=>{
                if(result[0] || result[1]){
                    resolve(true);
                } else{
                    resolve(false);
                }
            })
            
        })
    }

    static checkTeamLeadership(userId:any, teamId:any):Promise<boolean>{
        return new Promise((resolve, reject)=>{
            TeamDb.checkTeamLeadership(userId, teamId)

            .then((team:any)=>{
                if(team){
                    resolve(true);
                } else{
                    resolve(false);
                }
            })
        })
    }

    static checkAnnouncementOrReplyOwnership(userId:number, annId:number):Promise<boolean>{
        return new Promise((resolve, reject)=>{
            TeamDb.checkAnnouncementOrReplyOwnership(userId, annId)

            .then((announcement:any)=>{
                if(announcement){
                    resolve(true);
                } else{
                    resolve(false);
                }
            })
        })
    }

    static checkTeamJoinRequestReceiver(userId:number, requestId:number):Promise<boolean>{
        return new Promise((resolve, reject)=>{
            TeamDb.checkTeamJoinRequestReceiver(userId, requestId)

            .then((request:any)=>{
                if(request){
                    resolve(true);
                } else{
                    resolve(false);
                }
            })
        })
    }    
}