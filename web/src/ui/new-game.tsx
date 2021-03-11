import React, { ReactElement, useEffect, useState } from 'react'
import { Box, FormControl, InputLabel, Button,  } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { getUrlApi } from '../common/get-url'


interface Props {
	users: any
	getUsersAsync: () => void
}

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 300,
		
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}))


export const NewGame = ({users, getUsersAsync}: Props): ReactElement => {
	const classes = useStyles()
	const [winnerId, setWinnerId] = useState<string | undefined | unknown>('')
	const [loserId, setLoserId] = useState<string | undefined | unknown>('')
	
	const handleCreateGameAsync = async () => {
		const jwtToken = localStorage.getItem('token')

		const response = await fetch(getUrlApi('game/create'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwtToken}`
			},
			body: JSON.stringify({winnerId, loserId})
		})

		await response.json()

		getUsersAsync()
	}

	return (
		<Box width="850px" height="150px" bgcolor="#323232">
			<Box
				display="flex"
				justifyContent="center"
				color="white"
				marginTop="20px"
			>
        New Game
			</Box>
			<Box
				display="flex"
				justifyContent="space-around"
				color="white"
				alignItems="center"
				marginTop="20px"
			>
				<FormControl variant="outlined" className={classes.formControl} style={{border: '2px solid white', borderRadius: '4px'}}>
					<InputLabel id="demo-simple-select-outlined-label" style={{backgroundColor: '#323232', color: 'white', paddingLeft: '5px', paddingRight: '7px'}}>Winner</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={winnerId}
						style={{color: 'white'}}
						onChange={(event) => setWinnerId(event.target.value) }
					>
						{users.map((user: any) => {
							return <MenuItem value={user.id} key={user.id}>{user.username}</MenuItem>
						})}
					</Select>
				</FormControl>
			
				<FormControl variant="outlined" className={classes.formControl} style={{border: '2px solid white', borderRadius: '4px'}}>
					<InputLabel id="demo-simple-select-outlined-label" style={{backgroundColor: '#323232', color: 'white', paddingLeft: '5px', paddingRight: '7px'}}>Loser</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={loserId}
						style={{color: 'white'}}
						onChange={(event) => setLoserId(event.target.value) }
					>
						{users.map((user: any) => {
							return <MenuItem value={user.id} key={user.id}>{user.username}</MenuItem>
						})}
					</Select>
				</FormControl>

				<Button variant="contained" color="secondary" size="large" onClick={handleCreateGameAsync}>
					SUBMIT
				</Button>
			</Box>
		</Box>
	)
}
