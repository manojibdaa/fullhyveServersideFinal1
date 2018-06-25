export declare const DBConst: {
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    HOST: string;
    DB_SERVER: string;
};
export declare class AuthConst {
    static SECRET: string;
}
export declare const UserConst: {
    START_ID: number;
    USERS_SEARCH_LIMIT: number;
    USERS_FAST_SEARCH_LIMIT: number;
    REQUEST: {
        ACCEPTED: string;
        REJECTED: string;
        UNDECIDED: string;
        REMOVED: string;
    };
    DEFAULT_IMAGE: string;
};
export declare const TeamConst: {
    START_ID: number;
    TEAMS_SEARCH_LIMIT: number;
    TEAMS_FAST_SEARCH_LIMIT: number;
    MEMBERS_SEARCH_LIMIT: number;
    DEFAULT_IMAGE: string;
};
export declare const ProjectConst: {
    START_ID: number;
    PROJECTS_SEARCH_LIMIT: number;
    PROJECTS_FAST_SEARCH_LIMIT: number;
    TASK_STATUS: any;
    DEFAULT_IMAGE: string;
};
export declare const AnnouncementConst: {
    START_ID: number;
    ANNOUNCEMENT_SHOWN_ONCE: number;
};
export declare const StatConst: {
    TEAM_PERFORMANCE_DURATION: number;
};
export declare const ExcludeAuthentication: {
    signin: boolean;
    signup: boolean;
    checkUserName: boolean;
};
