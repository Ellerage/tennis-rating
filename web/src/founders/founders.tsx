import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'
import foundersimgs from '../ui/icons/founderslist.png'

export const Founders = (): ReactElement => {
	return (
		<Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
			<img src={foundersimgs} height="auto" width="70%"></img>
		</Box>
	)
}