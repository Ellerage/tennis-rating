import React, { ReactElement, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
import { useHistory } from 'react-router'
import tournamentsStore from '../store/tournaments'
import { observer } from 'mobx-react-lite'
import { ReactComponent as RedZalups } from '../ui/icons/red-zalups.svg'
import { ANY_TYPE } from '../common/types'

const useStyles = makeStyles({
	table: {
		width: 500,
		background: '#323232',
		padding: '20px',
	},
})


const StyledTableCell = styled(TableCell)`
  color: white;
  border-bottom: 1px solid #414141;
`

export const TournamentsPage = observer((): ReactElement => {
	const classes = useStyles()
	const history = useHistory()

	useEffect(() => {
		tournamentsStore.getTournaments()
	}, [])

	return (
		<><Box display="flex" justifyContent="center">
			<RedZalups />
		</Box>
		<Box display="flex" justifyContent="center">
	
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>NAME</StyledTableCell>
						<StyledTableCell align="right">Date</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tournamentsStore.tournaments.map(({tournament}: ANY_TYPE) => {
						const date = new Date(tournament.created_at)
						return (
							<TableRow style={{cursor: 'pointer'}} key={tournament.id} onClick={() => {
								history.push('tournament', {
									link: tournament.live_image_url
								})
							}}>
								<StyledTableCell>
									{tournament.name}
								</StyledTableCell>
								<StyledTableCell align="right">
									{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
								</StyledTableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</Box></>
	)
})