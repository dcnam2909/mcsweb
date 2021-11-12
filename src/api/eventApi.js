import callApi from './callApi';

const token = localStorage.getItem('token');

export const getOwnerEvent = () =>
	callApi.get('/manager/event', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const getAllEvents = () =>
	callApi.get('/event', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const addNewEvent = (data) =>
	callApi.post('/manager/event', data, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const updateEvent = (id, data) =>
	callApi.patch(`/manager/event/${id}`, data, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const deleteEvent = (id) =>
	callApi.delete(`/manager/event/${id}`, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const getQRCode = (id, expire) =>
	callApi.get(`/event/${id}/qrcode`, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
		params: { expire },
	});

export const addVisiters = (id, data) =>
	callApi.patch(
		`/manager/event/${id}/addVisiters`,
		{ listVisiter: data },
		{
			headers: {
				Authorization: 'Bearer ' + token,
			},
		},
	);

export const addByGroup = (idEvent, idGroup) =>
	callApi.patch(
		`/manager/event/${idEvent}/addByGroup/${idGroup}`,
		{},
		{
			headers: {
				Authorization: 'Bearer ' + token,
			},
		},
	);
export const setAgent = (idEvent, idAgent) =>
	callApi.put(
		`/manager/event/${idEvent}/setAgent/${idAgent}`,
		{},
		{
			headers: {
				Authorization: 'Bearer ' + token,
			},
		},
	);

export const removeAgent = (idEvent, idAgent) =>
	callApi.put(
		`/manager/event/${idEvent}/removeAgent/${idAgent}`,
		{},
		{
			headers: {
				Authorization: 'Bearer ' + token,
			},
		},
	);

export const getReport = (id) =>
	callApi.get(`/event/${id}/report`, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

export const registerToEvent = (idEvent) =>
	callApi.post(
		`/event/${idEvent}/registerToEvent`,
		{},
		{
			headers: {
				Authorization: 'Bearer ' + token,
			},
		},
	);

export const removeToEvent = (idEvent) =>
	callApi.post(
		`/event/${idEvent}/removeToEvent`,
		{},
		{
			headers: {
				Authorization: 'Bearer ' + token,
			},
		},
	);
