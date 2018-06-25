/// <reference types="express" />
import * as express from "express";
export declare class Authentication {
    static createToken(req: any, callback: any): void;
    static verifyToken(req: any, res: express.Response, next: express.NextFunction): void;
    static hashPassword(password: string): Promise<any>;
    static verifyTokenReal(token: string): Promise<{}>;
}
