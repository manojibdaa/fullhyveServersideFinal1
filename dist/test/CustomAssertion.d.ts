/// <reference types="socket.io-client" />
export declare class CustomAssertion {
    testOrder: string[];
    client: SocketIOClient.Socket;
    assertResponse(input: any, expectedOutput: any): void;
    generateReqData(action: string, inData: any, token?: string): {
        'reqData': any;
        'token': string;
        'action': string;
    };
    assertOut(data: any, assertionType: string, criteria: any): void;
    generateArgs(fields: any, rData: any): string;
    static generateTaskList(lists: string[][]): string[];
}
