import React, { ReactElement, useState } from 'react'
import { Box, Button,  } from '@material-ui/core'
import { getUrlApi } from '../common/get-url'
import { NewGameSvg }from './icons/new-game'
import { UserI } from '../common/types'
import { Toast } from './toast'
import { Select } from './select'
import { SwitchSvg } from './icons/switch'

interface Props {
	users: UserI[]
	getUsersAsync: () => void
}

export const NewGame = ({users, getUsersAsync}: Props): ReactElement => {
	const [winnerId, setWinnerId] = useState<string>('')
	const [loserId, setLoserId] = useState<string>('')
	const [isOpenAlert, setIsOpenAlert] = useState(false)

	const handleCreateGameAsync = async () => {
		try {
			const jwtToken = localStorage.getItem('token')

			const response = await fetch(getUrlApi('game/create'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${jwtToken}`
				},
				body: JSON.stringify({winnerId, loserId})
			})

			if (response.ok) {
				await response.json()
				getUsersAsync()
				setIsOpenAlert(true)
			}
		// eslint-disable-next-line no-empty
		} catch {}
	}

	const handleSwitch = () => {
		const winnerIdClone = winnerId
		const loserIdClone = loserId

		setWinnerId(loserIdClone)
		setLoserId(winnerIdClone)
	}

	return (
		<Box width="850px" height="150px" bgcolor="#323232">
			<Box
				display="flex"
				justifyContent="center"
				color="white"
				marginTop="20px"
			>
				<NewGameSvg />
			</Box>
			<Box
				display="flex"
				justifyContent="space-around"
				color="white"
				alignItems="center"
				marginTop="20px"
			>
				<Select users={users} label="Winner" value={winnerId} onChange={setWinnerId} />

				<SwitchSvg onClick={handleSwitch} />

				<Select users={users} label="Loser" value={loserId} onChange={setLoserId} style={{marginRight: 15}}/>

				<Button variant="contained" color="secondary" size="large" onClick={handleCreateGameAsync} style={{height: '60px', fontWeight: 'bold', marginRight: 10}} >
					SUBMIT
				</Button>


				<Toast text="THE GAME WAS REGISTERED!" isOpen={isOpenAlert} onClose={() => setIsOpenAlert(false)}/>
			</Box>
		</Box>
	)
}
