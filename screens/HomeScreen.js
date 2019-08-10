import React from 'react';
import {Text, View , StyleSheet, TouchableOpacity, Dimensions,SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Container,Header, Root, Content, Tab, Tabs, TabHeading, Button, Icon,Left, Right, Title,Body } from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

// Importing style
import GlobalStyles from '../src/GlobalStyles'

// Using dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



// Importing firebase
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBNGa0_zXPwGd21JZpSmoG__98KOZkTci4",
  authDomain: "codeessentials-9e43e.firebaseapp.com",
  databaseURL: "https://codeessentials-9e43e.firebaseio.com",
  projectId: "codeessentials-9e43e",
  storageBucket: "",
  messagingSenderId: "117423343662",
  appId: "1:117423343662:web:d6952b6cb3a6faa2"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Import screens here
import CoursesScreen from "./CoursesScreen";
import DiscussScreen from './DiscussScreen';
import ChallengesScreen from './ChallengesScreen';



export default class HomeScreen extends React.Component{

  
    constructor(props) {
        super(props);    
        
        this.state = {
           isLoading:true,  
           isLoggedIn:false,        
           activePage:0,
        }      
    }    

    // A method to handle tab changes
    changeTab =(i)=>{
        this.setState({activePage:i})
    }

   async componentWillMount(){
    await Font.loadAsync({
            Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf')
          });
          this.setState({isLoading:false});
    }


    componentDidMount(){
        firebase.auth().onAuthStateChanged(authenticate =>{
            if(authenticate){
                this.setState({isLoggedIn:true});
                console.log(this.state.isLoggedIn);
            } else{             
              this.setState({isLoggedIn:false}); 
              console.log(this.state.isLoggedIn);
            }
        })
    }    

    render() {           
        if(this.state.isLoading)
        {
            return (
                <AppLoading>
                </AppLoading>
            )
        }
        return (
         <TouchableWithoutFeedback
         onPress={()=>{
           Keyboard.dismiss();
         }}
         >
        <SafeAreaView style={GlobalStyles.AndroidSafeArea} >
        <Container>          
       
        <Header 
         hasText
         hasTabs
         style={styles.headerStyle}>                    
          <Body>
            <Title style={{marginLeft:10}}>{ (this.state.activePage==0) ? "Courses" : (this.state.activePage==1) ? "Challenges" :(this.state.activePage==2) ? "Discuss":""}</Title>
          </Body>
          <Right>
            <Button transparent
            onPress={()=>{
                this.props.navigation.navigate("DisplayChallengeScreen");
            }}
            >
            <Icon name='refresh'/>
            </Button>

            <Button transparent
            onPress={()=>{
                this.props.navigation.navigate(this.state.isLoggedIn ? "ProfileScreen":"ProfileScreenNotLogged");
            }}
            >
            <Icon name='person' />
            </Button>            
          </Right>
        </Header>        
        
        <Tabs initialPage={0}  onChangeTab={({i}) =>{ this.changeTab(i); console.log(this.state.activePage)}  } style={{height:Dimensions.get('window').height*0.80, backgroundColor:"#fff"}} tabBarUnderlineStyle={{borderBottomWidth:4, borderBottomColor:"#fff"}} >
        <Tab heading={ <TabHeading style={{backgroundColor:"#10A881"}}><Icon name="book" /></TabHeading>}>
        <CoursesScreen navigation={this.props.navigation}/>       
        </Tab>
        <Tab heading={ <TabHeading style={{backgroundColor:"#10A881"}}><Icon name="code" /></TabHeading>}>
        <ChallengesScreen  navigation={this.props.navigation}/>
        </Tab>
        <Tab heading={ <TabHeading style={{backgroundColor:"#10A881"}}><Icon name="chatboxes" /></TabHeading>}>
        <DiscussScreen navigation={this.props.navigation}/>
        </Tab>
       </Tabs>    

      </Container>          
      </SafeAreaView>
      </TouchableWithoutFeedback> 

    );
    }
}

const styles  =  StyleSheet.create({

    container:{
        flex:1, 
    },
    headerStyle:{
       backgroundColor:"#10A881",
    },
    tabStyle:{
       backgroundColor:"#10A881",
    },   
    mainFooter:{
        backgroundColor:"rgb(70, 150, 255)",
    },
})
