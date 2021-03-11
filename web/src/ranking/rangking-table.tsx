import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'

import avatar from '../ui/icons/avatar.png'
import { useHistory } from 'react-router'
import { Routes } from '../common/routes'
import { getUrlApi } from '../common/get-url'
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
export const RankingTable = (): ReactElement => {
	const [users, setUsers] = useState<any>([])
	
	useEffect(() => {
		const initAsync = async () => {
			const response = await fetch(getUrlApi('user'))
			const result = await response.json()
			setUsers(result)
		}

		initAsync()
	}, [])
	
	const classes = useStyles()
	const history = useHistory()
	return (
		<Box display="flex" justifyContent="center">
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell></StyledTableCell>
						<StyledTableCell>Name</StyledTableCell>
						
						<StyledTableCell align="right">Aka</StyledTableCell>
						<StyledTableCell align="right">Pts</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.sort((a: any, b: any) => b.rating - a.rating).map((user: any) => (
						<TableRow key={user.id}>
							<StyledTableCell align="left" >
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
							<StyledTableCell component="th" scope="row">
								{user.username}
							</StyledTableCell>

							<StyledTableCell align="right">{user.username}</StyledTableCell>
							<StyledTableCell align="right">{user.rating}</StyledTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	)
}
