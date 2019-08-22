import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator
} from "react-native";
import {
  Form,
  Item,
  Input,
  Container,
  Card,
  CardItem,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Title,
  Content,
  Spinner
} from "native-base";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Axios from "axios";
import { AsyncStorage } from "react-native";

// Dimesions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ip = require("../ipAddress");

export default class CoursesScreen extends React.Component {
  //TODO: need to make a change in schema to add the question pic
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: [],
      token: ""
    };
  }

  // getQuestionsFromApi = () =>{

  //     return (
  //         Axios.get("https://randomuser.me/api/?results=50")
  //             .then(responseJson => {
  //                 // console.log(responseJson.data.results);
  //                 this.setState({
  //                     isLoading: false,
  //                     dataSource: this.state.dataSource.concat(responseJson.data.results)
  //                 })
  //             })
  //             .catch(err => console.log("Error while fetching data from api "+ err))
  //     );
  // }

  async componentDidMount() {
    await AsyncStorage.getItem("jwtToken")
      .then(token => {
        if (token !== null) {
          this.setState({ token: token });
          console.log(token);
        }
      })
      .catch(err => console.log("Error getting token " + err));
    this.getChallengesFromApi();
  }

  getChallengesFromApi = () => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.state.token
    };    
    Axios.get(
      `http://${ip.default}:5000/user/challenges`,      
      { headers: headers }
    )
      .then(res => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.concat(res.data)
        });
      })
      .catch(err => console.log("Error while getting challenges route " + err));
  };

  _keyExtractor = (datasource, index) => datasource._id;

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.progress}>
          <Spinner color="#10A881" />
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          style={{padding:0, margin:0}}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("DisplayChallengeScreen", {challenge: item});
              }}
              style={{ padding: 0, margin:0 }}
            >
              <Card style={{ padding: 0, margin:0 }}>
                <CardItem style={{ padding: 0, margin:0 }}>
                  <View style={styles.questionContainer}>
                    <Image
                      style={styles.questionpic}
                      source={{
                        uri:
                          "https://www.google.com/search?tbm=isch&q=images&chips=q:images,g_1:background:6GJxHg1gMNk%3D&usg=AI4_-kSL79ctnvYywkrsKDDuYBCWjjN6RQ&sa=X&ved=0ahUKEwict5TpsIzkAhUT3o8KHbyIAN4Q4lYILSgB&biw=1843&bih=912&dpr=1#imgrc=R2_t7nzjZXGyEM:"
                      }}
                    />

                    <Text style={styles.questionInfo}> {item.title} </Text>
                  </View>
                </CardItem>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e1e0"
  },
  questionContainer: {
    flex: 1,
    flexDirection: "row"
  },
  questionpic: {
    flex: 2,
    height: screenWidth * 0.2,
    width: screenWidth * 0.15
    // borderColor:"black",
    // borderWidth:2,
  },
  questionInfo: {
    flex: 5,
    flexDirection: "column",
    marginLeft: screenWidth * 0.01,
    color: "#707070"
    // borderColor:"black",
    // borderWidth:2,
  },
  progress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
