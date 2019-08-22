import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import {
  Form,
  Item,
  Input,
  Container,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Title,
  Content
} from "native-base";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Axios from "axios";
import { AsyncStorage } from "react-native";

// Dimesions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ip = require("../../ipAddress");

export default class MyCourses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      isLoading: "",
      courses:[],
    };
  }

  async componentDidMount() {
    // this._getToken();
    await AsyncStorage.getItem("jwtToken")
      .then(token => {
        if (token !== null) {
          this.setState({ token: token });
          // console.log(token);
        }
      })
      .catch(err => console.log("Error getting token " + err));
    this._getDatabaseCourses();
  }

  _getDatabaseCourses = async () => {
    console.log("State token" + this.state.token);
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.state.token
    };
  await Axios.get(`http://${ip.default}:5000/user/course/database`, {
      headers: headers
    })
      .then(res => {
         this.setState({courses:res.data}) 
        // console.log(this.state.courses);
      })
      .catch(err =>
        console.log("Error while getting database courses route " + err)
      );
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.componentTop}>
            <Text style={styles.componentHeading}>Databases</Text>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("CourseListScreen", {courses: this.state.courses});
            }}>
              <Text style={styles.componentButton}>VIEW MORE</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight * 0.25,
    marginTop: screenHeight * 0.01,
    width: screenWidth * 0.96,
    backgroundColor: "#fff",
    marginHorizontal: screenWidth * 0.02,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    // borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4
  },
  componentTop: {
    flex: 1,
    flexDirection: "row"
  },
  componentHeading: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: screenHeight * 0.015,
    marginLeft: screenWidth * 0.03,
    fontSize: responsiveFontSize(2),
    fontWeight: "400"
    //    borderColor:"black",
    //    borderWidth:2,
  },
  componentButton: {
    flex: 1,
    alignItems: "flex-end",
    //    borderColor:"black",
    //    borderWidth:2,
    marginTop: screenHeight * 0.02,
    marginRight: screenWidth * 0.03,
    fontSize: responsiveFontSize(1.6),
    fontWeight: "400",
    color: "#10A881"
  }
});
