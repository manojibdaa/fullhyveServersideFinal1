export declare const commonCriterias: {
    id: {
        int: boolean;
        positive: boolean;
    };
    message: {
        string: boolean;
        required: boolean;
        maxLen: number;
    };
    name: {
        required: boolean;
        string: boolean;
        maxLen: number;
    };
};
export declare const validationCriterias: {
    offset: {
        int: boolean;
        minVal: number;
    };
    limit: {
        int: boolean;
        positive: boolean;
    };
    userName: {
        required: boolean;
        string: boolean;
        minLen: number;
        maxLen: number;
    };
    password: {
        required: boolean;
        string: boolean;
        minLen: number;
    };
    firstName: {
        required: boolean;
        string: boolean;
        maxLen: number;
    };
    lastName: {
        string: boolean;
        maxLen: number;
    };
    email: {
        string: boolean;
        maxLen: number;
        email: boolean;
    };
    image: {
        string: boolean;
        maxLen: number;
    };
    title: {
        string: boolean;
        maxLen: number;
    };
    skills: {
        string: boolean;
        maxLen: number;
    };
    description: {
        string: boolean;
    };
    lastNotificationTimestamp: {
        string: boolean;
    };
    accepted: {
        boolean: boolean;
    };
    friendId: {
        int: boolean;
        positive: boolean;
    };
    friendIds: {
        required: boolean;
    };
    requestId: {
        int: boolean;
        positive: boolean;
    };
    contactId: {
        int: boolean;
        positive: boolean;
    };
    contactIds: {
        int: boolean;
        positive: boolean;
    };
    messageId: {
        int: boolean;
        positive: boolean;
    };
    lastMessageId: {
        int: boolean;
        positive: boolean;
    };
    teamId: {
        int: boolean;
        positive: boolean;
    };
    announcementId: {
        int: boolean;
        positive: boolean;
    };
    replyId: {
        int: boolean;
        positive: boolean;
    };
    lastAnnId: {
        int: boolean;
        positive: boolean;
    };
    memberId: {
        int: boolean;
        positive: boolean;
    };
    memberIds: {
        array: boolean;
    };
    projectId: {
        int: boolean;
        positive: boolean;
    };
    tasksetId: {
        int: boolean;
        positive: boolean;
    };
    taskId: {
        int: boolean;
        positive: boolean;
    };
    teamIds: {
        array: boolean;
    };
    individualIds: {
        array: boolean;
    };
    assignerId: {
        int: boolean;
        positive: boolean;
    };
    assigneeId: {
        int: boolean;
        positive: boolean;
    };
    assigneeTeamId: {
        required: boolean;
        int: boolean;
    };
    message: {
        string: boolean;
        required: boolean;
        maxLen: number;
    };
    newMessage: {
        string: boolean;
        required: boolean;
        maxLen: number;
    };
    announcement: {
        string: boolean;
        required: boolean;
        maxLen: number;
    };
    reply: {
        string: boolean;
        required: boolean;
        maxLen: number;
    };
    newAnnouncement: {
        string: boolean;
        required: boolean;
        maxLen: number;
    };
    userSearchName: {
        required: boolean;
        string: boolean;
        maxLen: number;
    };
    teamName: {
        required: boolean;
        string: boolean;
        maxLen: number;
    };
    projectName: {
        required: boolean;
        string: boolean;
        maxLen: number;
    };
    name: {
        required: boolean;
        string: boolean;
        maxLen: number;
    };
    focus: {
        required: boolean;
        string: boolean;
    };
    odescription: {
        required: boolean;
        string: boolean;
    };
    field: {
        required: boolean;
        string: boolean;
        maxLen: number;
    };
    number: {
        int: boolean;
        positive: boolean;
    };
    ttitle: {
        string: boolean;
        maxLen: number;
    };
    deadline: {
        required: boolean;
        int: boolean;
    };
    taskStatus: {
        listval: string[];
    };
};
export declare const actionRequiredFields: any;
