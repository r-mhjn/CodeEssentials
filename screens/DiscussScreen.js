import React from 'react';
import {Text, View , StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Keyboard, TouchableWithoutFeedback,Image, Alert} from 'react-native';
import {Form, Item, Input, Container, Header,Left,Right, Icon, Button,Body,Title,Content} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';



// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight  = Dimensions.get('window').height;



export default class CoursesScreen extends React.Component{

    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    componentDidMount(){
      const {navigation} = this.props;
      console.log("hey"+this.navigation);
    }
    

    render() {
        return (
          
        <TouchableWithoutFeedback 
          onPress={()=>{
              Keyboard.dismiss();
          }}
          >
          <Container>
            <View style={styles.container}>
              <TouchableOpacity
              onPress={()=>{
                this.props.navigation.navigate("AddQuestionScreen");
                
              }}
              activeOpacity={0.5}
              style={styles.TouchableOpacityStyle} >
                <Text name="add-circle" style={styles.FloatingButtonStyle}>+</Text>
             </TouchableOpacity>
            </View>
          
          </Container> 
        </TouchableWithoutFeedback>  
        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor:"#E8E8E8",
    },
    TouchableOpacityStyle:{ 
        position: 'absolute',
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,     
        borderRadius:80,                
        backgroundColor:"#10A881",
      },     
      FloatingButtonStyle: {       
        color:"#fff",     
        fontSize:25,
        fontWeight:'300',
      },
});