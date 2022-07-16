"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soufAuth = void 0;
// TODO: Remember to delete added propery inside Reequest -> RequestParamsHandler -> propery name: username:string
// TODO: need to do adaption to connect it to work place library - get sharp about it
// TODO: ask almog if should i wrap it and why
class soufAuth {
    static kerberosAuth(req, res, next) {
        req.username = 't_dim_v';
        next();
    }
}
exports.soufAuth = soufAuth;
