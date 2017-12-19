import React from "react";
import { StatusBar } from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import Expo from "expo";

import { StackNavigator } from 'react-navigation'

import  HomeScreen  from './Components/HomeScreen.component'
import  LoginScreen from './Components/LoginScreen.component'
import SingleChatScreen from './Components/SingleChatScreen.component'
import AddFriendScreen from './Components/AddFriendScreen.component'
import EditProfileScreen from './Components/EditProfileScreen.component'



const Router = StackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Chat: { screen: SingleChatScreen },
  AddFriend: { screen: AddFriendScreen},
  EditProfile: { screen: EditProfileScreen }
},
{
  navigationOptions: 
  {
    header: null,
    gesturesEnabled: false
  },
})




export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />
    }
    return <Router />
  }
}