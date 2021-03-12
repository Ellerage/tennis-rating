import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'

import avatar from '../ui/icons/avatar.png'
import { useHistory } from 'react-router'
import { Routes } from '../common/routes'
import { getTierName } from '../common/get-tier-name'
import { getTierColor } from '../common/get-tier-color'

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

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
export const RankingTable = ({users}: Props): ReactElement => {
	
	
	const classes = useStyles()
	const history = useHistory()
	return (
		<Box display="flex" justifyContent="center">
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell></StyledTableCell>
						<StyledTableCell>PLACE</StyledTableCell>
						<StyledTableCell>TIER</StyledTableCell>
						<StyledTableCell>NAME</StyledTableCell>
				
						<StyledTableCell>NICKNAME</StyledTableCell>
						<StyledTableCell>SCORE</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user: any, index: number) => (
						<TableRow key={user.id}>
							<StyledTableCell align="left">
								<Box
									borderRadius="50px"
									width="50px"
									height="50px"
									display="flex"
									justifyContent="center"
									alignItems="center"
									style={{cursor: 'pointer'}}
									onClick={() => history.push(Routes.PROFILE)}
								>
									<StyledImg src={avatar} alt="avatar" />
								</Box>
							</StyledTableCell>
							<StyledTableCell style={{fontSize: '18px'}}>
								{index+1}
							</StyledTableCell>
							<StyledTableCell style={{color: getTierColor(index+1), fontWeight: 'bold', fontSize: '18px'}}>
								{getTierName(index+1)}
							</StyledTableCell>
							<StyledTableCell component="th" scope="row" style={{fontSize: '18px'}}>
								{`${user.firstName} ${user.lastName}`}
							</StyledTableCell>

							<StyledTableCell style={{fontSize: '18px'}}>{user.username}</StyledTableCell>
							<StyledTableCell style={{color: getTierColor(index+1), fontWeight: 'bold', fontSize: '18px'}}>{`${user.rating} pts`}</StyledTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	)
}
