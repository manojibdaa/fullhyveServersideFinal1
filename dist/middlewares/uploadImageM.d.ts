/// <reference types="express" />
import * as express from 'express';
export declare class UploadM {
    static upload(req: any, res: any, callback: any): void;
    static uploadMet(req: any, res: express.Response, next: express.NextFunction): void;
    static getMet(req: express.Request, res: express.Response, next: express.NextFunction): void;
}
