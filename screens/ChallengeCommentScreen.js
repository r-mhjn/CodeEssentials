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

// Importing style
import GlobalStyles from "../src/GlobalStyles";
export default class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
              
            <Content />
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
  
});
