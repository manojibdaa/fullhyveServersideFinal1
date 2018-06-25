"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = function (sequelize, Sequelize) {
    return sequelize.define('users', {
        userName: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        phoneNo: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: true,
        createdAt: 'registrationTime',
        paranoid: true
    });
};
exports.Skill = function (sequelize, Sequelize) {
    return sequelize.define('skills', {
        skill: {
            type: Sequelize.STRING
        }
    }, {
        paranoid: true
    });
};
exports.Contact = function (sequelize, Sequelize) {
    return sequelize.define('contacts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        request: {
            type: Sequelize.ENUM('Accepted', 'Rejected', 'Undecided', 'Removed'),
            defaultValue: 'Undecided'
        },
        seen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        paranoid: true
    });
};
exports.Message = function (sequelize, Sequelize) {
    return sequelize.define('messages', {
        message: {
            type: Sequelize.TEXT
        },
        seen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,
        createdAt: 'timestamp',
        updatedAt: 'editedAt',
        paranoid: true
    });
};
exports.Team = function (sequelize, Sequelize) {
    return sequelize.define('teams', {
        name: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        focus: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        }
    }, {
        paranoid: true
    });
};
exports.TeamUser = function (sequelize, Sequelize) {
    return sequelize.define('TeamUsers', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        request: {
            type: Sequelize.ENUM('Accepted', 'Rejected', 'Undecided', 'Removed'),
            defaultValue: 'Undecided'
        },
        seen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        paranoid: true
    });
};
exports.Announcement = function (sequelize, Sequelize) {
    return sequelize.define('Announcements', {
        message: {
            type: Sequelize.TEXT,
            unique: false,
            primaryKey: false
        }
    }, {
        timestamps: true,
        createdAt: 'timestamp',
        paranoid: true
    });
};
exports.TeamMemberLastAnnSeen = function (sequelize, Sequelize) {
    return sequelize.define('TeamMemberLastAnnSeen', {
        teamId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        lastSeenAnnouncementId: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: true,
        createdAt: 'timestamp',
        paranoid: true
    });
};
/*
export const Announcement = (sequelize:any, Sequelize:any)=>{
    return sequelize.define('announcements',{
        message:{
            type:Sequelize.TEXT
        },
        seen:{
            type:Sequelize.BOOLEAN,
            defaultValue:false
        }
    },{
        timestamps:true,
        createdAt:'timestamp',
        paranoid:true
    });
}*/
exports.Project = function (sequelize, Sequelize) {
    return sequelize.define('projects', {
        name: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        field: {
            type: Sequelize.STRING
        },
        startDate: {
            type: Sequelize.DATEONLY
        },
        finalDate: {
            type: Sequelize.DATEONLY
        },
        completionDate: {
            type: Sequelize.DATEONLY
        },
    }, {
        paranoid: true
    });
};
exports.ProjectTeam = function (sequelize, Sequelize) {
    return sequelize.define('projectTeams', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        request: {
            type: Sequelize.ENUM('Accepted', 'Rejected', 'Undecided', 'Removed'),
            defaultValue: 'Undecided'
        },
        seen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        paranoid: true
    });
};
exports.ProjectUser = function (sequelize, Sequelize) {
    return sequelize.define('projectUsers', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        request: {
            type: Sequelize.ENUM('Accepted', 'Rejected', 'Undecided', 'Removed'),
            defaultValue: 'Undecided'
        },
        seen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        paranoid: true
    });
};
exports.TaskSets = function (sequelize, Sequelize) {
    return sequelize.define('tasksets', {
        name: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.TEXT
        },
        assignmentDate: {
            type: Sequelize.DATEONLY
        },
        startDate: {
            type: Sequelize.DATEONLY
        },
        deadline: {
            type: Sequelize.DATEONLY
        },
        completionDate: {
            type: Sequelize.DATEONLY
        }
    }, {
        paranoid: true
    });
};
exports.Task = function (sequelize, Sequelize) {
    return sequelize.define('tasks', {
        title: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.TEXT
        },
        priority: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        },
        assignmentDate: {
            type: Sequelize.DATEONLY
        },
        startDate: {
            type: Sequelize.DATEONLY
        },
        deadline: {
            type: Sequelize.DATEONLY
        },
        completionDate: {
            type: Sequelize.DATEONLY
        },
        seen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        paranoid: true
    });
};
exports.UserLog = function (sequelize, Sequelize) {
    return sequelize.define('userLogs', {
        userId: {
            type: Sequelize.INTEGER
        },
        logOutTime: {
            type: Sequelize.DATE,
            defaultValue: null
        }
    }, {
        paranoid: true,
        createdAt: 'loginTime'
    });
};
