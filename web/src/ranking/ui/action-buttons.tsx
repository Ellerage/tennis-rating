import { Box, ButtonBase } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { ROUTES } from '../../common/routes'
import { Toast } from '../../ui/toast'

const Button = styled(ButtonBase)`
    background-color: #686868;
    height: 46px;
    width: 244px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: white;
`

const DonateButton = styled(Button)`
  background-color:#F51010;
`

export const ActionButtons = (): ReactElement => {
	const history = useHistory()
	const [isOpen, setIsOpen] = useState(false)

	const navigateToAneki = () => {
		history.push(ROUTES.ANEKI)
		window.location.reload()
	}

	const navigateToTournaments = () => {
		history.push(ROUTES.TOURNAMENTS)
	}

	const navigateToDonate = () => {
		setIsOpen(true)
	}

	return (
		<Box bgcolor="#323232" width="790px" marginLeft="auto" marginRight="auto" marginTop="10px" display="flex" justifyContent="space-between" alignItems="center" padding="20px 30px">
			<Button onClick={navigateToAneki}>ANEKI</Button>
			<Button onClick={navigateToTournaments}>TOURNAMENTS</Button>
			<DonateButton onClick={navigateToDonate}>DONATE</DonateButton>

			<Toast text="300$ were taken from your social account" isOpen={isOpen} onClose={() => setIsOpen(false)}/>
		</Box>
	)
}