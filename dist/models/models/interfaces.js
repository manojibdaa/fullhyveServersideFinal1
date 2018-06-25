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
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Received"] = 0] = "Received";
    MessageType[MessageType["Sent"] = 1] = "Sent";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var Contact = /** @class */ (function () {
    function Contact() {
    }
    return Contact;
}());
exports.Contact = Contact;
var Team = /** @class */ (function () {
    function Team() {
    }
    return Team;
}());
exports.Team = Team;
var MyTeam = /** @class */ (function (_super) {
    __extends(MyTeam, _super);
    function MyTeam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyTeam;
}(Team));
exports.MyTeam = MyTeam;
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var Project = /** @class */ (function () {
    function Project() {
    }
    return Project;
}());
exports.Project = Project;
var MyProject = /** @class */ (function () {
    function MyProject() {
    }
    return MyProject;
}());
exports.MyProject = MyProject;
var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());
exports.Message = Message;
