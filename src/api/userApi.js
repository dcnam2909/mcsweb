import callApi from './callApi';

const token = localStorage.getItem('token');

export const getInfo = () =>
	callApi.get('/user/', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const updateInfo = (data) =>
	callApi.patch('/user/update', data, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const updatePassword = (data) =>
	callApi.patch('/user/changePassword', data, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

//This route for admin and manager
export const getAllVisisters = () =>
	callApi.get('/admin/users/', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const getAllAgents = () =>
	callApi.get('/admin/agents/', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});
