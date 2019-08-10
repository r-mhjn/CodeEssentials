import React from 'react';
import {Text, View , StyleSheet, TouchableOpacity,Image, Dimensions, FlatList, ActivityIndicator} from 'react-native';
import {Form, Item, Input, Container,Card, CardItem, Header,Left,Right, Icon, Button,Body,Title,Content, Spinner} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Axios from 'axios';


// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight  = Dimensions.get('window').height;


export default class CoursesScreen extends React.Component{


    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: true,
            dataSource:[],  
        }
    }

    getQuestionsFromApi = () =>{

        return (
            Axios.get("https://randomuser.me/api/?results=50")
                .then(responseJson => {
                    // console.log(responseJson.data.results);
                    this.setState({
                        isLoading: false,
                        dataSource: this.state.dataSource.concat(responseJson.data.results)
                    })
                })
                .catch(err => console.log("Error while fetching data from api "+ err))
        );
    }

    _keyExtractor = (datasource, index) => datasource.email;

    componentDidMount(){
        this.getQuestionsFromApi();
    }

    render(){
        if(this.state.isLoading)
        {
          return (
            <View style={styles.progress}>
            <Spinner color='#10A881' />
            </View>
          )
        }
      return (
        <View style={styles.container}>
        <FlatList
        data={this.state.dataSource}
        keyExtractor={this._keyExtractor}
        renderItem={( {item }) =>(
          <TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate("DisplayChallengeScreen");
          }}
          style={{ padding: 0 }}
          >
          <Card style={{padding:0}}>
             <CardItem>
               <View style={styles.questionContainer}>
                  <Image
                  style={styles.questionpic}
                  source={{
                    uri: item.picture.medium
                  }}
                  />

               <Text style={styles.questionInfo}> Name: {item.name.title} {item.name.first} {item.name.last}</Text>              
               </View>
             </CardItem>                        
           </Card> 
          </TouchableOpacity>
        )}
        >        
        </FlatList>
        </View>
       );
     } 
    }
    
const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#e2e1e0',
        
      },
      questionContainer:{
        flex:1,
        flexDirection:"row"
      },
      questionpic:{
        flex:2,
        height:screenWidth*0.20,
        width:screenWidth*0.15,        
        // borderColor:"black",
        // borderWidth:2,
      },
     questionInfo:{
        flex: 5,
        flexDirection:"column",
        marginLeft:screenWidth*0.01, 
        color:"#707070",   
        // borderColor:"black",
        // borderWidth:2,
      },
      progress:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      }
});