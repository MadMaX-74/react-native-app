import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { createJSONStorage, atomWithStorage } from 'jotai/utils';
import { API } from '../api/auth.api';
import axios, { AxiosError } from 'axios';
import { AuthResponse, LoginRequest } from './auth.interface';

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

const INITIAL_STATE = {
	access_token: null,
	isLoading: false,
	error: null,
};

export const authAtom = atomWithStorage<AuthState>('auth', INITIAL_STATE, storage);

export const loginAtom = atom(
	(get) => get(authAtom),
	async (_get, set, { email, password }: LoginRequest) => {
		set(authAtom, {
			isLoading: true,
			access_token: null,
			error: null,
		});
		try {
			const { data } = await axios.post<AuthResponse>(API.login, {
				email,
				password,
			});
			set(authAtom, {
				isLoading: false,
				access_token: data.access_token,
				error: null,
			});
		} catch (e) {
			if (e instanceof AxiosError) {
				set(authAtom, {
					isLoading: false,
					access_token: null,
					error: e.response?.data?.message,
				});
			}
		}
	},
);
export const logoutAtom = atom(null, (_get, set) => {
	set(authAtom, INITIAL_STATE);
});

export interface AuthState {
	access_token: string | null;
	isLoading: boolean;
	error: string | null;
}
