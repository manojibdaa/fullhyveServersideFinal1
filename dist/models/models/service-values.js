"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LoginResponse = /** @class */ (function () {
    function LoginResponse() {
    }
    return LoginResponse;
}());
exports.LoginResponse = LoginResponse;
var Team = /** @class */ (function () {
    function Team() {
    }
    return Team;
}());
exports.Team = Team;
var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());
exports.Message = Message;
var TeamChatMessage = /** @class */ (function (_super) {
    __extends(TeamChatMessage, _super);
    function TeamChatMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TeamChatMessage;
}(Message));
exports.TeamChatMessage = TeamChatMessage;
var Announcement = /** @class */ (function () {
    function Announcement() {
    }
    return Announcement;
}());
exports.Announcement = Announcement;
/*
MyTeam[]
[Team[], MyTeam[]];
Announcement[];
Project[];
User[];
MyProject[]
[Project[], MyProject[]]
*/
// returns when requesting the list of teams that the user is a member of
var MyTeam = /** @class */ (function (_super) {
    __extends(MyTeam, _super);
    function MyTeam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyTeam;
}(Team));
exports.MyTeam = MyTeam;
var SearchTeams = /** @class */ (function () {
    function SearchTeams() {
    }
    return SearchTeams;
}());
exports.SearchTeams = SearchTeams;
var SearchProjects = /** @class */ (function () {
    function SearchProjects() {
    }
    return SearchProjects;
}());
exports.SearchProjects = SearchProjects;
var Graph = /** @class */ (function () {
    function Graph() {
    }
    return Graph;
}());
exports.Graph = Graph;
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Contact;
}(User));
exports.Contact = Contact;
var Pitch = /** @class */ (function () {
    function Pitch() {
    }
    return Pitch;
}());
exports.Pitch = Pitch;
var TransferRequest = /** @class */ (function () {
    function TransferRequest() {
    }
    return TransferRequest;
}());
exports.TransferRequest = TransferRequest;
var MessageStastus;
(function (MessageStastus) {
    MessageStastus[MessageStastus["UnSent"] = 0] = "UnSent";
    MessageStastus[MessageStastus["Seen"] = 1] = "Seen";
    MessageStastus[MessageStastus["Sent"] = 2] = "Sent";
})(MessageStastus = exports.MessageStastus || (exports.MessageStastus = {}));
var Task = /** @class */ (function () {
    function Task() {
    }
    return Task;
}());
exports.Task = Task;
var VisibilityGroup = /** @class */ (function () {
    function VisibilityGroup() {
    }
    return VisibilityGroup;
}());
exports.VisibilityGroup = VisibilityGroup;
var ProjectUserGroup;
(function (ProjectUserGroup) {
    ProjectUserGroup[ProjectUserGroup["founder"] = 0] = "founder";
    ProjectUserGroup[ProjectUserGroup["admin"] = 1] = "admin";
    ProjectUserGroup[ProjectUserGroup["supervisor"] = 2] = "supervisor";
    ProjectUserGroup[ProjectUserGroup["contributor"] = 3] = "contributor";
})(ProjectUserGroup = exports.ProjectUserGroup || (exports.ProjectUserGroup = {}));
var TeamUserGroup;
(function (TeamUserGroup) {
    TeamUserGroup[TeamUserGroup["founder"] = 0] = "founder";
    TeamUserGroup[TeamUserGroup["admin"] = 1] = "admin";
    TeamUserGroup[TeamUserGroup["member"] = 2] = "member";
})(TeamUserGroup = exports.TeamUserGroup || (exports.TeamUserGroup = {}));
var UserProjectLink = /** @class */ (function () {
    function UserProjectLink() {
    }
    return UserProjectLink;
}());
exports.UserProjectLink = UserProjectLink;
var TaskSet = /** @class */ (function () {
    function TaskSet() {
    }
    return TaskSet;
}());
exports.TaskSet = TaskSet;
var Project = /** @class */ (function () {
    function Project() {
    }
    return Project;
}());
exports.Project = Project;
var MyProject = /** @class */ (function (_super) {
    __extends(MyProject, _super);
    function MyProject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyProject;
}(Project));
exports.MyProject = MyProject;
var Stage = /** @class */ (function () {
    function Stage() {
    }
    return Stage;
}());
exports.Stage = Stage;
