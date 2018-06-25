import { TaskStatus } from '../models/serviceValues';
/**
 * get projects my teams are member of
 * get projects I own
 * get projects I individually work on
 */
export declare class ProjectDb {
    static getProject(projectId: any): any;
    static getFastSearchRes(nameCriteria: string, limit?: number): any;
    static getMyProjectIds(userId: any): any;
    static getUserOwnedProjects(userId: any, nameCriteria?: string): any;
    static getIndividualProjects(userId: any, nameCriteria?: string): any;
    static getTeamsProjects(userId: any, nameCriteria?: string): any;
    static getTeamProjects(teamId: any, nameCriteria?: string): any;
    static getProjectContributors(projectId: any, nameCriteria?: string): any;
    static getMyProjects(myProjectIds: any, nameCriteria?: string): any;
    static getPublicProjects(myProjectIds: any, nameCriteria?: string): any;
    static getProjectSets(projectId: any): any;
    static getSetTasks(setId: any): any;
    static newProject(projectData: any): Promise<{}>;
    static removeProject(projectId: any): any;
    static setProjectLogo(imageUrl: any): any;
    static addIndividualContributors(individualContributorData: any): any;
    static replyIndividualContributorJoinRequest(requestId: any, decision: string): any;
    static removeIndividualContributors(projectId: number, userIds: number[]): any;
    static addTeamContributors(teamContributorData: any): any;
    static replyTeamContributorJoinRequest(requestId: any, decision: string): any;
    static removeTeamContributors(projectId: number, teamIds: number): any;
    static setProjectCompleted(projectId: any): any;
    static updateProjectLogo(projectId: any, imageUrl: string): any;
    static newSet(setData: any): any;
    static removeSet(setId: any): any;
    static setSetCompleted(setId: any): any;
    static newTask(taskData: any): any;
    static removeTask(taskId: any): any;
    static setTaskCompleted(taskId: any): any;
    static setTaskStart(taskId: any): any;
    static setTaskStatus(taskId: any, status: TaskStatus): any;
    static getIncompleteTasks(userId: any): any;
    static getUnseenTasks(userId: any): Promise<{}>;
    static getUnseenTeamProjectJoinRequests(teamsId: any): any;
    static getProjects(projectsId: any): any;
    static getUnseenIndividualProjectJoinRequests(userId: any): any;
    static editProjectDetails(projectId: number, projectData: any): any;
    static deleteProject(projectId: number): any;
    static getNextTasksetNumber(projectId: number): any;
    static getNextTaskNumber(projectId: number, tasksetId: number): any;
    static checkProjectLeadership(userId: number, projectId: number): any;
    static checkIndividualContributor(userId: number, projectId: any): any;
    static checkTeamContributor(teamsId: number[], projectId: number): any;
    static checkIndividualContributorRequestReceiver(userId: number, requestId: number): any;
    static checkTeamContributorRequestReceiver(requestId: number): any;
    static checkTaskAssignee(userId: number, taskId: number): any;
}
