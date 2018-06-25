"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../models/constants/constant");
var serviceValues_1 = require("../models/models/serviceValues");
exports.testUser = [
    {
        userName: 'samwolde',
        password: '$2a$10$b4KVChHblYZoNAzSl0eKCu4CHfjJ.Ky76KhKSlGXkyJnparaQKE7i',
        firstName: 'Samuel',
        lastName: 'Kediso',
        image: constant_1.UserConst.DEFAULT_IMAGE,
        email: 'samuelwoldemariam@yahoo.com',
        phoneNo: '0910713717',
        title: 'Software engineer',
        skills: [
            { skill: 'Python' },
            { skill: 'Js' },
            { skill: 'Angular' },
            { skill: 'NodeJs' },
            { skill: 'C#' }
        ],
        description: ''
    },
    {
        userName: 'abekebe',
        password: '$2a$10$3XxShnlYq2es77zmkLfJzekb9MgnYbmxDFMAyRK8I0AzwSu/4MnrG',
        firstName: 'Abebe',
        lastName: 'Ayele',
        image: constant_1.UserConst.DEFAULT_IMAGE,
        email: 'abebekebede@yahoo.com',
        phoneNo: '0911554863',
        title: 'Software engineer',
        skills: [
            { skill: 'Python' },
            { skill: 'Js' },
            { skill: 'Angular' }
        ],
        description: ''
    },
    {
        userName: 'mulekebe',
        password: '$2a$10$XmlAMkIegJZhSpdZSb6KjeTRtGu.9kFjycgkQzAV36bdgQxKjWOeq',
        firstName: 'Mulugeta',
        lastName: 'Admassu',
        image: constant_1.UserConst.DEFAULT_IMAGE,
        email: 'mulugetakebede@yahoo.com',
        phoneNo: '0919634525',
        title: 'Software engineer',
        skills: [
            { skill: 'Js' },
            { skill: 'NodeJs' },
            { skill: 'C#' }
        ],
        description: ''
    },
    {
        userName: 'yonhaile',
        password: '$2a$10$IPyHIBP432yCgVoITrobN.zPALeLBbYwCaJeVpXcWx0aV2p6tWnqS',
        firstName: 'Yonas',
        lastName: 'Shimeles',
        image: constant_1.UserConst.DEFAULT_IMAGE,
        email: 'yonashaile@yahoo.com',
        phoneNo: '0916321548',
        title: 'Software engineer',
        skills: [
            { skill: 'Python' },
            { skill: 'Js' },
            { skill: 'C#' }
        ],
        description: ''
    },
    {
        userName: 'jondoe',
        password: '$2a$10$b4KVChHblYZoNAzSl0eKCu4CHfjJ.Ky76KhKSlGXkyJnparaQKE7i',
        firstName: 'Jon',
        lastName: 'Doe',
        image: constant_1.UserConst.DEFAULT_IMAGE,
        email: 'jondoe@yahoo.com',
        phoneNo: '0916321548',
        title: 'Software engineer',
        skills: [
            { skill: 'Python' },
            { skill: 'Js' },
        ],
        description: ''
    },
    {
        userName: 'alexmarc',
        password: '$2a$10$3XxShnlYq2es77zmkLfJzekb9MgnYbmxDFMAyRK8I0AzwSu/4MnrG',
        firstName: 'Alex',
        lastName: 'Pablo',
        image: constant_1.UserConst.DEFAULT_IMAGE,
        email: 'alexpab@yahoo.com',
        phoneNo: '0916321548',
        title: 'Graphic designer',
        skills: [
            { skill: 'Python' },
            { skill: 'Js' },
            { skill: 'Shader' }
        ],
        description: ''
    },
    {
        userName: 'janedoe',
        password: '$2a$10$XmlAMkIegJZhSpdZSb6KjeTRtGu.9kFjycgkQzAV36bdgQxKjWOeq',
        firstName: 'Jane',
        lastName: 'Doe',
        image: constant_1.UserConst.DEFAULT_IMAGE,
        email: 'mulugetakebede@yahoo.com',
        phoneNo: '0919634525',
        title: 'Software engineer',
        skills: [
            { skill: 'Js' },
            { skill: 'NodeJs' },
            { skill: 'C#' }
        ],
        description: ''
    },
    {
        userName: 'yosefmek',
        password: '$2a$10$IPyHIBP432yCgVoITrobN.zPALeLBbYwCaJeVpXcWx0aV2p6tWnqS',
        firstName: 'Yosef',
        lastName: 'Mekonnen',
        image: constant_1.UserConst.DEFAULT_IMAGE,
        email: 'yonashaile@yahoo.com',
        phoneNo: '0916321548',
        title: 'Software engineer',
        skills: [
            { skill: 'Python' },
            { skill: 'Js' },
            { skill: 'C#' }
        ],
        description: ''
    },
    {
        userName: 'henymeles',
        password: '$2a$10$XmlAMkIegJZhSpdZSb6KjeTRtGu.9kFjycgkQzAV36bdgQxKjWOeq',
        firstName: 'Henok',
        lastName: 'Melese',
        image: constant_1.UserConst.DEFAULT_IMAGE,
        email: 'jondoe@yahoo.com',
        phoneNo: '0916321548',
        title: 'Test engineer',
        skills: [
            { skill: 'Python' },
            { skill: 'Js' },
            { skill: 'Go' }
        ],
        description: ''
    },
    {
        userName: 'gocarl',
        password: '$2a$10$b4KVChHblYZoNAzSl0eKCu4CHfjJ.Ky76KhKSlGXkyJnparaQKE7i',
        firstName: 'George',
        lastName: 'Carlos',
        image: constant_1.UserConst.DEFAULT_IMAGE,
        email: 'alexpab@yahoo.com',
        phoneNo: '0916321548',
        title: 'Graphic designer',
        skills: [
            { skill: 'C++' },
            { skill: 'Photoshop' },
            { skill: 'Shader' }
        ],
        description: ''
    }
];
exports.testTeam = [
    {
        name: 'Red',
        image: constant_1.TeamConst.DEFAULT_IMAGE,
        focus: 'Graphic design',
        leaderId: 4
    },
    {
        name: 'Blue',
        image: constant_1.TeamConst.DEFAULT_IMAGE,
        focus: 'UI design',
        leaderId: 2
    },
    {
        name: 'Green',
        image: constant_1.TeamConst.DEFAULT_IMAGE,
        focus: 'Databse design',
        leaderId: 3
    },
    {
        name: 'Black',
        image: constant_1.TeamConst.DEFAULT_IMAGE,
        focus: 'AI',
        leaderId: 1
    },
    {
        name: 'UX',
        image: constant_1.TeamConst.DEFAULT_IMAGE,
        focus: 'Testing',
        leaderId: 2
    },
    {
        name: 'UX7',
        image: constant_1.TeamConst.DEFAULT_IMAGE,
        focus: 'Android and Web App',
        leaderId: 1
    },
    {
        name: 'Lantiv',
        image: constant_1.TeamConst.DEFAULT_IMAGE,
        focus: 'Databse design',
        leaderId: 5
    },
    {
        name: 'Mocha',
        image: constant_1.TeamConst.DEFAULT_IMAGE,
        focus: 'System programming',
        leaderId: 9
    }
];
exports.testMessages = [
    {
        senderId: 1,
        contactId: 3,
        message: 'Do no wrong, amirite?',
        seen: false
    },
    {
        senderId: 2,
        contactId: 4,
        message: 'Technically, no. Because you are repeating yourself. A man knows nothing about most of what he speaks of, and that saying is all too true in your case.',
        seen: false
    },
    {
        senderId: 3,
        contactId: 8,
        message: 'So no meeting on the morrow? A shame, since I was kinda looking forward to it',
        seen: false
    },
    {
        senderId: 4,
        contactId: 6,
        message: 'Perhaps. I\'m not one to assume.',
        seen: false
    },
    {
        senderId: 5,
        contactId: 12,
        message: 'Do no wrong, amirite?',
        seen: false
    },
    {
        senderId: 6,
        contactId: 14,
        message: 'Technically, no. Because you are repeating yourself. A man knows nothing about most of what he speaks of, and that saying is all too true in your case.',
        seen: false
    },
    {
        senderId: 9,
        contactId: 17,
        message: 'So no meeting on the morrow? A shame, since I was kinda looking forward to it',
        seen: false
    },
    {
        senderId: 10,
        contactId: 17,
        message: 'Perhaps. I\'m not one to assume.',
        seen: false
    }
];
exports.testTeamMembersReq = [
    {
        request: constant_1.UserConst.REQUEST.UNDECIDED,
        userId: 1,
        teamId: 5
    },
    {
        request: constant_1.UserConst.REQUEST.UNDECIDED,
        userId: 1,
        teamId: 2
    }
];
exports.testTeamMembers = [
    [1, 1, 10, 9],
    [2, 7, 5, 3, 6],
    [3, 1, 6, 5, 10],
    [4, 2, 3, 6, 10, 7, 5],
    [5, 4, 7, 10],
    [6, 5, 9, 2, 8],
    [7, 6, 7, 10],
    [8, 5, 3, 7, 1],
];
exports.testContactsReq = [
    {
        request: constant_1.UserConst.REQUEST.UNDECIDED,
        userId: 9,
        friendId: 1
    },
    {
        request: constant_1.UserConst.REQUEST.UNDECIDED,
        userId: 3,
        friendId: 1
    },
];
exports.testContacts = [
    [1, 2, 7, 4],
    [2, 8, 6],
    [3, 4, 8],
    [4, 9, 6],
    [5, 2, 3],
    [6, 5],
    [7, 2],
    [8, 10],
    [9, 10],
    [10, 3]
];
exports.testAnnouncement = [
    {
        message: 'There will be a meeting tommorow',
        userId: 4,
        teamId: 1,
    },
    {
        message: 'The deadline is posponed for next month',
        userId: 9,
        teamId: 1,
        mainAnnouncementId: 1
    },
    {
        message: 'Meeting postponed',
        userId: 2,
        teamId: 2
    },
    {
        message: 'New project first meeting',
        userId: 7,
        teamId: 2,
        mainAnnouncementId: 3
    },
    {
        message: 'There will be a meeting tommorow',
        userId: 6,
        teamId: 3
    },
    {
        message: 'New project first meeting',
        userId: 3,
        teamId: 4
    },
    {
        message: 'There will be a meeting today',
        userId: 4,
        teamId: 5
    },
    {
        message: 'New project first meeting',
        userId: 7,
        teamId: 5
    },
    {
        message: 'The deadline is posponed for next month',
        userId: 2,
        teamId: 6
    },
    {
        message: 'Meeting postponed',
        userId: 5,
        teamId: 7
    },
    {
        message: 'New project first meeting',
        userId: 10,
        teamId: 7
    },
    {
        message: 'Meeting postponed',
        userId: 1,
        teamId: 8
    },
    {
        message: 'New project first meeting',
        userId: 9,
        teamId: 8
    },
    {
        message: 'Meeting postponed further',
        userId: 1,
        teamId: 8,
        mainAnnouncementId: 13
    },
];
exports.testProject = [
    {
        name: 'MySQL',
        image: constant_1.ProjectConst.DEFAULT_IMAGE,
        description: "The world's most popular open source database with easy administration, excellent read performance, and transparent support for large text and binary objects make it the top choice for many Web sites.",
        field: 'Database',
        startDate: new Date(2017, 10, 15),
        finalDate: new Date(2019, 3, 15),
        leaderId: 1,
    },
    {
        name: 'Ubuntu',
        image: constant_1.ProjectConst.DEFAULT_IMAGE,
        description: "Ubuntu is a Debian-based Linux operating system developed to increase usability and ease of use. ",
        field: 'OS',
        startDate: new Date(2015, 8, 15),
        finalDate: new Date(2017, 6, 15),
        leaderId: 2,
    },
    {
        name: 'Apache',
        image: constant_1.ProjectConst.DEFAULT_IMAGE,
        description: "The Apache HTTP Server Project is an effort to develop and maintain an open-source HTTP server for modern operating systems including UNIX and Windows.",
        field: 'Server',
        startDate: new Date(2016, 4, 15),
        finalDate: new Date(2018, 2, 15),
        leaderId: 3,
    },
    {
        name: 'Fullhyve',
        image: constant_1.ProjectConst.DEFAULT_IMAGE,
        description: "This project produces a software product used to manage projects and allow chatting between users.",
        field: 'Android',
        startDate: new Date(2016, 4, 15),
        finalDate: new Date(2018, 2, 15),
        leaderId: 5,
    }
];
exports.testProjectTeams = [
    // MySQL
    {
        projectId: 1,
        teamId: 5,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    {
        projectId: 1,
        teamId: 7,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    /*{
        projectId:1,
        teamId:3,
        request:UserConst.REQUEST.ACCEPTED
    },*/
    // Ubuntu
    // {
    //     projectId:2,
    //     teamId:1,
    //     request:UserConst.REQUEST.ACCEPTED
    // },
    {
        projectId: 2,
        teamId: 2,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    {
        projectId: 2,
        teamId: 4,
        request: constant_1.UserConst.REQUEST.UNDECIDED
    },
    // {
    //     projectId:2,
    //     teamId:8,
    //     request:UserConst.REQUEST.ACCEPTED
    // },
    // Apache
    {
        projectId: 3,
        teamId: 3,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    {
        projectId: 3,
        teamId: 7,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    {
        projectId: 3,
        teamId: 8,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    // Fullhyve
    {
        projectId: 4,
        teamId: 1,
        request: constant_1.UserConst.REQUEST.UNDECIDED
    },
    {
        projectId: 4,
        teamId: 2,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    {
        projectId: 4,
        teamId: 5,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    {
        projectId: 4,
        teamId: 6,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
];
exports.testProjectUser = [
    // MySQL
    {
        projectId: 1,
        userId: 4,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    {
        projectId: 1,
        userId: 8,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    // Ubuntu
    {
        projectId: 2,
        userId: 4,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    // Apache
    {
        projectId: 3,
        userId: 1,
        request: constant_1.UserConst.REQUEST.UNDECIDED
    },
    {
        projectId: 3,
        userId: 9,
        request: constant_1.UserConst.REQUEST.UNDECIDED
    },
    // Fullhyve
    {
        projectId: 4,
        userId: 3,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
    {
        projectId: 4,
        userId: 6,
        request: constant_1.UserConst.REQUEST.ACCEPTED
    },
];
exports.testSet = [
    {
        name: 'Query generation',
        number: 1,
        projectId: 1,
        description: '',
        assignmentDate: new Date('2017-11-01'),
        startDate: new Date('2017-11-03'),
        deadline: new Date('2017-12-15'),
        completionDate: new Date('2017-12-20'),
    },
    {
        name: 'Query execution',
        number: 2,
        projectId: 1,
        description: '',
        assignmentDate: new Date('2017-11-01'),
        startDate: new Date('2017-11-03'),
        deadline: new Date('2017-12-15'),
        completionDate: new Date('2017-12-10'),
    },
    {
        name: 'Terminal',
        number: 1,
        projectId: 2,
        description: '',
        assignmentDate: new Date('2015-09-01'),
        startDate: new Date('2015-09-03'),
        deadline: new Date('2015-10-15'),
        completionDate: new Date('2015-10-20'),
    },
    {
        name: 'System calls',
        number: 2,
        projectId: 2,
        description: '',
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-15'),
        completionDate: new Date('2015-10-13'),
    },
    {
        name: 'Socket programming',
        number: 1,
        projectId: 3,
        description: '',
        assignmentDate: new Date('2017-02-01'),
        startDate: new Date('2017-02-03'),
        deadline: new Date('2017-02-15'),
        completionDate: new Date('2017-02-20'),
    },
    {
        name: 'Request handling',
        number: 2,
        projectId: 3,
        description: '',
        assignmentDate: new Date('2017-02-01'),
        startDate: new Date('2017-02-03'),
        deadline: new Date('2017-02-15'),
        completionDate: new Date('2017-02-12'),
    },
    {
        name: 'Handling contact tasks',
        number: 1,
        projectId: 4,
        description: '',
        assignmentDate: new Date('2017-02-01'),
        startDate: new Date('2017-02-03'),
        deadline: new Date('2017-02-15'),
        completionDate: new Date('2017-02-20'),
    },
    {
        name: 'Route testing',
        number: 2,
        projectId: 4,
        description: '',
        assignmentDate: new Date('2017-02-01'),
        startDate: new Date('2017-02-03'),
        deadline: new Date('2017-02-15'),
        completionDate: new Date('2017-02-12'),
    },
    {
        name: 'Cache unit testing',
        number: 3,
        projectId: 4,
        description: '',
        assignmentDate: new Date('2017-02-01'),
        startDate: new Date('2017-02-03'),
        deadline: new Date('2017-02-15'),
        completionDate: new Date('2017-02-12'),
    }
];
exports.testTask = [
    {
        number: 1,
        title: 'Generate select queries',
        description: '',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 1,
        assigneeId: 10,
        assigneeTeamId: 5,
        tasksetId: 1,
        projectId: 1
    },
    {
        number: 2,
        title: 'Generate update queries',
        description: '',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 1,
        assigneeId: 3,
        assigneeTeamId: 3,
        tasksetId: 1,
        projectId: 1
    },
    {
        number: 1,
        title: 'Execute insert queries',
        description: '',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 1,
        assigneeId: 6,
        assigneeTeamId: 7,
        tasksetId: 2,
        projectId: 1
    },
    {
        number: 2,
        title: 'Execute delete queries',
        description: '',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 1,
        assigneeId: 4,
        assigneeTeamId: null,
        tasksetId: 2,
        projectId: 1
    },
    {
        number: 1,
        title: 'File read system calls',
        description: '',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 2,
        assigneeId: 3,
        assigneeTeamId: 2,
        tasksetId: 4,
        projectId: 2
    },
    {
        number: 1,
        title: 'Broadcasting to rooms',
        description: '',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 3,
        assigneeId: 1,
        assigneeTeamId: null,
        tasksetId: 5,
        projectId: 3
    },
    {
        number: 2,
        title: 'Emitting events',
        description: 'Create a module that allows a user to emit events to other end of the socket',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 3,
        assigneeId: 5,
        assigneeTeamId: 8,
        tasksetId: 5,
        projectId: 3
    },
    {
        number: 1,
        title: 'Sending message',
        description: 'Implement a method that sends a message to a user over a network',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 5,
        assigneeId: 3,
        assigneeTeamId: null,
        tasksetId: 7,
        projectId: 4
    },
    {
        number: 2,
        title: 'Edit message',
        description: 'Implement a method that allows a user to edit his/her message',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 5,
        assigneeId: 1,
        assigneeTeamId: 6,
        tasksetId: 7,
        projectId: 4
    },
    {
        number: 1,
        title: 'Search users route',
        description: 'Test route which is used to search for users accepting their names',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 5,
        assigneeId: 6,
        assigneeTeamId: 2,
        tasksetId: 8,
        projectId: 4
    },
    {
        number: 2,
        title: 'Create new team route',
        description: 'Test the route allowing a user to create new team',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 5,
        assigneeId: 2,
        assigneeTeamId: 5,
        tasksetId: 8,
        projectId: 4
    },
    {
        number: 1,
        title: 'Test save friends to cache',
        description: 'Test the cache if it saves list of friends to the cache',
        priority: '',
        status: serviceValues_1.TaskStatus.Waiting,
        assignmentDate: new Date('2015-10-01'),
        startDate: new Date('2015-10-03'),
        deadline: new Date('2015-10-10'),
        completionDate: new Date('2015-10-10'),
        assignerId: 5,
        assigneeId: 4,
        assigneeTeamId: 1,
        tasksetId: 9,
        projectId: 4
    }
];
