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
var RequestStatus;
(function (RequestStatus) {
    RequestStatus[RequestStatus["ACCEPTED"] = 0] = "ACCEPTED";
    RequestStatus[RequestStatus["REQUESTED"] = 1] = "REQUESTED";
    RequestStatus[RequestStatus["UNDECIDED"] = 2] = "UNDECIDED";
    RequestStatus[RequestStatus["REJECTED"] = 3] = "REJECTED";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
var FastSearchResult = /** @class */ (function () {
    function FastSearchResult() {
    }
    return FastSearchResult;
}());
exports.FastSearchResult = FastSearchResult;
var SearchFor;
(function (SearchFor) {
    SearchFor[SearchFor["General"] = 0] = "General";
    SearchFor[SearchFor["Specific"] = 1] = "Specific"; // search in the specific place
})(SearchFor = exports.SearchFor || (exports.SearchFor = {}));
var ReturnAttrType;
(function (ReturnAttrType) {
    ReturnAttrType[ReturnAttrType["Private"] = 0] = "Private";
    ReturnAttrType[ReturnAttrType["Public"] = 1] = "Public";
})(ReturnAttrType = exports.ReturnAttrType || (exports.ReturnAttrType = {}));
var SearchType;
(function (SearchType) {
    SearchType[SearchType["Fast"] = 0] = "Fast";
    SearchType[SearchType["Normal"] = 1] = "Normal";
    SearchType[SearchType["Detail"] = 2] = "Detail";
})(SearchType = exports.SearchType || (exports.SearchType = {}));
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
var MinTeam = /** @class */ (function () {
    function MinTeam() {
    }
    return MinTeam;
}());
exports.MinTeam = MinTeam;
var TeamForProject = /** @class */ (function (_super) {
    __extends(TeamForProject, _super);
    function TeamForProject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TeamForProject;
}(Team));
exports.TeamForProject = TeamForProject;
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
var MyTeam = /** @class */ (function (_super) {
    __extends(MyTeam, _super);
    function MyTeam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyTeam;
}(Team));
exports.MyTeam = MyTeam;
var Graph = /** @class */ (function () {
    function Graph() {
    }
    return Graph;
}());
exports.Graph = Graph;
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
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var MinUser = /** @class */ (function () {
    function MinUser() {
    }
    return MinUser;
}());
exports.MinUser = MinUser;
var Identity = /** @class */ (function (_super) {
    __extends(Identity, _super);
    function Identity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Identity;
}(User));
exports.Identity = Identity;
// export class UserSearch extends User{
//     request:string
// }
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Contact;
}(User));
exports.Contact = Contact;
var ChatMessage = /** @class */ (function (_super) {
    __extends(ChatMessage, _super);
    function ChatMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChatMessage;
}(Message));
exports.ChatMessage = ChatMessage;
var MessageStastus;
(function (MessageStastus) {
    MessageStastus[MessageStastus["UnSent"] = 0] = "UnSent";
    MessageStastus[MessageStastus["Seen"] = 1] = "Seen";
    MessageStastus[MessageStastus["Sent"] = 2] = "Sent";
})(MessageStastus = exports.MessageStastus || (exports.MessageStastus = {}));
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
var Image = /** @class */ (function () {
    function Image() {
    }
    return Image;
}());
exports.Image = Image;
var ImageSet = /** @class */ (function () {
    function ImageSet() {
    }
    return ImageSet;
}());
exports.ImageSet = ImageSet;
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
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Waiting"] = 0] = "Waiting";
    TaskStatus[TaskStatus["InProgress"] = 1] = "InProgress";
    TaskStatus[TaskStatus["PendingEvaluation"] = 2] = "PendingEvaluation";
    TaskStatus[TaskStatus["Approved"] = 3] = "Approved";
    TaskStatus[TaskStatus["Revise"] = 4] = "Revise";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
var Task = /** @class */ (function () {
    function Task() {
    }
    return Task;
}());
exports.Task = Task;
var Notification = /** @class */ (function () {
    function Notification() {
    }
    return Notification;
}());
exports.Notification = Notification;
var Option = /** @class */ (function () {
    function Option() {
    }
    return Option;
}());
exports.Option = Option;
var TaskOption = /** @class */ (function (_super) {
    __extends(TaskOption, _super);
    function TaskOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TaskOption;
}(Option));
exports.TaskOption = TaskOption;
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["FriendRequest"] = 0] = "FriendRequest";
    NotificationType[NotificationType["TeamRequest"] = 1] = "TeamRequest";
    NotificationType[NotificationType["ProjectTeamRequest"] = 2] = "ProjectTeamRequest";
    NotificationType[NotificationType["ProjectIndividualRequest"] = 3] = "ProjectIndividualRequest";
    NotificationType[NotificationType["Assignment"] = 4] = "Assignment";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
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
var Contributors = /** @class */ (function () {
    function Contributors() {
    }
    return Contributors;
}());
exports.Contributors = Contributors;
var Stage = /** @class */ (function () {
    function Stage() {
    }
    return Stage;
}());
exports.Stage = Stage;
var Contract = /** @class */ (function () {
    function Contract() {
    }
    return Contract;
}());
exports.Contract = Contract;
