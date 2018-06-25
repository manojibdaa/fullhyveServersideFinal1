"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serviceValues_1 = require("../models/serviceValues");
var constant_1 = require("../constants/constant");
var UtilMethods = /** @class */ (function () {
    function UtilMethods() {
    }
    UtilMethods.getTeamProjectAttr = function (values) {
        var returns = [];
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var i = values_1[_i];
            returns.push({
                id: i.get('id'),
                name: i.get('name'),
                image: i.get('image')
            });
        }
        return returns;
    };
    UtilMethods.getFastUserAttr = function (users) {
        var usersReturn = [];
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var i = users_1[_i];
            usersReturn.push({
                id: i.get('id'),
                name: i.get('firstName') + " " + i.get('lastName'),
                image: i.get('image')
            });
        }
        return usersReturn;
    };
    UtilMethods.getUserAttr = function (users) {
        var userReturn = [];
        for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
            var user = users_2[_i];
            var skills = user.skills;
            var skill = [];
            for (var _a = 0, skills_1 = skills; _a < skills_1.length; _a++) {
                var b = skills_1[_a];
                skill.push(b.dataValues.skill);
            }
            userReturn.push({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                title: user.title,
                skills: skill,
                description: user.description,
                request: serviceValues_1.RequestStatus.ACCEPTED
            });
        }
        return userReturn;
    };
    UtilMethods.getMinUserAttr = function (users) {
        var userReturn = [];
        for (var _i = 0, users_3 = users; _i < users_3.length; _i++) {
            var user = users_3[_i];
            userReturn.push({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
            });
        }
        return userReturn;
    };
    UtilMethods.getUserProfileAttr = function (users) {
        var userReturn = [];
        for (var _i = 0, users_4 = users; _i < users_4.length; _i++) {
            var user = users_4[_i];
            var skills = user.skills;
            var skill = [];
            for (var _a = 0, skills_2 = skills; _a < skills_2.length; _a++) {
                var b = skills_2[_a];
                skill.push(b.dataValues.skill);
            }
            userReturn.push({
                id: user.id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
                title: user.title,
                skills: skill,
                description: user.description,
                request: serviceValues_1.RequestStatus.REJECTED
            });
        }
        return userReturn;
    };
    UtilMethods.getMemberCount = function (members) {
        var memberCount = 0;
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            if (member.TeamUsers.request == 'Accepted') {
                memberCount++;
            }
        }
        return memberCount;
    };
    UtilMethods.getTeamAttr = function (teams, type) {
        if (type === void 0) { type = serviceValues_1.SearchFor.General; }
        var teamsReturn = [];
        for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
            var a = teams_1[_i];
            var teamDetail = {};
            var team = a.get();
            var leaders = UtilMethods.getUserAttr([team.user]);
            // console.log(team.members);
            teamDetail = {
                id: team.id,
                name: team.name,
                focus: team.focus,
                image: team.image,
                description: team.description,
                memberCount: UtilMethods.getMemberCount(team.members) + 1,
                leader: leaders[0]
            };
            if (type == serviceValues_1.SearchFor.Specific) {
                // console.log(team.Announcements);
                teamDetail.unseenAnnouncements = 0;
            }
            teamsReturn.push(teamDetail);
        }
        return teamsReturn;
    };
    UtilMethods.getMinTeamAttr = function (teams) {
        var teamsReturn = [];
        for (var _i = 0, teams_2 = teams; _i < teams_2.length; _i++) {
            var team = teams_2[_i];
            var teamDetail = {};
            teamDetail = {
                id: team.id,
                name: team.name,
                image: team.image,
            };
            teamsReturn.push(teamDetail);
        }
        return teamsReturn;
    };
    UtilMethods.getContributorCount = function (project, leaderId) {
        var contributorsId = {};
        contributorsId[leaderId] = true;
        for (var _i = 0, _a = project.teams; _i < _a.length; _i++) {
            var team = _a[_i];
            if (team.projectTeams.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                for (var _b = 0, _c = team.members; _b < _c.length; _b++) {
                    var user = _c[_b];
                    if (user.TeamUsers.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                        contributorsId[user.id] = true; // team members
                    }
                }
                contributorsId[team.leaderId] = true; // team leader
            }
        }
        for (var _d = 0, _e = project.individualMembers; _d < _e.length; _d++) {
            var individualMember = _e[_d];
            if (individualMember.projectUsers.request == constant_1.UserConst.REQUEST.ACCEPTED) {
                contributorsId[individualMember.id] = true; // individual contributors
            }
        }
        return Object.keys(contributorsId).length;
    };
    UtilMethods.getProjectAttr = function (projects) {
        var projectsReturn = [];
        for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
            var project = projects_1[_i];
            var projectDetail = {};
            var leader = UtilMethods.getUserAttr([project.user])[0];
            var contributors = UtilMethods.getContributorCount(project, Number.parseInt(leader.id));
            projectDetail = {
                id: project.id,
                name: project.name,
                image: project.image,
                description: project.description,
                field: project.field,
                leader: leader,
                contributorCount: contributors
            };
            projectsReturn.push(projectDetail);
        }
        return projectsReturn;
    };
    UtilMethods.getAnnouncementAttr = function (announcements, userId, lastSeenAnnouncementId, showReply) {
        if (showReply === void 0) { showReply = true; }
        var announcementReturn = [];
        for (var _i = 0, announcements_1 = announcements; _i < announcements_1.length; _i++) {
            var a = announcements_1[_i];
            console.log(announcements[0].user);
            var sender = UtilMethods.getUserAttr([a.user]);
            var seen = a.id > (lastSeenAnnouncementId == null ? constant_1.AnnouncementConst.START_ID : lastSeenAnnouncementId) ? false : true;
            var annR = void 0;
            annR = {
                mainMessage: {
                    id: a.id,
                    message: a.message,
                    timestamp: a.timestamp,
                    sent: a.userId == userId ? true : false,
                    seen: seen,
                    sender: sender[0]
                },
                replies: []
            };
            if (showReply) {
                var replies = a.get('replies');
                for (var _a = 0, replies_1 = replies; _a < replies_1.length; _a++) {
                    var b = replies_1[_a];
                    var rSender = UtilMethods.getUserAttr([b.user]);
                    annR.replies.push({
                        id: b.id,
                        message: b.message,
                        timestamp: b.timestamp,
                        sent: true,
                        seen: seen,
                        sender: rSender[0]
                    });
                }
            }
            announcementReturn.push(annR);
        }
        return announcementReturn;
    };
    UtilMethods.getNewAnnouncementAttr = function (announcement, userId) {
        return {
            mainMessage: {
                id: announcement.id,
                message: announcement.message,
                timestamp: announcement.timestamp,
                sent: announcement.userId == userId ? true : false,
                seen: false
            }
        };
    };
    UtilMethods.getTasksetAttr = function (userId, sets) {
        var setsReturn = [];
        for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
            var set = sets_1[_i];
            var setR = void 0;
            var assignment = 0;
            var completion = 0;
            for (var _a = 0, _b = set.tasks; _a < _b.length; _a++) {
                var task = _b[_a];
                if (task.assigneeId == userId) {
                    assignment++;
                }
                if (task.status != null && task.status == serviceValues_1.TaskStatus.Approved) {
                    completion++;
                }
            }
            completion = completion > 0 ? Number.parseInt(((completion / set.tasks.length) * 100).toFixed()) : completion;
            setR = {
                id: set.id,
                name: set.name,
                number: set.number,
                deadline: set.deadline,
                description: set.description,
                completion: completion,
                assignment: assignment
            };
            setsReturn.push(setR);
        }
        return setsReturn;
    };
    UtilMethods.getTaskAttr = function (tasks) {
        var tasksReturn = [];
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var task = tasks_1[_i];
            var taskR = void 0;
            taskR = {
                id: task.id,
                number: task.number,
                title: task.title,
                description: task.description,
                status: task.status,
                deadline: task.deadline,
                assignmentDate: task.assignmentDate,
                assigner: UtilMethods.getUserAttr([task.assigner])[0],
                assignee: UtilMethods.getUserAttr([task.assignee])[0],
                assigneeTeam: task.assigneeTeam ? UtilMethods.getTeamAttr([task.assigneeTeam])[0] : null
            };
            tasksReturn.push(taskR);
        }
        return tasksReturn;
    };
    UtilMethods.getUnseenTasksAttr = function (projects) {
        var messagesReturn = [];
        for (var projectId in projects) {
            var proj = projects[projectId];
            messagesReturn.push({
                id: projectId,
                image: proj.image,
                comment: "You have been assigned " + proj.count + " new task" + (proj.count == 1 ? '' : 's') + " on project " + proj.name + ".",
                options: UtilMethods.getOptions(serviceValues_1.NotificationType.Assignment, projectId)
            });
        }
        return messagesReturn;
    };
    UtilMethods.getUnseenMessagesAttr = function (messages) {
        var messagesReturn = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            var sender = UtilMethods.getUserAttr([message.user])[0];
            messagesReturn.push({
                message: {
                    id: message.id,
                    message: message.message,
                    timestamp: message.timestamp,
                    seen: message.seen,
                },
                sender: sender
            });
        }
        return messagesReturn;
    };
    UtilMethods.getMessagesAttr = function (messages, userId) {
        var messagesReturn = [];
        for (var _i = 0, messages_2 = messages; _i < messages_2.length; _i++) {
            var message = messages_2[_i];
            messagesReturn.push({
                id: message.id,
                message: message.message,
                seen: message.seen,
                timestamp: message.timestamp,
                sent: message.senderId == userId ? true : false
            });
        }
        return messagesReturn;
    };
    // notifications
    UtilMethods.getOptions = function (notificationType, id) {
        if (notificationType != serviceValues_1.NotificationType.Assignment) {
            return [
                {
                    // navigation:false,
                    type: notificationType,
                    name: 'Accept',
                    id: id
                },
                {
                    // navigation:false,
                    type: notificationType,
                    name: 'Decline',
                    id: id
                }
            ];
        }
        else if (notificationType == serviceValues_1.NotificationType.Assignment) {
            return [
                {
                    // navigation:true,
                    type: notificationType,
                    name: 'View',
                    id: id
                }
            ];
        }
        return [];
    };
    UtilMethods.getFriendRequestAttr = function (senders, friendsId) {
        var friendRequestsReturn = [];
        for (var _i = 0, senders_1 = senders; _i < senders_1.length; _i++) {
            var sender = senders_1[_i];
            friendRequestsReturn.push({
                id: friendsId[sender.id],
                image: sender.image,
                comment: "You have a friend request from " + sender.firstName + " " + sender.lastName + ".",
                options: UtilMethods.getOptions(serviceValues_1.NotificationType.FriendRequest, friendsId[sender.id])
            });
        }
        return friendRequestsReturn;
    };
    UtilMethods.getTeamJoinRequestAttr = function (senders, friendsId) {
        var teamJoinRequestsReturn = [];
        for (var _i = 0, senders_2 = senders; _i < senders_2.length; _i++) {
            var sender = senders_2[_i];
            teamJoinRequestsReturn.push({
                id: friendsId[sender.id],
                image: sender.image,
                comment: "You have been invited to team " + sender.name + ".",
                options: UtilMethods.getOptions(serviceValues_1.NotificationType.TeamRequest, friendsId[sender.id])
            });
        }
        return teamJoinRequestsReturn;
    };
    // offset and limit
    UtilMethods.sliceCustom = function (values, order, offset, limit) {
        for (var _i = 0, order_1 = order; _i < order_1.length; _i++) {
            var i = order_1[_i];
            var length_1 = values[i].length;
            values.count += length_1;
            values[i] = values[i].slice(offset, offset + limit);
            if (offset + limit > length_1) {
                limit = offset + limit - length_1;
                if (offset > length_1) {
                    offset = offset - length_1;
                }
                else {
                    offset = 0;
                }
            }
            else {
                offset = limit = 0;
            }
        }
        if (offset + limit >= values.count) {
            values.done = true;
        }
        else {
            values.done = false;
        }
        delete values.count;
        return values;
    };
    UtilMethods.getRequestStatus = function (userId, senderId, request) {
        switch (request) {
            case constant_1.UserConst.REQUEST.ACCEPTED: {
                return serviceValues_1.RequestStatus.ACCEPTED;
            }
            case constant_1.UserConst.REQUEST.UNDECIDED: {
                if (userId == senderId) {
                    return serviceValues_1.RequestStatus.UNDECIDED;
                }
                else {
                    return serviceValues_1.RequestStatus.REQUESTED;
                }
            }
            case constant_1.UserConst.REQUEST.REJECTED:
            case constant_1.UserConst.REQUEST.REMOVED:
                {
                    return serviceValues_1.RequestStatus.REJECTED;
                }
            default: {
                return serviceValues_1.RequestStatus.REJECTED;
            }
        }
    };
    return UtilMethods;
}());
exports.UtilMethods = UtilMethods;
var DateMethods = /** @class */ (function () {
    function DateMethods() {
    }
    DateMethods.getTodayDate = function () {
        var today = new Date();
        var todayDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        return todayDate;
    };
    DateMethods.getLastMonthDate = function () {
        var today = new Date();
        var todayDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        var lastMonthDate = (today.getMonth() > 0 ? today.getFullYear() : today.getFullYear() - 1) + "-" + (today.getMonth() > 0 ? today.getMonth() : 11) + "-" + today.getDate();
        return lastMonthDate;
    };
    // month can't be greater than 12
    DateMethods.getMonthDate = function (monthBack) {
        var today = new Date();
        var year, month, date;
        if (today.getMonth() + 1 - monthBack > 0) {
            month = today.getMonth() + 1 - monthBack;
            if (today.getDate() > DateMethods.DaysInMonth[month]) {
                date = DateMethods.DaysInMonth[month];
            }
            else {
                date = today.getDate();
            }
            year = today.getFullYear();
        }
        else {
            month = (today.getMonth() - monthBack) + 13;
            if (today.getDate() > DateMethods.DaysInMonth[month]) {
                date = DateMethods.DaysInMonth[month];
            }
            else {
                date = today.getDate();
            }
            year = today.getFullYear() - 1;
        }
        return year + "-" + month + "-" + date;
    };
    // week can't be greater than 4
    DateMethods.getWeekDate = function (week, startDate) {
        var today = new Date();
        if (!startDate) {
            today = new Date(startDate);
        }
        var year, month, date;
        if (today.getDate() - 7 * week > 0) {
            date = today.getDate() - 7 * week; // previous week
            month = today.getMonth() + 1;
            year = today.getFullYear();
        }
        else {
            if (today.getMonth() > 0) {
                date = (DateMethods.DaysInMonth[today.getMonth()] + today.getDate()) - (7 * week); // previous week
                month = today.getMonth(); // previous month
                year = today.getFullYear();
            }
            else {
                date = (DateMethods.DaysInMonth[today.getMonth()] + today.getDate()) - (7 * week);
                month = 11; // previous month
                year = today.getFullYear() - 1; // previous year
            }
        }
        return year + "-" + month + "-" + date;
    };
    DateMethods.getInterval = function (startDate, finalDate) {
        var sDate = new Date(startDate);
        var eDate = new Date(finalDate);
        return Math.abs(eDate - sDate) / 86400000;
    };
    DateMethods.DaysInMonth = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    };
    return DateMethods;
}());
exports.DateMethods = DateMethods;
