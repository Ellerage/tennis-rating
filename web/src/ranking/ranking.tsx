import React, { ReactElement, useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { Header } from '../ui/header'
import { NewGame } from '../ui/new-game'
import { RankingTable } from './rangking-table'
import { UberPredator } from './uber-predator'
import { Loader } from '../ui/loader'
import { observer } from 'mobx-react-lite'
import userStore from '../store/user'

export const Ranking = observer((): ReactElement => {
	const [isLoading, setIsLoading] = useState(false)

	const getUsersAsync = async () => {
		setIsLoading(true)
		await userStore.fetchUsers()
		await userStore.fetchMe()
		setIsLoading(false)
	}

	useEffect(() => {
		getUsersAsync()
	}, [])
	
	return (
		<Box>
			<Header />
			{userStore.users[0] && <UberPredator user={userStore.users[0]} />}

			<Box display="flex" justifyContent="center" marginBottom="10px">
				<NewGame getUsersAsync={getUsersAsync} users={userStore.users} />
			</Box>
			
			{isLoading ? <Loader /> : <RankingTable users={userStore.users} />}
		</Box>
	)
})