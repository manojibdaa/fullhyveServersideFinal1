import { User, Team, FastSearchResult, Project, MinTeam, MinUser, NotificationType, Identity, SearchFor, RequestStatus } from '../models/serviceValues';
export declare class UtilMethods {
    static getTeamProjectAttr(values: any): FastSearchResult[];
    static getFastUserAttr(users: any): FastSearchResult[];
    static getUserAttr(users: any): User[];
    static getMinUserAttr(users: any): MinUser[];
    static getUserProfileAttr(users: any): Identity[];
    static getMemberCount(members: any): any;
    static getTeamAttr(teams: any, type?: SearchFor): Team[];
    static getMinTeamAttr(teams: any): MinTeam[];
    static getContributorCount(project: any, leaderId: number): number;
    static getProjectAttr(projects: any): Project[];
    static getAnnouncementAttr(announcements: any, userId: any, lastSeenAnnouncementId: any, showReply?: boolean): any;
    static getNewAnnouncementAttr(announcement: any, userId: any): {
        mainMessage: {
            id: any;
            message: any;
            timestamp: any;
            sent: boolean;
            seen: boolean;
        };
    };
    static getTasksetAttr(userId: number, sets: any): any;
    static getTaskAttr(tasks: any): any;
    static getUnseenTasksAttr(projects: any): any;
    static getUnseenMessagesAttr(messages: any): any;
    static getMessagesAttr(messages: any, userId: number): any;
    static getOptions(notificationType: NotificationType, id: any): {
        type: NotificationType;
        name: string;
        id: any;
    }[];
    static getFriendRequestAttr(senders: any, friendsId: any): any;
    static getTeamJoinRequestAttr(senders: any, friendsId: any): any;
    static sliceCustom(values: any, order: string[], offset: number, limit: number): any;
    static getRequestStatus(userId: number, senderId: number, request: string): RequestStatus;
}
export declare class DateMethods {
    static DaysInMonth: any;
    static getTodayDate(): string;
    static getLastMonthDate(): string;
    static getMonthDate(monthBack: number): string;
    static getWeekDate(week: number, startDate?: any): string;
    static getInterval(startDate: any, finalDate: any): number;
}
