export declare enum RequestStatus {
    ACCEPTED = 0,
    REQUESTED = 1,
    UNDECIDED = 2,
    REJECTED = 3,
}
export declare class FastSearchResult {
    id: string;
    name: string;
    image: string;
}
export declare enum SearchFor {
    General = 0,
    Specific = 1,
}
export declare enum ReturnAttrType {
    Private = 0,
    Public = 1,
}
export declare enum SearchType {
    Fast = 0,
    Normal = 1,
    Detail = 2,
}
export declare class LoginResponse {
    status: boolean;
    token: string;
    errorMessage: string;
}
export declare class Team {
    id: string;
    name: string;
    focus: string;
    image: string;
    description: string;
    leader: User;
    memberCount: number;
}
export declare class MinTeam {
    id: string;
    name: string;
    image: string;
}
export declare class TeamForProject extends Team {
    contract: Contract;
}
export declare class Message {
    id: string;
    message: string;
    timestamp: string;
    seen: boolean;
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
export declare class Graph {
    control: string;
    value: number;
}
export declare class SearchTeams {
    teams: Team[];
    myteams: MyTeam[];
}
export declare class SearchProjects {
    projects: Project[];
    myprojects: MyProject[];
}
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
    title: string;
    skills: string[];
    description: string;
    request: RequestStatus.ACCEPTED;
}
export declare class MinUser {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
}
export declare class Identity extends User {
    userName: string;
    email: string;
}
export declare class Contact extends User {
    online: boolean;
    lastOnline: string;
    unseenMessages: number;
    lastMessage: ChatMessage;
}
export declare class ChatMessage extends Message {
    type: string;
}
export declare enum MessageStastus {
    UnSent = 0,
    Seen = 1,
    Sent = 2,
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
export declare class Image {
    src: string;
    description: string;
}
export declare class ImageSet {
    images: Image[];
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
export declare enum TaskStatus {
    Waiting = 0,
    InProgress = 1,
    PendingEvaluation = 2,
    Approved = 3,
    Revise = 4,
}
export declare class Task {
    id: string;
    number: number;
    title: string;
    description: string;
    priority: string;
    pitches: Pitch[];
    status: number;
    assignmentDate: string;
    startDate: string;
    deadline: string;
    completionDate: string;
    assigner: User;
    assignee: User;
    assigneeTeam: Team;
    images: ImageSet;
    difficulty: number;
}
export declare class Notification {
    id: string;
    image: string;
    comment: string;
    options: Option[];
}
export declare class Option {
    navigate: boolean;
    name: string;
    type: NotificationType;
}
export declare class TaskOption extends Option {
    taskId: string;
}
export declare enum NotificationType {
    FriendRequest = 0,
    TeamRequest = 1,
    ProjectTeamRequest = 2,
    ProjectIndividualRequest = 3,
    Assignment = 4,
}
export declare class TaskSet {
    id: string;
    name: string;
    number: number;
    assignmentDate: string;
    deadline: string;
    completionDate: string;
    description: string;
    tasks: Task[];
    setCompletion: number;
    stage: Stage;
}
export declare class Project {
    id: string;
    name: string;
    image: string;
    description: string;
    field: string;
    leader: User;
    contributorCount: number;
}
export declare class MyProject extends Project {
    allStages: Stage[];
    currentStage: Stage;
    stageCompletion: number;
    pulse: number;
    userActivity: number;
    userAverageCompletionTimes: number;
    userDeadlineCompliance: number;
    projectScheduleAdherence: number;
    startDate: string;
    finalDate: string;
    completionDate: string;
    stageBurnDown: Graph[];
    setBurnDown: Graph[];
    taskBurnDown: Graph[];
}
export declare class Contributors {
    teams: Team[];
    individuals: User[];
    count: number;
}
export declare class Stage {
    id: string;
    stage: string;
    startDate: string;
    deadline: string;
    completionDate: string;
    stageNo: number;
    stageValue: number;
}
export declare class Contract {
    id: string;
    contractStartDate: string;
    contractExpirationDate: string;
}
