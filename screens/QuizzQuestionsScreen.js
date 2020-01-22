import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  BackHandler
} from "react-native";
import {
  Form,
  Item,
  Input,
  Label,
  Card,
  Container,
  Header,
  Left,
  Tabs,
  Tab,
  ScrollableTab,
  TabHeading,
  Right,
  Icon,
  Button,
  List,
  ListItem,
  InputGroup,
  Body,
  Title,
  Content,
  Spinner,
  CardItem
} from "native-base";
import { Overlay } from "react-native-elements";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import OptionsMenu from "react-native-options-menu";
import { Entypo } from "@expo/vector-icons";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import validator from "validator";
import Axios from "axios";
import { AsyncStorage } from "react-native";

const ip = require("../ipAddress");

// Dimesions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const overMarginVertical = Dimensions.get("window").height * 0.3;
const overMarginHorizontal = Dimensions.get("window").width * 0.1;

//importing styles
import GlobalStyles from "../src/GlobalStyles";

let questionIndex = 0;
let correctAnswer = 0;
export default class QuizzQuestionsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      topicName: "",
      optionBgColor: "",
      modalVisible: false,
      answers: [],
      correct: 0,
      incorrect: 0,
      unanswered: 0,
      total: 0
    };
  }

  componentDidMount() {
    questionIndex = 0;
    this._getQuestions();
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.alertUser();
      // this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    });
  }

  _getQuestions = () => {
    let questions = this.props.navigation.getParam("questions");
    let topicName = this.props.navigation.getParam("topicName");
    let answers = [];
    // answers = answers.fill(false, 0, questions.length);
    this.setState({ questions, topicName });
    console.log(this.state.questions);
    // console.log(this.state.answers);
  };

  componentWillUnmount() {
    this.setState({ modalVisible: false });
    this.backHandler.remove();
  }

  alertUser = () => {
    Alert.alert(
      "End Quiz?",
      "",
      [
        {
          text: "NO",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "YES",
          onPress: () => {
            this.calculateResult();
            this.setState({ modalVisible: true });
          }
        }
      ],
      { cancelable: false }
    );
  };

  calculateResult = () => {
    let questions = this.state.questions;
    let answers = this.state.answers;
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    let total = this.state.questions.length;

    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === undefined) {
        unanswered++;
      } else if (answers[i] == questions[i].answer) {
        correct++;
      } else if (answers[i] != questions[i].answer) {
        incorrect++;
      }
    }

    this.setState({ correct, incorrect, total, unanswered });
  };

  render() {
    return (
      <TouchableWithoutFeedback>
        <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
          <Container>
            <Header hasText hasTabs style={styles.headerStyle}>
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
              <Body>
                <Title style={{ color: "#fff", fontFamily: "monospace" }}>
                  {this.state.topicName.toUpperCase()}
                </Title>
              </Body>
              <Right />
            </Header>
            <Tabs
              initialPage={0}
              onChangeTab={({ i }) => {
                // console.log(i);
                questionIndex = i;
                console.log(questionIndex);
                this.setState({ optionBgColor: "" });
              }}
              style={{
                height: Dimensions.get("window").height * 0.8,
                backgroundColor: "#fff"
              }}
              tabBarUnderlineStyle={{
                borderBottomWidth: 4,
                borderBottomColor: "#fff"
              }}
              renderTabBar={() => (
                <ScrollableTab style={{ backgroundColor: "#10A881" }} />
              )}
            >
              {this.state.questions.map((item, index) => {
                return (
                  <Tab
                    tabStyle={{ backgroundColor: "#10A881" }}
                    key={index}
                    heading={
                      <TabHeading style={{ backgroundColor: "#10A881" }}>
                        <Text style={{ color: "#fff" }}>
                          QUESTION {index + 1}
                        </Text>
                      </TabHeading>
                    }
                  >
                    <Overlay
                      isVisible={this.state.modalVisible}
                      windowBackgroundColor="rgba(255, 255, 255, 0.2)"
                      overlayBackgroundColor="#fff"
                      borderRadius={10}
                      overlayStyle={styles.overlay}
                    >
                      <View>
                        <Text style={styles.overlayHeader}>Quiz Summary</Text>
                        <View style={styles.overlayDetailsContainer}>
                          <Text style={styles.overlayText}>
                            Total{"                        "}
                            <Text
                              style={{
                                textAlign: "right",
                                marginLeft: 100
                              }}
                            >
                              {this.state.total}
                            </Text>
                          </Text>

                          <Text style={styles.overlayText}>
                            Correct{"                    "}
                            <Text style={{ textAlign: "right" }}>
                              {this.state.correct}
                            </Text>
                          </Text>

                          <Text style={styles.overlayText}>
                            Incorrect{"                 "}
                            <Text style={{ textAlign: "right" }}>
                              {this.state.incorrect}
                            </Text>
                          </Text>

                          <Text style={styles.overlayText}>
                            Not Attempted{"      "}
                            <Text style={{ textAlign: "right" }}>
                              {this.state.unanswered}
                            </Text>
                          </Text>

                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.goBack();
                              this.setState({ modalVisible: false });
                            }}
                          >
                            <Text style={styles.overlayButton}>OK</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Overlay>

                    <Content style={{ backgroundColor: "#F5F5F5" }}>
                      <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                          {"Q:"} {item.questionStatement}
                        </Text>
                      </View>
                      <View style={styles.optionContainer}>
                        {item.options.map((option, idx) => {
                          return (
                            <TouchableOpacity
                              key={idx}
                              onPress={() => {
                                correctAnswer = idx;
                                if (
                                  String.fromCharCode(65 + idx) ==
                                  String.fromCharCode(65 + item.answer)
                                ) {
                                  let answers = this.state.answers;
                                  answers[questionIndex] = idx;
                                  this.setState({ answers });
                                  console.log(this.state.answers);
                                } else {
                                  let answers = this.state.answers;
                                  answers[questionIndex] = idx;
                                  this.setState({ answers });
                                  console.log(this.state.answers);
                                }
                              }}
                            >
                              <View
                                style={[
                                  styles.optionButtonContainer,
                                  {
                                    backgroundColor:
                                      this.state.answers[questionIndex] !== idx
                                        ? "#fff"
                                        : this.state.answers[questionIndex] ===
                                          item.answer
                                        ? "#6ec01c"
                                        : "#ea4430"
                                  }
                                ]}
                              >
                                <Text style={styles.optionVariable}>
                                  {" "}
                                  {String.fromCharCode(65 + idx)}
                                </Text>
                                <Text style={styles.optionText}>{option}</Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                      <View
                        style={[
                          styles.explanationContainer,
                          {
                            display:
                              this.state.answers[questionIndex] === undefined ||
                              this.state.answers[questionIndex] === item.answer
                                ? "none"
                                : "flex"
                          }
                        ]}
                      >
                        <Text style={styles.explanationHeading}>
                          Explanation
                        </Text>
                        <Text style={styles.explanationText}>
                          {item.explanation}
                        </Text>
                      </View>
                    </Content>
                  </Tab>
                );
              })}
            </Tabs>
          </Container>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#10A881"
  },
  questionContainer: {
    flex: 1,
    // height: screenHeight * 0.25,
    // height: auto,
    display: "flex",
    minHeight: screenHeight * 0.15,
    // marginTop: screenHeight * 0.01,
    width: screenWidth * 0.99,
    backgroundColor: "#fff",
    marginHorizontal: screenWidth * 0.005,
    // borderWidth: 1,
    borderBottomWidth: 1,

    borderColor: "#ddd"
  },
  questionText: {
    color: "black",
    fontSize: responsiveFontSize(2),
    fontFamily: "monospace",
    marginLeft: screenWidth * 0.02,
    marginRight: screenWidth * 0.02,
    marginTop: screenHeight * 0.015,
    fontWeight: "700"
    // borderColor: "#000",
    // borderWidth: 2
  },
  optionButtonContainer: {
    flex: 1,
    flexDirection: "row",
    minHeight: screenHeight * 0.09,
    // height: "auto",
    width: screenWidth - 0.1,

    // backgroundColor:
    //   this.state.optionBgColor === ""
    //     ? "#fff"
    //     : this.state.optionBgColor === "green"
    //     ? "green"
    //     : "red",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#D0D0D0"
  },
  optionVariable: {
    color: "#fff",
    backgroundColor: "#10A881",
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "monospace",
    marginTop: screenHeight * 0.015,
    marginBottom: screenHeight * 0.015,
    fontSize: responsiveFontSize(2.2),
    marginLeft: screenWidth * 0.02,
    height: screenHeight * 0.06,
    width: screenHeight * 0.06,
    borderRadius: screenHeight * 0.06
  },
  optionText: {
    // textAlign: "center",
    textAlignVertical: "center",
    fontSize: responsiveFontSize(2),
    marginRight: screenWidth * 0.1,
    fontFamily: "monospace",
    marginLeft: screenWidth * 0.02,
    // borderColor: "#000",
    // borderWidth: 2,
    width: screenWidth * 0.8
  },
  explanationContainer: {
    marginLeft: screenWidth * 0.03,
    marginRight: screenWidth * 0.03,
    marginTop: screenHeight * 0.03
    // borderColor: "#000",
    // borderWidth: 2
  },
  explanationHeading: {
    fontSize: responsiveFontSize(2.6),
    fontFamily: "monospace",
    fontWeight: "600"
    // borderColor: "#000",
    // borderWidth: 2
  },
  explanationText: {
    marginTop: screenHeight * 0.005,
    fontFamily: "monospace",
    fontSize: responsiveFontSize(2)
    // borderColor: "#000",
    // borderWidth: 2
  },
  overlayButton: {
    color: "#10A881",
    textAlign: "right",
    position: "relative",
    marginTop: Dimensions.get("window").height * 0.03,
    marginRight: Dimensions.get("window").width * 0.03,
    fontSize: responsiveFontSize(2.4),
    fontWeight: "400"
  },
  overlay: {
    // position: "relative",
    display: "flex",
    right: Dimensions.get("window").width * 0.16,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.38,
    bottom: Dimensions.get("window").height * 0.2,
    borderRadius: 10
  },
  overlayHeader: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "600",
    marginLeft: screenWidth * 0.03,
    marginTop: screenHeight * 0.01
  },
  overlayDetailsContainer: {
    marginTop: Dimensions.get("window").height * 0.02,
    marginBottom: Dimensions.get("window").height * 0.03,
    marginRight: Dimensions.get("window").width * 0.04,
    marginLeft: Dimensions.get("window").width * 0.03,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.28
    // borderWidth: 2,
    // borderColor: 'black',
  },
  overlayText: {
    marginVertical: screenHeight * 0.01,
    // marginLeft: Dimensions.get('window').width * 0.045,
    fontSize: responsiveFontSize(2),
    fontWeight: "300"
  }
});
