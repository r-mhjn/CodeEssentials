import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard
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
import SlidingUpPanel from "rn-sliding-up-panel";

// Importing style
import GlobalStyles from "../src/GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import ChallengeCommentScreen from './ChallengeCommentScreen';

// Dimesions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class DisplayChallengeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       challenge:{ },
    };
  }

  componentDidMount(){
     this._getChallenge();
  }

  _getChallenge = async () =>{
    let mychallenge  = await this.props.navigation.getParam("challenge");
    this.setState({challenge:mychallenge});   
    console.log(this.state.challenge);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
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

              <Right />
            </Header>

            <Content>
              <View style={styles.content} >
                 <Text style={styles.challengeHeading}>{this.state.challenge.title}</Text>
                 <Text style={styles.challengeStatement}>{this.state.challenge.challengeStatement}</Text>
              </View>
              
            </Content>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    // this.props.navigation.navigate("ChallengeCommentScreen");
                    this._panel.show();
                  }}
                >
                  <Text
                    style={{
                      color: "#10A881",
                      fontWeight: "300",
                      fontSize: responsiveFontSize(2)
                    }}
                  >
                    COMMENTS
                  </Text>
                </TouchableOpacity>
              </View>
            <SlidingUpPanel ref={c => (this._panel = c)}>
              <View style={styles.container}>                
                <Button title="Hide" onPress={() => this._panel.hide()} style={styles.sliderButton} >
                <Icon name="arrow-down"></Icon>
                </Button>
                 <ChallengeCommentScreen />
              </View>
            </SlidingUpPanel>
          </Container>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e1e0"
  },
  headerStyle: {
    backgroundColor: "#10A881"
  },
  content: {
    flex: 1,
    height: screenHeight,
    marginTop: screenHeight * 0.005,
    marginBottom: screenHeight * 0.01,
    width: screenWidth * 0.96,
    backgroundColor: "#fff",
    marginHorizontal: screenWidth * 0.02,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: screenHeight * 0.04,
    marginBottom: screenHeight * 0.008
  },
  sliderButton:{
     justifyContent:"center",
     alignItems:"center",
     backgroundColor:"#10A881"
  },
  buttonText: {},
  challengeHeading:{

  },
  challengeStatement:{

  },
  
});
