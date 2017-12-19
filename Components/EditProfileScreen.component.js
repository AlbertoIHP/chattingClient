import React from 'react'

import { StyleSheet } from 'react-native'

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
  Body
} from "native-base";

export default class EditProfileScreen extends React.Component{

	constructor( props )
	{
		super( props )
	}

	render()
	{
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Edicion del Perfil</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
        	<Text> EditProfileScreen Works!  </Text>
        </Content>
      </Container>
    )
	}
}


const styles = StyleSheet.create( {
  container: {
    backgroundColor: "#FFF"
  }
})