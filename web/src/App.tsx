import React, { ReactElement } from 'react'
import { LoginPage } from './login/login-page'
import './App.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { RegisterPage } from './register/register-page'
import { NewGame } from './ui/new-game'
import { Ranking } from './ranking/ranking'
import { MatchHistory } from './match-history/match-history'
import { Profile } from './profile/profile'
import { Aneki } from './aneki/aneki'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom'
import { LoadingScreen } from './loading/loading-screen'



export const App = (): ReactElement => {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#323232',
			},
			secondary: {
				main: '#F51010',
			},
		},
	})
	
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<div className="App">
					<Switch>
						<Route path={'/'} exact component={LoadingScreen} />
						<Route path={'/login'} exact component={LoginPage}/>
						<Route path={'/ranking'} exact component={Ranking}/>
						<Route path={'/signup'} exact component={RegisterPage}/>
						<Route path={'/newgame'} exact component={NewGame}/>
						<Route path={'/profile/:id'} exact component={Profile}/>
						<Route path={'/history'} exact component={MatchHistory}/>
						<Route path={'/aneki'} exact component={Aneki}/>
					</Switch>
				</div>

			</Router>
		</ThemeProvider>
	)
}

