import React, { ReactElement, useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { Header } from '../ui/header'
import { NewGame } from '../ui/new-game'
import { RankingTable } from './rangking-table'
import { UberPredator } from './uber-predator'
import { getUrlApi } from '../common/get-url'
import { Loader } from '../ui/loader'
import { User } from '../common/types'
export const Ranking = (): ReactElement => {
	const [users, setUsers] = useState<User[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const getUsersAsync = async () => {
		setIsLoading(true)
		const response = await fetch(getUrlApi('user'))
		const result = await response.json()
		setUsers(result.sort((a: User, b: User) => b.rating - a.rating))

		setIsLoading(false)
	}


	useEffect(() => {
		getUsersAsync()
	}, [])
	
	return (
		<Box>
			<Header />
			{users[0] && <UberPredator user={users[0]} />}

			<Box display="flex" justifyContent="center" marginBottom="10px">
				<NewGame getUsersAsync={getUsersAsync} users={users} />
			</Box>
			
			{isLoading ? <Loader /> : <RankingTable users={users} />}
		</Box>
	)
}
