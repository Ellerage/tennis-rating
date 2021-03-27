/* eslint-disable no-mixed-spaces-and-tabs */
import { makeAutoObservable, runInAction } from 'mobx'
import { getUrlApi } from '../common/get-url'
import { UserI } from '../common/types'
import { Game } from '../profile/profile'

interface UserStatsI {
	user?: UserI
	winRate: number
	games: Game[]
}

class User {
    users = []
	userStats: UserStatsI = {user: undefined, winRate: 0, games: []} as UserStatsI
	ratingChangeHistory = [{x: 0, y: 0}]
	isLoading = false

	constructor() {
    	makeAutoObservable(this)
	}

	 async fetchUsers() {
		this.isLoading = true
    	const response = await fetch(getUrlApi('user'))
    	const result = await response.json()

		this.users = result.sort((a: UserI, b: UserI) => b.rating - a.rating)
		this.isLoading = false
	}

	async fetchUser(id: string) {
		this.isLoading = true
    	const responseUser = await fetch(getUrlApi(`user/${id}`))
    	const resultUser = await responseUser.json()

		const responseStats = await fetch(getUrlApi(`user/stats/${id}`))
		const resultStats = await responseStats.json()
		
		runInAction(() => {
			this.userStats = {...resultStats, user: resultUser}
		})
		
		this.calcRatingHistory()
		this.isLoading = false
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