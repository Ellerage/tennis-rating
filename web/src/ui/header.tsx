import React, { ReactElement } from 'react'
import { Box } from '@material-ui/core'
import { ReactComponent as RedZalups } from './icons/red-zalups.svg'
import { useHistory } from 'react-router'
import { ROUTES } from '../common/routes'

export const Header = (): ReactElement => {
	const history = useHistory()

	return (
		<Box display="flex" justifyContent="center">
			<RedZalups onClick={() => history.push(ROUTES.FOUNDERS)} style={{cursor: 'pointer'}}/>
		</Box>
	)
}
