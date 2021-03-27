import { Button, makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Modal from '@material-ui/core/Modal'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { UserI } from '../../common/types'
import { UnconfirmedGame } from './unconfirmed-game'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import { Game } from '../../profile/profile'
import { ButtonStyle } from '../../ui/button'
import { getUrlApi } from '../../common/get-url'

interface Props {
    isOpen: boolean
    onClose: () => void
    games: Game[]
	meUser: UserI
}

function getModalStyle() {
	const top = 50 
	const left = 50 
  
	return {
		top: `${30}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	}
}
  
const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 600,
		height: 600,
		overflow: 'auto',
		backgroundColor: '#323232',
		border: '2px solid #000',
		padding: theme.spacing(2, 4, 3),
	},
	table: {
		width: 600,
		background: '#323232',
		padding: '20px',
	},
}))

const StyledTitle = styled('h2')`
    color: white;
`


const StyledTableCell = styled(TableCell)`
  color: white;
  font-size: 18px;
  border-bottom: 1px solid #414141;
`


export const ModalConfirm = ({isOpen, onClose, games, meUser}: Props): ReactElement => {
	const classes = useStyles()
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5)
	
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, games.length - page * rowsPerPage)

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: {target: {value: string}}) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const confirmGameAsync = async () => {
		const response = await fetch(getUrlApi('game/confirm'), {
			method: 'POST',
			body: JSON.stringify(games.map((game) => game.id))
		})

		const result = await response.json()

		if (result.status === 'OK') {
			onClose()
		}
	}

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<div style={getModalStyle()} className={classes.paper}>
				<Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
					<StyledTitle id="simple-modal-title">You have unconfirmed games</StyledTitle>
					<ButtonStyle text="Confirm All" isActive onClick={confirmGameAsync}/>
				</Box>

				<TableContainer component={Paper} style={{display: 'flex', width: '600px', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center', backgroundColor: 'rgb(19, 19, 19)', boxShadow: 'none'}}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Opponent</StyledTableCell>
								<StyledTableCell>PTS</StyledTableCell>
								{/* <StyledTableCell align="right"><ButtonStyle text="Confirm All" isActive onClick={() => confirmGameAsync(games.map((game) => game.id))}/></StyledTableCell> */}
							</TableRow>
						</TableHead>
						<TableBody>
							{games.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((game: Game) => {
								const isWin = meUser.id === game.winner.id

								return (
									<TableRow key={game.id}>
										<StyledTableCell>
											{`${game.winner.firstName} ${game.winner.lastName}`}
										</StyledTableCell>
										<StyledTableCell style={{color: isWin ? '#A0FF42': '#F51010'}}>
											{`${isWin ? '+' : '-'}${game.ratingChange}`}
										</StyledTableCell>
										{/* <StyledTableCell align="right">
											<ButtonStyle text="Confirm" onClick={() => confirmGameAsync([game.id])}></ButtonStyle>
										</StyledTableCell> */}
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
						rowsPerPageOptions={[2, 5]}
						style={{color: 'white'}}
						component="div"
						count={games.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}>
					</TablePagination>
				</TableContainer>
			
			</div>
		</Modal>
	)
}