import React, { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getUrlApi } from '../common/get-url'
import { Routes } from '../common/routes'
import { Loader } from '../ui/loader'

export const LoadingScreen = (): ReactElement => {
	const history = useHistory()

	useEffect(() => {
		const init = async () => {
			const token = localStorage.getItem('token')
			if (token) {
				const response = await fetch(getUrlApi('user/me'), {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				const result = await response.json()

				if (result.statusCode === 401) {
					history.push(Routes.LOGIN)
				} else {
					history.push(Routes.RANKING)
				}
			} else {
				history.push(Routes.LOGIN)
			}
		}
		init()
	}, [])
	
	return (
		<Loader />
	)
}