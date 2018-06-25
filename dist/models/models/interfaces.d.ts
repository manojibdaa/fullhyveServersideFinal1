export interface IUser {
    id: number;
    userName: string;
    imageUrl: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    theme: string;
}
export interface IContact {
    id: number;
    userId: number;
    friendId: number;
}
export declare enum MessageType {
    Received = 0,
    Sent = 1,
}
export interface IMessageFriend {
    id: number;
    content: string;
    seen: boolean;
    type: string;
}
export interface IMessage extends IMessageFriend {
    senderId: number;
    contactId: number;
    sendTime: Date;
}
export interface IFriendChat {
    id: number;
    imageUrl: string;
    name: string;
    unseenMessages: number;
    lastOnline: string;
    lastMessage: IMessageFriend;
    online: boolean;
}
export interface ITeam {
    id: string;
    name: string;
    imageUrl: string;
    leader: string;
    members: string[];
    focus: string;
    projects: string[];
}
export declare class Contact {
    id: string;
    name: string;
    imageUrl: string;
    lastOnline: string;
    unseenMessages: number;
    lastMessage: string;
}
export declare class Team {
    id: string;
    name: string;
    imageUrl: string;
    leader: string;
    members: string[];
    focus: string;
    projects: string[];
}
export declare class MyTeam extends Team {
    chatbox: string;
    teamActivity: number;
    teamPerformance: number;
    teamWeeklyProgress: number;
    teamEfficiency: number;
    teamScheduleAdherence: number;
    teamStatus: string;
    unseenAnnouncements: number;
}
export declare class User {
    id: string;
    name: string;
    imageUrl: string;
    title: string;
    skills: string[];
    description: string;
    projects: number[];
}
export declare class Project {
    id: string;
    name: string;
    imageUrl: string;
    leader: string;
    members: string[];
    teams: string[];
}
export declare class MyProject {
    completion: 42;
    allStages: string[];
    currentStage: number;
    stageCompletion: number;
    sets: string[];
    currentSet: number;
    setCompletion: number;
    tasks: string[];
    activeTask: string;
    pulse: number;
    userActivity: number;
    userAverageCompletionTimes: number;
    userDeadlineCompliance: number;
    projectScheduleAdherence: number;
    startDate: number;
    stageCompletionDates: number[];
    setCompletionDates: number[];
    stageBurnDown: number[];
    setBurnDown: number[];
    taskBurnDown: number[];
}
export declare class Message {
    id: string;
    message: string;
    timestamp: string;
    seen: boolean;
    sent: boolean;
    senderId: number;
    contactId: number;
}
