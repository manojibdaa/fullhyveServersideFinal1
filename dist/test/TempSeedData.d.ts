export declare const testUser: {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    title: string;
    skills: {
        skill: string;
    }[];
    description: string;
}[];
export declare const testTeam: {
    name: string;
    focus: string;
    leaderId: number;
}[];
export declare const testMessages: {
    senderId: number;
    contactId: number;
    message: string;
    seen: boolean;
}[];
export declare const testTeamMembers: number[][];
export declare const testContacts: number[][];
export declare const testAnnouncement: {
    message: string;
    userId: number;
    teamId: number;
}[];
export declare const testProject: {
    name: string;
    description: string;
    field: string;
    startDate: Date;
    finalDate: Date;
    leaderId: number;
}[];
export declare const testProjectTeams: ({
    projectId: number;
    teamId: number;
    request: string;
} | {
    projectId: number;
    teamId: number;
})[];
export declare const testProjectUser: {
    projectId: number;
    userId: number;
    request: string;
}[];
export declare const testSet: {
    name: string;
    number: number;
    projectId: number;
    description: string;
    assignmentDate: Date;
    startDate: Date;
    deadline: Date;
    completionDate: Date;
}[];
export declare const testTask: ({
    number: number;
    title: string;
    description: string;
    priority: string;
    assignmentDate: Date;
    startDate: Date;
    deadline: Date;
    completionDate: Date;
    assignerId: number;
    assigneeId: number;
    assigneeTeamId: number;
    tasksetId: number;
    projectId: number;
} | {
    number: number;
    title: string;
    description: string;
    priority: string;
    assignmentDate: Date;
    startDate: Date;
    deadline: Date;
    completionDate: Date;
    assignerId: number;
    assigneeId: number;
    assigneeTeamId: null;
    tasksetId: number;
    projectId: number;
})[];
