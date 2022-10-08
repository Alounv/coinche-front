export const variables = {
	IS_ADMIN: import.meta.env.VITE_ADMIN === 'true',
	REST_URL: import.meta.env.VITE_SERVER_SCHEME + '://' + import.meta.env.VITE_SERVER_HOST,
	WS_URL: 'ws://' + import.meta.env.VITE_SERVER_HOST
};
