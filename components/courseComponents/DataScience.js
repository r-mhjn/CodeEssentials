import React from 'react';
import {Text, View , StyleSheet, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Form, Item, Input, Container, Header,Left,Right, Icon, Button,Body,Title,Content} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';


// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight  = Dimensions.get('window').height;


export default class MyCourses extends React.Component{


    render() {
        return (
            <Container style={styles.container}>
             <Content >
               <View style={styles.componentTop}>
                 <Text style={styles.componentHeading}>Data Science</Text> 
                 <TouchableOpacity
                 onPress={()=>{
                        
                 }}
                 >
                    <Text style={styles.componentButton}>VIEW MORE</Text> 
                 </TouchableOpacity>
               </View>
             </Content>
            </Container>
        )
    }    
}


const styles  = StyleSheet.create({

    container:{
        flex:1,        
        height:screenHeight*0.25,
        marginTop:screenHeight*0.01,
        marginBottom:screenHeight*0.01,
        width:screenWidth*0.96,
        backgroundColor:"#fff",
        marginHorizontal:screenWidth*0.02,    
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        // borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,      
    },
    componentTop:{
        flex:1,
        flexDirection:"row",
    },
    componentHeading:{
        flex:1,
        alignItems:"flex-start",
        marginTop:screenHeight*0.015,
        marginLeft:screenWidth*0.03,
        fontSize:responsiveFontSize(2),
        fontWeight:"400"
     //    borderColor:"black",
     //    borderWidth:2,
     },
     componentButton:{
        flex:1,
        alignItems:"flex-end",
     //    borderColor:"black",
     //    borderWidth:2,
        marginTop:screenHeight*0.02,
        marginRight:screenWidth*0.03,
        fontSize:responsiveFontSize(1.6),
        fontWeight:"400",
        color:"#10A881"
     }

});
