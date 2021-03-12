
import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'

import { ReactElement } from 'react'
import { Header } from '../ui/header'
import { ButtonStyle } from '../ui/button'
import { useHistory } from 'react-router'
import { Routes } from '../common/routes'
import { Input } from '../ui/input'
import { getUrlApi } from '../common/get-url'
import { DataEncrypted } from '../ui/data-encrypted'
export const LoginPage = (): ReactElement => {
	const history = useHistory()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')


	const handleLoginAsync = async () => {
		const response = await fetch(getUrlApi('user/signin'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username, password})
		})

		const result = await response.json()

		if (result.token) {
			localStorage.setItem('token', result.token)

			history.push(Routes.RANKING)
		}
	}


	return (
		<Box
			width="100vw"
			height="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Box width="500px" height="500px" borderRadius="4px" bgcolor="#323232">
				<Box marginTop="30px">
					<Header />
				</Box>
				<Box width="100%" marginTop="16px">
					<ButtonStyle text="Sign in" onClick={() => history.push(Routes.LOGIN)} isActive />
					<ButtonStyle text="Sign up" onClick={() => history.push(Routes.SIGNUP)} />
				</Box>
				<Box flexWrap="wrap" width="340px" marginLeft="50px" >
					<form>
						<Box height="36px" margin="30px" >
							<Input label="Username" onChangeText={setUsername} />
						</Box>

						<Box height="36px" margin="30px" marginTop="50px" >
							<Input label="Password" onChangeText={setPassword} type="password" />
						</Box>

						<Box display="flex" justifyContent="space-between" marginRight="-30px" marginTop="80px">
							<DataEncrypted />
							<Button variant="contained" color="secondary" type="submit" size="large" onClick={handleLoginAsync}>
							LOG IN
							</Button>
						</Box>
					</form>
				</Box>
			</Box>
		</Box>
	)
}
