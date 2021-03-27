import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import SelectBase from '@material-ui/core/Select'
import { UserI } from '../common/types'

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 255,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}))

interface Props {
    users: UserI[]
    value: string
    prefix: string
    label: string
    onChange: (value: string) => void
}

export const Select = ({users, value, prefix, label, onChange}: Props): ReactElement => {
	const classes = useStyles()
    
	return (
		<Box display="flex" alignItems="center">
			<Box marginRight="15px" fontWeight="bold">
				{prefix}
			</Box>
			<FormControl variant="outlined" className={classes.formControl} style={{border: '2px solid white', borderRadius: '4px'}}>
				<InputLabel id="demo-simple-select-outlined-label" style={{backgroundColor: '#323232', color: 'white', paddingLeft: '5px', paddingRight: '7px'}}>{label}</InputLabel>
				<SelectBase
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					value={value}
					style={{color: 'white'}}
					onChange={(event) => onChange(event.target.value as string) }
				>
					{users.map((user: UserI) => 
						<MenuItem value={user.id} key={user.id}>{`${user.firstName} ${user.lastName}`}</MenuItem>
					)}
				</SelectBase>
			</FormControl>
		</Box>
	)
}