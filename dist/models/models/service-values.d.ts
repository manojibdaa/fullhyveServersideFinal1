export declare class LoginResponse {
    status: boolean;
    token: string;
    errorMessage: string;
}
export declare class Team {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    visibility: boolean;
    leader: User;
    focus: string;
    memberCount: number;
}
export declare class Message {
    id: string;
    message: string;
    timestamp: string;
    seen: boolean;
    sent: boolean;
}
export declare class TeamChatMessage extends Message {
    sender: User;
}
export declare class Announcement {
    mainMessage: TeamChatMessage;
    replies: TeamChatMessage[];
}
export declare class MyTeam extends Team {
    teamPerformance: number;
    teamPerformanceChange: number;
    teamWeeklyProgress: number;
    teamWeeklyProgressChange: number;
    teamScheduleAdherence: number;
    teamScheduleAdherenceChange: number;
    teamStatus: string;
    unseenAnnouncements: number;
}
export declare class SearchTeams {
    teams: Team[];
    myteams: MyTeam[];
}
export declare class SearchProjects {
    projects: Project[];
    myprojects: MyProject[];
}
export declare class Graph {
    controls: string[];
    values: number[];
}
export declare class User {
    id: string;
    name: string;
    imageUrl: string;
    title: string;
    skills: string[];
    description: string;
}
export declare class Contact extends User {
    online: boolean;
    lastOnline: string;
    unseenMessages: number;
    lastMessage: string;
    sentLastMessage: boolean;
}
export declare class Pitch {
    user: User;
    pitch: string;
}
export declare class TransferRequest {
    id: string;
    requester: User;
    task: Task;
    message: string;
}
export declare enum MessageStastus {
    UnSent = 0,
    Seen = 1,
    Sent = 2,
}
export declare class Task {
    id: string;
    number: number;
    title: string;
    description: string;
    priority: string;
    tag: string[];
    pitches: Pitch[];
    status: number;
    deadline: number;
    assigner: User;
    assignee: User;
    assigneeTeam: Team;
    supervisor: User;
    transferRequests: TransferRequest[];
}
export declare class VisibilityGroup {
    users: User[];
    teams: Team[];
    userGroup: ProjectUserGroup;
}
export declare enum ProjectUserGroup {
    founder = 0,
    admin = 1,
    supervisor = 2,
    contributor = 3,
}
export declare enum TeamUserGroup {
    founder = 0,
    admin = 1,
    member = 2,
}
export declare class UserProjectLink {
    userGroup: ProjectUserGroup;
    user: User;
    project: Project;
}
export declare class TaskSet {
    id: string;
    name: string;
    number: number;
    deadline: number;
    description: string;
    setCompletion: number;
}
export declare class Project {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    field: string;
    leader: User;
    contributors: number;
}
export declare class MyProject extends Project {
    allStages: string[];
    currentStage: number;
    stageCompletion: number;
    pulse: number;
    userActivity: number;
    userAverageCompletionTimes: number;
    userDeadlineCompliance: number;
    projectScheduleAdherence: number;
    startDate: number;
    finalDate: number;
    stageCompletionDates: number[];
    setCompletionDates: number[];
    stageBurnDown: number[];
    setBurnDown: number[];
    taskBurnDown: number[];
}
export declare class Stage {
    stage: string;
    startDate: string;
    deadline: string;
    completionDate: string;
    stageNo: number;
    stageValue: number;
}
