/// <reference types="express" />
import * as express from 'express';
export declare class Validation {
    static validate(req: any, res: express.Response, next: express.NextFunction): void;
    static validateReal(action: string, data: any): {
        status: boolean;
        data: {
            validData: any;
            invalidFields: any;
            missingFields: any;
        };
    } | null;
    static validateField(field: string, reqFieldAlias: string, data: any, validationCriteria?: any): boolean;
    static validateData(data: any, requiredFields: any, validationCriteria?: any): {
        status: boolean;
        data: {
            validData: any;
            invalidFields: any;
            missingFields: any;
        };
    };
    static validators(inputValue: any, rule: any, argument?: any): Boolean;
    private static composeErrorMsg(fieldName, arg?);
    private static validateDate(date);
    private static validateDateInterval(date, minDate, maxDate);
}
