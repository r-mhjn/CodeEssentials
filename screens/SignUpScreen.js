import React from 'react';
import {Text, View , StyleSheet,  Dimensions, SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import {Form, Item, Input,Container, Header,Left,Right, Icon, Button, Body,Content, Root, Toast} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import validator from 'validator';



// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight  = Dimensions.get('window').height;

//importing styles
import GlobalStyles  from '../src/GlobalStyles';

// Importing firebase
import * as firebase from 'firebase';


export default class SignUpScreen extends React.Component{
  
        
    // TODO: connect with reducers

    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             email:'',
             phoneno:'',
             password:'',
             confirmPassword:'',
        }
    }

    //A method to signUp user
    signUpUser = (username, email, password, phoneno) =>{
        console.log(phoneno);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then( authenticate =>{
                return authenticate.user.updateProfile({
                    displayName:username,
                    phoneNumber:phoneno,
                    photoURL:'',  
                })
                .then(()=>{
                    this.props.navigation.replace("HomeScreen");
                })
            })
            .catch( error =>{
                alert(error.message)
            })
    }
    
    //A method to validate and set email
    validateEmail = () =>{

        if(validator.isEmail(this.state.email)){
           return this.validatePhoneno();
        }else{
            return "Invalid Email";
        }
    }

    //A method to validate and set phoneno    
    validatePhoneno = () =>{
          if(validator.isMobilePhone(this.state.phoneno) && this.state.phoneno.length==10){
             return this.validatePassword();
          }
          else{
              console.log('Invalid Phone Number');

              return "Invalid Phone Number"
          }
    }

    //A method to validate whether passwword is alpha numric or not
    validatePassword = () =>{
       if(validator.isAlphanumeric(this.state.password) && this.state.password.length>=8)
       {
          return this.validateConfirmPassword();
       }
       if(!validator.isAlphanumeric(this.state.password))
       {
           console.log('Password must be alpha numeric');
           return "Password must be alpha numeric";
       }
       if(this.state.password.length<8)
       {
            console.log('Password should be atleast 8 digit long');
           return "Password should be atleast 8 digit long";
       }

    }
    //A method to compare both passwords
    validateConfirmPassword = () =>{
        if(validator.equals(this.state.password, this.state.confirmPassword))
        {      
           // add a method to set up the firebase sign up and profile and redirect to login screen
           this.signUpUser(this.state.username, this.state.email, this.state.password, this.state.phoneno);
        }
        else{
            console.log('Password Mis-Match');
            return "Password Mis-Match";
        }
    }

    //Validate whether all fields are filled of not  
    ensureAllFields = () =>{
        if(this.state.username!==' ' && this.state.email !=='' && this.state.password !=='' && this.state.phoneno!=='' && this.state.confirmPassword!=='' )
        {
           return true;            
        }
       else{      
         return false;
       } 
      } 
    

    render(){
        return (       
        
         <Root>
        <SafeAreaView style={GlobalStyles.AndroidSafeArea}>       
         <TouchableWithoutFeedback
         onPress={()=>{
             Keyboard.dismiss();
         }}
         >
         <Container style={styles.container}>
         <Content> 
          <Header style={styles.headerStyle}>
              <Left>
                <Button transparent
                onPress={()=>{
                    this.props.navigation.navigate("HomeScreen");
                }}
                >
                  <Icon name='arrow-back' />
                </Button>
              </Left> 
              <Body />                       
            </Header>
         
           <View style={styles.contentContainer}>
             

            <Item style={{marginBottom:screenHeight*0.05}}>
                <Text style={styles.headerText}>Register</Text>
            </Item>
             
         <Form>
             <Item style={styles.itemStyle}>
                <Icon active name='person' style={{color:"#fff"}}/>
                <Input
                autoCorrect={false}
                autoCapitalize="none"                
                onChangeText={(username)=>{
                   this.setState({username});
                }}   
                placeholder='Username' maxLength={15} placeholderTextColor="#fff" style={{ color: "#fff" }}/>
             </Item>
             
             <Item style={styles.itemStyle}>
                <Icon active name='mail' style={{color:"#fff"}} />
                <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email)=>{
                    this.setState({email});
                }}   
                placeholder='Enter email' placeholderTextColor="#fff" style={{ color: "#fff" }}/>
             </Item>

             <Item style={styles.itemStyle}>
                <Icon active name='phone-portrait' style={{color:"#fff"}} />
                <Input
                autoCorrect={false}               
                onChangeText={(phoneno)=>{
                    this.setState({phoneno});
                }}   
                keyboardType="number-pad" maxLength={10} placeholder='Enter phone number' placeholderTextColor="#fff" style={{ color: "#fff" }}/>
             </Item>
 
            <Item style={styles.itemStyle}>
                <Icon active name='key' style={{color:"#fff"}} />
                <Input
                autoCorrect={false}
                autoCapitalize="none"               
                onChangeText={(password)=>{
                   this.setState({password});
                }}   
                placeholder='Enter password' placeholderTextColor="#fff" style={{ color: "#fff" }} secureTextEntry={true}/>
            </Item>

            <Item style={styles.itemStyle}>
                <Icon active name='key' style={{color:"#fff"}} />
                <Input
                autoCorrect={false}
                autoCapitalize="none"               
                onChangeText={(confirmPassword)=>{
                    this.setState({confirmPassword});
                }}   
                placeholder='Confirm password' placeholderTextColor="#fff" style={{ color: "#fff" }} secureTextEntry={true}/>
            </Item>

         </Form> 

            <Button 
                onPress={()=>{
                   if(this.ensureAllFields())
                   {                   
                    let value =  this.validateEmail();
                    value == undefined ?console.log("success"):Toast.show({
                    text: value,                    
                    position: "bottom",
                    duration:2000,
                   });}
                   else{
                    Toast.show({
                        text: "All fields are Mandatory!!",                    
                        position: "bottom",
                        duration:2000,
                    });
                   }
                  }
                }
                style={styles.button}
                >
                <Text style={styles.buttonText}>Sign Up</Text>
            </Button>          
         
          </View>
          <View style={{height:100}}></View>
        </Content>
        </Container>
        </TouchableWithoutFeedback>        
        </SafeAreaView>
        </Root>   
        
        );
    }   
}


const styles  =  StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#10A881",
    },
    headerStyle:{
        backgroundColor:"#10A881",
    },
    contentContainer:{
        minWidth:screenWidth*0.85,        
        maxWidth:screenWidth*0.85,        
        marginHorizontal:screenWidth*0.075,
        minHeight:screenHeight*0.70,
        maxHeight:screenHeight*0.70,
        marginTop:screenHeight*0.10,
        marginBottom:screenHeight*0.20,
        // borderColor:"black",
        // borderWidth:4,   
    },
    itemStyle:{
        marginBottom:screenHeight*0.03,      
        marginLeft:0,
    },
    headerText:{
     fontSize:responsiveFontSize(4),
     color:"#fff",
     fontWeight:'500',
    },
    button:{
        flex:1,
        backgroundColor:"#fff",
        minWidth:screenWidth*0.85,
        maxWidth:screenWidth*0.85,            
        minHeight:screenHeight*0.07,
        maxHeight:screenHeight*0.07,     
        marginVertical:20,
        alignItems:"center",
        justifyContent:"center",
   },
   buttonText:{
     color:"#10A881",
     fontSize:responsiveFontSize(2),  
     fontWeight:'200',          
   },
})
