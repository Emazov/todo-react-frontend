import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthLocal = createContext();

export const AuthLocalProvider = ({ children }) => {
	const [localUser, setLocalUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	const login = async (inputs) => {
		const res = await axios.post('/auth/login', inputs);
		setLocalUser(res.data);
	};

	const logout = async (inputs) => {
		await axios.post('/auth/logout');
		setLocalUser(null);
	};

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(localUser));
	}, [localUser]);

	return (
		<AuthLocal.Provider value={{ localUser, login, logout }}>
			{children}
		</AuthLocal.Provider>
	);
};
