"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    db: {
        server: `mongodb://${process.env.DB_SERVER || `localhost`}`,
        name: process.env.DB_NAME || 'cramim',
        port: +(process.env.DB_PORT || 27017),
    },
    serverPort: +(process.env.PORT || 3001),
    action: {
        Add: 'Add',
        Del: 'Del',
    },
    minio: {
        bucketName: 'documents',
    },
    peopleApi: {
        UserAndGroupfields: [
            'username',
            'fullName',
            'rank',
            'job',
            'dateOfBirth',
            'serviceEndDate',
            'team',
            'teamManager',
            'mador',
            'madorManager',
            'branch',
            'branchManager',
        ],
        userFields: ['username', 'fullName', 'rank', 'job', 'dateOfBirth', 'serviceEndDate'],
    },
    endpoints: {
        user: {
            port: +(process.env.USER_PORT || 3001),
            hostname: process.env.USER_HOST || 'http://localhost',
            api: process.env.USER_API || '/api/user',
            apiMinio: process.env.MINIO_API || '/api/photo',
        },
        post: {
            port: +(process.env.POST_PORT || 3002),
            hostname: process.env.POST_HOST || 'http://localhost',
            api: process.env.POST_API || '/api/post',
        },
        comment: {
            port: +(process.env.COMMENT_PORT || 3003),
            hostname: process.env.COMMENT_HOST || 'http://localhost',
            api: process.env.COMMENT_API || '/api/comment',
        },
        auth: {
            api: process.env.AUTH_API || '/api/auth',
        },
    },
    errors: {
        serverError: {
            status: 500,
        },
    },
};
