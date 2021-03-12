import React, { ReactElement, useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { Header } from '../ui/header'
import { ButtonStyle } from '../ui/button'
import { useHistory } from 'react-router'
import { Routes } from '../common/routes'
import { Input } from '../ui/input'
import { getUrlApi } from '../common/get-url'
import { DataEncrypted } from '../ui/data-encrypted'


export const RegisterPage = (): ReactElement => {
	const history = useHistory()
	const [firstName, setFirstName] = useState('')
	const [email, setEmail] = useState('')
	const [lastName, setSecondName] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [passwordConf, setPasswordConf] = useState('')


	const handleSignupAsync = async () => {
		if (password !== passwordConf) {
			alert('Passwords are not the same')
		}

		const response = await fetch(getUrlApi('user/signup'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username, firstName, lastName, email, password})
		})
		const result = await response.json()

		if (result.status === 'OK') {
			history.push(Routes.LOGIN)
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
			<Box height="635px" width="790px" borderRadius="4px" bgcolor="#323232">
				<Box marginTop="30px">
					<Header />
				</Box>
				<Box
					width="100%"
					marginTop="16px"
					bgcolor="#1A1A1A"
					display="flex"
					justifyContent="space-around"
				>
					<ButtonStyle text="Sign in" onClick={() => history.push(Routes.LOGIN)} />
					<ButtonStyle text="Sign up" isActive={true} onClick={() => history.push(Routes.SIGNUP)} />
				</Box>
				<form onSubmit={event => event.preventDefault()}>
					<Box display="flex" justifyContent="center" marginTop="20px">
						<Box display="flex" width="710px" flexWrap="wrap">
							<Box margin="10px">
								<Input label="First name" onChangeText={setFirstName} />
								<Input label="E-mail" style={{marginLeft: 10}} onChangeText={setEmail} type="email" />
							</Box>
							<Box margin="10px">
								<Input label="Second name" onChangeText={setSecondName}/>
								<Input label="Password" style={{marginLeft: 10}} onChangeText={setPassword} type="password" />
							</Box>
							<Box margin="10px">
								<Input label="Aka" onChangeText={setUsername} />
								<Input label="Password confirmation" style={{marginLeft: 10}} onChangeText={setPasswordConf} type="password" />
							</Box>
							<Box
								width="700px"
								display="flex"
								justifyContent="space-between"
								marginTop="20px"
							>
								<DataEncrypted />
								<Button variant="contained" color="secondary" type="submit" size="large" onClick={handleSignupAsync}>
                Sign Up
								</Button>
							</Box>
						</Box>
					</Box>
				</form>
			</Box>
		</Box>
	)
}
