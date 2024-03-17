import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, atomWithStorage } from 'jotai/utils';

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

export const authAtom = atomWithStorage<AuthState>(
	'auth',
	{
		access_token: null,
		isLoading: false,
		error: null,
	},
	storage,
);

export interface AuthState {
	access_token: string | null;
	isLoading: boolean;
	error: string | null;
}
