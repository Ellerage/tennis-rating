/* eslint-disable no-mixed-spaces-and-tabs */
import { makeAutoObservable } from 'mobx'


class Tournament {
    tournaments: unknown[] = []
    nameTounament = ''
    tournamentId = ''
    svgLiveStream = ''
    userName = ''

    constructor() {
    	makeAutoObservable(this)
    }




    setNameTournament(title: string) {
    	this.nameTounament = title
    }
    setNameUser(name: string) {
    	this.userName = name
    }





    async createTournament() {
    	const response = await fetch(`
        https://api.challonge.com/v1/tournaments.json?api_key=MTWFukxbvNH7iPhuFyBDA0YgJz4rUgF7wBm2g6ku&tournament[name]=${this.nameTounament}&tournament[open_signup]=true&tournament[tournament_type]=double elimination
        `, {method: 'POST'})
    	if(response.ok) {
    		const newTournament = await response.json()
    		this.tournamentId = newTournament.tournament.url
    		this.svgLiveStream = newTournament.tournament.live_image_url
    	} else {
    		console.error(`Fetch error: ${response.status}`)
    	}
    }

    async createUserTournament() {
    	const response = await fetch(`
       https://api.challonge.com/v1/tournaments/${this.tournamentId}/participants.json?api_key=MTWFukxbvNH7iPhuFyBDA0YgJz4rUgF7wBm2g6ku&participant[name]=${this.userName}
       `, {method: 'POST'})
    	if(response.ok) {
    		console.log('ok')
    	} else {
    		console.error(`Fetch error: ${response.status}`)
    	}
    }

    async getTournaments() {
    	const response = await fetch(`
        https://api.challonge.com/v1/tournaments.json?api_key=MTWFukxbvNH7iPhuFyBDA0YgJz4rUgF7wBm2g6ku
       `, {method: 'GET'})
    	if(response.ok) {
    		this.tournaments = await response.json()
    	} else {
    		console.error(`Fetch error: ${response.status}`)
    	}   
    }





	// async startTournament() {
	// 	const response = await fetch(`
	//    https://api.challonge.com/v1/tournaments/${this.tournamentId}/start.json?api_key=MTWFukxbvNH7iPhuFyBDA0YgJz4rUgF7wBm2g6ku
	//    `)
	// 	if(response.ok) {
            
	// 	} else {
	// 		console.error(`Fetch error: ${response.status}`)
	// 	}
	// }
}

export default new Tournament()