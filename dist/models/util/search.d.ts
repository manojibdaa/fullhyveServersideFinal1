import { FastSearchResult, Project, Team, SearchFor } from '../models/serviceValues';
export declare class SearchS {
    static searchUsersFast(userId: any, name: string, limit?: number): Promise<FastSearchResult[]>;
    static searchProjectsFast(name: string, limit?: number): Promise<FastSearchResult[]>;
    static search(userId: any, name: string): Promise<{}>;
    static searchUsers(userId: any, name: string, offset?: number, limit?: number): Promise<{}>;
    static getMyTeams(userId: any, name?: string, searchFor?: SearchFor, offset?: number, limit?: number): Promise<Team[]>;
    static searchTeams(userId: any, name: string, searchFor?: SearchFor, offset?: number, limit?: number): Promise<Team[]>;
    static getProjectR(project: any, request: string, through: string): any;
    static searchProjects(userId: any, name: string, searchFor?: SearchFor, offset?: number, limit?: number): Promise<Project[]>;
}
