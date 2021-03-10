import React from 'react'
import {
	Box,
	TableCell,
	TableHead,
	Table,
	TableRow,
	TableBody,
	makeStyles,
} from '@material-ui/core'
import { Header } from '../ui/header'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import styled from 'styled-components'
import avatar from '../ui/icons/avatar.png'

const useStyles = makeStyles({
	table: {
		width: 850,
		background: '#323232',
		padding: '20px',
	},
})

function createData(
	winnerAvatar: string,
	winnerName: string,
	date: string,
	loserName: string,
	loserAvatar: string
) {
	return { winnerAvatar, winnerName, date, loserAvatar, loserName }
}
const testMatch = {
	winnerAvatar: '',
	winnerName: 'COBRA',
	date: '21.02.2021 14:88',
	loserName: 'Medoed',
	loserAvatar: '',
}
const testData = [
	testMatch,
	testMatch,
	testMatch,
	testMatch,
	testMatch,
	testMatch,
	testMatch,
]
const rows = testData.map((item) =>
	createData(
		item.winnerAvatar ? item.winnerAvatar : avatar,
		item.winnerName,
		item.date,
		item.loserName,
		item.loserAvatar ? item.loserAvatar : avatar
	)
)
const StyledTableCell = styled(TableCell)`
  color: white;
  border-bottom: 1px solid #414141;
`

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
export const MatchHistory = () => {
	const classes = useStyles()
	return (
		<Box width="100vw" height="100vh">
			<Box marginTop="30px" display="flex" justifyContent="center">
				<Header />
			</Box>
			<Box
				bgcolor="#323232"
				height="65px"
				display="flex"
				marginBottom="10px"
				color="white"
				alignItems="center"
			>
				<ArrowBackIcon />

				<Box marginLeft="10px">GAMES ARCHIVE</Box>
			</Box>

			<Box display="flex" justifyContent="center">
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell></StyledTableCell>
							<StyledTableCell align="center">Winner name</StyledTableCell>
							<StyledTableCell align="center">date</StyledTableCell>
							<StyledTableCell align="right">Loser name</StyledTableCell>
							<StyledTableCell></StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.winnerName}>
								<StyledTableCell align="right">
									<Box
										borderRadius="50px"
										width="50px"
										height="50px"
										display="flex"
										justifyContent="center"
										alignItems="center"
									>
										<StyledImg src={row.winnerAvatar} alt="avatar" />
									</Box>
								</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									{row.winnerName}
								</StyledTableCell>

								<StyledTableCell align="right">{row.date}</StyledTableCell>
								<StyledTableCell align="right">{row.loserName}</StyledTableCell>
								<StyledTableCell align="right">
									<Box
										borderRadius="50px"
										width="50px"
										height="50px"
										display="flex"
										justifyContent="center"
										alignItems="center"
									>
										<StyledImg src={row.winnerAvatar} alt="avatar" />
									</Box>
								</StyledTableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</Box>
	)
}
