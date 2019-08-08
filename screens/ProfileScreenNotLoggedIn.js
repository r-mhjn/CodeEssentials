import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {responsiveFontSize} from 'react-native-responsive-dimensions'

//importing styles
import GlobalStyles  from '../src/GlobalStyles';


// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight  = Dimensions.get('window').height;


export default class ProfileScreen extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
             
        }
    }

    render() {
        return (
            <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
            <Container>
            <Header style={styles.headerStyle}>
              <Left style={{flex:1}}>
                <Button transparent
                onPress={()=>{
                    this.props.navigation.goBack();
                }}
                >
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body style={{flex:1}}>                
              </Body>  
              <Right style={{flex:1}}/>
            </Header>
             

          <View style={styles.logoContainer}>
          
          </View>         

          <View style={styles. contentContainer}>
           <View style={styles.textContainer}>
              <Text style={styles.headingText}>Sign in to continue</Text>
              <Text style={styles.text}>Sign in to your account to continue access.</Text>
              <Button 
              onPress={()=>{
                  this.props.navigation.navigate('LoginScreen');
              }}
              style={styles.button}
              >
              <Text style={styles.buttonText}>SIGN IN</Text>
              </Button>
           </View>           
          </View>

          </Container>
          </SafeAreaView>
            
        );
    }
}


const styles  =  StyleSheet.create({

    container:{
        flex:1,             
    },
    logoContainer:{
        flex:2,        
        // borderColor:"black",
        minHeight:screenHeight*0.40,
        maxHeight:screenHeight*0.40,
        // borderWidth:2,       
    },
    headerStyle:{
     backgroundColor:"#10A881",
    },
    headingText:{
      color:"#47535E",    
      marginVertical:10,
      minWidth:screenWidth*0.60,
      maxWidth:screenWidth*0.60,    
      marginLeft:screenWidth*0.25,    
      marginRight:screenWidth*0.25,    
      fontSize:responsiveFontSize(2.5),     
    },
    text:{
       color:"grey",
       fontSize:responsiveFontSize(1.5),
       minWidth:screenWidth*0.80,
       maxWidth:screenWidth*0.80,    
       marginHorizontal:screenWidth*0.15,
    },
    button:{
         flex:1,
         backgroundColor:"#10A881",
         minWidth:screenWidth*0.80,
         maxWidth:screenWidth*0.80,    
         marginHorizontal:screenWidth*0.10,             
         minHeight:screenHeight*0.07,
         maxHeight:screenHeight*0.07,
         marginVertical:20,
         alignItems:"center",
         justifyContent:"center",
    },
    buttonText:{
      color:"#fff",
      fontSize:responsiveFontSize(2),            
    },
    
    contentContainer:{
        flex:2,
        minHeight:screenHeight*0.60,
        maxHeight:screenHeight*0.60,
        // borderColor:"blue",
        // borderWidth:2,
    },
})
