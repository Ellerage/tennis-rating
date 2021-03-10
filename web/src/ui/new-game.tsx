import React, { ReactElement } from 'react'
import { Box, FormControl, InputLabel, Button,  } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 300,
		
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}))


export const NewGame = (): ReactElement => {
	const classes = useStyles()
	
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
						value={10}
						style={{color: 'white'}}
						onChange={() => null}
						label="Age"
					>
						<MenuItem value=""><em>None</em></MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
			
				<FormControl variant="outlined" className={classes.formControl} style={{border: '2px solid white', borderRadius: '4px'}}>
					<InputLabel id="demo-simple-select-outlined-label" style={{backgroundColor: '#323232', color: 'white', paddingLeft: '5px', paddingRight: '7px'}}>Loser</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={10}
						style={{color: 'white'}}
						onChange={() => null}
						label="Age"
					>
						<MenuItem value=""><em>None</em></MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>

				<Button variant="contained" color="secondary" size="large">
          SUBMIT
				</Button>
			</Box>
		</Box>
	)
}
