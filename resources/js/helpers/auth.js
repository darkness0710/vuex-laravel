import { setAuthorization } from "./general";

export function login(credentials) {
	return new Promise((res, reject) => {
		axios.post('/api/auth/login', credentials)
			.then((response) => {
				setAuthorization(response.data.access_token);
				res(response.data);
			})
			.catch((error) => {
				reject('Wrong email or password!');
			})
	})
}

export function getLocalUser() {
	const user = localStorage.getItem('user');
	return !user ? null : JSON.parse(user);
}