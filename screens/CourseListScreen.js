import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import {
  Form,
  Item,
  Input,
  Label,
  Container,
  Header,
  Left,
  Right,
  Icon,
  Button,
  List,
  ListItem,
  InputGroup,
  Body,
  Title,
  Content
} from "native-base";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import validator from "validator";
import Axios from "axios";
import { AsyncStorage } from "react-native";

const ip = require("../ipAddress");

// Dimesions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//importing styles
import GlobalStyles from "../src/GlobalStyles";


export default class CourseListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      domain:"",
    };
  }

  componentDidMount() {
      this._getCourses();
  }

  _getCourses = async () => {
      let courses = await this.props.navigation.getParam('courses');    
      this.setState({courses});
      console.log(this.state.courses);
      this.setState({domain:this.state.courses[0].domain.toUpperCase()});
      console.log(this.state.courses[0].domain.toUpperCase());
  };

  render() {
    return (
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <Container>
          <Header style={styles.headerStyle}>
            <Left >
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body style={{ flex: 1 }}>
              <Title style={{ textAlign: "center" }}>{this.state.domain}</Title>
            </Body>
            <Right />
          </Header>
           <Content>
             <Text>{this.state.courses.domain}</Text>
           </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerStyle: {
    backgroundColor: "#10A881"
  }
});
