import React from 'react';
import {Text, View , StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import {Form, Item, Input, Container, Header,Left,Right, Icon, Button,Body,Title,Content, Toast, Root} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
// import * as Facebook from 'expo-facebook'

// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight  = Dimensions.get('window').height;

//importing styles
import GlobalStyles  from '../src/GlobalStyles';

// Importing firebase
import * as firebase from 'firebase';



export default class LoginScreen extends React.Component{


  
  // TODO: add a method for forgot passoword  
  // TODO: add a for facebook button
  // TODO: add a method for google button   
  // TODO: connect with reducers

    constructor(props){
      super(props);

      this.state = {
        secureFieldOne:true,
        isLoginDisabled:true,
        email:'',
        password:'',
        responseJSON: null,

      }
    }


    componentDidMount(){
      firebase.auth().onAuthStateChanged((user)=>{
        if(user!=null){
           console.log(user)
        }
      })
    }


    // TODO: facebook
    callGraph = async token => {
      /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
      ).then().catch(err=>{
        alert(err.message);
      })
      const responseJSON = JSON.stringify(await response.json());
      this.setState({ responseJSON });
    }; 


   //TODO: Facebook signIn Method
    logInWithFacebook = async () =>{
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync('394265627884530', {
        permissions: ['public_profile', 'email', 'user_friends'],
      });
  
      if (type === 'success') {
        this.callGraph(token);         
        firebase.auth().signInWithCredential(token)
        .catch((error) => {      
        console.warn("Add Error for login", error)
        });
       
      }
    } 



    //TODO: Google SignInMethod
    googleSignIn = () =>{

      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider)
        .then(result =>{
          let user = result.user;
          firebase.database().ref('users/'+user.uid).set({
            email:user.email,
            name:user.displayName,
          });
          this.props.navigation.replace("HomeScreen");
        })
        .catch( err =>{
          alert(err.message)
        })
    }    
    
    //TODO: Method to signInuser  
    
    signInUser = (email, password) =>{
      firebase
          .auth()
          .signInWithEmailAndPassword(email,password)
          .then( () =>{
            this.props.navigation.replace("HomeScreen");
           })
           .catch(err =>{
             alert(err.message);
           })
    }
    

    // TODO: Write a method to ensure all field
    ensureAllFields = () => {
     if(this.state.email !=='' && this.state.password !=='')
       {         
         // add the firebase code to authenticate and redirect
         return true;
       }
      else{
        return false;
      } 
     } 

    render() {
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
                    this.props.navigation.goBack();
                }}
                >
                <Icon name='arrow-back' />
                </Button>
              </Left> 
              <Body />                       
            </Header>

            <View style={styles.headingTextContainer}>
               <Item>
               <Text style={styles.headingText}>LOGIN</Text>
               </Item>
            </View>
            
            <View style={styles.inputContainer}>
                    
              <Form>
                <Item>
                    <Icon active name='mail' style={{color:"#fff"}}/>
                    <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(email)=>{
                        this.setState({email}) 
                    }}                    
                    placeholder='Enter email' placeholderTextColor="#fff" style={{ color: "#fff" }}/>
                </Item>
          
                <Item>
                    <Icon active name='key' style={{color:"#fff"}} />
                    <Input
                     autoCorrect={false}
                     autoCapitalize="none"
                     onChangeText={(password)=>{
                         this.setState({password});
                     }}                          
                     placeholder='Enter password' placeholderTextColor="#fff" style={{ color: "#fff" }} secureTextEntry={this.state.secureFieldOne}/>
                    <Right>
                    <TouchableOpacity 
                    onPress={()=>{
                        let secureFieldOne = this.state.secureFieldOne;
                        this.setState({secureFieldOne:!secureFieldOne});
                     }}
                     >
                    <Icon active name={icon = this.state.secureFieldOne ? 'eye-off':'eye'} style={{color:"#fff", marginRight:10}} />
                    </TouchableOpacity>
                    </Right>
                </Item>
              </Form> 
              
               <TouchableOpacity
               onPress={()=>{
                
               }}
               >
               <Text style={{color:"#fff", maxWidth:screenWidth*0.33,marginTop:3,marginLeft:screenWidth*0.57}}>Forgot Password?</Text>
               </TouchableOpacity>
                             
               
                <Button 
                onPress={()=>{
                    // Alert.alert("Login");              
                    this.ensureAllFields() ? this.signInUser(this.state.email, this.state.password):Toast.show({
                      text: "All fields are Mandatory!!",                    
                      position: "bottom",
                      duration:2000,
                    })}
                }
                style={styles.button}
                disabled={false}
                >
                <Text style={styles.buttonText}>LOGIN</Text>
                </Button>
                

                <TouchableOpacity
                onPress={()=>{
                  this.props.navigation.navigate('SignUpScreen');
                }}
                >
                <Text style={{color:"#fff", maxWidth:screenWidth*0.60,marginTop:3, marginHorizontal:screenWidth*0.15}}>Not a Member yet? Sign Up here.</Text>
                </TouchableOpacity>


               
                <View  style={styles.socialButtonContainer}>
                <Button 
                onPress={()=>{
                    this.logInWithFacebook();                    
                }}
                style={[styles.buttonSocial, {marginRight:screenWidth*0.02}]}
                >
                <Icon name='logo-facebook' style={{color:"#10A881"}} />
                <Text style={styles.buttonTextSocial}>Facebook</Text>
                </Button>

                <Button 
                onPress={()=>{
                    this.googleSignIn();
                }}
                style={[styles.buttonSocial, {marginLeft:screenWidth*0.02}]}
                >
                <Icon name='logo-google' style={{color:"#10A881"}} />
                <Text style={styles.buttonTextSocial}>Google</Text>
                </Button>
                </View>
            
            
            </View>
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
    headingTextContainer:{
      marginTop:screenHeight*0.10,
      minWidth:screenWidth,
      minHeight:screenHeight*0.15,
      maxHeight:screenHeight*0.15,
      // borderColor:"black",
      // borderWidth:2,
      justifyContent:"center",
      alignItems:"center",    
    },
    headingText:{
        fontSize:responsiveFontSize(4),     
        color:"#fff",
        fontWeight:"500",
    },
    inputContainer:{
        // borderColor:"black",
        // borderWidth:2,
        minWidth:screenWidth*0.90,
        maxWidth:screenWidth*0.90,
        marginHorizontal:screenWidth*0.05,
        minHeight:screenHeight*0.60,
        maxHeight:screenHeight*0.60,
    },
    button:{
        flex:1,
        backgroundColor:"#fff",
        minWidth:screenWidth*0.90,
        maxWidth:screenWidth*0.90,            
        minHeight:screenHeight*0.07,
        maxHeight:screenHeight*0.07,
        marginVertical:20,
        alignItems:"center",
        justifyContent:"center",
    },
    buttonText:{
     color:"#10A881",
     fontSize:responsiveFontSize(2),         
    },
    socialButtonContainer:{ 
        flexDirection:"row",
        // borderColor:"black",
        // borderWidth:2,      
     },
    buttonSocial:{
     flex:1,
     backgroundColor:"#fff",
     minWidth:screenWidth*0.43,
     maxWidth:screenWidth*0.43,          
     minHeight:screenHeight*0.07,
     maxHeight:screenHeight*0.07,
     marginVertical:20,
    },
    buttonTextSocial:{
     color:"#10A881",
     fontSize:responsiveFontSize(2),    
     marginRight:screenWidth*0.10,    
   },
   rememberMeContainer:{
     flexDirection:"row",
     minHeight:screenHeight*0.10,
     maxHeight:screenHeight*0.10,
     minWidth:screenWidth*0.90,
     maxWidth:screenWidth*0.90,     
   }   
  
})
