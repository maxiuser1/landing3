import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

export const user = writable<User | null>();
export const isLoggedIn = writable(false);

export const logoutUser = () => {
	user.set(null);
	isLoggedIn.set(false);
};
