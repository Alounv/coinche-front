import { Toast } from 'spaper';
import type { PaperType } from 'spaper/types';

type ShowToastFn = (args: { message: string; type: PaperType }) => void;

export const showToast: ShowToastFn = ({ message, type }) => {
	Toast.open({
		message,
		type,
		duration: 5 * 1000,
		position: 'top',
		pauseOnHover: false,
		dismissible: true,
		indefinite: false
	});
};
