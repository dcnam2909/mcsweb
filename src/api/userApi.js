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
	callApi.get('/admin/visiters/', {
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

export const getAllUsers = () =>
	callApi.get('/admin/users/', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const setAgent = (id) =>
	callApi.put(
		`/admin/setAgent/${id}`,
		{},
		{
			headers: {
				Authorization: 'Bearer ' + token,
			},
		},
	);
export const setManager = (id) =>
	callApi.put(
		`/admin/setManager/${id}`,
		{},
		{
			headers: {
				Authorization: 'Bearer ' + token,
			},
		},
	);

export const setVisiter = (id) =>
	callApi.put(
		`/admin/setVisiter/${id}`,
		{},
		{
			headers: {
				Authorization: 'Bearer ' + token,
			},
		},
	);

export const getGroup = () =>
	callApi.get('/user/group', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const createGroup = (data) =>
	callApi.post('/user/group', data, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const deleteGroup = (id) =>
	callApi.delete(`/user/group/${id}`, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const addToGroup = (id, data) =>
	callApi.put(`/user/group/${id}`, data, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const getEventReg = () =>
	callApi.get(`/user/event`, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});
