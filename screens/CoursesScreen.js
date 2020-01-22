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
  Platform
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
import { SearchBar } from "react-native-elements";

// Dimesions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//importing styles
import GlobalStyles from "../src/GlobalStyles";

// Importing Components
import MyCourses from "../components/courseComponents/MyCourses";
import WebDevelopment from "../components/courseComponents/WebDevelopment";
import ProgrammingLanguages from "../components/courseComponents/ProgrammingLanguages";
import DataScience from "../components/courseComponents/DataScience";
import Databases from "../components/courseComponents/Databases";

export default class CoursesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };
  }

  updateSearch = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <Container style={styles.container} showsVerticalcrollIndicator={false}>
        <Content>
          <SearchBar
            placeholder="Search..."
            placeholderTextColor="#707070"
            // showLoading={true}
            platform={Platform.OS}
            clearIcon={true}
            onChangeText={this.updateSearch}
            value={this.state.searchValue}
            containerStyle={{ backgroundColor: "#e2e1e0" }}
            inputStyle={{ backgroundColor: "#e2e1e0", color: "#707070" }}
          />
          <MyCourses navigation={this.props.navigation} />
          <WebDevelopment navigation={this.props.navigation} />
          <ProgrammingLanguages navigation={this.props.navigation} />
          <Databases navigation={this.props.navigation} />
          <DataScience navigation={this.props.navigation} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e1e0"
  }
});
