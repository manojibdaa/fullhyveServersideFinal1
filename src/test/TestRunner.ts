import {CustomAssertion} from './CustomAssertion';
import {TestData, Users, taskOrder} from './TestData';
import * as io from 'socket.io-client';
import { AssertionError } from 'assert';

let tasksToTest:string[] = CustomAssertion.generateTaskList(taskOrder);
// let tasksToTest:string[] = ['replyAnnouncement'];

let DEFAULT_TOKEN:string = Users.samwolde.token;
let currentUserToken:string = Users.samwolde.token;

let custAssert:CustomAssertion = new CustomAssertion();

let conn:SocketIOClient.Socket;

function emitListen(act:any, rTestData:any){
    return new Promise((resolve, reject)=>{
        conn.on('validationError', function(data:any){
            resolve(data);
        })

        conn.on('authenticationError', function(data:any){
            resolve(data);
        })

        conn.on('authorizationError', function(data:any){
            resolve(data);
        })   

        conn.emit(act,rTestData,function(data:any){
            resolve(data);
        });
    })
}

describe("Fullhyve route test", function(){
    this.timeout(5000);
    before(function(){
        conn = io.connect('http://localhost:8000/chat',{forceNew:true});          
    })

    for(let act of tasksToTest){
        currentUserToken = DEFAULT_TOKEN;

        if(TestData[act].hasOwnProperty('token')){
            currentUserToken = TestData[act].token;
        }

        describe(act, function(){
            if(TestData[act].data){
                for(let j=0;j<TestData[act].data.length;j++){
                    let inData:any = TestData[act].data[j];
                    let expData:any = TestData[act].expectedOutput[j];
                
                    let rTestData:any = custAssert.generateReqData(act, inData,currentUserToken);
                    
                    it(custAssert.generateArgs(TestData[act].fields ,inData), async function(){
                        let res:any =  await emitListen(act, rTestData);
                        custAssert.assertResponse(res, expData);
                        
                    })                    
                }
            } else{
                let rTestData:any = custAssert.generateReqData(act, null,currentUserToken);
                let expData:any = TestData[act].expectedOutput[0];
                it("No args", async function(){
                    let res:any =  await emitListen(act, rTestData);
                    
                    custAssert.assertResponse(res, expData);
                })
            }
        });
    }

    after(function(){
        if(conn && conn.connected){
            conn.disconnect();
        }
    })
})