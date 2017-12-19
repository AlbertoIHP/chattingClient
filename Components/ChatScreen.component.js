import React from 'react'
import { Text } from 'react-native'

export default class ChatScreen extends React.Component{

	constructor( props )
	{
		super(props)
	}

	render()
	{
		return <Text> Chat funciona! El token es: {this.props.token}  </Text>
	}

}