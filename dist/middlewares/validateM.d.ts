export declare class ValidateM {
    static validateUpdateUser(userId: number, rUser: any): {
        image: any;
        firstName: any;
        lastName: any;
        title: any;
        skills: {
            skill: any;
            userId: number;
        }[];
        description: any;
    };
    static validateNewUser(rUser: any): {
        userName: any;
        password: any;
        firstName: any;
        lastName: any;
        image: string;
    };
    static validateNewTeam(userId: number, rTeam: any): {
        name: any;
        image: any;
        focus: any;
        description: any;
        leaderId: number;
    };
    static validateNewProject(userId: number, rProject: any): {
        name: any;
        image: any;
        field: any;
        description: any;
        leaderId: number;
    };
    static validateNewTaskset(rTaskset: any): Promise<{}>;
    static validateNewTask(rTask: any): Promise<{}>;
}
