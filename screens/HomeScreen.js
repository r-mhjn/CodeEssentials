import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	SafeAreaView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import {
	Container,
	Header,
	Root,
	Content,
	Tab,
	Tabs,
	TabHeading,
	Button,
	Icon,
	Left,
	Right,
	Title,
	Body,
} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { AppLoading } from 'expo';
import { Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { AsyncStorage } from 'react-native';

// Importing style
import GlobalStyles from '../src/GlobalStyles';

// Using dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Import screens here
import CoursesScreen from './CoursesScreen';
import DiscussScreen from './DiscussScreen';
import ChallengesScreen from './ChallengesScreen';
import ProfileScreenNotLoggedIn from './ProfileScreenNotLoggedIn';
import QuizzListScreen from './QuizzListScreen';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isLoggedIn: false,
			activePage: 0,
			isTokenExpired: false,
			user: {},
			tokenExpTime: '',
		};
	}

	componentDidMount() {
		this._checkTokenExpTime();
		this._loadFont();

		this._getToken();
		this._getUser();
	}

	_loadFont = async () => {
		await Font.loadAsync({
			Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
		});
		this.setState({ isLoading: false });
	};

	_checkTokenExpTime = async () => {
		let tokenExpTime = await AsyncStorage.getItem('tokenExpireTime');
		// console.log("token time" + tokenExpTime);
		// console.log(typeof tokenExpTime);
		this.setState({ tokenExpTime: tokenExpTime });
		console.log('token time' + this.state.tokenExpTime);

		// console.log("wassup");
		// console.log(typeof this.state.tokenExpTime );
		console.log(Date.now(), parseInt(this.state.tokenExpTime));
		if (Date.now() >= parseInt(this.state.tokenExpTime * 1000)) {
			console.log(false);
			await this.setState({ isTokenExpired: false });
			console.log(this.state.isTokenExpired);
		} else {
			console.log(true);
			await this.setState({ isTokenExpired: true });
		}
	};

	_getUser = async () => {
		await AsyncStorage.getItem('user')
			.then(userdata => {
				if (userdata !== null) {
					let man = JSON.parse(userdata);
					let myuser = man.user;
					// console.log(myuser.email);

					this.setState({ user: myuser });
				}
			})
			.catch(err => console.log('Error getting user ' + err));
	};

	_getToken = async () => {
		console.log('hey');
		await AsyncStorage.getItem('jwtToken')
			.then(token => {
				if (token !== null) {
					this.setState({ isLoggedIn: true });
					console.log('hey token ' + token);
				} else {
					this.setState({ isLoggedIn: false });
				}
			})
			.catch(err => console.log('Error getting token ' + err));
	};

	// A method to handle tab changes
	changeTab = i => {
		this.setState({ activePage: i });
	};

	render() {
		if (this.state.isLoading) {
			return <AppLoading />;
		} else if (this.state.isLoggedIn == false) {
			return <ProfileScreenNotLoggedIn navigation={this.props.navigation} />;
		} else if (this.state.isTokenExpired == false) {
			return <ProfileScreenNotLoggedIn navigation={this.props.navigation} />;
		}
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<SafeAreaView style={GlobalStyles.AndroidSafeArea}>
					<Container style={{backgroundColor:"#F8F8F8"}}>
						<Header hasText hasTabs style={styles.headerStyle}>
							<Body>
								<Title style={{ marginLeft: 10, fontFamily: 'monospace' }}>
									{this.state.activePage == 0
										? 'Courses'
										: this.state.activePage == 1
										? 'Challenges'
										: this.state.activePage == 2
										? 'Discuss'
										: this.state.activePage == 3
										? 'Quizz'
										: ''}
								</Title>
							</Body>
							<Right>
								<Button
									transparent
									onPress={() => {
										this.props.navigation.navigate('CourseTopicListScreen');
									}}
								>
									<Icon name="refresh" />
								</Button>

								<Button
									transparent
									onPress={() => {
										this.props.navigation.navigate('ProfileScreen', {
											user: this.state.user,
										});

										// console.log("hey my user "+ this.state.user);
										// this.props.navigation.navigate("ProfileScreen", {user: this.state.user})
									}}
								>
									<Icon name="person" />
								</Button>
							</Right>
						</Header>

						<Tabs
							initialPage={0}
							onChangeTab={({ i }) => {
								this.changeTab(i);
								console.log(this.state.activePage);
							}}
							style={{
								height: Dimensions.get('window').height * 0.8,
								backgroundColor: '#fff',
							}}
							tabBarUnderlineStyle={{
								borderBottomWidth: 4,
								borderBottomColor: '#fff',
							}}
						>
							<Tab
								heading={
									<TabHeading style={{ backgroundColor: '#10A881' }}>
										<Icon name="book" style={{ color: '#fff' }} />
									</TabHeading>
								}
							>
								<CoursesScreen navigation={this.props.navigation} />
							</Tab>
							<Tab
								heading={
									<TabHeading style={{ backgroundColor: '#10A881' }}>
										<Icon name="code" style={{ color: '#fff' }} />
									</TabHeading>
								}
							>
								<ChallengesScreen navigation={this.props.navigation} />
							</Tab>
							<Tab
								heading={
									<TabHeading style={{ backgroundColor: '#10A881' }}>
										<Icon name="chatboxes" style={{ color: '#fff' }} />
									</TabHeading>
								}
							>
								<DiscussScreen navigation={this.props.navigation} />
							</Tab>
							<Tab
								heading={
									<TabHeading style={{ backgroundColor: '#10A881' }}>
										<Entypo
											name="light-bulb"
											size={21}
											style={{
												color: '#fff',
											}}
										/>
									</TabHeading>
								}
							>
								<QuizzListScreen navigation={this.props.navigation} />
							</Tab>
						</Tabs>
					</Container>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerStyle: {
		backgroundColor: '#10A881',
	},
	tabStyle: {
		backgroundColor: '#10A881',
	},
	mainFooter: {
		backgroundColor: 'rgb(70, 150, 255)',
	},
});
