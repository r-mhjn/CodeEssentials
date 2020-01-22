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
import ChallengeCommentScreen from "./ChallengeCommentScreen";

// Dimesions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class DisplayDiscussQuestionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {}
    };
  }

  componentDidMount() {
    this._getChallenge();
  }

  _getChallenge = async () => {
    let mychallenge = await this.props.navigation.getParam("challenge");
    this.setState({ challenge: mychallenge });
    console.log(this.state.challenge);
  };

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
              <View style={styles.content}>
                <Text style={styles.challengeHeading}>
                  {this.state.challenge.title}
                </Text>
                <Text style={styles.challengeStatement}>
                  <Text style={styles.minorHeadings}>Problem:</Text>
                  {this.state.challenge.challengeStatement}
                </Text>
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
                    fontFamily: "monospace",
                    fontSize: responsiveFontSize(2)
                  }}
                >
                  COMMENTS
                </Text>
              </TouchableOpacity>
            </View>
            <SlidingUpPanel ref={c => (this._panel = c)}>
              <View style={styles.container}>
                <Button
                  title="Hide"
                  onPress={() => this._panel.hide()}
                  style={styles.sliderButton}
                >
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
    backgroundColor: "#fff"
  },
  headerStyle: {
    backgroundColor: "#10A881",
    fontFamily: "monospace"
  },
  content: {
    flex: 1,
    display: "flex",
    height: screenHeight * 0.87,
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.01,
    width: screenWidth * 0.94,
    backgroundColor: "#fff",
    marginHorizontal: screenWidth * 0.03
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: screenHeight * 0.04,
    marginBottom: screenHeight * 0.008
  },
  sliderButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#10A881"
  },
  buttonText: {
    fontFamily: "monospace"
  },
  challengeHeading: {
    fontSize: responsiveFontSize(3),
    fontFamily: "monospace",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  challengeStatement: {
    marginTop: screenHeight * 0.03,
    fontSize: responsiveFontSize(2),
    fontFamily: "monospace"
  },
  minorHeadings: {
    marginTop: screenHeight * 0.03,
    fontSize: responsiveFontSize(2),
    fontFamily: "monospace",
    fontWeight: "500"
  }
});
