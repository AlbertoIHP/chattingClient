import React from 'react'

import { StyleSheet, Alert, FlatList, View, TouchableHighlight } from 'react-native'

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Body,
  Fab,
  Thumbnail
} from "native-base"


import { friendService } from '../Services/Friend.service'
import { userService } from '../Services/User.service'


//SOCKET
import { socket } from '../Services/socket'


export default class FriendScreen extends React.Component{

	constructor( props )
	{
		super(props)

		this.state = { friends: [], users: [], currentUser: this.props.user, showedFriends: [] }

		this.getFriends()

    //Especificamos el evento qeu configuramos en el servidor
    //Recibiremos la nueva amistad, y si el clietne esta involucrado entonces realizara nuevamente la peticion a la API
    socket.on('friendAdded', ( friendship ) =>{

      friendship = JSON.parse(friendship)
      if( friendship.friend1.email === this.state.currentUser.email || friendship.friend2.email === this.state.currentUser.email)
      {
        this.getFriends()        
      }
    } );

    socket.on('friendAdded', ( friendship ) =>{
      
      friendship = JSON.parse(friendship)
      if( friendship.friend1.email === this.state.currentUser.email || friendship.friend2.email === this.state.currentUser.email)
      {
        this.getFriends()        
      }
    } );
	}





	getFriends = async function()
	{

		let response = await friendService.index( this.props.token )


    //Filtramos solo los amigos del usuario logeado
    let myFriends = response.filter( friend => friend.friend1.email === this.state.currentUser.email || friend.friend2.email === this.state.currentUser.email )

    let total = []
    //Friend 2 es el amigo del usuari olgoeado
    for (let friend of myFriends)
    {

      let real = friend.friend2
      real.id = friend._id


      total.push(real)
    }


    this.setState( previousState => {
      previousState.showedFriends = total
      previousState.friends = myFriends
      return previousState
    })

    response = await userService.index( this.props.token )

    this.setState( previousState => {
      previousState.users = response
      return previousState
    })

	}

  showOptions( user )
  {
    Alert.alert(
      '¡Cuidado!',
      `¿Que deseas hacer con ${user.email}?`,
      [
        {text: 'Eliminarlo', onPress: () => this.deleteFriendship(user) },
        {text: 'Iniciar Conversacion', onPress: () => this.goChat(user) },
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }


  deleteFriendship = async function( friendship )
  {
    console.log(friendship)

    let response = friendService.destroy( friendship.id, this.props.token)

    if( response )
    {
      Alert.alert('¡ Amistad eliminada !')
      socket.emit('friendDeleted', JSON.stringify(friendship))
    }
    else
    {
      Alert.alert('No se pudo realizar la transaccion...')
    }

  }



	goChat( user )
	{
		alert('Hola!')
	}

	getCardItem( friend )
	{

		return (
    <TouchableHighlight onPress={() => this.showOptions(friend) }>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: friend.picture }} />
                <Text> { friend.email } </Text>
              </Left>

              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
    </TouchableHighlight>
			)
	}

	addFriend()
	{
		this.props.navigation.navigate('AddFriend', {token: this.props.token, friends: this.state.friends, users: this.state.users, currentUser: this.props.user })
	}

	render()
	{
    return (
      <Container >

        <Content padder>
          <Card >

          <FlatList 
          data={ this.state.showedFriends } 
          renderItem={ ( { item } ) => this.getCardItem( item ) } />
						


          </Card>
        </Content>

        <View style={{ height: 10 }}>
          <Fab
            active={ true }
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.addFriend() }>
          <Icon name="add" />
          </Fab>          
        </View>


      </Container>
    )
	}

}