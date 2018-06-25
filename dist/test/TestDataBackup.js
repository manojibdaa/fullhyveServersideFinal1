"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = {
    samwolde: {
        id: 1,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTUyOTUwNTU4MiwiZXhwIjoxNTI5NTkxOTgyfQ.ZtKfU1JMoFFXKUJSjwdp8AWkyy6TNJaQWYDm3NKhDys",
    },
    abekebe: {
        id: 2,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTUyOTI5MDc3MiwiZXhwIjoxNTI5Mzc3MTcyfQ.3sIUpFDceFVIMlnv8NZUSIyKo9-hsAj8ZwGKqhjxj0w"
    }
};
exports.TestData = {
    'signin': {
        fields: ['userName', 'password'],
        data: [
            ['samwolde', '1234'],
            ['abekebe', '123569'],
            ["chaltu", "chalti123"] // Incorrect username and/or password (incorrect username and password)
        ],
        expectedOutput: [
            [200, "Successfully logged-in", {
                    type: 'object',
                    contains: {
                        token: {
                            type: "string",
                            null: false
                        }
                    }
                }],
            [401, "Incorrect username and/or password", null],
            [401, "Incorrect username and/or password", null]
        ]
    },
    'signup': {
        fields: ['firstName', 'lastName', 'userName', 'password'],
        data: [
            ['Abebe', 'Atebe', 'AbeAte', 'abe123'],
            ['R', '', 'rickrj', '123'],
            ['', '', 'chaltu', 'chalti123'],
            ['Samuel', 'Wolde', 'samwolde', '1234'],
            ['belete', 'begu', 'belte', 'bele123'],
            ['chaltu', 'chebesa', 'chaltu', 'ch'] // fail (Min length of password is 3)
        ],
        expectedOutput: [
            [200, "Successfully signed-up", null],
            [200, "Successfully signed-up", null],
            [400, {
                    type: 'object',
                    contains: {
                        validData: {
                            type: "object",
                            null: true
                        },
                        invalidFields: {
                            type: 'object',
                            null: false
                        },
                        missingFields: 'object'
                    }
                }],
            [400, "Username is already used", null],
            [400, {
                    type: 'object',
                    contains: {
                        validData: {
                            type: "object",
                            null: true
                        },
                        invalidFields: {
                            type: 'object',
                            null: false
                        },
                        missingFields: 'object'
                    }
                }],
            [400, {
                    type: 'object',
                    contains: {
                        validData: {
                            type: "object",
                            null: true
                        },
                        invalidFields: {
                            type: 'object',
                            null: false
                        },
                        missingFields: 'object'
                    }
                }],
        ]
    },
    'signout': {
        fields: null,
        data: null,
        expectedOutput: [[200, "Successfully logged-out", null]]
    },
    'getProfile': {
        fields: null,
        data: null,
        expectedOutput: [[200, {
                    type: 'object',
                    contains: {
                        id: "number",
                        userName: "string",
                        firstName: "string",
                        lastName: "string",
                        email: "string",
                        image: "string",
                        title: "string",
                        skills: 'array',
                        description: "string"
                    }
                }]]
    },
    'editProfile': {
        fields: ['firstName', 'lastName', 'image', 'title', 'skills', 'description'],
        data: [
            ["Abebe", "Kebede", "", "Software engineer", ["codder", "thinker"], "New description"]
        ],
        expectedOutput: [[200, null]]
    },
    'getUserProfile': {
        fields: ['friendId'],
        data: [
            [2],
            [10],
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        id: "number",
                        userName: "string",
                        firstName: "string",
                        lastName: "string",
                        email: "string",
                        image: "string",
                        title: "string",
                        skills: 'array',
                        description: "string"
                    }
                }],
            [200, {
                    type: 'object',
                    contains: {
                        id: "number",
                        userName: "string",
                        firstName: "string",
                        lastName: "string",
                        email: "string",
                        image: "string",
                        title: "string",
                        skills: 'array',
                        description: "string"
                    }
                }],
        ]
    },
    'getNotifications': {
        fields: ['offset', 'limit'],
        data: [
            [0, 10],
            [1, 3],
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        notifications: {
                            type: 'array',
                            null: false,
                            length: 4
                        }
                    }
                }],
            [200, {
                    type: 'object',
                    contains: {
                        notifications: {
                            type: 'array',
                            null: false,
                            length: 3
                        }
                    }
                }],
        ]
    },
    'unfriend': {
        fields: ['friendId'],
        data: [
            [4],
            [10],
        ],
        expectedOutput: [
            [200, null],
            [403, null]
        ]
    },
    'addFriend': {
        fields: ['friendId'],
        data: [
            [5],
        ],
        expectedOutput: [
            [200, null]
        ]
    },
    'replyFriendRequest': {
        fields: ['requestId', 'accepted'],
        data: [
            [16, false],
            [13, true],
        ],
        expectedOutput: [
            [200, null],
            [403, null]
        ]
    },
    //==========================================================================================================================================
    //CHAT ROUTER
    'getMessages': {
        fields: ['friendId', 'offset', 'limit'],
        data: [
            [2, 0, 5],
            [6, 1, 3] // success - returns empty array(trying to access messages that don't exist)
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        messages: {
                            type: 'array',
                            null: false,
                            length: 2
                        },
                        done: {
                            type: 'boolean',
                            value: true
                        }
                    }
                }],
            [200, {
                    type: 'object',
                    contains: {
                        messages: {
                            type: 'array',
                            null: false,
                            length: 0
                        }
                    }
                }]
        ]
    },
    'getFriends': {
        fields: ['offset', 'limit'],
        data: [
            [0, 10],
            [1, 3]
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        friends: {
                            type: 'array',
                            null: false,
                            length: 3
                        }
                    }
                }],
            [200, {
                    type: 'object',
                    contains: {
                        friends: {
                            type: 'array',
                            null: false,
                            length: 2
                        }
                    }
                }]
        ]
    },
    'searchUsers': {
        fields: ['name', 'offset', 'limit'],
        data: [
            ["belete", 0, 5],
            ["a", 0, 10],
            ["y s", 0, 5]
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        users: {
                            type: 'array',
                            null: false,
                            length: 0
                        }
                    }
                }],
            [200, {
                    type: 'object',
                    contains: {
                        users: {
                            type: 'array',
                            null: false,
                            length: 5
                        }
                    }
                }],
            [200, {
                    type: 'object',
                    contains: {
                        users: {
                            type: 'array',
                            null: false,
                            length: 1
                        }
                    }
                }],
        ]
    },
    'updateMessageSeen': {
        fields: ['lastMessageId'],
        data: [
            [2],
            [6] // fail (trying to update a message seen status of a conversation of other users)
        ],
        expectedOutput: [
            [200, null],
            [403, "Unauthorized access", null]
        ]
    },
    'sendMessage': {
        fields: ['friendId', 'message'],
        data: [
            [2, "This is my message for u"],
            [10, "A message for u"] // fail (trying to send a message for non-friend user)
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        id: 'number',
                        message: 'string',
                        seen: 'boolean',
                        timestamp: 'string',
                        sent: 'boolean'
                    }
                }],
            [403, "Unauthorized access", null]
        ]
    },
    'editMessage': {
        fields: ['messageId', 'newMessage'],
        data: [
            [1, "Edited!"],
            [2, "Edited message"] // fail (trying to edit a message other users sent including your friends)
        ],
        expectedOutput: [
            [200, null],
            [403, null]
        ]
    },
    'forwardMessage': {
        fields: ['friendIds', 'messageId'],
        data: [
            [[2], 1],
            [[2], 6],
        ],
        expectedOutput: [
            [200, null]
        ]
    },
    'deleteMessage': {
        fields: ['messageId'],
        data: [
            [1],
            [2],
        ],
        expectedOutput: [
            [200, null],
            [403, "Unauthorized access", null]
        ]
    },
    'getFriendLastSeenTime': {
        fields: ['friendId'],
        data: [
            [2],
            [4] // fail (trying to get non-friend's last seen time)
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        online: {
                            type: 'boolean',
                            null: false
                        },
                        timestamp: {
                            type: 'string',
                            null: false
                        }
                    }
                }],
            [403, "Unauthorized access", null]
        ]
    },
    //===================================================================================================================================
    //team parts
    'getMyTeams': {
        fields: ['offset', 'limit'],
        data: [
            [0, 10],
            [1, 2],
            [2, 10],
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        myTeams: {
                            type: 'array',
                            null: false,
                            length: 5
                        }
                    }
                }],
            [200, {
                    type: 'object',
                    contains: {
                        myTeams: {
                            type: 'array',
                            null: false,
                            length: 2
                        }
                    }
                }],
            [200, {
                    type: 'object',
                    contains: {
                        myTeams: {
                            type: 'array',
                            null: false,
                            length: 3
                        }
                    }
                }]
        ]
    },
    'searchTeams': {
        fields: ['name', 'offset', 'limit'],
        data: [
            ['red', 0, 10],
            ['a', 0, 10],
            ['team1', 0, 2],
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        teams: {
                            type: 'array',
                            null: false,
                            length: 0
                        },
                        myTeams: {
                            type: 'array',
                            null: false,
                            length: 1
                        }
                    }
                }],
            [200, {
                    type: 'object',
                    contains: {
                        teams: {
                            type: 'array',
                            null: false,
                            length: 1
                        },
                        myTeams: {
                            type: 'array',
                            null: false,
                            length: 2
                        }
                    }
                }],
            [200, {
                    type: 'object',
                    contains: {
                        teams: {
                            type: 'array',
                            null: false,
                            length: 0
                        },
                        myTeams: {
                            type: 'array',
                            null: false,
                            length: 0
                        }
                    }
                }],
        ]
    },
    'getTeamMembers': {
        fields: ['teamId', 'offset', 'limit'],
        data: [
            [1, 0, 10],
            [2, 0, 10],
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        members: {
                            type: 'array',
                            null: false,
                            length: 4
                        }
                    }
                }],
            [403, "Unauthorized access", null]
        ]
    },
    'getTeamProjects': {
        fields: ['teamId', 'offset', 'limit'],
        data: [
            [1, 0, 10],
            [2, 0, 10],
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        projects: {
                            type: 'array',
                            null: false,
                            length: 2
                        }
                    }
                }],
            [403, "Unauthorized access", null]
        ]
    },
    'getTeamAnnouncements': {
        fields: ['teamId', 'offset', 'limit'],
        data: [
            [1, 0, 10],
            [2, 0, 10],
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        announcements: {
                            type: 'array',
                            null: false,
                            length: 2
                        }
                    }
                }],
            [403, "Unauthorized access", null]
        ]
    },
    'announce': {
        fields: ['message', 'teamId'],
        data: [
            ["I am your savier", 1],
            ["Naaaaaaa ...", 2] // fail (trying to announce to a team you aren't member of)
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        mainMessage: {
                            type: 'object',
                            null: false
                        }
                    }
                }],
            [403, "Unauthorized access", null]
        ]
    },
    'replyAnnouncement': {
        fields: ['message', 'teamId', 'mainAnnouncementId'],
        data: [
            ["No, I am your savier!!", 1, 1],
            ["hahaha savier!!", 2, 3] // fail (trying to announce to a team you aren't member of)
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        mainMessage: {
                            type: 'object',
                            null: false
                        }
                    }
                }],
            [403, "Unauthorized access", null]
        ]
    },
    'editAnnouncementReply': {
        fields: ['newAnnouncement', 'announcementId'],
        data: [
            ["No, I am your savier!! Edited announcement", 12],
            ["No, I am your savier!! Edited reply", 14],
            ["hahaha savier!! Edited reply", 11],
            ["hahaha savier!! Edited reply", 4] // fail (trying to edit reply you didn't post)
        ],
        expectedOutput: [
            [200, null],
            [200, null],
            [403, null],
            [403, null]
        ]
    },
    'deleteAnnouncement': {
        fields: ['announcementId'],
        data: [
            [12],
            [3] // fail (trying to delete an announcement you didn't post)
        ],
        expectedOutput: [
            [200, null],
            [403, "Unauthorized access", null]
        ]
    },
    'deleteReply': {
        fields: ['replyId'],
        data: [
            [14],
            [4] // fail (trying to delete a reply you didn't post in any team)
        ],
        expectedOutput: [
            [200, null],
            [403, "Unauthorized access", null]
        ]
    },
    'updateAnnouncementSeen': {
        fields: ['teamId', 'lastAnnId'],
        data: [[1, "M1"], [2, "M2"]],
        expectedOutput: [[200, null], [200, null]]
    },
    'newTeam': {
        fields: ['name', 'image', 'focus', 'description'],
        data: [
            ["Team Ninja", "", "Machine learning", "This is the world top team on machine learning"],
            ["", "", "Machine learning", "This is the world top team on machine learning"],
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        id: 'number',
                        image: 'string',
                        focus: 'string',
                        description: 'string'
                    }
                }],
            [400, "Invalid input", null]
        ]
    },
    'editTeamProfile': {
        fields: ['name', 'image', 'description'],
        data: [["Team5new", "image file new", "This is team 5 revamped"]],
        expectedOutput: [200, null]
    },
    'addMembers': {
        fields: ['teamId', 'memberIds'],
        data: [
            [4, [8]],
            [1, [2]],
        ],
        expectedOutput: [
            [200, null],
            [403, "Unauthorized access", null]
        ]
    },
    'replyTeamJoinRequest': {
        fields: ['requestId', 'accepted'],
        data: [
            [1, "Accepted"],
            [2, "Rejected"],
            [3, "Rejected"],
            [4, "Accepted"]
        ],
        expectedOutput: [[200, null], [200, null], [200, null], [200, null]]
    },
    'removeMember': {
        fields: ['teamId', 'memberIds'],
        data: [[1, 4], [1, 2], [1, 3], [1, 5]],
        expectedOutput: [[200, null], [200, null], [200, null], [200, null]]
    },
    'deleteTeam': {
        fields: ['teamId'],
        data: [[1], [2], [3], [4]],
        expectedOutput: [[200, null], [200, null], [200, null], [200, null]]
    },
    // =================================================================================================================
    // PROJECT TEST DATA
    // =================================================================================================================
    // 'newTask':{
    //     fields:['title','description','deadline','assignerId','assigneeId','assigneeTeamId','tasksetId'],
    //     data:[
    //         ['Generate update queries','this is a description',456995885,1,2,3,1]
    //     ],
    //     expectedOutput:[[200,null],[200,null],[200,null],[200,null]]
    // },
    // 'newTaskset':{
    //     fields:['title','description','deadline','assignerId','assigneeId','assigneeTeamId','tasksetId'],
    //     data:[
    //         ['Generate update queries','this is a discription',456995885,1,2,3,1]
    //     ],
    //     expectedOutput:[
    //         [200,null],
    //         [200,null],
    //         [200,null],
    //         [200,null]
    //     ]
    // },
    'getMyProjects': {
        fields: ['offset', 'limit'],
        data: [[0, 5], [1, 3]],
        expectedOutput: [[200, {
                    type: 'object',
                    contains: {
                        projects: {
                            type: 'array',
                            null: false,
                            length: 2
                        },
                        MyProjects: {
                            type: 'array',
                            null: false,
                            length: 2
                        }
                    }
                }]]
    },
    'searchProjects': {
        fields: ['name', 'offset', 'limit'],
        data: ["projectone", [0, 5], [1, 3]],
        expectedOutput: [[200, {
                    type: 'object',
                    contains: {
                        projects: {
                            type: 'array',
                            null: false,
                            length: 2
                        },
                        MyProjects: {
                            type: 'array',
                            null: false,
                            length: 2
                        }
                    }
                }]]
    },
    'getContributors': {
        fields: ['projectId', 'offset', 'limit'],
        data: [1, [0, 5], [1, 3]],
        expectedOutput: [[200, {
                    type: 'object',
                    contains: {
                        teams: {
                            type: 'array',
                            null: false,
                            length: 2
                        },
                        individuals: {
                            type: 'array',
                            null: false,
                            length: 2
                        }
                    }
                }]]
    },
    'getTaskSets': {
        fields: ['projectId', 'offset', 'limit'],
        data: [1, [0, 5], [1, 3]],
        expectedOutput: [[200, {
                    type: 'object',
                    contains: {
                        tasksets: {
                            type: 'array',
                            null: false,
                            length: 2
                        }
                    }
                }]]
    },
    'getTasks': {
        fields: ['tasksetId', 'offset', 'limit'],
        data: [1, [0, 5], [1, 3]],
        expectedOutput: [[200, {
                    type: 'object',
                    contains: {
                        tasks: {
                            type: 'array',
                            null: false,
                            length: 2
                        }
                    }
                }]]
    },
    'newProject': {
        fields: ['name', 'image', 'field', 'description'],
        data: ["projectone", "imagepath", "coding", "the first project"],
        expectedOutput: [[200, {
                    type: 'object',
                    contains: {
                        name: 'string',
                        image: 'string',
                        field: 'string',
                        description: 'string',
                    }
                }]]
    },
    'replyIndividualContributorJoinRequest': {
        fields: ['accepted', 'decision', 'requestId'],
        data: [true, "rejected", 1],
        expectedOutput: [[200, null]]
    },
    'replyTeamContributorJoinRequest': {
        fields: ['accepted', 'decision', 'requestId'],
        data: [true, "rejected", 1],
        expectedOutput: [
            [200, null]
        ]
    },
    'newTaskset': {
        fields: ['name', 'deadline', 'description', 'projectId'],
        data: [
            ["taskset one", new Date().getMilliseconds(), "first taskset", 1]
        ],
        expectedOutput: [
            [200, {
                    type: 'object',
                    contains: {
                        id: 'number',
                        name: 'string',
                        number: 'number',
                        description: 'string',
                        assignment: 'number',
                        deadline: 'string',
                        completion: 'number'
                    }
                }],
        ]
    },
    'deleteTaskset': {
        fields: ['setId'],
        data: [2],
        expectedOutput: [[200, null]]
    },
    'newTask': {
        fields: ['title', 'number', 'description', 'assignmentDate', 'deadline', 'assignerId', 'assigneeId', 'assigneeTeamId', 'tasksetId', 'status'],
        data: ["taskone", 1, "first task", "today", "next week", 2, 1, 1, 1, "not started"],
        expectedOutput: [[200, {
                    type: 'object',
                    contains: {
                        title: 'title',
                        number: 'number',
                        description: 'string',
                        assignmentDate: 'string',
                        deadline: 'string',
                        assignerId: 'number',
                        assigneeId: 'number',
                        assigneeTeamId: 'number',
                        tasksetId: 'string',
                        status: 'string',
                    }
                }]]
    },
    'startTask': {
        fields: ['taskId'],
        data: [1],
        expectedOutput: [[200, null]]
    },
    'completeTask': {
        fields: ['taskId'],
        data: [1],
        expectedOutput: [[200, null]]
    },
    'changeTaskStatus': {
        fields: ['taskId', 'rTaskStatus'],
        data: [1, "approve"],
        expectedOutput: [[200, null]]
    },
    'deleteTask': {
        fields: ['taskId'],
        data: [1],
        expectedOutput: [[200, null]]
    },
    'addContributors': {
        fields: ['projectId', 'individualIds', 'teamIds'],
        data: [
            [1, [2], [3]]
        ],
        expectedOutput: [
            [200, null]
        ]
    },
    'removeContributors': {
        fields: ['projectId', 'individualIds', 'teamIds'],
        data: [[1, [2], [3]]],
        expectedOutput: [
            [200, null]
        ]
    },
    'editProjectDetails': {
        fields: ['projectId', 'title', 'number', 'description', 'assignmentDate', 'deadline', 'assignerId', 'assigneeId', 'assigneeTeamId', 'tasksetId', 'status'],
        data: [1, "projectUNO", 1, "numero uno", "today", "next week", 2, 1, 1, 1, "not started"],
        expectedOutput: [[200, null]]
    },
    'deleteProject': {
        fields: ['projectId'],
        data: [1],
        expectedOutput: [[200, null]]
    },
    'getMyProjectProfile': {
        fields: ['projectId'],
        data: [1],
        expectedOutput: [[200, {
                    type: 'object',
                    contains: {
                        id: 'number',
                        name: 'string',
                        image: 'string',
                        description: 'string',
                        field: 'string',
                        leader: 'string',
                        contributorCount: 'string'
                    }
                }]]
    }
};
