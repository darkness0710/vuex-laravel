import { setAuthorization } from "./general";
import { requestApi } from "./axios";

export function login(credentials) {
	return requestApi(credentials);
}

export function getLocalUser() {
	const user = localStorage.getItem('user');
	return !user ? null : JSON.parse(user);
}