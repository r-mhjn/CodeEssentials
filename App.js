import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

//TODO: Import screens here
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileScreenNotLoggedIn from './screens/ProfileScreenNotLoggedIn';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddQuestionScreen from './screens/AddQuestionScreen';
import DisplayChallengeScreen from './screens/DisplayChallengeScreen';
import ChallengeCommentScreen from './screens/ChallengeCommentScreen';
import CourseListScreen from './screens/CourseListScreen';
import CourseTopicListScreen from './screens/CourseTopicListScreen';
import QuizzQuestionsScreen from './screens/QuizzQuestionsScreen';
import MyCoursesListScreen from './screens/MyCoursesListScreen';

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
		EditProfileScreen: { screen: EditProfileScreen },
		SettingsScreen: { screen: SettingsScreen },
		AddQuestionScreen: { screen: AddQuestionScreen },
		DisplayChallengeScreen: { screen: DisplayChallengeScreen },
		ChallengeCommentScreen: { screen: ChallengeCommentScreen },
		CourseListScreen: { screen: CourseListScreen },
		CourseTopicListScreen: { screen: CourseTopicListScreen },
		QuizzQuestionsScreen: { screen: QuizzQuestionsScreen },		
		MyCoursesListScreen: { screen: MyCoursesListScreen },
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		},
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
