import React from 'react'

import { StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon,
  Tab, 
  Tabs
} from "native-base";


import FriendScreen from './FriendScreen.component'
import ChatScreen from './ChatScreen.component'
import ProfileScreen from './ProfileScreen.component'

export default class HomeScreen extends React.Component {

  constructor(props) 
  {
    super( props )
  }



  render()
  {

    return (
      <Container>
        <Header hasTabs />
        <Tabs initialPage={0}>
          <Tab heading="Chats">
            <ChatScreen 
            token={ this.props.navigation.state.params.token } 
            navigation= {this.props.navigation}
            user={ this.props.navigation.state.params.user }
             />
          </Tab>
          <Tab heading="Perfil">
            <ProfileScreen
            token={ this.props.navigation.state.params.token } 
            navigation= {this.props.navigation} 
            user={ this.props.navigation.state.params.user } 
            />
          </Tab>
          <Tab heading="Amigos">
            <FriendScreen 
            token={ this.props.navigation.state.params.token } 
            navigation= {this.props.navigation}
            user={ this.props.navigation.state.params.user }
              />
          </Tab>
        </Tabs>
      </Container>
    )

  }

}

