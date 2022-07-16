import { getHeaders, handleErrors, json } from './helpers';
import config from '../config';
import IUser from '../models/IUser';
import { IDocument } from '../models/IDocument';

interface IAuth {
    message: string;
    date: Date;
    dateEx: Date;
    user: IUser;
}

const { api } = config.endpoints.user;
const authApi = config.endpoints.auth.api;
const fileApi = config.endpoints.files.api;

console.log('api', api);
console.log('auth api:', authApi);
// eslint-disable-next-line import/prefer-default-export
export const getMyUser: () => Promise<IUser> = () => {
    return fetch(`${api}/me`, {
        headers: getHeaders(),
    })
        .then(handleErrors)
        .then(json);
};

export const setMyUserCookie: () => Promise<IAuth> = () => {
    console.log(authApi);

    return fetch(`${authApi}`, {
        credentials: 'include',
        headers: getHeaders(),
    })
        .then(handleErrors)
        .then(json);
};

export const uploadFile: (userId: string, file: File) => Promise<IDocument> = (userId: string, file: File) => {
    const formData = new FormData();
    console.log('userId', userId);

    console.log('file', file);

    formData.append('upload', file, file.name);
    formData.append('subject', String('פ"א'));
    console.log('formData:', formData);
    // eslint-disable-next-line no-restricted-syntax
    for (const key of formData.entries()) {
        console.log(`${key[0]}, ${key[1]}`);
    }

    console.log(`${fileApi}/${userId}`);

    return fetch(`${fileApi}/${userId}`, {
        method: 'POST',
        credentials: 'include',
        // headers: getHeaders(),
        body: formData,
    })
        .then(handleErrors)
        .then(json);
};
