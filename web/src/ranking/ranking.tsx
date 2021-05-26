import React, { ReactElement, useEffect } from 'react'
import { Box } from '@material-ui/core'
import { Header } from '../ui/header'
import { NewGame } from '../ui/new-game'
import { RankingTable } from './rangking-table'
import { UberPredator } from './uber-predator'
import { Loader } from '../ui/loader'
import { observer } from 'mobx-react-lite'
import userStore from '../store/user'
import meStore from '../store/me'
import { ActionButtons } from './ui/action-buttons'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignores
// eslint-disable-next-line @typescript-eslint/no-var-requires
import FF from 'react-fireflies'


export const Ranking = observer((): ReactElement => {


	const getUsersAsync = async () => {
		await userStore.fetchUsers()
		await meStore.fetchMe()
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
			<FF settings={{ color: '#F51010', speed: 0.5, size: 2.1, fadeSpeedRate: 0.02, blur: 0, isGradient: false, count: 1488 }} displayFpsStats={false} />
			
			{userStore.isLoading || meStore.isLoading ? <Loader /> : <RankingTable users={userStore.users} me={meStore.me}/>}

			<ActionButtons />
		</Box>
	)
})