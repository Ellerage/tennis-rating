import Box from '@material-ui/core/Box'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { User } from '../../common/types'

interface Props {
    id: string
    created_at: string
    isConfirmed: boolean
    ratingChange: number
    winner: User
    players: User[]
    meUser: User
}

const Root = styled(Box)`
    padding: 10px;
`

const StyledText = styled(Box)`
    color: white;
`

export const UnconfirmedGame = ({id, players, meUser}: Props): ReactElement => {

	const opponentUser = players.find((player) => player.id !== meUser.id)
	return (
		<Root id="simple-modal-title" key={id}>
			<StyledText>{`${opponentUser?.firstName} ${opponentUser?.lastName}`}</StyledText>

			<Box>Result: </Box>
		</Root>
	)
}