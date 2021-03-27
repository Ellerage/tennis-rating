import React, { ReactElement, useState } from 'react'
import { Box, FormControl, InputLabel, Button,  } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { getUrlApi } from '../common/get-url'
import { NewGameSvg }from './icons/new-game'
import { UserI } from '../common/types'
import { Toast } from './toast'

interface Props {
	users: UserI[]
	getUsersAsync: () => void
}


  
const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 255,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}))


export const NewGame = ({users, getUsersAsync}: Props): ReactElement => {
	const classes = useStyles()
	const [winnerId, setWinnerId] = useState<string | undefined | unknown>('')
	const [loserId, setLoserId] = useState<string | undefined | unknown>('')
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
				<Box display="flex" alignItems="center">
					<Box marginRight="15px" fontWeight="bold">
					PREDATOR
					</Box>
					<FormControl variant="outlined" className={classes.formControl} style={{border: '2px solid white', borderRadius: '4px'}}>
						<InputLabel id="demo-simple-select-outlined-label" style={{backgroundColor: '#323232', color: 'white', paddingLeft: '5px', paddingRight: '7px'}}>Winner</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={winnerId}
							style={{color: 'white'}}
							onChange={(event) => setWinnerId(event.target.value) }
						>
							{users.map((user: UserI) => 
								<MenuItem value={user.id} key={user.id}>{`${user.firstName} ${user.lastName}`}</MenuItem>
							)}
						</Select>
					</FormControl>
				</Box>
				<Box display="flex" alignItems="center">
					<Box marginRight="15px" fontWeight="bold">PREY</Box>
					<FormControl variant="outlined" className={classes.formControl} style={{border: '2px solid white', borderRadius: '4px'}}>
						<InputLabel id="demo-simple-select-outlined-label" style={{backgroundColor: '#323232', color: 'white', paddingLeft: '5px', paddingRight: '7px'}}>Loser</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={loserId}
							style={{color: 'white'}}
							onChange={(event) => setLoserId(event.target.value) }
						>
							{users.map((user: UserI) => 
								<MenuItem value={user.id} key={user.id}>{`${user.firstName} ${user.lastName}`}</MenuItem>
							)}
						</Select>
					</FormControl>
				</Box>

				<Button variant="contained" color="secondary" size="large" onClick={handleCreateGameAsync} style={{height: '60px', fontWeight: 'bold'}} >
					SUBMIT
				</Button>


				<Toast text="THE GAME WAS REGISTERED!" isOpen={isOpenAlert} onClose={() => setIsOpenAlert(false)}/>
			</Box>
		</Box>
	)
}
