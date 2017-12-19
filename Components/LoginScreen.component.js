import React from 'react'

import { Alert, StyleSheet, Image } from 'react-native'


import { Spinner, Thumbnail,  Grid, Col, Header, Title, Footer, FooterTab, Left, Right, Body, Button, Icon, Text, Container, Content, Form, Item, Input  } from 'native-base'

import { authService } from '../Services/Auth.service'
import { userService } from '../Services/User.service'

export default class LoginScreen extends React.Component {

  constructor( props )
  {
    super( props )

    this.state = { 
      user: { email: '', password: ''},
      enabledButton: true,
      loading: false
    }


  }


  checkInfo( previousState )
  {
      if ( previousState.user.email != '' && previousState.user.password != '' && this.validateEmail( this.state.user.email ))
      {
        this.state.enabledButton = false
      }
      else
      {
        this.state.enabledButton = true
      }     

      
  }

  changeEmail ( newEmail )
  { 
    this.setState( previousState => {
      previousState.user.email = newEmail
      this.checkInfo(previousState)
      return previousState
    } )
  }

  changePassword ( newPassword )
  {    
    this.setState( previousState => {
      previousState.user.password = newPassword
      this.checkInfo(previousState)
      return previousState
    } )
  }  

  validateEmail = function (email)
  {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email.toLowerCase());
  }


  login = async function()
  {
    this.setState( previousState => {
      previousState.loading = true
      return previousState
    })

    let response = await authService.login( this.state.user )

    console.log( response )
    if( response === 401 )
    {

      Alert.alert(
      'Ops!',
      'No hemos podido encontrar el usuario ingresado...')

    }
    else
    {


      this.props.navigation.navigate('Home', {token: response.token, user: response.user } )      
    }

      this.setState( previousState => {
        previousState.loading = false
        previousState.user.email = ''
        previousState.user.password = ''
        previousState.enabledButton = true
        return previousState
      })

  }

  register = async function()
  {

    this.setState( previousState => {
      previousState.loading = true
      return previousState
    })

    let response = await userService.store( this.state.user )

    if( response === 401 )
    {
      Alert.alert(
      'Ops!',
      'No hemos podido registrarte, ¡intentalo de nuevo!')

    } 
    else if( response.message === 'email already registered')
    {
      Alert.alert(
      'Ops!',
      'Este correo se encuentra en uso, prueba con uno distinto')        
    }
    else if( response.message === 'password must have length greater than or equal to 6')
    {
      Alert.alert(
      'Ops!',
      'Tu contraseña es demasiado corta, prueba con una que al menos tenga 6 caracteres..')     
    }
    else
    {
      Alert.alert(
      '¡Bienvenido!',
      'Hemos registrado tu informacion exitosamente, prueba iniciando sesion...')        
      this.setState( previousState => {
        previousState.user = response
        return previousState
      })


    }

      this.setState( previousState => {
        previousState.loading = false
        previousState.enabledButton = true
        return previousState
      })

      console.log(response)

  }


  render()
  {


    if( this.state.loading )
    {
    return (
      <Container >
        <Content >
          <Spinner color='blue' style={{ marginTop: 200 }}/>
        </Content>
      </Container>
    )
    }
    else
    {
      return (


          <Container>
            <Content  >
     
                <Grid  >
                  <Col style={{ marginTop: '5%',  alignItems: 'center', flex: 1}} >
                    <Image source={{uri: 'http://www.free-icons-download.net/images/chat-bubble-logo-icon-74378.png'}} style={{height: 150, width: 150, flex: 1}}/>   
                  </Col>
                </Grid>

               
              <Form style={{ marginTop: 1}}>
                <Item>
                  <Input 
                  placeholder="Correo"
                  value={ this.state.user.email }
                  onChangeText={ ( email ) => this.changeEmail( email ) }
                   />
                </Item>
                <Item>
                  <Input 
                  placeholder="Contraseña"
                  value={ this.state.user.password }
                  onChangeText={ ( password ) => this.changePassword( password ) }
                  secureTextEntry={true}

                   />
                </Item>
              </Form>

                <Grid style={{ marginTop: '5%'}} >
                  <Col >
                    <Button 
                    block 
                    rounded 
                    info 
                    onPress={ () => this.login() }
                    disabled={ this.state.enabledButton }
                     >
                      <Text>Iniciar Sesion</Text>
                    </Button>              
                  </Col>
                </Grid>


                <Grid style={{ marginTop: '5%'}} >
                  <Col >
                    <Button 
                    block 
                    rounded 
                    success
                    onPress={ () => this.register() } 
                    disabled={ this.state.enabledButton }
                    >
                      <Text >Registrarme</Text>
                    </Button>
                  </Col>
                </Grid>




            </Content>





          </Container>


        )
    }
  }

}
