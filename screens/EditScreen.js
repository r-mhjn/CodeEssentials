import React from 'react';
import {Text, View , StyleSheet,Image, Dimensions, SafeAreaView,TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Form, Item, Input, Label,Container, Header,Left,Right, Icon, Button, List, ListItem, InputGroup, Body,Title, Content,} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import validator from 'validator';


// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight  = Dimensions.get('window').height;

//importing styles
import GlobalStyles  from '../src/GlobalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Importing firebase
import * as firebase from 'firebase';


export default class EditScreen extends React.Component{


    // TODO: add checks to the changes made in the info
    // TODO: add custom values to inputs
    //TODO: Add logic to change button..need to get galary permissions and upload from galary

    constructor(props) {
      super(props)
    
      this.state = {
         email:'',
         phoneno:'',
      }
    }

     //TODO: a method to validate and set email

     validateEmail = (email) =>{

    }

    //TODO: a method to validate and set phoneno
    
    validatePhoneno = (phoneno) =>{

    }
    



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
            <Left style={{flex:3.2}}>
              <Button transparent
              onPress={()=>{
                  this.props.navigation.goBack();
              }}
              >
                <Icon name='arrow-back' />
              </Button>
            </Left> 
            <Body style={{flex:1}}>
              <Title style={{textAlign:"center"}}>Edit</Title> 
            </Body>
            <Right style={{flex:2.8}}/>               
          </Header>
          <Content >
            
            <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/manAvatarGrey.jpeg')}
              style={styles.imageStyle}
             ></Image>
            
            <TouchableOpacity
            onPress={()=>{
                  
            }}
            >
            <Text style={{fontSize:responsiveFontSize(2.5),color:"#10A881" ,marginTop:5, }}>Change Photo</Text> 
            </TouchableOpacity>             
            </View>

            <View style={styles.inputsContainer}>
            <Form>
            <Item style={styles.itemStyle}>
                <Icon active name='person' style={{color:"#10A881"}}/>
                <Input
                autoCorrect={false}
                autoCapitalize="none"               
                onChangeText={()=>{
                  
                }}   
                placeholder='Username'  placeholderTextColor="#10A881" style={{ color: "#10A881" }}/>
             </Item>
             
             <Item style={styles.itemStyle}>
                <Icon active name='phone-portrait' style={{color:"#10A881"}} />
                <Input keyboardType="number-pad" placeholder='Phone Number' placeholderTextColor="#10A881" style={{ color: "#10A881" }}/>
             </Item>
             </Form> 
            </View> 
            
            <Button 
            onPress={()=>{
                this.props.navigation.navigate('LoginScreen');
            }}
            style={styles.button}
            >
            <Text style={styles.buttonText}>Save Changes</Text>
           </Button>       


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
    },
    headerStyle:{
        backgroundColor:"#10A881",
    },
    imageContainer:{
        width:screenWidth,
        height:screenHeight*0.25,
        justifyContent:"center",
        alignItems:"center",
        // borderColor:"black",
        // borderWidth:2,
    },
    imageStyle:{
        width:screenWidth*0.25,
        height:screenWidth*0.25,
        borderRadius:screenWidth*0.15,       
        borderColor:"red",        
    },
    inputsContainer:{       
        // borderColor:"black",
        // borderWidth:2,
        width:screenWidth*0.95,
        marginHorizontal:screenWidth*0.025,
    },
    itemStyle:{
        marginBottom:screenHeight*0.03,
    },
    button:{
        flex:1,
        backgroundColor:"#10A881",
        minWidth:screenWidth*0.95,
        maxWidth:screenWidth*0.95,    
        marginHorizontal:screenWidth*0.025,        
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