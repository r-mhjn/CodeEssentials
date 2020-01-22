import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
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
  Picker,
  Spinner
} from "native-base";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Axios from "axios";
import { AsyncStorage } from "react-native";

// Dimesions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ip = require("../ipAddress");

export default class ChallengesScreen extends React.Component {
  //TODO: need to make a change in schema to add the challenge pic
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: [],
      token: "",
      selected: ""
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
    this.getChallengesFromApi();
  }

  getChallengesFromApi = () => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.state.token
    };
    Axios.get(`http://${ip.default}:5000/user/challenges`, { headers: headers })
      .then(res => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.concat(res.data)
        });
      })
      .catch(err => console.log("Error while getting challenges route " + err));
  };

  _keyExtractor = (datasource, index) => datasource._id;

  onValueChange(value) {
    //TODO: add a method with switch case what will filter the flatlist data based upon user selection
    this.setState({
      selected: value
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.progress}>
          <Spinner color="#10A881" />
          <Text style={styles.spinnerText}>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Form style={styles.pickerForm}>
          <Item picker style={{ borderColor: "transparent" }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styles.pickerStyle}
              placeholder={this.state.selected}
              placeholderStyle={{ color: "#B0B0B0" }}
              placeholderIconColor="#B0B0B0"
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
              // itemStyle={{ backgroundColor: 'lightgrey', marginLeft: 0, paddingLeft: 15 }}
              itemTextStyle={{
                fontSize: responsiveFontSize(2),
                color: "white"
              }}
            >
              <Picker.Item
                label="SOLVED"
                value="SOLVED"
                style={styles.pickerItem}
              />
              <Picker.Item
                label="UNSOLVED"
                value="UNSOLVED"
                style={styles.pickerItem}
              />
              <Picker.Item
                label="EASY"
                value="EASY"
                style={styles.pickerItem}
              />
              <Picker.Item
                label="MEDIUM"
                value="MEDIUM"
                style={styles.pickerItem}
              />
              <Picker.Item
                label="HARD"
                value="HARD"
                style={styles.pickerItem}
              />
            </Picker>
          </Item>
        </Form>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          style={styles.flatList}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate("DisplayChallengeScreen", {
                  challenge: item
                });
              }}
              style={{ padding: 0, margin: 0, borderRadius: 10 }}
            >
              <Card
                style={{
                  padding: 0,
                  borderRadius: 10
                }}
              >
                <CardItem
                  style={{
                    padding: 0,
                    margin: 0,
                    height: screenHeight * 0.146,
                    borderRadius: 10
                  }}
                >
                  <View style={styles.challengeContainer}>
                    <Text style={styles.challengeName}>
                      {" "}
                      {item.title.toUpperCase()}{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.4),
                        color: "#A0A0A0",
                        fontFamily: "monospace",
                        marginTop: screenHeight * 0.005,
                        marginLeft: screenWidth * 0.03
                      }}
                    >
                      Difficulty:{item.challengeDifficulty.toUpperCase()}
                    </Text>
                  </View>
                </CardItem>
              </Card>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },

  challengepic: {
    flex: 2,
    height: screenWidth * 0.2,
    width: screenWidth * 0.15
    // borderColor:"black",
    // borderWidth:2,
  },
  challengeContainer: {
    flex: 1,
    flexDirection: "column"
  },
  challengeName: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: "monospace"
  },
  spinnerText: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "monospace"
  },
  progress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  flatList: {
    padding: 0,
    margin: 0,
    marginTop: screenHeight * 0.005,
    marginHorizontal: screenWidth * 0.01
  },
  pickerStyle: {
    width: 100,
    color: "#B0B0B0"
  },
  pickerItem: {
    color: "#B0B0B0",
    width: screenWidth * 0.2
  },
  pickerForm: {
    width: screenWidth * 0.4,
    marginLeft: screenWidth * 0.6,
    marginBottom: 0
  }
});
