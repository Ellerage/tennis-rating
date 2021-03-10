import React from 'react'
import { Box, TextField, Button, makeStyles } from '@material-ui/core'
import { Header } from '../ui/header'
import styled from 'styled-components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import img from '../ui/icons/avatar.png'


const StyledAvatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`

const StyledUploadButton = styled(Box)`
  width: 295px;
  height: 45px;
  border-radius: 4px;
  background: #f51010;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Profile = () => {
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

				<Box marginLeft="10px">PROFILE</Box>
			</Box>

			<Box display="flex" justifyContent="center" marginBottom="10px">
				<Box
					display="flex"
					justifyContent="space-around"
					width="850px"
					bgcolor="#323232"
				>
					<Box display="flex" marginRight="50px">
						<Box
							display="flex"
							marginLeft="10px"
							height="150px"
							alignItems="center"
						>
							<StyledAvatar src={img} alt="asd" />
							<Box marginLeft="10px">
								<Box display="flex" fontSize="24px" color="white">
                  MAXIM ANANIN
								</Box>
								<Box
									display="flex"
									fontWeight="700"
									color="#F51010"
									fontSize="24px"
								>
                  OVER 900000 pts
								</Box>
							</Box>
							<Box display="flex" marginLeft="50px">
								<StyledUploadButton>UPLOAD NEW PHOTO</StyledUploadButton>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>

			<Box display="flex" justifyContent="center">
				<Box
					height="635px"
					width="850px"
					borderRadius="4px"
					bgcolor="#323232"
					alignItems="center"
				>
					<Box display="flex" justifyContent="center" marginTop="20px">
						<Box display="flex" width="600px" flexWrap="wrap">
							<Box
								display="flex"
								width="600px"
								justifyContent="space-between"
								alignItems="center"
								color="white"
								marginBottom="10px"
							>
                First name
								<TextField
									id="outlined-basic"
									label="First name"
									variant="outlined"
									color="secondary"
									style={{ width: '340px', color: 'white' }}
								/>
							</Box>
							<Box
								display="flex"
								width="600px"
								justifyContent="space-between"
								alignItems="center"
								color="white"
								marginBottom="10px"
							>
                E-mail
								<TextField
									id="outlined-basic"
									label="E-mail"
									variant="outlined"
									color="secondary"
									style={{ width: '340px', color: 'white' }}
								/>
							</Box>
							<Box
								display="flex"
								width="600px"
								justifyContent="space-between"
								alignItems="center"
								color="white"
								marginBottom="10px"
							>
                Second name
								<TextField
									id="outlined-basic"
									label="Second name"
									variant="outlined"
									color="secondary"
									style={{ width: '340px', color: 'white' }}
								/>
							</Box>
							<Box
								display="flex"
								width="600px"
								justifyContent="space-between"
								alignItems="center"
								color="white"
								marginBottom="10px"
							>
                Password
								<TextField
									id="outlined-basic"
									label="Password"
									variant="outlined"
									color="secondary"
									style={{ width: '340px', color: 'white' }}
								/>
							</Box>
							<Box
								display="flex"
								width="600px"
								justifyContent="space-between"
								alignItems="center"
								color="white"
								marginBottom="10px"
							>
                Aka
								<TextField
									id="outlined-basic"
									label="Aka"
									variant="outlined"
									color="secondary"
									style={{ width: '340px', color: 'white' }}
								/>
							</Box>
							<Box
								display="flex"
								width="600px"
								justifyContent="space-between"
								alignItems="center"
								color="white"
								marginBottom="10px"
							>
                Password confirmation
								<TextField
									id="outlined-basic"
									label="Password confirmation"
									variant="outlined"
									color="secondary"
									style={{ width: '340px', color: 'white' }}
								/>
							</Box>

							<Box
								width="700px"
								display="flex"
								justifyContent="flex-end"
								marginTop="20px"
							>
								<Button variant="contained" color="secondary" size="large">
                  SAVE
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
