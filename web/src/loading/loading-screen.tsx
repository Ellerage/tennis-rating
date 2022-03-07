import React, { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ROUTES } from '../common/routes'
import { Loader } from '../ui/loader'
import meStore from '../store/me'
import { observer } from 'mobx-react-lite'

export const LoadingScreen = observer((): ReactElement => {
	const history = useHistory()

	useEffect(() => {
		const init = async () => {
			const token = localStorage.getItem('token')

			if (!token) {
				history.push(ROUTES.LOGIN)
				return
			}
	
			await meStore.fetchMe()
			history.push(ROUTES.RANKING)
		}

		init()
	}, [])
	
	return (
		<Loader />
	)
})