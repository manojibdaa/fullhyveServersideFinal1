"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io");
var authenticationM_1 = require("../middlewares/authenticationM");
var validate_1 = require("../models/util/validate");
var chatServices_1 = require("../models/services/chatServices");
var authorizationInfo_1 = require("../models/util/authorizationInfo");
var chatM_1 = require("../middlewares/chatM");
var userM_1 = require("../middlewares/userM");
var teamM_1 = require("../middlewares/teamM");
var projectM_1 = require("../middlewares/projectM");
var constant_1 = require("../models/constants/constant");
var userServices_1 = require("../models/services/userServices");
var RealtimeServer = /** @class */ (function () {
    function RealtimeServer(server) {
        this.initiateSockets(server);
        this.listen();
    }
    RealtimeServer.prototype.initiateSockets = function (server) {
        this.io = socketIo(server);
    };
    RealtimeServer.prototype.parseData = function (data) {
        if (typeof data[1] == 'string') {
            data[1] = JSON.parse(data[1]);
        }
        return data;
    };
    RealtimeServer.prototype.authenticateRequest = function (socket, data, next) {
        data = this.parseData(data);
        console.log(data);
        if (constant_1.ExcludeAuthentication.hasOwnProperty(data[0])) {
            next();
        }
        else {
            if (socket.hasOwnProperty('thisUser')) {
                data[1].thisUser = socket.thisUser;
                next();
            }
            else {
                if (data[1].hasOwnProperty('token')) {
                    var tokens = data[1].token.trim().split(' ');
                    if (tokens.length <= 1) {
                        socket.emit('authenticationError', { success: false, code: 401, message: "Invalid token", data: null });
                    }
                    else {
                        authenticationM_1.Authentication.verifyTokenReal(tokens[1])
                            .then(function (response) {
                            if (response) {
                                socket.thisUser = response.thisUser;
                                data[1].thisUser = socket.thisUser;
                                // add to list of online users
                                RealtimeServer.socketMain['/chat'].onlineUsers[socket.thisUser.id] = socket;
                                next();
                            }
                            else {
                                socket.emit('authenticationError', { success: false, code: 401, message: "Invalid token", data: null });
                            }
                        });
                    }
                }
                else {
                    socket.emit('authenticationError', { success: false, code: 401, message: "Invalid token", data: null });
                }
            }
        }
    };
    RealtimeServer.prototype.validateRequest = function (socket, data, next) {
        if (Object.keys(data[1].reqData).length > 0) {
            var result = validate_1.Validation.validateReal(data[0], data[1].reqData);
            if (result) {
                console.log(result);
                if (result.status) {
                    data[1].validData = result.data.validData;
                    next();
                }
                else {
                    socket.emit('validationError', { success: false, code: 400, message: "Invalid input", data: result.data });
                }
            }
            else {
                socket.emit('unknownActionRequestError', { success: false, code: 400, message: "Invalid input", data: null });
            }
        }
        else {
            next();
        }
    };
    RealtimeServer.prototype.checkAuthority = function (socket, data, next) {
        console.log(data);
        if (authorizationInfo_1.requiredAuthorization.hasOwnProperty(data[0])) {
            var authorized = false;
            var _loop_1 = function (i) {
                var auth = authorizationInfo_1.requiredAuthorization[data[0]][i];
                console.log(data[1]);
                auth(data[1])
                    .then(function (authorized) {
                    console.log(authorized);
                    if (!authorized) {
                        console.log("Emitted==============================================");
                        socket.emit("authorizationError", { success: false, code: 403, message: "Unauthorized access", data: null });
                        return;
                    }
                    if (i + 1 >= authorizationInfo_1.requiredAuthorization[data[0]].length) {
                        next();
                    }
                });
            };
            for (var i = 0; i < authorizationInfo_1.requiredAuthorization[data[0]].length; i++) {
                _loop_1(i);
            }
        }
        else {
            // console.log('Authorized');
            next();
        }
    };
    RealtimeServer.prototype.listen = function () {
        var _this = this;
        RealtimeServer.socketMain['/chat'].server = this.io.of('/chat');
        RealtimeServer.socketMain['/chat'].server.on('connect', function (socket) {
            console.log("Connected");
            //let v:SocketIO.Socket;
            // chat   =================================================
            // authenticate user when socket is created
            socket.use(function (data, next) {
                _this.authenticateRequest(socket, data, next);
            })
                .use(function (data, next) {
                _this.validateRequest(socket, data, next);
            })
                .use(function (data, next) {
                _this.checkAuthority(socket, data, next);
            })
                .on('signup', userM_1.UserM.register)
                .on('checkUserName', userM_1.UserM.checkUsername)
                .on('signin', authenticationM_1.Authentication.createToken)
                .on('signout', userM_1.UserM.logout)
                .on('editProfile', userM_1.UserM.editProfile)
                .on('addFriend', userM_1.UserM.addFriend)
                .on('replyFriendRequest', userM_1.UserM.replyFriendRequest)
                .on('unfriend', userM_1.UserM.unfriend)
                .on('getNotifications', userM_1.UserM.getNotifications)
                .on('getProfile', userM_1.UserM.getProfile)
                .on('getUserProfile', userM_1.UserM.getUserProfile)
                .on('getMessages', chatM_1.ChatM.getMessages)
                .on('getFriends', chatM_1.ChatM.getFriends)
                .on('searchUsers', chatM_1.ChatM.searchUsers)
                .on('updateMessageSeen', chatM_1.ChatM.updateSeen)
                .on('sendMessage', chatM_1.ChatM.sendMessage)
                .on('editMessage', chatM_1.ChatM.editMessage)
                .on('forwardMessage', chatM_1.ChatM.forwardMessage)
                .on('deleteMessage', chatM_1.ChatM.deleteMessage)
                .on('getFriendLastSeenTime', chatM_1.ChatM.getFriendLastSeenTime)
                .on('getMyTeams', teamM_1.TeamM.getMyTeams)
                .on('searchTeams', teamM_1.TeamM.searchTeams)
                .on('getTeamMembers', teamM_1.TeamM.getTeamMembers)
                .on('getTeamProjects', teamM_1.TeamM.getTeamProjects)
                .on('getTeamAnnouncements', teamM_1.TeamM.getTeamAnnouncement)
                .on('announce', teamM_1.TeamM.announceAndReply)
                .on('replyAnnouncement', teamM_1.TeamM.reply)
                .on('updateAnnouncementSeen', teamM_1.TeamM.updateAnnouncementSeen)
                .on('newTeam', teamM_1.TeamM.addNewTeam)
                .on('addMembers', teamM_1.TeamM.addTeamMember)
                .on('removeMembers', teamM_1.TeamM.removeTeamMember)
                .on('replyTeamJoinRequest', teamM_1.TeamM.replyTeamJoinRequest)
                .on('editAnnouncementReply', teamM_1.TeamM.editAnnouncementReply)
                .on('deleteAnnouncement', teamM_1.TeamM.deleteAnnouncement)
                .on('deleteReply', teamM_1.TeamM.deleteReply)
                .on('editTeamProfile', teamM_1.TeamM.editTeamProfile)
                .on('deleteTeam', teamM_1.TeamM.deleteTeam)
                .on('getMyTeamProfile', teamM_1.TeamM.getTeamProfile)
                .on('getMyProjects', projectM_1.ProjectM.getMyProjects)
                .on('searchProjects', projectM_1.ProjectM.searchProjects)
                .on('getContributors', projectM_1.ProjectM.getContributors)
                .on('getTasksets', projectM_1.ProjectM.getTaskSets)
                .on('getTasks', projectM_1.ProjectM.getTasks)
                .on('newProject', projectM_1.ProjectM.newProject)
                .on('addContributors', projectM_1.ProjectM.addContributors)
                .on('removeContributors', projectM_1.ProjectM.removeContributors)
                .on('replyIndividualContributorJoinRequest', projectM_1.ProjectM.replyIndividualContributorJoinRequest)
                .on('replyTeamContributorJoinRequest', projectM_1.ProjectM.replyTeamContributorJoinRequest)
                .on('newTaskset', projectM_1.ProjectM.newSet)
                .on('deleteTaskset', projectM_1.ProjectM.removeSet)
                .on('newTask', projectM_1.ProjectM.newTask)
                .on('startTask', projectM_1.ProjectM.startTask)
                .on('completeTask', projectM_1.ProjectM.completeTask)
                .on('changeTaskStatus', projectM_1.ProjectM.changeTaskStatus)
                .on('deleteTask', projectM_1.ProjectM.removeTask)
                .on('addContributors', projectM_1.ProjectM.addContributors)
                .on('removeContributors', projectM_1.ProjectM.removeContributors)
                .on('editProjectDetails', projectM_1.ProjectM.editProjectDetails)
                .on('deleteProject', projectM_1.ProjectM.deleteProject)
                .on('getMyProjectProfile', projectM_1.ProjectM.getProjectProfile)
                .on('userConnected', function (data, callback) {
                console.log(socket.hasOwnProperty('thisUser'));
                RealtimeServer.socketMain['/chat'].onlineUsers[data.id] = socket;
                callback({ success: true, code: 200, message: null, data: null });
                // let userId:any = data.thisUser.id;
                // ChatS.getUsersIdList(userId)
                // .then((friendsId)=>{
                //     for(let fId of friendsId){
                //         if(this.socket['/chat'].onlineUsers.hasOwnProperty(fId)){
                //             socket.emit('friendConnected', {userId:userId, timestamp:new Date()});
                //         }
                //     }
                //     callback({success:true, code:200, message:null,data: null});
                // });
            })
                .on('disconnect', function (data, callback) {
                console.log("Disconnected");
                if (socket.hasOwnProperty('thisUser')) {
                    var userId_1 = socket.thisUser.id;
                    userServices_1.UserS.logout(userId_1)
                        .then(function (status) {
                        return chatServices_1.ChatS.getUsersIdList(userId_1);
                    })
                        .then(function (friendsId) {
                        for (var _i = 0, friendsId_1 = friendsId; _i < friendsId_1.length; _i++) {
                            var fId = friendsId_1[_i];
                            if (RealtimeServer.socketMain['/chat'].onlineUsers.hasOwnProperty(fId)) {
                                socket.emit('friendDisconnected', { userId: userId_1, timestamp: new Date() });
                            }
                        }
                        delete RealtimeServer.socketMain['/chat'].onlineUsers[userId_1];
                        //callback({success:true, code:200, message:null,data: null});
                    });
                }
            });
        });
    };
    RealtimeServer.isFriendOnline = function (friendId) {
        if (RealtimeServer.socketMain['/chat'].onlineUsers.hasOwnProperty(friendId)) {
            return true;
        }
        return false;
    };
    RealtimeServer.socketMain = {
        '/chat': {
            server: null,
            onlineUsers: {}
        }
    };
    return RealtimeServer;
}());
exports.RealtimeServer = RealtimeServer;
// .on('getOnlineUsers',(data:any)=>{
//     //console.log(this.socket['/chat'].onlineUsers);
//     //socket.emit("onlineUsers",this.socket['/chat'].onlineUsers);
// })
// .on('socketDetail',(data:any)=>{
//     console.log(this.socket['/chat'].onlineUsers);
//     //socket.emit("onlineUsers",this.socket['/chat'].onlineUsers);
// })
// .on('join', (data:any) => {
//     console.log(data);
//     socket.join(data.room);
//     this.socket['/chat'].onlineUsers[data.id].join(data.room);
//     console.log('Users connected');
// })
// // .on('sendMessage', function (data:any) {
// //     console.log(data);
// //     //data.room = "room-1";
// //     //socket.to(data.room).emit('receiveMessage',{message:data.message});
// //     socket.to(data.room).emit('receiveMessage',data.reqData.message);
// // })
// .on('getMessages', (data:any, callback:any)=>{
//     let userId:number = socket.thisUser.id;
//     let friendId:number = data.validData.friendId;
//     let offset:number = data.validData.offset;
//     let limit:number = data.validData.limit;
//     ChatS.getChatMessages(userId, friendId, offset, limit)
//     .then((result)=>{
//         socket.emit('getMessages', {success:true, code:200, message:null, data:result});
//     })
//     .catch((err)=>{
//         socket.emit('serverError', {success:false, code:500, message:"Internal server error", data:null});
//     });                
// })
// .on('getFriends', (data:any, callback:any)=>{
//     let userId:number = socket.thisUser.id;
//     let offset:number = data.validData.offset;
//     let limit:number = data.validData.limit;
//     ChatS.getChatFriends(userId, offset, limit)
//     .then((result)=>{
//         socket.emit('getFriends', {success:true, code:200, message:null, data:result});
//     })
//     .catch((err)=>{
//         socket.emit('serverError', {success:false, code:500, message:"Internal server error", data:null});
//     });                   
// })
// .on('searchUsers', (data:any, callback:any)=>{
//     let userId:number = socket.thisUser.id;
//     let name:string = data.validData.name;
//     let offset:number = data.validData.offset;
//     let limit:number = data.validData.limit;
//     ChatS.searchUsers(userId,name,offset,limit)
//     .then((result)=>{
//         socket.emit('searchUsers', {success:true, code:200, message:null, data:result});
//     })
//     .catch((err)=>{
//         socket.emit('serverError', {success:false, code:500, message:"Internal server error", data:null});
//     });  
// })
// .on('updateMessageSeen', (data:any, callback:any)=>{
//     let userId:number = socket.thisUser.id;
//     let lastMessageId:number = data.validData.lastMessageId;
//     ChatS.getContactIdFromMessageId(lastMessageId)
//     .then((contactId:number)=>{
//         return ChatS.updateSeen(userId,contactId, lastMessageId);
//     })
//     .then((status)=>{
//         socket.emit('updateMessageSeen', {success:true, code:200, message:null, data:null});
//     })
//     .catch((err)=>{
//         socket.emit('serverError', {success:false, code:500, message:"Internal server error", data:null});
//     }); 
// })
// .on('sendMessage', this.check /*(data:any, callback:any)=>{*/
//      //console.log(data);
// //     //this.socket['/chat'].onlineUsers[data.reqData.friendId].emit("receiveMessageR", {success:true, code:200, message:null,data: {id:2, message:data.reqData.message, timestamp:"Old", seen:false, sent:false}})
// //     //callback({id:2,message:"Hello men",timestamp:"Old",seen:false});
// //     //callback({success:true, code:200, message:"Successfully fetched",data: {id:2, message:"Hello men", timestamp:"Old", seen:false, sent:true}});
// //     if(data.checked) callback(data.checked);
// //     // let userId:number = socket.thisUser.id;
// //     // let friendId:number = data.validData.friendId;
// //     // let message:string = data.validData.message;
// //     // ChatS.sendChatMessage(userId, friendId, message)
// //     // .then((result)=>{
// //     //     callback({success:true, code:200, message:null, data:result});
// //     //     //socket.emit('sendMessage', {success:true, code:200, message:null, data:result});
// //     // })
// //     // .catch((err)=>{
// //     //     callback({success:false, code:500, message:"Internal server error", data:null});
// //     //     //socket.emit('serverError', {success:false, code:500, message:"Internal server error", data:null});
// //     // });  
// //}
// )
// .on('editMessage', (data:any, callback:any)=>{
//     if(data.checked){
//         callback(data.checked);
//     }
//     let messageId:number = data.validData.messageId;
//     let content:string = data.validData.content;
//     ChatS.editMessage(messageId, content)
//     .then((status)=>{
//         socket.emit('editMessage', {success:true, code:200, message:null, data:null});
//     })
//     .catch((err)=>{
//         socket.emit('serverError', {success:false, code:500, message:"Internal server error", data:null});
//     }); 
// })
// .on('forwardMessage', (data:any, callback:any)=>{
//     let userId:number = socket.thisUser.id;
//     let friendIds:number[] = data.validData.friendIds;
//     let messageId:number = data.validData.messageId;
//     ChatS.forwardMessage(userId, friendIds, messageId)
//     .then((result)=>{
//         socket.emit('forwardMessage', {success:true, code:200, message:null, data:result});
//     })
//     .catch((err)=>{
//         socket.emit('serverError', {success:false, code:500, message:"Internal server error", data:null});
//     });  
// })
// .on('deleteMessage', (data:any, callback:any)=>{
//     let messageId:number = data.validData.messageId;
//     ChatS.deleteMessage(messageId)
//     .then((status)=>{
//         socket.emit('deleteMessage', {success:true, code:200, message:null, data:null});
//     })
//     .catch((err)=>{
//         socket.emit('serverError', {success:false, code:500, message:"Internal server error", data:null});
//     }); 
// })
// .on('getFriendLastSeenTime', (data:any, callback:any)=>{
//     let friendId:number = data.validData.friendId;
//     ChatS.getFriendLastSeenTime(friendId)
//     .then((result)=>{
//         socket.emit('getFriendLastSeenTime', {success:true, code:200, message:null, data:result});
//     })
//     .catch((err)=>{
//         socket.emit('serverError', {success:false, code:500, message:"Internal server error", data:null});
//     });  
// })
