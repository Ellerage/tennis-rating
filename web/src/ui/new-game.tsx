import React from 'react'
import { Box, FormControl, InputLabel, Button } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'

const StyledInputLabel = styled(InputLabel)`
  color: white;
`

const StyledSelect = styled(Select)`
  border: 1px solid white;
  width: 240px;
  height: 46px;
  border-radius: 4px;
`
export const NewGame = () => {
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
        Winner
				<FormControl variant="filled">
					<StyledInputLabel htmlFor="filled-age-native-simple">
            Predator
					</StyledInputLabel>
					<StyledSelect
						native
						value={'max'}
						inputProps={{
							name: 'age',
							id: 'filled-age-native-simple',
							border: '1px solid white',
						}}
					>
						<option aria-label="None" value="" />
						<option value={10}>Ten</option>
						<option value={20}>Twenty</option>
						<option value={30}>Thirty</option>
					</StyledSelect>
				</FormControl>
        Loser
				<FormControl variant="filled">
					<StyledInputLabel htmlFor="filled-age-native-simple">
            Prey
					</StyledInputLabel>
					<StyledSelect
						native
						value={'max'}
						inputProps={{
							name: 'age',
							id: 'filled-age-native-simple',
							border: '1px solid white',
						}}
					>
						<option aria-label="None" value="" />
						<option value={10}>Ten</option>
						<option value={20}>Twenty</option>
						<option value={30}>Thirty</option>
					</StyledSelect>
				</FormControl>
				<Button variant="contained" color="secondary" size="large">
          SUBMIT
				</Button>
			</Box>
		</Box>
	)
}
