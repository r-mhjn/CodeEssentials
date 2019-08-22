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
import { TouchableOpacity } from "react-native-gesture-handler";

export default class EditProfileScreen extends React.Component {
  //TODO: Add logic to change button..need to get galary permissions and upload from galary

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      phoneno: "",
      profilepic: "",
      token: "",
      user: {}
    };
  }

   componentDidMount() {
    this._getToken();
    this._getUser();
  }
  
  _getToken = async () => {
    await AsyncStorage.getItem("jwtToken")
      .then(token => {
        if (token !== null) {
          this.setState({ token: token });
          console.log(token);
        }
      })
      .catch(err => console.log("Error getting token " + err));
  };

  _getUser = async () => {
    let myuser = await this.props.navigation.getParam("user");
    this.setState({ user: myuser });
    // console.log(myuser);
    console.log("hey this is my username   " + this.state.user.username);
  };

  //TODO: a method to validate and set phoneno

  validatePhoneno = phoneno => {
    if (phoneno.length == 10) {
      this.updateProfile();
    } else {
      Alert.alert(
        "Invalid Phone Number",
        "",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  updateProfile = () => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.state.token
    };
    console.log(headers);
    Axios.put(
      `http://${ip.default}:5000/user/profile/update/5d4adeba2d0d9b621a89466c`,
      {
        profilepic: this.state.profilepic,
        username: this.state.username,
        phoneno: this.state.phoneno
      },
      { headers: headers }
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Container>
            <Header style={styles.headerStyle}>
              <Left style={{ flex: 3.2 }}>
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
                <Title style={{ textAlign: "center" }}>Edit</Title>
              </Body>
              <Right style={{ flex: 2.8 }} />
            </Header>
            <Content>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/images/manAvatarGrey.jpeg")}
                  style={styles.imageStyle}
                />

                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      color: "#10A881",
                      marginTop: 5
                    }}
                  >
                    Change Photo
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputsContainer}>
                <Form>
                  <Item style={styles.itemStyle}>
                    <Icon active name="person" style={{ color: "#10A881" }} />
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={username => {
                        this.setState({ username });
                      }}
                      maxLength={15}
                      placeholder= {this.state.user.username}
                      placeholderTextColor="#10A881"
                      style={{ color: "#10A881" }}
                    />
                  </Item>

                  <Item style={styles.itemStyle}>
                    <Icon
                      active
                      name="phone-portrait"
                      style={{ color: "#10A881" }}
                    />
                    <Input
                      keyboardType="number-pad"
                      placeholder={this.state.user.phoneno}
                      placeholderTextColor="#10A881"
                      style={{ color: "#10A881" }}
                      onChangeText={phoneno => {
                        this.setState({ phoneno });
                      }}
                    />
                  </Item>
                </Form>
              </View>

              <Button
                onPress={() => {
                  this.validatePhoneno(this.state.phoneno);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </Button>
            </Content>
          </Container>
        </TouchableWithoutFeedback>
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
  },
  imageContainer: {
    width: screenWidth,
    height: screenHeight * 0.25,
    justifyContent: "center",
    alignItems: "center"
    // borderColor:"black",
    // borderWidth:2,
  },
  imageStyle: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: screenWidth * 0.15,
    borderColor: "red"
  },
  inputsContainer: {
    // borderColor:"black",
    // borderWidth:2,
    width: screenWidth * 0.95,
    marginHorizontal: screenWidth * 0.025
  },
  itemStyle: {
    marginBottom: screenHeight * 0.03
  },
  button: {
    flex: 1,
    backgroundColor: "#10A881",
    minWidth: screenWidth * 0.95,
    maxWidth: screenWidth * 0.95,
    marginHorizontal: screenWidth * 0.025,
    minHeight: screenHeight * 0.07,
    maxHeight: screenHeight * 0.07,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontWeight: "200"
  }
});
