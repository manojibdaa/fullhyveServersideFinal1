export declare class Authorization {
    static verifyFriendRequestReceiver(req: any): Promise<boolean>;
    static verifyFriendship(req: any): Promise<boolean>;
    static verifyMessageSender(req: any): Promise<boolean>;
    static verifyMessageReceiver(req: any): void;
    static verifyMessageRecSend(req: any): void;
    static verifyMessageRecSendNew(req: any): Promise<boolean>;
    static verifyTeamLeadership(req: any): Promise<boolean>;
    static verifyTeamMembership(req: any): Promise<boolean>;
    static verifyAnnouncementOrReplyOwnership(req: any): Promise<boolean>;
    static verifyTeamJoinRequestReceiver(req: any): Promise<boolean>;
    static verifyProjectLeadership(req: any): Promise<boolean>;
    static verifyProjectContributor(req: any): Promise<boolean>;
    static verifyIndividualContributorRequestReceiver(req: any): Promise<boolean>;
    static verifyTeamContributorRequestReceiver(req: any): Promise<boolean>;
    static verifyTaskAssignee(req: any): Promise<boolean>;
    static verifyTaskAssignable(req: any): Promise<boolean>;
}
