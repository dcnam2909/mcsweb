import { createContext, useEffect, useState } from 'react';
import { getInfo } from '../api/userApi';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		getInfo().then((res) => {
			setUser(res.user);
		});
	}, []);

	return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
