import React from 'react'
import { StyleSheet, Alert, FlatList, View, TouchableHighlight } from 'react-native'
import fuzzy  from 'fuzzy'

import { friendService } from '../Services/Friend.service'

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
  Item,
  Input,
  Thumbnail
} from "native-base";





//SOCKET
import { socket } from '../Services/socket'

export default class AddFriendScreen extends React.Component{

  constructor( props )
  {
    super( props )

    this.state = { 
      currentUser: this.props.navigation.state.params.currentUser, 
      friends: this.props.navigation.state.params.friends, 
      users: this.props.navigation.state.params.users,
      showedUsers: [], 
      toFind: '' }



  }

  componentDidMount()
  {
    this.setState( previousState =>{


      //Sacamos al usuario logeado del total
      previousState.users = previousState.users.filter( user => user.id != previousState.currentUser.id )


      // ahora nos quedamos con el amigo solamente
      let aux = []
      for( let friendship of previousState.friends )
      {
        friendship.friend1.id === previousState.currentUser.id ? aux.push(friendship.friend2) : aux.push(friendship.friend1)
      }

      console.log("MOSTRANDO USUARIOS AMIGOS DEL USUARIO ACTUAL "+previousState.currentUser.email)
      console.log(aux)

      for( let friend of aux )
      {
        previousState.users = previousState.users.filter( user => user.email != friend.email  )
      }
      console.log("MOSTRANDO LOS USUARIOS DISPONIBLES PARA AGREGAR")
      console.log(previousState.users)

      previousState.showedUsers = previousState.users
      return previousState
    })    
  }


  filterData( email )
  {
    email = email.toLowerCase()


    this.setState( previousState => {
      previousState.toFind = email
      return previousState
    })


    if(email === '')
    {
      this.setState( previousState => {
        previousState.showedUsers = previousState.users
        return previousState
      })
    }
    else
    {


      this.setState( previousState => {
      let options = { extract: function(el) { return el.email } }
      let results = fuzzy.filter( email, this.state.users, options)
      let matches = results.map(function(el) { return el.original; })



        previousState.showedUsers = matches
        return previousState

      }) 
    }

  }

  showOptions( user )
  {
    Alert.alert(
      '¡Cuidado!',
      `¿Deseas agregar a ${user.email}?`,
      [
        {text: 'Si', onPress: () => this.addFriend(user) },
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }



  addFriend = async function( friend )
  {

    let friendship = { friend1: this.state.currentUser, friend2: friend }
    let response = await friendService.store( friendship)

    if( response )
    {
      Alert.alert("¡ La amistad ha sido concretada !")
      socket.emit('friendAdded', JSON.stringify(friendship))
    }
    else
    {
      Alert.alert("No se ha podido concretar la amistad...")

    }

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





  render()
  {
    return (
        <Container>
          <Header searchBar rounded>

            <Button 
            transparent 
            onPress={() => this.props.navigation.goBack()}
            style={{ marginRight: '5%'}}>
              <Icon name="arrow-back" />
            </Button>

            <Item>
              <Icon name="ios-search" />
              <Input 
              placeholder="Ingrese el correo..." 
              value={this.state.toFind}
              onChangeText={ ( email ) => this.filterData( email ) } />
              <Icon name="ios-people" />
            </Item>
          </Header>

        <Content padder>
          <Card >

          <FlatList 
          data={ this.state.showedUsers } 
          renderItem={ ( { item } ) => this.getCardItem( item ) } />
            


          </Card>
        </Content>












        </Container>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});