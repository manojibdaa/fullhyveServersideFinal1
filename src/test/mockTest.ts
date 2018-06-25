// import * as chai from 'chai';
// import * as io from 'socket.io-client';
// import * as assert from 'assert';

// const expect = chai.expect;
// const should = chai.should;
// should();

// const chaiAsPromised = require("chai-as-promised");

// chai.use(chaiAsPromised);
// let client:SocketIOClient.Socket;
// let TOKEN:string  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTUyOTIwMTM5NSwiZXhwIjoxNTI5Mjg3Nzk1fQ.aql0IHzFMxN9_EXgiPfX5UVFUhJ4kcIhUpT6vDDnlUs";

// // [code, data]
// let inputData:any = {
//     'signin':{
//         fields:['userName','password'],
//         data:[['samwolde','1234'],['abekebe','123569']],
//         expectedOutput:[[200, {
//             type:'object',
//             contains:{
//                 token:{
//                     null:false    
//                 }
//             }
//         }],[401, {
//             type:'object',
//             contains:{
//                 token:{
//                     null:false    
//                 }
//             }
//         }]]
//     },
//     // 'getFriends':{
//     //     fields:['offset','limit'],
//     //     data:[[0,5],[1,3]],
//     //     expectedOutput:[[200, {
//     //         type:'object',
//     //         contains:{
//     //             friends:{
//     //                 type:'array',
//     //                 null:false,
//     //                 length: 2   
//     //             }
//     //         }
//     //     }]]

//     // }
// }

// function generateReqData(action:string, inData:any){
//     let rData:any = {};
//     for(let i=0;i<inputData[action].fields.length;i++){
//         let actName:string = inputData[action].fields[i];
//         rData[actName] = inData[i];
//     }
//     return rData;
// }


// function conn(){
//     return new Promise(function(resolve, reject){
//         client = io.connect('http://localhost:3000',{forceNew:true});
        
//         client.on('connect',function(){
//             console.log("Connected");
            
//             client.emit('check','data',()=>{
//                 console.log("Called on client");
//                 resolve("Welcome");
//             });            
//         })
//     })
// }

// function connFullhyve(){
//     return new Promise(function(resolve, reject){
//         client = io.connect('http://localhost:8000/chat',{forceNew:true});
        
//         client.on('connect',function(){
//             console.log("Connected");
//             console.log(makeTestData('getFriends', generateReqData('getFriends',0)));

//             client.emit('getFriends',makeTestData('getFriends', generateReqData('getFriends',0)),(data:any)=>{
//                 console.log(data);
//                 console.log("Called on client");

//                 // resolve(data);
//                 assert.notEqual(data, null);

//             });    
//             // resolve("Welcome");        
//         })
//     })
// }
// function makeTestData(action:string, reqData:any, token:string=TOKEN, ){
//     return {
//         'reqData':reqData,
//         'token':'Bearer '+token,
//         'action':action
//     };
// }

// function login(client1:any){
//     return new Promise((resolve, reject)=>{
//         client1.emit('signin',{
//             'thisUser':1,
//             'reqData':{
//                 'userName':'samwolde',
//                 'password':'1234'
//             },
//             'token':'Bearer ',
//             'action':'signin'
//         },(data:any)=>{
//             console.log(data);
//             console.log("Called on client");
//             resolve("Welcome");
//         }); 
//     })
// }


// let b:any;
// describe("Connection", function(){
//     before(function(){
//         // this.timeout(3000);
//         b = io.connect('http://localhost:8000/chat',{forceNew:true});
//     })

//     for(let act in inputData){
//         describe("Testing task - "+ act, function(){
//             for(let j in inputData[act].data){
//                 let rData:any = inputData[act].data[j];
//                 let rTestData:any = makeTestData(act,generateReqData(act, rData));
//                 // console.log(rData);
//                 it(act + "- " + rData[0], function(done){
//                     b.emit(act,makeTestData(act, generateReqData(act, rData)),(data:any)=>{
//                         // console.log(data);
//                         assert.notEqual(b, null);
    
//                         done();
//                     });
//                 })
//             }
//         })
//     }
//     // describe("Connected to server", function(){
//     //     after(function(){
//     //         // if(client.connected){
//     //         //     client.disconnect();
//     //         // }
//     //     })


//     //     for(let a=0;a<2;a++){

//     //         it("Assertion with async", function(done){
//     //             // b.on('connect', function(){
//     //                 // console.log("Connected");
//     //                 // console.log(makeTestData('getFriends', generateReqData('getFriends')));
        
//     //                 b.emit('getFriends',makeTestData('getFriends', generateReqData('getFriends')),(data:any)=>{
//     //                     // console.log(data);
//     //                     // console.log("Called on client");
                        
//     //                     assert.notEqual(b, null);
                        
//     //                     // b.should.have.property('success');
//     //                     // b.success.should.be.true;
    
//     //                     done();
//     //                 });
//     //             // })
//     //         })
//     //     }
        

//     //     // it("Assertion with chai-as-promised", function(){
//     //     //     return conn().should.eventually.be.equal("Welcome");
//     //     //     //assert.equal(5,5);
//     //     // })

//     //     // it("Assertion wit promise", function(){
//     //     //     // this.timeout(2500);
//     //     //     return conn()

//     //     //     .then((res)=>{
//     //     //         assert.notEqual(res, null);
//     //     //         assert.equal(res,"Bye");
//     //     //     },function(res){
//     //     //         assert.equal(res, null);
//     //     //     })

//     //     //     // conn().resolve();
//     //     // })

        
//     // })
// })