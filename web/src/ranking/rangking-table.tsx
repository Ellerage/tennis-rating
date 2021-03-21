import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Tooltip } from '@material-ui/core'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const EloRating = require('elo-rating')

import { getTierName } from '../common/get-tier-name'
import { getTierColor } from '../common/get-tier-color'
import { getMe } from '../common/get-me'
import Founder from '../ui/icons/founder.png'
import { useHistory } from 'react-router'
import { Routes } from '../common/routes'

interface Props {
	users: any
}

const useStyles = makeStyles({
	table: {
		width: 850,
		background: '#323232',
		padding: '20px',
	},
})


const StyledTableCell = styled(TableCell)`
  color: white;
  border-bottom: 1px solid #414141;
`

export const RankingTable = ({users}: Props): ReactElement => {
	const classes = useStyles()
	const [myRating, setMyRating] = useState(0)
	const history = useHistory()

	useEffect(() => {
		const init = async () => {
			const user = await getMe()
			setMyRating(user.rating)
		}
		
		init()
	}, [])

	return (
		<Box display="flex" justifyContent="center">
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>PLACE</StyledTableCell>
						<StyledTableCell>TIER</StyledTableCell>
						<StyledTableCell>NAME</StyledTableCell>
						<StyledTableCell>NICKNAME</StyledTableCell>
						<StyledTableCell>SCORE</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user: any, index: number) => {
						const winningRating = EloRating.calculate(myRating, user.rating, true, 100).playerRating
						const losingRating = EloRating.calculate(myRating, user.rating, false, 100).playerRating

						return (
							<Tooltip key={user.id} title={`Winning: ${winningRating} Losing: ${losingRating}`} placement="left" onClick={() => history.push(`${Routes.PROFILE}/${user.id}`, {
								userId: user.id
							})}>
								<TableRow style={{position: 'relative', cursor: 'pointer'}}>
									<StyledTableCell style={{fontSize: '18px'}} align="center">
										{index+1}
									</StyledTableCell>
									<StyledTableCell style={{color: getTierColor(index+1, users.length === index+1), fontWeight: 'bold', fontSize: '18px'}}>
										{getTierName(index+1, users.length === index+1)}
									</StyledTableCell>
									<StyledTableCell style={{fontSize: '18px', maxWidth: '200px'}}>
										{`${user.firstName} ${user.lastName}`}
									</StyledTableCell>
	
									<StyledTableCell style={{fontSize: '18px', maxWidth: '200px', zIndex: 2, position: 'relative'}}>{user.username}</StyledTableCell>
									<StyledTableCell style={{color: getTierColor(index+1, users.length === index+1), fontWeight: 'bold', fontSize: '18px', zIndex: 2, position: 'relative'}} >{`${user.rating} pts`}</StyledTableCell>

									<Box style={user.isPremium ? {backgroundImage: `url(${Founder})`, backgroundSize: '320px 56px',  backgroundRepeat: 'no-repeat', position: 'absolute', zIndex: 1, width: '320px', height: '56px', marginLeft: '-340px', opacity: 0.4} : {}}></Box>
								</TableRow>
							</Tooltip>
						)
					})}
				</TableBody>
			</Table>
		</Box>
	)
}
