import React, { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Routes } from '../common/routes'
import { Loader } from '../ui/loader'
import userStore from '../store/user'
import { observer } from 'mobx-react-lite'

export const LoadingScreen = observer((): ReactElement => {
	const history = useHistory()

	useEffect(() => {
		const init = async () => {
			const token = localStorage.getItem('token')

			if (!token) {
				history.push(Routes.LOGIN)
				return
			}
	
			await userStore.fetchMe()
			history.push(Routes.RANKING)
		}

		init()
	}, [])
	
	return (
		<Loader />
	)
})