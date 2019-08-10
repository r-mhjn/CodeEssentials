import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { createStore } from "redux";
import { Provider } from "react-redux";

//TODO: Import screens here
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileScreenNotLoggedIn from "./screens/ProfileScreenNotLoggedIn";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import EditScreen from "./screens/EditScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AddQuestionScreen from "./screens/AddQuestionScreen";
import DisplayChallengeScreen from "./screens/DisplayChallengeScreen";

const reducer = () => [];

const store = createStore(reducer);

const AppNavigatorStack = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    ProfileScreen: { screen: ProfileScreen },
    ProfileScreenNotLogged: { screen: ProfileScreenNotLoggedIn },
    LoginScreen: { screen: LoginScreen },
    SignUpScreen: { screen: SignUpScreen },
    ResetPasswordScreen: { screen: ResetPasswordScreen },
    EditScreen: { screen: EditScreen },
    SettingsScreen: { screen: SettingsScreen },
    AddQuestionScreen: { screen: AddQuestionScreen },
    DisplayChallengeScreen: { screen: DisplayChallengeScreen }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AppNavigator = createAppContainer(AppNavigatorStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
