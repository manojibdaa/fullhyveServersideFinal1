/// <reference types="express" />
import * as express from 'express';
export declare class Authorization {
    static verifyFriendRequestReceiver(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyFriendship(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyMessageSender(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyMessageReceiver(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyMessageRecSend(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyTeamLeadership(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyTeamMembership(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyAnnouncementOrReplyOwnership(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyTeamJoinRequestReceiver(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyProjectLeadership(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyProjectContributor(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyIndividualContributorRequestReceiver(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyTeamContributorRequestReceiver(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyTaskAssignee(req: any, res: express.Response, next: express.NextFunction): void;
    static verifyTaskAssignable(req: any, res: express.Response, next: express.NextFunction): void;
}
