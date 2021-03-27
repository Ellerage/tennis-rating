import React, { ReactElement } from 'react'
import { Box } from '@material-ui/core'
import styled from 'styled-components'
import img from '../ui/icons/UBER-PREDATOR.png'
import { UserI } from '../common/types'

interface Props {
	user: UserI
}

const UberBackground = styled(Box)`
  background-color: #323232;
  background-image: url(${img});
  background-size: 500px 150px;
  background-repeat: no-repeat;
  background-position: right;
  width: 850px;
  height: 150px;
  margin-bottom: 10px;
`

const StyledText = styled(Box)`
	font-weight: bold;
	margin-right: 10px;
	font-size: 30px;
`

export const UberPredator = ({user}: Props): ReactElement => {
	return (
		<Box display="flex" justifyContent="center">
			<UberBackground>
				<Box
					display="flex"
					marginLeft="30px"
					height="150px"
					alignItems="center"
				>
					<Box marginLeft="10px">
						<Box display="flex" fontSize="24px" color="white">
							<StyledText>{user.firstName}</StyledText>
							<StyledText color="#F51010">{user.username}</StyledText>
							<StyledText>{user.lastName}</StyledText>
						</Box>
						<Box
							display="flex"
							fontWeight="700"
							marginTop="10px"
							color="#F51010"
							fontSize="24px"
						>
							{`${user.rating} pts`}
						</Box>
					</Box>
				</Box>
			</UberBackground>
		</Box>
	)
}
