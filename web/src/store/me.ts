/* eslint-disable no-mixed-spaces-and-tabs */
import { makeAutoObservable } from 'mobx'
import { getUrlApi } from '../common/get-url'
import { UserI } from '../common/types'

class Me {
    me: UserI = {} as UserI
    isLoading = false
	
    constructor() {
    	makeAutoObservable(this)
    }


    async fetchMe() {
    	this.isLoading = true
    	const token = localStorage.getItem('token')
        
    	const response = await fetch(getUrlApi('user/me'), {
    		headers: {
    			'Authorization': `Bearer ${token}`
    		}
    	})
    	const resultMe = await response.json()

    	this.me = resultMe
    	this.isLoading = false
    }

}

export default new Me()