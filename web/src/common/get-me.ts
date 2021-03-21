import { getUrlApi } from './get-url'
import { User } from './types'

export const getMe = async (): Promise<User> => {
	const token = localStorage.getItem('token')
    
	const response = await fetch(getUrlApi('user/me'), {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	const result = await response.json()

	return result
}