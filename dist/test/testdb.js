"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../models/db/db");
var SeedData_1 = require("./SeedData");
var constant_1 = require("../models/constants/constant");
var TestDb = /** @class */ (function () {
    function TestDb() {
    }
    TestDb.init = function (newDb) {
        TestDb.initDb(newDb);
        //TestDb.addMessages();
        //TestDb.addTask();
        //TestDb.addProject();
    };
    TestDb.initDb = function (newDb) {
        var _this = this;
        db_1.DB.sequelize.sync({ force: newDb })
            .then(function () {
            return new Promise(function (resolve, reject) {
                for (var _i = 0, testUser_1 = SeedData_1.testUser; _i < testUser_1.length; _i++) {
                    var i = testUser_1[_i];
                    db_1.DB.User.create(i, {
                        include: [db_1.DB.Skill]
                    }).then(function () {
                        resolve();
                    });
                }
            });
        })
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.DB.Team.bulkCreate(SeedData_1.testTeam)
                        // return new Promise((resolve, reject)=>{
                        //     .then(()=>{
                        //         resolve();
                        //     });
                        // })  
                    ];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.DB.Contact.bulkCreate(SeedData_1.testContactsReq)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.DB.TeamUser.bulkCreate(SeedData_1.testTeamMembersReq)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .then(function () {
            return new Promise(function (resolve, reject) {
                for (var i = 0; i < SeedData_1.testContacts.length; i++) {
                    for (var j = 1; j < SeedData_1.testContacts[i].length; j++) {
                        db_1.DB.Contact.create({
                            userId: SeedData_1.testContacts[i][0],
                            friendId: SeedData_1.testContacts[i][j],
                            request: constant_1.UserConst.REQUEST.ACCEPTED
                        });
                        ;
                    }
                }
                for (var i = 0; i < SeedData_1.testTeamMembers.length; i++) {
                    for (var j = 1; j < SeedData_1.testTeamMembers[i].length; j++) {
                        db_1.DB.TeamUser.create({
                            teamId: SeedData_1.testTeamMembers[i][0],
                            userId: SeedData_1.testTeamMembers[i][j],
                            request: constant_1.UserConst.REQUEST.ACCEPTED
                        });
                    }
                }
                resolve();
            });
        })
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.DB.Message.bulkCreate(SeedData_1.testMessages)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .then(function () {
            db_1.DB.Announcement.bulkCreate(SeedData_1.testAnnouncement);
        })
            .then(function () {
            db_1.DB.Project.bulkCreate(SeedData_1.testProject);
        })
            .then(function () {
            db_1.DB.ProjectTeam.bulkCreate(SeedData_1.testProjectTeams);
        })
            .then(function () {
            db_1.DB.ProjectUser.bulkCreate(SeedData_1.testProjectUser);
        })
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.DB.TaskSets.bulkCreate(SeedData_1.testSet)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.DB.Task.bulkCreate(SeedData_1.testTask)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (err) {
            console.log(err);
            console.log("Error: Failed to seed the database");
        });
    };
    TestDb.addTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.DB.Task.bulkCreate(SeedData_1.testTask)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestDb.addMessages = function () {
        return db_1.DB.Message.bulkCreate(SeedData_1.testMessages);
    };
    TestDb.addProject = function () {
        var project = {
            name: 'MySQL',
            description: "The world's most popular open source database with easy administration, excellent read performance, and transparent support for large text and binary objects make it the top choice for many Web sites.",
            field: 'Database',
            startDate: new Date(2017, 10, 15),
            finalDate: new Date(2019, 3, 15),
            leaderId: 1
        };
        db_1.DB.Project.create(project)
            .then(function (proj) {
            proj.currentStageId = proj.stages[0].id;
            proj.save();
            //console.log(proj.stages[0].id);
        });
    };
    return TestDb;
}());
exports.TestDb = TestDb;
// const testUser = [
//     {
//         userName:'samwolde',
//         password:'$2a$10$b4KVChHblYZoNAzSl0eKCu4CHfjJ.Ky76KhKSlGXkyJnparaQKE7i',    //1234
//         image:UserConst.DEFAULT_IMAGE,
//         firstName:'Samuel',
//         middleName:'Woldemariam',
//         lastName:'Kediso',
//         email:'samuelwoldemariam@yahoo.com',
//         phoneNo:'0910713717',
//         title:'Software engineer',
//         skills:[
//             {skill:'Python'}, 
//             {skill:'Js'}, 
//             {skill:'Angular'}, 
//             {skill:'NodeJs'},
//             {skill:'C#'} 
//         ],
//         description:''
//     },
//     {
//         userName:'abekebe',
//         password:'$2a$10$3XxShnlYq2es77zmkLfJzekb9MgnYbmxDFMAyRK8I0AzwSu/4MnrG',    //123
//         image:UserConst.DEFAULT_IMAGE,
//         firstName:'Abebe',
//         middleName:'Kebede',
//         lastName:'Ayele',
//         email:'abebekebede@yahoo.com',
//         phoneNo:'0911554863',
//         title:'Software engineer',
//         skills:[
//             {skill:'Python'}, 
//             {skill:'Js'}, 
//             {skill:'Angular'}
//         ],
//         description:''
//     },
//     {
//         userName:'mulekebe',
//         password:'$2a$10$XmlAMkIegJZhSpdZSb6KjeTRtGu.9kFjycgkQzAV36bdgQxKjWOeq',    //12345
//         image:UserConst.DEFAULT_IMAGE,
//         firstName:'Mulugeta',
//         middleName:'Kebede',
//         lastName:'Admassu',
//         email:'mulugetakebede@yahoo.com',
//         phoneNo:'0919634525',
//         title:'Software engineer',
//         skills:[
//             {skill:'Js'},
//             {skill:'NodeJs'},
//             {skill:'C#'} 
//         ],
//         description:''
//     },
//     {
//         userName:'yonhaile',
//         password:'$2a$10$IPyHIBP432yCgVoITrobN.zPALeLBbYwCaJeVpXcWx0aV2p6tWnqS',    //6789
//         image:UserConst.DEFAULT_IMAGE,
//         firstName:'Yonas',
//         middleName:'Haile',
//         lastName:'Shimeles',
//         email:'yonashaile@yahoo.com',
//         phoneNo:'0916321548',
//         title:'Software engineer',
//         skills:[
//             {skill:'Python'}, 
//             {skill:'Js'},
//             {skill:'C#'} 
//         ],
//         description:''
//     },
//     {
//         userName:'jondoe',
//         password:'$2a$10$IPyHIBP432yCgVoITrobN.zPALeLBbYwCaJeVpXcWx0aV2p6tWnqS',        //6789
//         image:UserConst.DEFAULT_IMAGE,
//         firstName:'Jon',
//         middleName:'Doe',
//         lastName:'Doe',
//         email:'jondoe@yahoo.com',
//         phoneNo:'0916321548',
//         title:'Software engineer',
//         skills:[
//             {skill:'Python'}, 
//             {skill:'Js'},
//         ],
//         description:''
//     },
//     {
//         userName:'alexmarc',
//         password:'$2a$10$IPyHIBP432yCgVoITrobN.zPALeLBbYwCaJeVpXcWx0aV2p6tWnqS',    //6789
//         image:UserConst.DEFAULT_IMAGE,
//         firstName:'Alex',
//         middleName:'Marcus',
//         lastName:'Pablo',
//         email:'alexpab@yahoo.com',
//         phoneNo:'0916321548',
//         title:'Graphic designer',
//         skills:[
//             {skill:'Python'}, 
//             {skill:'Js'},
//             {skill:'Shader'}
//         ],
//         description:''
//     },
// ];
// const testTeam = [
//     {
//         name:'Red',
//         focus:'Graphic design',
//         image:TeamConst.DEFAULT_IMAGE,
//         leaderId:4
//     },
//     {
//         name:'Blue',
//         focus:'UI design',
//         image:TeamConst.DEFAULT_IMAGE,
//         leaderId:2
//     },
//     {
//         name:'Green',
//         focus:'Databse design',
//         image:TeamConst.DEFAULT_IMAGE,
//         leaderId:3
//     },
//     {
//         name:'Black',
//         focus:'AI',
//         image:TeamConst.DEFAULT_IMAGE,
//         leaderId:1
//     }
// ];
// const testMessages = [
//     {
//         senderId:1,
//         contactId:1,
//         message: 'Do no wrong, amirite?',
//         seen: false
//     },
//     {
//         senderId:2,
//         contactId:4,
//         message: 'Technically, no. Because you are repeating yourself. A man knows nothing about most of what he speaks of, and that saying is all too true in your case.',
//         seen: true
//     },
//     {
//         senderId:3,
//         contactId:4,
//         message: 'So no meeting on the morrow? A shame, since I was kinda looking forward to it',
//         seen: true
//     },
//     {
//         senderId:4,
//         contactId:6,
//         message: 'Perhaps. I\'m not one to assume.',
//         seen: true
//     }
//   ];
// class Methods{
//     static addNewTeam(team:any){
//     }
// }
// const testTeamMembers:number[][] = [
//     [1,2,3],
//     [2,1,4],
//     [3,1,2,4],
//     [4,3,4]
// ];
// const testContacts:number[][] = [
//     [1,2,3],
//     [2,4],
//     [3,2,4],
//     [4,1]
// ];
// const testAnnouncement = [
//     {
//         message:'There will be a meeting tommorow',
//         userId:2,
//         teamId:1,
//     },
//     {
//         message:'The deadline is posponed for next month',
//         userId:3,
//         teamId:1
//     },
//     {
//         message:'Meeting postponed',
//         userId:1,
//         teamId:2
//     },
//     {
//         message:'There will be a meeting tommorow',
//         userId:4,
//         teamId:2
//     },
//     {
//         message:'New project first meeting',
//         userId:3,
//         teamId:4
//     },
//     {
//         message:'There will be a meeting today',
//         userId:4,
//         teamId:4
//     },
// ];
// const testProject = [
//     {
//         name:'MySQL',
//         description:`The world's most popular open source database with easy administration, excellent read performance, and transparent support for large text and binary objects make it the top choice for many Web sites.`,
//         field:'Database',
//         image:ProjectConst.DEFAULT_IMAGE,
//         startDate:new Date(2017,10,15),
//         finalDate:new Date(2019,3,15),
//         leaderId:1,
//     },
//     {
//         name:'Ubuntu',
//         description:`Ubuntu is a Debian-based Linux operating system developed to increase usability and ease of use. `,
//         field:'OS',
//         image:ProjectConst.DEFAULT_IMAGE,
//         startDate:new Date(2015,8,15),
//         finalDate:new Date(2017,6,15),
//         leaderId:2,
//     },
//     {
//         name:'Apache',
//         description:`The Apache HTTP Server Project is an effort to develop and maintain an open-source HTTP server for modern operating systems including UNIX and Windows.`,
//         field:'Server',
//         image:ProjectConst.DEFAULT_IMAGE,
//         startDate:new Date(2016,4,15),
//         finalDate:new Date(2018,2,15),
//         leaderId:3,
//     }
// ];
// const testProjectTeams = [
//     {
//         projectId:1,
//         teamId:1,
//         request:'Accepted'
//     },
//     {
//         projectId:1,
//         teamId:2,
//         request:'Accepted'
//     },
//     {
//         projectId:1,
//         teamId:4,
//         request:'Accepted'
//     },
//     {
//         projectId:2,
//         teamId:3,
//         request:'Accepted'
//     },
//     {
//         projectId:2,
//         teamId:4,
//         request:'Accepted'
//     },
//     {
//         projectId:3,
//         teamId:1,
//         request:'Accepted'
//     },
//     {
//         projectId:3,
//         teamId:4,
//         request:'Accepted'
//     }
// ];
// const testProjectUser = [
//     {
//         projectId:1,
//         userId:4,
//         request:'Accepted'
//     },
//     {
//         projectId:1,
//         userId:6,
//         request:'Accepted'
//     },
//     {
//         projectId:2,
//         userId:2,
//         request:'Accepted'
//     },
//     {
//         projectId:3,
//         userId:5,
//         request:'Accepted'
//     }
// ];
// const testSet = [
//     {
//         name:'Query generation',
//         number:1,
//         projectId:1,
//         description:'',
//         assignmentDate:new Date('2017-11-01'),
//         startDate:new Date('2017-11-03'),
//         deadline:new Date('2017-12-15'),
//         completionDate:new Date('2017-12-20'),
//     },
//     {
//         name:'Query execution',
//         number:1,
//         projectId:1,
//         description:'',
//         assignmentDate:new Date('2017-11-01'),
//         startDate:new Date('2017-11-03'),
//         deadline:new Date('2017-12-15'),
//         completionDate:new Date('2017-12-10'),
//     },
//     {
//         name:'Terminal',
//         number:1,
//         projectId:2,
//         description:'',
//         assignmentDate:new Date('2015-09-01'),
//         startDate:new Date('2015-09-03'),
//         deadline:new Date('2015-10-15'),
//         completionDate:new Date('2015-10-20'),
//     },
//     {
//         name:'System calls',
//         number:1,
//         projectId:2,
//         description:'',
//         assignmentDate:new Date('2015-10-01'),
//         startDate:new Date('2015-10-03'),
//         deadline:new Date('2015-10-15'),
//         completionDate:new Date('2015-10-13'),
//     },
//     {
//         name:'Socket programming',
//         number:1,
//         projectId:3,
//         description:'',
//         assignmentDate:new Date('2017-02-01'),
//         startDate:new Date('2017-02-03'),
//         deadline:new Date('2017-02-15'),
//         completionDate:new Date('2017-02-20'),
//     },
//     {
//         name:'Request handling',
//         number:1,
//         projectId:3,
//         description:'',
//         assignmentDate:new Date('2017-02-01'),
//         startDate:new Date('2017-02-03'),
//         deadline:new Date('2017-02-15'),
//         completionDate:new Date('2017-02-12'),
//     }
// ];
// const testTask = [
//     {
//         number:1,
//         title:'Create directory',
//         description:'',
//         priority:'',
//         assignmentDate:new Date('2015-10-01'),
//         startDate:new Date('2015-10-03'),
//         deadline:new Date('2015-10-10'),
//         completionDate:new Date('2015-10-10'),  
//         assignerId:1,
//         assigneeId:2,
//         assigneeTeamId:3,
//         tasksetId:1,
//         projectId:1
//     }
// ]
