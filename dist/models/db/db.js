"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var dbModels_1 = require("./dbModels");
var sequelize = new Sequelize('projecttracker', 'projecttracker', 'Fj7G6i-~4Vfx', {
    host: 'den1.mysql2.gear.host',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
// const sequelize = new Sequelize('projecttrackertest', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   });
sequelize
    .authenticate()
    .then(function () {
    console.log('Connection has been established successfully.');
})
    .catch(function (err) {
    console.error('Unable to connect to the database:', err);
});
exports.DB = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    op: Sequelize.Op,
    User: dbModels_1.User(sequelize, Sequelize),
    Skill: dbModels_1.Skill(sequelize, Sequelize),
    Team: dbModels_1.Team(sequelize, Sequelize),
    Announcement: dbModels_1.Announcement(sequelize, Sequelize),
    TeamMemberLastAnnSeen: dbModels_1.TeamMemberLastAnnSeen(sequelize, Sequelize),
    Message: dbModels_1.Message(sequelize, Sequelize),
    TeamUser: dbModels_1.TeamUser(sequelize, Sequelize),
    Contact: dbModels_1.Contact(sequelize, Sequelize),
    Project: dbModels_1.Project(sequelize, Sequelize),
    ProjectTeam: dbModels_1.ProjectTeam(sequelize, Sequelize),
    ProjectUser: dbModels_1.ProjectUser(sequelize, Sequelize),
    TaskSets: dbModels_1.TaskSets(sequelize, Sequelize),
    Task: dbModels_1.Task(sequelize, Sequelize),
    UserLog: dbModels_1.UserLog(sequelize, Sequelize)
};
// User - skill relation
// create one to many relationship betweeen user and skill
var skill = exports.DB.User.hasMany(exports.DB.Skill);
//Team - member relation
// create many to many relationship between teams and users table
exports.DB.Team.belongsToMany(exports.DB.User, {
    as: 'members',
    through: {
        model: exports.DB.TeamUser,
        unique: false
    }
});
//DB.TeamUser.hasMany(DB.User,{foreignKey:'userId',constraints:false});
//DB.TeamUser.hasMany(DB.Team,{foreignKey:'teamId',constraints:false});
exports.DB.User.belongsToMany(exports.DB.Team, {
    as: 'teams',
    through: {
        model: exports.DB.TeamUser,
        unique: false
    }
});
// create many to one relationship between teams and user(a user can be a leader of many teams)
exports.DB.User.Team = exports.DB.User.hasMany(exports.DB.Team, { as: 'leader', foreignKey: 'leaderId', sourceKey: 'id' });
exports.DB.Team.User = exports.DB.Team.belongsTo(exports.DB.User, { foreignKey: 'leaderId', sourceKey: 'id' });
// User - friend realtion
// create friend relationship between users
exports.DB.User.belongsToMany(exports.DB.User, {
    as: 'friend',
    through: {
        model: exports.DB.Contact,
        unique: false
    }
});
// Message - sender relation
exports.DB.Message.belongsTo(exports.DB.User, { foreignKey: 'senderId' }); //?????
exports.DB.User.hasMany(exports.DB.Message, { foreignKey: 'senderId' });
// Contact - Message relation
// give contactid to message to identify for which chat it belongs to
exports.DB.Contact.hasMany(exports.DB.Message, { as: 'chat' });
// Announcement relation
exports.DB.Team.hasMany(exports.DB.Announcement);
exports.DB.User.hasMany(exports.DB.Announcement);
exports.DB.Announcement.belongsTo(exports.DB.User);
exports.DB.Announcement.belongsTo(exports.DB.Team, { foreignKey: 'teamId' });
exports.DB.Announcement.hasMany(exports.DB.Announcement, { as: 'replies', foreignKey: 'mainAnnouncementId' });
exports.DB.Announcement.hasMany(exports.DB.TeamMemberLastAnnSeen, { foreignKey: 'lastSeenAnnouncementId' });
exports.DB.Team.hasMany(exports.DB.TeamMemberLastAnnSeen, { foreignKey: 'teamId' });
exports.DB.User.hasMany(exports.DB.TeamMemberLastAnnSeen, { foreignKey: 'userId' });
// Project - leader relation
// create one to many relationship between user and projects( a user can be a leader of many projects)
var pleader = exports.DB.Project.belongsTo(exports.DB.User, { foreignKey: 'leaderId' });
exports.DB.User.hasMany(exports.DB.Project, { as: 'myProjects', foreignKey: 'leaderId' });
// Project - individual contributor
exports.DB.User.belongsToMany(exports.DB.Project, { as: 'individualProjects', through: exports.DB.ProjectUser });
exports.DB.Project.belongsToMany(exports.DB.User, { as: 'individualMembers', through: exports.DB.ProjectUser });
// Project - Task
exports.DB.Task.belongsTo(exports.DB.Project, { foreignKey: 'projectId' });
// a project can have many teams and one team can be in many projects
exports.DB.Project.belongsToMany(exports.DB.Team, { through: exports.DB.ProjectTeam });
exports.DB.Team.belongsToMany(exports.DB.Project, { through: exports.DB.ProjectTeam });
// TaskSet - Team relation
exports.DB.TaskSets.belongsTo(exports.DB.Team, { as: 'team' });
// Project - set relation
// a project has many sets
exports.DB.TaskSets.belongsTo(exports.DB.Project);
exports.DB.Project.hasMany(exports.DB.TaskSets);
// Set - task relation
// a set can have many tasks
exports.DB.TaskSets.hasMany(exports.DB.Task);
exports.DB.Task.belongsTo(exports.DB.TaskSets);
// Task - Assigner
// a user can be a leader of many tasks
exports.DB.Task.belongsTo(exports.DB.User, { as: 'assigner' });
// Task - Assignee user
// a task is assigned to one user
exports.DB.Task.belongsTo(exports.DB.User, { as: 'assignee' });
// Task - Assignee team
// a team can have many tasks
exports.DB.Task.belongsTo(exports.DB.Team, { as: 'assigneeTeam', foreignKey: 'assigneeTeamId' });
exports.DB.Team.hasMany(exports.DB.Task, { as: 'tasks', foreignKey: 'assigneeTeamId' });
// User - UserLog
exports.DB.User.hasMany(exports.DB.UserLog);
sequelize.sync();
