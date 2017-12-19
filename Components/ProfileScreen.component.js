import React from 'react'
import { Image, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';


export default class ProfileScreen extends React.Component{

	constructor( props )
	{
		super(props)
	}


	logout = function()
	{

		Alert.alert(
		  '¡Cuidado!',
		  '¿Estas seguro de cerrar sesion?',
		  [
		    {text: 'Si', onPress: () => this.props.navigation.goBack(null) },
		    {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
		  ],
		  { cancelable: false }
		)


	}

	editProfile = function()
	{
		this.props.navigation.navigate('EditProfile')
	}

	render()
	{
    return (
      <Container>
        <Content>
          <Card style={{ marginTop: 20 }}  >
            <CardItem>
              <Left>
                <Thumbnail source={{uri: this.props.user.picture }} />
                <Body>
                  <Text> { this.props.user.email } </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>

	          <Button 
	          block 
	          bordered 
	          rounded 
	          info 
	          onPress={ () => this.editProfile()}
	          style={{ marginTop: 15 }} >
	            <Icon name='settings' />
	            <Text>Editar Perfil</Text>
	          </Button>   

	          <Button
	          block 
	          bordered 
	          rounded 
	          info 
	          onPress={ () => this.logout() }
	          style={{ marginTop: 30 }} >
	            <Icon name='shuffle' />
	            <Text>Cerrar Sesion</Text>
	          </Button>   


        </Content>
      </Container>
    )
	}

}