import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import {ReactComponent as EncryptedSvg } from '../ui/icons/encrypted.svg'

const StyledText = styled('p')`
    color: white;
    margin-left: 8px;
`

export const DataEncrypted = (): ReactElement => {
	return (
		<Box display="flex" alignItems="center"marginLeft="30px">
			<EncryptedSvg /> 
			<StyledText>Your data is encrypted</StyledText>
		</Box>
	)
}