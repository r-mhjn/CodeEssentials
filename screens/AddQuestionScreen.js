import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import {
  Container,
  Header,
  Root,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Title,
  Body,
  Input,
  Form,
  Item,
  Label,
  Textarea
} from "native-base";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { AsyncStorage } from "react-native";
import Axios from "axios";

const ip = require("../ipAddress");

// Importing style
import GlobalStyles from "../src/GlobalStyles";

// Using dimensions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class AddQuestionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      token: "",
      question: "",
      code: "",
      description: ""
    };
  }

  async componentDidMount() {
    await AsyncStorage.getItem("jwtToken")
      .then(token => {
        if (token !== null) {
          this.setState({ token: token });
          console.log(token);
        }
      })
      .catch(err => console.log("Error getting token " + err));
    this._getUser();
  }

  _getUser = async () => {
    await AsyncStorage.getItem("user")
      .then(userdata => {
        if (userdata !== null) {
          let man = JSON.parse(userdata);
          let myuser = man.user;
          this.setState({ user: myuser });
        }
      })
      .catch(err => console.log("Error getting user " + err));
  };

  _postQuestion = async () => {
    console.log(this.state.token);
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.state.token
    };
    await Axios.post(
      `http://${ip.default}:5000/user/questions`,
      {
        question: this.state.question,
        description: this.state.description,
        code: this.state.code
      },
      {
        headers: headers
      }
    )
      .then(res => {
        console.log(res);
        this.props.navigation.goBack();
      })
      .catch(err => console.log("Error while posting a question" + err));
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
          <Container styles={styles.screenContainer}>
            <Header style={styles.headerStyle}>
              <Left style={{ flex: 1.4 }}>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                >
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body style={{ flex: 1.5 }}>
                <Title style={{ textAlign: "center" }}>New Question</Title>
              </Body>
              <Right style={{ flex: 1.4 }} />
            </Header>

            <View style={styles.container}>
              <View style={styles.topContainer}>
                <Image
                  source={require("../assets/images/manAvatarGrey.jpeg")}
                  style={styles.profilePic}
                />
                <Text style={styles.userName}>Rachit Mahajan</Text>
              </View>

              <View style={styles.formContainer}>
                <Form>
                  <Item style={styles.itemStyle} floatingLabel>
                    <Label>Question</Label>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      numberOfLines={2}
                      multiline={true}
                      numberOfLines={Platform.OS === "ios" ? null : 2}
                      minHeight={Platform.OS === "ios" && 2 ? 20 * 2 : null}
                      maxLength={128}
                      onChangeText={question => {
                        this.setState({ question });
                      }}
                    />
                  </Item>

                  <Item style={styles.itemStyle} floatingLabel>
                    <Label>Description</Label>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={description => {
                        this.setState({ description });
                      }}
                      numberOfLines={2}
                      maxLength={128}
                      multiline={true}
                      numberOfLines={Platform.OS === "ios" ? null : 2}
                      minHeight={Platform.OS === "ios" && 2 ? 20 * 2 : null}
                    />
                  </Item>

                  <Textarea
                    style={{ marginTop: 15 }}
                    rowSpan={100}
                    colSpan={10}
                    maxHeight={screenHeight * 0.25}
                    bordered
                    placeholder="Enter Code Here"
                    onChangeText={code => {
                      this.setState({ code });
                    }}
                  />
                </Form>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this._postQuestion();
                }}
                style={styles.button}
              >
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: "400",
                    color: "#10A881"
                  }}
                >
                  POST
                </Text>
              </TouchableOpacity>
            </View>
          </Container>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#E8E8E8"
  },
  container: {
    flex: 1,
    height: screenHeight * 0.25,
    // marginTop:screenHeight*0.07,
    width: screenWidth * 0.96,
    height: screenHeight * 0.75,
    maxHeight: screenHeight * 0.75,
    backgroundColor: "#fff",
    marginHorizontal: screenWidth * 0.02,
    marginVertical: screenHeight * 0.02,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4
  },
  headerStyle: {
    backgroundColor: "#10A881"
  },
  topContainer: {
    flexDirection: "row",
    marginHorizontal: screenWidth * 0.03,
    marginTop: screenHeight * 0.03,
    marginBottom: screenHeight * 0.01
    // borderColor:"black",
    // borderWidth:2,
  },
  profilePic: {
    height: screenWidth * 0.15,
    width: screenWidth * 0.15,
    borderRadius: screenWidth * 0.15
  },
  userName: {
    fontSize: responsiveFontSize(2),
    color: "#10A881",
    marginLeft: 20,
    marginTop: screenHeight * 0.02
  },
  formContainer: {
    // borderColor: "blue",
    // borderWidth: 2,
    width: screenWidth * 0.9,
    marginHorizontal: screenWidth * 0.03,
    // marginBottom:screenHeight*0.10,
    height: screenHeight * 0.5,
    maxHeight: screenHeight * 0.5
  },
  itemStyle: {
    marginBottom: screenHeight * 0.02,
    marginLeft: 0
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
    height: screenHeight * 0.1,
    // maxHeight: screenHeight * 0.1,
    marginVertical: screenHeight * 0.05
  }
});
