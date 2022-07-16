import { NextFunction, Request, Response } from 'express';

// TODO: Remember to delete added propery inside Reequest -> RequestParamsHandler -> propery name: username:string
// TODO: need to do adaption to connect it to work place library - get sharp about it
// TODO: ask almog if should i wrap it and why
export class soufAuth {
    static kerberosAuth(req: Request, res: Response, next: NextFunction) {
        req.username = 't_dim_v';
        next();
    }
}
