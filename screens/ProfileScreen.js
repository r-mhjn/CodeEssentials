import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
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
  Content,
  CheckBox
} from "native-base";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { AsyncStorage } from "react-native";
// importing firebase
import * as firebase from "firebase";

// Dimesions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//importing styles
import GlobalStyles from "../src/GlobalStyles";

export default class ProfileScreen extends React.Component {
  // TODO: Connect to redux

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      phoneno: ""
    };
  }

  async componentDidMount() {
    let user = await firebase.auth().currentUser;

    //TODO: adding a promise to it
    if (user != null) {
      console.log(user);
      user.providerData.forEach(profile => {
        this.setState({
          username: user.displayName,
          phoneno: user.phoneNumber,
          email: user.email
        });
      });
    }
  }
  
  signOut = async () => {
    await AsyncStorage.removeItem("jwtToken")
      .then(res => {
         console.log("signed out");
        this.props.navigation.replace("HomeScreen");
      })
      .catch(err => console.log("Error while signout"));
  };

  render() {
    return (
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <Container style={styles.container}>
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

          <View style={styles.detailsContainer}>
            <Item style={{ borderBottomWidth: 0 }}>
              <Left>
                <Image
                  style={styles.imageStyle}
                  source={require("../assets/images/manAvatarGrey.jpeg")}
                />
              </Left>
              <Right
                style={{
                  minWidth: screenWidth * 0.37,
                  height: screenHeight * 0.18,
                  alignItems: "flex-start"
                }}
              >
                <Text
                  style={{
                    color: "#10A881",
                    fontSize: responsiveFontSize(1.8),
                    marginLeft: screenWidth * 0.025,
                    marginTop: screenHeight * 0.04
                  }}
                >
                  {this.state.username}
                </Text>
                <Text
                  style={{
                    color: "#10A881",
                    fontSize: responsiveFontSize(1.8),
                    marginLeft: screenWidth * 0.025,
                    marginVertical: 4
                  }}
                >
                  {this.state.email}
                </Text>
                <Text
                  style={{
                    color: "#10A881",
                    fontSize: responsiveFontSize(1.8),
                    marginLeft: screenWidth * 0.025,
                    marginBottom: screenHeight * 0.05
                  }}
                >
                  {this.state.phoneno}
                </Text>
              </Right>
            </Item>
          </View>

          <View style={styles.listContainer}>
            <List>
              <ListItem
                style={{
                  borderBottomWidth: 0,
                  marginBottom: screenHeight * 0.01
                }}
              >
                <Text
                  style={{ fontSize: responsiveFontSize(4), color: "#fff" }}
                >
                  Preference
                </Text>
              </ListItem>
              <ListItem
                style={{ borderBottomWidth: 2, borderBottomColor: "#fff" }}
              >
                <Left>
                  <Text
                    style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                  >
                    Edit
                  </Text>
                </Left>
                <Right>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("EditScreen");
                    }}
                  >
                    <Icon name="arrow-forward" style={{ color: "#fff" }} />
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem
                style={{ borderBottomWidth: 2, borderBottomColor: "#fff" }}
              >
                <Left>
                  <Text
                    style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                  >
                    Reset Password
                  </Text>
                </Left>
                <Right>
                  <TouchableOpacity
                    onPress={() => {
                      var user = firebase.auth().currentUser;
                      this.props.navigation.navigate("ResetPasswordScreen");
                    }}
                  >
                    <Icon name="arrow-forward" style={{ color: "#fff" }} />
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem
                style={{ borderBottomWidth: 2, borderBottomColor: "#fff" }}
              >
                <Left>
                  <Text
                    style={{ color: "#fff", fontSize: responsiveFontSize(2) }}
                  >
                    Settings
                  </Text>
                </Left>
                <Right>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("SettingsScreen");
                    }}
                  >
                    <Icon name="arrow-forward" style={{ color: "#fff" }} />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            </List>
          </View>

          <Button
            onPress={() => {
              this.signOut();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </Button>
        </Container>
      </SafeAreaView>
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
  detailsContainer: {
    flex: 1,
    //   borderColor:"black",
    //   borderWidth:3,
    height: screenHeight * 0.18,
    maxHeight: screenHeight * 0.18,
    width: screenWidth * 0.96,
    marginTop: screenWidth * 0.02,
    marginHorizontal: screenWidth * 0.02,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  imageStyle: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: screenWidth * 0.15,
    // marginTop:screenHeight*0.02,
    marginLeft: screenWidth * 0.05,
    borderColor: "red"
  },
  listContainer: {
    flex: 1
  },
  button: {
    flex: 1,
    backgroundColor: "#fff",
    minWidth: screenWidth * 0.95,
    maxWidth: screenWidth * 0.95,
    minHeight: screenHeight * 0.07,
    maxHeight: screenHeight * 0.07,
    marginVertical: 20,
    marginHorizontal: screenWidth * 0.025,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#E44236",
    fontSize: responsiveFontSize(2)
  }
});
