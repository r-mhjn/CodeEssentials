import React from 'react';
import {Text, View , StyleSheet,Image, Dimensions, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Form, Item, Input, Label,Container, Header,Left,Right, Icon, Button, List, ListItem, InputGroup, Body,Title, Content, CheckBox} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import validator from 'validator';


// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight  = Dimensions.get('window').height;

//importing styles
import GlobalStyles  from '../src/GlobalStyles';

// Importing firebase
import * as firebase from 'firebase'; 


export default class ResetPasswordScreen extends React.Component{


    // TODO: add funtions for validation .. and SUBMIT button
    // TODO: add icon = eye-off


    constructor(props) {
        super(props);
    
        this.state = {
             secureFieldOne:true,
             secureFieldTwo:true,
             secureFieldThree:true,
             oldPassword:'',
             newPassword:'',
             confirmNewPassoword:'',
        }
    }
    


    render() {
        return (
            <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
            <TouchableWithoutFeedback 
            onPress={()=>{
                Keyboard.dismiss();
            }}
            >
            <Container style={styles.container}>
            <Content >
            <Header style={styles.headerStyle}>
            <Left style={{flex:1}}>
              <Button transparent
              onPress={()=>{
                  this.props.navigation.goBack();
              }}
              >
                <Icon name='arrow-back'/>
              </Button>
            </Left>
            <Body style={{flex:2}}>
            <Title style={{textAlign:"center"}}>Reset Password</Title> 
            </Body>
            <Right style={{flex:1}}/>
          </Header>
          
          
          <View style={styles.contentContainer}>
                    
            <Form>
             <Item style={styles.itemStyle}>
                <Icon active name='key' style={{color:"#10A881"}}/>
                <Input
                autoCorrect={false}
                autoCapitalize="none"                
                onChangeText={()=>{
                  
                }}   
                placeholder='Old password' placeholderTextColor="#10A881" style={{ color: "#10A881" }} secureTextEntry={this.state.secureFieldOne}/>
                <Right>
                <TouchableOpacity 
                onPress={()=>{
                    let secureFieldOne = this.state.secureFieldOne;
                    this.setState({secureFieldOne:!secureFieldOne});
                }}
                >
                <Icon active name={icon = this.state.secureFieldOne ? 'eye-off':'eye'} style={{color:"#10A881", marginRight:10}} />

                </TouchableOpacity>
                </Right>
             </Item>
                     
 
            <Item style={styles.itemStyle}>
                <Icon active name='key' style={{color:"#10A881"}} />
                <Input
                autoCorrect={false}
                autoCapitalize="none"               
                onChangeText={()=>{
                  
                }}   
                placeholder='New password' placeholderTextColor="#10A881" style={{ color: "#10A881" }} secureTextEntry={this.state.secureFieldTwo}/>
                <Right>
                <TouchableOpacity 
                onPress={()=>{
                    let secureFieldTwo = this.state.secureFieldTwo;
                    this.setState({secureFieldTwo:!secureFieldTwo});
                }}
                >
                <Icon active name={icon = this.state.secureFieldTwo ? 'eye-off':'eye'} style={{color:"#10A881", marginRight:10}} />
                </TouchableOpacity>
                </Right>
             </Item>
            </Form>
              
            <Item style={styles.itemStyle}>
                <Icon active name='key' style={{color:"#10A881"}}/>
                <Input
                autoCorrect={false}
                autoCapitalize="none"               
                onChangeText={()=>{
                  
                }}   
                placeholder='Confirm password' placeholderTextColor="#10A881" style={{ color: "#10A881" }} secureTextEntry={this.state.secureFieldThree}/>
               
                <Right>
                <TouchableOpacity 
                onPress={()=>{
                    let secureFieldThree = this.state.secureFieldThree;
                    this.setState({secureFieldThree:!secureFieldThree});
                }}
                >
                <Icon active name={icon = this.state.secureFieldThree ? 'eye-off':'eye'} style={{color:"#10A881", marginRight:10}}/>

                </TouchableOpacity>
                </Right>
            </Item>

            <Button 
                onPress={()=>{
                    this.props.navigation.navigate('LoginScreen');
                }}
                style={styles.button}
                >
                <Text style={styles.buttonText}>SUBMIT</Text>
            </Button>         
          
          </View>
          </Content>
            
          </Container>
          </TouchableWithoutFeedback>
          </SafeAreaView>             
        )
    }
}

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor:"#fff",
    },
    headerStyle:{
        backgroundColor:"#10A881",
    },
    contentContainer:{
        minWidth:screenWidth*0.95,        
        maxWidth:screenWidth*0.95,        
        marginHorizontal:screenWidth*0.025,
        minHeight:screenHeight*0.70,
        maxHeight:screenHeight*0.70,
        marginTop:screenHeight*0.02,
        marginBottom:screenHeight*0.20,
        // borderColor:"black",
        // borderWidth:4,   
    },
    itemStyle:{
        marginBottom:screenHeight*0.03,
    },   
    button:{
        flex:1,
        backgroundColor:"#10A881",
        minWidth:screenWidth*0.95,
        maxWidth:screenWidth*0.95,         
        minHeight:screenHeight*0.07,
        maxHeight:screenHeight*0.07,     
        marginVertical:20,
        alignItems:"center",
        justifyContent:"center",
   },
   buttonText:{
     color:"#fff",
     fontSize:responsiveFontSize(2),  
     fontWeight:'200',          
   },
})