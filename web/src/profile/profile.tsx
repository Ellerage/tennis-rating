import React, { ReactElement, useEffect, useState } from 'react'
import { Box, makeStyles, TablePagination } from '@material-ui/core'
import { useLocation } from 'react-router'
import { getUrlApi } from '../common/get-url'
import Table from '@material-ui/core/Table'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import { Loader } from '../ui/loader'

const useStyles = makeStyles({
	table: {
		width: 850,
		background: '#323232',
		padding: '20px',
	},
})


const StyledTableCell = styled(TableCell)`
  color: white;
  font-size: 18px;
  border-bottom: 1px solid #414141;
`

interface Game {
	id: string
	created_at: string
	ratingChange: number
	winner: {
		id: string
		firstName: string
		lastName: string
	}
	players: {
		id: string
		firstName: string
		lastName: string
	}[]
}

export const Profile = (): ReactElement => {
	const [user, setUser] = useState({id: undefined, firstName: '', lastName: '', username: ''})
	const [userStats, setUserStats] = useState({winRate: undefined, games: []})
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const location: any = useLocation()
	const userId = location.state.userId

	useEffect(() => {
		const init = async () => {
			const response = await fetch(getUrlApi(`user/${userId}`))
			const result = await response.json()
			setUser(result)

			const responseStats = await fetch(getUrlApi(`user/stats/${userId}`))
			const resultStats = await responseStats.json()
			console.log(resultStats)
			setUserStats(resultStats)
		}

		init()
	}, [])

	const classes = useStyles()


	const handleChangePage = (event: any, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, userStats.games.length - page * rowsPerPage)
	
	if (!user) {
		return <Loader />
	}
	return (
		<Box width="100vw" height="100vh" overflow="hidden">
			<Box display="flex" justifyContent="center" marginY="50px" alignItems="center">
				<Box color="white" fontSize="26px" fontWeight="bold" display="flex" marginRight="70px">
					<Box>{user.firstName}</Box>
					<Box color="#F51010" marginX="5px">{user.username}</Box>
					<Box>{user.lastName}</Box>
				</Box>
				<Box color="white"  fontSize="26px" fontWeight="bold">Winrate: {userStats.winRate}%</Box>
			</Box>

			<TableContainer component={Paper} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: 'rgb(19, 19, 19)', boxShadow: 'none'}}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Winner</StyledTableCell>
							<StyledTableCell>WR PTS</StyledTableCell>
							<StyledTableCell>Date</StyledTableCell>
							<StyledTableCell>LR PTS</StyledTableCell>
							<StyledTableCell>Loser</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{userStats.games.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((game: Game) => {
							const loserUser = game.players.find((user: any) => user.id !== game.winner.id)
							const date = new Date(game.created_at)
								
							return (
								<TableRow key={game.id}>
									<StyledTableCell>
										{`${game.winner.firstName} ${game.winner.lastName}`}
									</StyledTableCell>
									<StyledTableCell style={{color: '#A0FF42'}}>
										{`+${game.ratingChange}`}
									</StyledTableCell>
									<StyledTableCell>
										{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
									</StyledTableCell>
									<StyledTableCell style={{color: '#F51010'}}>
										{`-${game.ratingChange}`}
									</StyledTableCell>
									<StyledTableCell>
										{`${loserUser?.firstName} ${loserUser?.lastName}`}
									</StyledTableCell>
								</TableRow>
							)
						})}

						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>

				<TablePagination 
					rowsPerPageOptions={[5, 10, 25]}
					style={{color: 'white'}}
					component="div"
					count={userStats.games.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}>
				</TablePagination>
			</TableContainer>
		</Box>
	)
}
