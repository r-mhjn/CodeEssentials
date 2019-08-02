import React from 'react';
import {Text, View , StyleSheet,Image, Dimensions, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Form, Item, Input, Label,Container, Header,Left,Right, Icon, Button, List, ListItem, InputGroup, Body,Title, Content, CheckBox} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight  = Dimensions.get('window').height;

//importing styles
import GlobalStyles  from '../src/GlobalStyles';



export default class SettingsScreen extends React.Component{

    render() {
        return (
            <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
            <TouchableWithoutFeedback 
            onPress={()=>{
                Keyboard.dismiss();
            }}
            >
            <Container>
            <Header style={styles.headerStyle}>
            <Left>
              <Button transparent
              onPress={()=>{
                  this.props.navigation.goBack();
              }}
              >
                <Icon name='arrow-back' />
              </Button>
            </Left> 
            <Body />                       
          </Header>
          <Content contentContainerStyle={{ flex:1,justifyContent:"center",alignItems:"center",}}>
          <Text>Settings Screen</Text>
          </Content>
            
          </Container>
          </TouchableWithoutFeedback>
          </SafeAreaView>             
        )
    }
}

const styles = StyleSheet.create({
    
    container:{
      
    },
    headerStyle:{
        backgroundColor:"#10A881",
    },
})