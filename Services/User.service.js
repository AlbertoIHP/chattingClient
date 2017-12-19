import { base } from './base'

class UserService {

	peticion = async function ( methodType, bodyContent, id, token )
	{
		let api = id === false ? base.api+'/users' : base.api+'/users/'+id

		bodyContent = bodyContent === false ? false : JSON.stringify( bodyContent )

		headers = bodyContent === false ? { 'Authorization' : 'Bearer '+token } : { 'Accept' : 'application/json', 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }

		options = bodyContent === false  ? { method : methodType, headers : headers} : { method : methodType, headers : headers , body : bodyContent}
		

		try
		{
			let response = await fetch( api, options )
			return await response.json()
		}
		catch ( error )
		{
			return 401
		}

	}

	index = async function ( token )
	{
		return await this.peticion( 'GET', false, false, token )
	}

	show = async function ( id, token )
	{
		return await this.peticion( 'GET', false, id, token )
	}

	update = async function ( id, user, token )
	{

		user.email = user.email.toLowerCase()
		user.password = user.password.toLowerCase()
		return await this.peticion( 'PUT', user, id, token )
	}

	destroy = async function ( id, token )
	{
		return await this.peticion( 'DELETE', false, id, token )
	}












	store = async function ( user )
	{

		user.code = this.makeid()
		user.access_token = 'WowTwGyM4A7EZQXneb7WqGU8Guu9oR6o'
		user.email = user.email.toLowerCase()
		user.password = user.password.toLowerCase()


		headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }


		options = { method : 'POST', headers : headers , body : JSON.stringify(user) }
	
		try
		{
			let response = await fetch( base.api+'/users', options )
			return await response.json()
		}
		catch ( error )
		{
			return 401
		}

	}



	makeid = function () {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  for (var i = 0; i < 20; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	  return text;
	}

}


export const userService = new UserService()