import * as express from "express";
import {UtilMethods} from '../models/util/util';
import { TaskStatus } from "../models/models/serviceValues";
import { UserConst, TeamConst, ProjectConst } from "../models/constants/constant";
import { ProjectS } from "../models/services/projectServices";

export class ValidateM{
    // public static validateLoginInfo(req:any, res:express.Response, next:express.NextFunction){
    //     let loginInfo = req.validData;
    //     let validLoginInfo = {
    //         userName:loginInfo.userName,
    //         password:loginInfo.password
    //     }
        
    //     req.validLoginInfo = validLoginInfo;
    //     next();
    // }
    
    public static validateUpdateUser(userId:number, rUser:any){
        let skills = [];
        for(let skill of rUser.skills){
            skills.push({
                skill:skill,
                userId:userId
            })
        }

        return {
            image:rUser.image && rUser.image.trim() != '' ? rUser.image:UserConst.DEFAULT_IMAGE,
            firstName:rUser.firstName,
            lastName:rUser.lastName,
            title:rUser.title,
            skills:skills,
            description:rUser.description
        }
    }

    // public static validateNewTaskImage(req:any, res:express.Response, next:express.NextFunction){
    //     let rTaskImage = req.body;
    //     console.log(req);
    //     let taskImage = {
    //         src:'',
    //         description:rTaskImage.description,
    //         taskId:rTaskImage.taskId
    //     }

    //     req.validData = taskImage;

    //     next();
    // }




    // completion

    public static validateNewUser(rUser:any){        
        let user = {
            userName:rUser.userName,
            password:rUser.password,
            firstName:rUser.firstName,
            lastName:rUser.lastName,
            image:UserConst.DEFAULT_IMAGE
        }

        return user;       
    }

    public static validateNewTeam(userId:number, rTeam:any){        
        return {
            name:rTeam.name,
            image:rTeam.image && rTeam.image.trim() != '' ? rTeam.image:TeamConst.DEFAULT_IMAGE,
            focus:rTeam.focus,
            description:rTeam.description,
            leaderId:userId
        }
    }

    public static validateNewProject(userId:number, rProject:any){
        return {
            name:rProject.name,
            image:rProject.image && rProject.image.trim() != '' ? rProject.image:ProjectConst.DEFAULT_IMAGE,
            field:rProject.field,
            description:rProject.description,
            leaderId:userId
        }
    }

    public static validateNewTaskset(rTaskset:any){
        return new Promise((resolve, reject)=>{
            ProjectS.getNextTasksetNumber(rTaskset.projectId)
            
            .then((nextNumber:number)=>{
                if(nextNumber){
                    let taskset = {
                        name:rTaskset.name,
                        number:nextNumber,
                        description:rTaskset.description,
                        assignmentDate:new Date(),
                        deadline:new Date(rTaskset.deadline),
                        teamId:rTaskset.teamId,
                        projectId:rTaskset.projectId
                    }
                    
                    resolve(taskset);
                } else{
                    resolve();
                }
            })
        })
        

        
    }

    public static validateNewTask(rTask:any){
        return new Promise((resolve, reject)=>{
            return ProjectS.getNextTaskNumber(rTask.projectId, rTask.tasksetId)
            
            .then((nextNumber:number)=>{
                console.log("Next number--------------------------");
                console.log(nextNumber);
                if(nextNumber){
                    let task = {
                        title:rTask.title,
                        number:nextNumber,
                        description:rTask.description,
                        assignmentDate:new Date(),
                        deadline:new Date(rTask.deadline),
                        assignerId:rTask.assignerId,
                        assigneeId:rTask.assigneeId,
                        assigneeTeamId:rTask.assigneeTeamId && rTask.assigneeTeamId>0?rTask.assigneeTeamId:null,
                        tasksetId:rTask.tasksetId,
                        projectId:rTask.projectId,
                        status:TaskStatus.Waiting
                    }
                    resolve(task);
                } else{
                    resolve();
                }
            })
        })
        
    }
}