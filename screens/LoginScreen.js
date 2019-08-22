import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
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
  Content,
  Toast,
  Root
} from "native-base";
import { responsiveFontSize } from "react-native-responsive-dimensions";
// import * as Facebook from 'expo-facebook'
import Axios from "axios";
const ip = require("../ipAddress");
import { AsyncStorage } from "react-native";
var jwtdecode = require("jwt-decode");

// Dimesions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//importing styles
import GlobalStyles from "../src/GlobalStyles";

export default class LoginScreen extends React.Component {
  // TODO: add a method for forgot passoword
  // TODO: add a for facebook button
  // TODO: add a method for google button
  // TODO: connect with reducers

  constructor(props) {
    super(props);

    this.state = {
      secureFieldOne: true,
      isLoginDisabled: true,
      email: "",
      password: "",
      responseJSON: null
    };
  }

  //Using Jwt strategy for signin
  signInUser = (email, password) => {
    console.log(ip.default);
    Axios.post(`http://${ip.default}:5000/user/login`, {
      email: email,
      password: password
    })
      .then(response => {
        console.log(response.data);
        this._storeToken(response.data.token);
        this._storeUser(response.data);
        // this._saveLoginTime();
        // this.props.navigation.pop(1);
        this.props.navigation.replace('HomeScreen');    // TODO: Minor bug that it flashes the profilenotloggedInScreen b4 getting to HomeScreen
      })
      .catch(error => {
        console.log("login Error"+ error);
      });
  };

  _saveLoginTime = async token => {
    let tokenStrings = jwtdecode(token);

    console.log("TOKEN_-", tokenStrings.exp);
    try {
      await AsyncStorage.setItem("tokenExpireTime", tokenStrings.exp.toString());
    } catch (error) {
      console.log("Error while saving Exp time " + error);
    }      
  };

  _storeUser = async user => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("Error while saving user " + error);
    }
  };

  _storeToken = async token => {
    try {
      this._saveLoginTime(token);
      await AsyncStorage.setItem("jwtToken", token);
    } catch (error) {
      console.log("Error while saving token " + error);
    }
  };

  // TODO: Write a method to ensure all field
  ensureAllFields = () => {
    if (this.state.email !== "" && this.state.password !== "") {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <Root>
        <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Container style={styles.container}>
              <Content>
                <Header style={styles.headerStyle}>
                  <Left>
                    <Button
                      transparent
                      onPress={() => {
                        this.props.navigation.goBack();
                      }}
                    >
                      <Icon name="arrow-back" />
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
                      <Icon active name="mail" style={{ color: "#fff" }} />
                      <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={email => {
                          this.setState({ email });
                        }}
                        placeholder="Enter email"
                        placeholderTextColor="#fff"
                        style={{ color: "#fff" }}
                      />
                    </Item>

                    <Item>
                      <Icon active name="key" style={{ color: "#fff" }} />
                      <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={password => {
                          this.setState({ password });
                        }}
                        placeholder="Enter password"
                        placeholderTextColor="#fff"
                        style={{ color: "#fff" }}
                        secureTextEntry={this.state.secureFieldOne}
                      />
                      <Right>
                        <TouchableOpacity
                          onPress={() => {
                            let secureFieldOne = this.state.secureFieldOne;
                            this.setState({ secureFieldOne: !secureFieldOne });
                          }}
                        >
                          <Icon
                            active
                            name={
                              (icon = this.state.secureFieldOne
                                ? "eye-off"
                                : "eye")
                            }
                            style={{ color: "#fff", marginRight: 10 }}
                          />
                        </TouchableOpacity>
                      </Right>
                    </Item>
                  </Form>

                  <TouchableOpacity onPress={() => {}}>
                    <Text
                      style={{
                        color: "#fff",
                        maxWidth: screenWidth * 0.33,
                        marginTop: 3,
                        marginLeft: screenWidth * 0.57
                      }}
                    >
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  <Button
                    onPress={() => {
                      // Alert.alert("Login");
                      this.ensureAllFields()
                        ? this.signInUser(this.state.email, this.state.password)
                        : Toast.show({
                            text: "All fields are Mandatory!!",
                            position: "bottom",
                            duration: 2000
                          });
                    }}
                    style={styles.button}
                    disabled={false}
                  >
                    <Text style={styles.buttonText}>LOGIN</Text>
                  </Button>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("SignUpScreen");
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        maxWidth: screenWidth * 0.6,
                        marginTop: 3,
                        marginHorizontal: screenWidth * 0.15
                      }}
                    >
                      Not a Member yet? Sign Up here.
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.socialButtonContainer}>
                    <Button
                      onPress={() => {
                        this.logInWithFacebook();
                      }}
                      style={[
                        styles.buttonSocial,
                        { marginRight: screenWidth * 0.02 }
                      ]}
                    >
                      <Icon name="logo-facebook" style={{ color: "#10A881" }} />
                      <Text style={styles.buttonTextSocial}>Facebook</Text>
                    </Button>

                    <Button
                      onPress={() => {
                        this.googleSignIn();
                      }}
                      style={[
                        styles.buttonSocial,
                        { marginLeft: screenWidth * 0.02 }
                      ]}
                    >
                      <Icon name="logo-google" style={{ color: "#10A881" }} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10A881"
  },
  headerStyle: {
    backgroundColor: "#10A881"
  },
  headingTextContainer: {
    marginTop: screenHeight * 0.1,
    minWidth: screenWidth,
    minHeight: screenHeight * 0.15,
    maxHeight: screenHeight * 0.15,
    // borderColor:"black",
    // borderWidth:2,
    justifyContent: "center",
    alignItems: "center"
  },
  headingText: {
    fontSize: responsiveFontSize(4),
    color: "#fff",
    fontWeight: "500"
  },
  inputContainer: {
    // borderColor:"black",
    // borderWidth:2,
    minWidth: screenWidth * 0.9,
    maxWidth: screenWidth * 0.9,
    marginHorizontal: screenWidth * 0.05,
    minHeight: screenHeight * 0.6,
    maxHeight: screenHeight * 0.6
  },
  button: {
    flex: 1,
    backgroundColor: "#fff",
    minWidth: screenWidth * 0.9,
    maxWidth: screenWidth * 0.9,
    minHeight: screenHeight * 0.07,
    maxHeight: screenHeight * 0.07,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#10A881",
    fontSize: responsiveFontSize(2)
  },
  socialButtonContainer: {
    flexDirection: "row"
    // borderColor:"black",
    // borderWidth:2,
  },
  buttonSocial: {
    flex: 1,
    backgroundColor: "#fff",
    minWidth: screenWidth * 0.43,
    maxWidth: screenWidth * 0.43,
    minHeight: screenHeight * 0.07,
    maxHeight: screenHeight * 0.07,
    marginVertical: 20
  },
  buttonTextSocial: {
    color: "#10A881",
    fontSize: responsiveFontSize(2),
    marginRight: screenWidth * 0.1
  },
  rememberMeContainer: {
    flexDirection: "row",
    minHeight: screenHeight * 0.1,
    maxHeight: screenHeight * 0.1,
    minWidth: screenWidth * 0.9,
    maxWidth: screenWidth * 0.9
  }
});
