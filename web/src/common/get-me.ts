import { getUrlApi } from './get-url'

export const getMe = async () => {
	const token = localStorage.getItem('token')
    
	const response = await fetch(getUrlApi('user/me'), {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	const result = await response.json()

	return result
}