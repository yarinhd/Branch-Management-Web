/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import * as minio from 'minio';
import { config } from './config';
import { Server } from './server';
import { MinioBucketError, MongoConnectionError } from './utils/errors/serverError';

// Ask almog how to wrap it right!
(async () => {
    // shoudn't connect the db to the compositor. use is for authentication
    const connectionString = `${config.db.server}:${config.db.port}/${config.db.name}`;
    const minioClient = new minio.Client({
        endPoint: 'localhost',
        port: 9000,
        useSSL: false,
        accessKey: 'yarin',
        secretKey: 'yarayara',
    });
    mongoose
        .connect(connectionString)
        .then(() => {
            console.log(`[MongoDB] connected to port: ${config.db.port} --> V`);
        })
        .catch(() => {
            throw new MongoConnectionError('Failed to connect Mongo server!');
        });

    const bucketExist = await minioClient.bucketExists('documents');
    if (!bucketExist) {
        throw new MinioBucketError('Minio Bucket is not exist!');
    }
    console.log('Connectend to documents bucket successfuly!');

    const server: Server = Server.bootStrap();
})();
