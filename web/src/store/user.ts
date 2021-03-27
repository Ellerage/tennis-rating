/* eslint-disable no-mixed-spaces-and-tabs */
import { makeAutoObservable } from 'mobx'
import { getUrlApi } from '../common/get-url'
import { UserI } from '../common/types'
import { Game } from '../profile/profile'

interface UserStatsI {
	user?: UserI
	winRate: number
	games: Game[]
}

class User {
    me: UserI = {} as UserI
    users = []
	userStats: UserStatsI = {user: undefined, winRate: 0, games: []} as UserStatsI
	ratingChangeHistory = [{x: 0, y: 0}]

	constructor() {
    	makeAutoObservable(this)
	}


	async fetchMe() {
    	const token = localStorage.getItem('token')
        
    	const response = await fetch(getUrlApi('user/me'), {
    		headers: {
    			'Authorization': `Bearer ${token}`
    		}
    	})
    	const resultMe = await response.json()

		this.me = resultMe
	}

	 async fetchUsers() {
    	const response = await fetch(getUrlApi('user'))
    	const result = await response.json()

    	this.users = result.sort((a: UserI, b: UserI) => b.rating - a.rating)
	}

	async fetchUser(id: string) {
    	const responseUser = await fetch(getUrlApi(`user/${id}`))
    	const resultUser = await responseUser.json()

		const responseStats = await fetch(getUrlApi(`user/stats/${id}`))
		const resultStats = await responseStats.json()
		
		this.userStats = {...resultStats, user: resultUser}

		this.calcRatingHistory()
	}

	calcRatingHistory() {
		let preRating = 1000

		const historyChange = this.userStats.games.slice().sort((a: Game, b: Game) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).map((game: Game, index) => {
			const isWon = this.userStats.user && this.userStats.user.id === game.winner.id
			const value = isWon ? preRating + game.ratingChange : preRating - game.ratingChange
			preRating = value
			return {x: index+1, y: value}
		})

		this.ratingChangeHistory = historyChange
	}
}

export default new User()