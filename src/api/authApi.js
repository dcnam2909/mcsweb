import callApi from './callApi';

export const signIn = (data) => callApi.post('/auth/signin', data);
export const signUp = (data) => callApi.post('/auth/signup', data);
