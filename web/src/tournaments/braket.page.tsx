import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useLocation } from 'react-router'
import { ReactComponent as RedZalups } from '../ui/icons/red-zalups.svg'

export const BraketPage = (): ReactElement => {
	const location: any = useLocation()
	const linkBraket = location.state.link


	return (
		<Box width="100%" height="auto" position="relative" marginLeft="50px">
			<img src={linkBraket} alt="" style={{position: 'absolute', top: 0, left: 0, zIndex: -1}} />

			<Box position="absoulte" width="300px" height="50px" top="0px" left="0px" bgcolor="rgb(19, 19, 19)" zIndex={1}>
				<Box display="flex" justifyContent="center">
					<RedZalups />
				</Box>
			</Box>

            
			
		</Box>
	)
}