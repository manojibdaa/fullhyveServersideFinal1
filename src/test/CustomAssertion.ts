import * as chai from 'chai';
import {assert} from 'chai';
import {TestData, Users} from './TestData';
import { AssertionError } from 'assert';

const expect = chai.expect;
const should = chai.should;
should();

const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

export class CustomAssertion{
    testOrder:string[] = ['null','type','length','value'];
    client:SocketIOClient.Socket;
    
    assertResponse(input:any, expectedOutput:any){
        assert.isNotNull(input, "Returned data can't be null");
        input.should.be.instanceOf(Object);
        input.should.have.keys(['success','code','message','data']);
        
        let inData:any = input.data;
    
        let expData:any;
        assert.equal(expectedOutput[0], input.code, "Unmatching status code returned");
        
        
        if(expectedOutput.length == 2){
            expData = expectedOutput[1];
        } else{
            expData = expectedOutput[2];
            
            assert.isNotNull(input.message, "Response message not set");
            assert.equal(expectedOutput[1],input.message, "Unmatching response message");
        }
        

        if(expData == null || expData == undefined){
            assert.isNull(inData, "Returned data must be null");
            return;
        } else{  
            assert.isNotNull(inData, "Returned data can't be null");
        }
    
        this.assertOut(inData, 'type', expData.type);

        if(expData.type == 'array'){
            this.assertOut(inData, 'length', expData.length);
            return;
        }

        this.assertOut(inData, 'contains', Object.keys(expData.contains));
    
        let contData:any = expData.contains;

        for(let field in contData){
            if(typeof(contData[field]) == 'string'){
                this.assertOut(inData[field], 'type', contData[field]);
            } else if(typeof(contData[field]) == 'object'){
                for(let subField of this.testOrder){
                    if(contData[field].hasOwnProperty(subField)){
                        this.assertOut(inData[field], subField, contData[field][subField]);

                        if(subField == 'null' && contData[field][subField]){
                            break;
                        }
                    }
                }
            }   
        }
    }
    
    generateReqData(action:string, inData:any, token:string=Users.samwolde.token){
        let rData:any = {};
        if(inData != null){
            for(let i=0;i<TestData[action].fields.length;i++){
                let actName:string = TestData[action].fields[i];
                rData[actName] = inData[i];
            }
        }
        
        return {
            'reqData':rData,
            'token':'Bearer '+token,
            'action':action
        };
    }
    
    assertOut(data:any, assertionType:string, criteria:any){
        switch(assertionType){
            case 'type':{
                
                switch(criteria){
                    case 'string':{
                        assert.isString(data);
                        return;
                    }
                    case 'object':{
                        assert.isObject(data);
                        return;
                    }
                    case 'array':{
                        assert.isArray(data);
                        return;
                    }
                    case 'number':{
                        assert.isNumber(data);
                        return;
                    }
                }
                return;
            }
    
            case 'contains':{
                for(let criteriaIn of criteria){
                    data.should.have.property(criteriaIn);
                }
                
                return;
            }
    
            case 'length':{
                assert.lengthOf(data, criteria);
                return;
            }
    
            case 'value':{
                assert.equal(data,criteria);
                return;
            }
    
            case 'null':{
                if(criteria){
                    assert.isNull(data);
                } else{
                    assert.isNotNull(data);
                }
                return;
            }
        }
    }

    generateArgs(fields:any, rData:any){
        let args:string = "";
        for(let i=0;i<3 && i<fields.length;i++){
            if(i>0){
                args += " -- "
            }
            args += fields[i] + " : " + rData[i]; 
        }
        return args;
    }

    static generateTaskList(lists:string[][]):string[]{
        let listR:string[] = [];
        for(let list of lists){
            listR = listR.concat(list);
        }
        return listR;
    }
}