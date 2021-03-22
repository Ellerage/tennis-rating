import React, { ReactElement, useEffect, useState } from 'react'
import { Box, makeStyles, TablePagination } from '@material-ui/core'
import { useLocation } from 'react-router'
import { getUrlApi } from '../common/get-url'
import Table from '@material-ui/core/Table'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import { Loader } from '../ui/loader'
import { User } from '../common/types'
import { GamesSvg } from '../ui/icons/games-svg'
import { ScoreStateSvg } from '../ui/icons/score-state-svg'

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

export interface Game {
	id: string
	created_at: string
	ratingChange: number
	winner: User
	players: User[]
}

export const Profile = (): ReactElement => {
	const [user, setUser] = useState({id: undefined, firstName: '', lastName: '', username: ''})
	const [userStats, setUserStats] = useState({winRate: undefined, games: []})
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [ratingHistory, setRatingHistory] = useState([{x: 0, y:0}])
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const location: any = useLocation()
	const userId = location.state.userId

	useEffect(() => {
		const init = async () => {
			const response = await fetch(getUrlApi(`user/${userId}`))
			const result = await response.json()
			setUser(result)

			const responseStats = await fetch(getUrlApi(`user/stats/${userId}`))
			const resultStats = await responseStats.json()

			setUserStats(resultStats)
		}

		init()
	}, [])


	useEffect(() => {
		let preRating = 1000

		const historyChange = userStats.games.slice().sort((a: Game, b: Game) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).map((game: Game, index) => {
			const isWon = user.id === game.winner.id
			const value = isWon ? preRating + game.ratingChange : preRating - game.ratingChange
			preRating = value
			return {x: index+1, y: value}
		})

		setRatingHistory(historyChange)
	}, [user, userStats])

	const classes = useStyles()


	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: {target: {value: string}}) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, userStats.games.length - page * rowsPerPage)
	
	if (!user) {
		return <Loader />
	}
	return (
		<Box width="100vw" height="100vh" style={{overflowX: 'hidden'}}>
			<Box display="flex" justifyContent="space-between" marginY="50px" alignItems="center" width="850px" marginLeft="auto" marginRight="auto">
				<Box color="white" fontSize="26px" fontWeight="bold" display="flex" marginRight="70px">
					<Box>{user.firstName}</Box>
					<Box color="#F51010" marginX="5px">{user.username}</Box>
					<Box>{user.lastName}</Box>
				</Box>
				<Box display="flex" flexDirection="column">
					<Box color="white" fontSize="26px" fontWeight="bold">{`Games played: ${userStats.games.length}`}</Box>
					<Box color="white" fontSize="26px" fontWeight="bold" textAlign="left">Winrate: {userStats.winRate}%</Box>
				</Box>
			</Box>
			<Box style={{backgroundColor: '#323232', width: '850px', marginLeft: 'auto', marginRight: 'auto',}}>
				<GamesSvg />
				<TableContainer component={Paper} style={{display: 'flex', width: '850px', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center', backgroundColor: 'rgb(19, 19, 19)', boxShadow: 'none'}}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Winner</StyledTableCell>
								<StyledTableCell>WR PTS</StyledTableCell>
								<StyledTableCell align="center">Date</StyledTableCell>
								<StyledTableCell align="right">LR PTS</StyledTableCell>
								<StyledTableCell align="right">Loser</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{userStats.games.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((game: Game) => {
								const loserUser = game.players.find((user) => user.id !== game.winner.id)
								const date = new Date(game.created_at)
								
								return (
									<TableRow key={game.id}>
										<StyledTableCell>
											{`${game.winner.firstName} ${game.winner.lastName}`}
										</StyledTableCell>
										<StyledTableCell style={{color: '#A0FF42'}}>
											{`+${game.ratingChange}`}
										</StyledTableCell>
										<StyledTableCell align="center">
											{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
										</StyledTableCell>
										<StyledTableCell style={{color: '#F51010'}} align="right">
											{`-${game.ratingChange}`}
										</StyledTableCell>
										<StyledTableCell align="right">
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
						style={{color: 'white', backgroundColor: '#323232', width: '100%', display: 'flex', justifyContent: 'center'}}
						component="div"
						count={userStats.games.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}>
					</TablePagination>
				</TableContainer>

			</Box>

		
			<Box style={{justifyContent: 'center', display: 'flex', marginTop: '10px', marginBottom: '40px', flexWrap: 'wrap', backgroundColor: '#323232', width: 810, marginLeft: 'auto', marginRight: 'auto', padding: '20px', height: 340}}>
				<ScoreStateSvg />

				<XYPlot
					width={800}
					height={300}
					style={{marginTop: 20}}
				>
					<HorizontalGridLines />
					<LineSeries
						data={ratingHistory} color="#F51010" />
					<XAxis  />
					<YAxis />
				</XYPlot>		
			</Box>
		</Box>
	)
}
