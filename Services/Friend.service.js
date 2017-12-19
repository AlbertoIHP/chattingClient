import { base } from './base'

class FriendService {

	peticion = async function ( methodType, bodyContent, id, token )
	{
		let api = id === false ? base.api+'/friends' : base.api+'/friends/'+id

		bodyContent = bodyContent === false ? false : JSON.stringify( bodyContent )

		headers = bodyContent === false ? { 'Authorization' : 'Bearer '+token } : { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		options = bodyContent === false  ? { method : methodType, headers : headers} : { method : methodType, headers : headers , body : bodyContent}
		
		console.log(api)
		console.log(options)


		try
		{
			let response = await fetch( api, options )
			return await response.json()
		}
		catch ( error )
		{
			console.log(error)
			return 401
		}

	}

	index = async function ( token )
	{
		return await this.peticion( 'GET', false, false , token)
	}



	show = async function ( id, token )
	{
		return await this.peticion( 'GET', false, id , token)
	}

	update = async function ( id, friendship, token )
	{
		return await this.peticion( 'PUT', friendship, id, token )
	}

	destroy = async function ( id, token )
	{
		return await this.peticion( 'DELETE', false, id , token)
	}

	store = async function ( friendship  )
	{

		friendship.access_token = 'WowTwGyM4A7EZQXneb7WqGU8Guu9oR6o'

		headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }

		console.log(JSON.stringify(friendship))


		options = { method : 'POST', headers : headers , body : JSON.stringify(friendship) }
	
		try
		{
			let response = await fetch( base.api+'/friends', options )
			return await response.json()
		}
		catch ( error )
		{
			return 401
		}



		return await this.peticion( 'POST', friendship, false , token)
	}



}


export const friendService = new FriendService()