import { Toast } from 'spaper'
import type { PaperType } from 'spaper/types'

type ShowToastFn = (args: { message: string; type: PaperType }) => void

export const showToast: ShowToastFn = ({ message, type }) => {
	Toast.open({
		dismissible: true,
		duration: 5 * 1000,
		indefinite: false,
		message,
		pauseOnHover: false,
		position: 'top',
		type
	})
}
