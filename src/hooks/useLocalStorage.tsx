import { useState } from 'react';

function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
	// Mendapatkan nilai dari localStorage dan menginisialisasi state
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	// Fungsi untuk menyimpan nilai ke localStorage
	const setValue = (value: T | ((val: T) => T)): void => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
}

export default useLocalStorage;
