import React from 'react';
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
} from 'react-native';
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
	CardItem,
} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import OptionsMenu from 'react-native-options-menu';
import { Entypo } from '@expo/vector-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import validator from 'validator';
import Axios from 'axios';
import { AsyncStorage } from 'react-native';

const ip = require('../ipAddress');

// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

//importing styles
import GlobalStyles from '../src/GlobalStyles';

export default class QuizzListScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			quizzes: [],
			isLoading: true,
			token: '',
		};
	}
	async componentDidMount() {
		await AsyncStorage.getItem('jwtToken')
			.then(token => {
				if (token !== null) {
					this.setState({ token: token });
					console.log(token);
				}
			})
			.catch(err => console.log('Error getting token ' + err));
		this._getQuizzes();
	}

	_getQuizzes = () => {
		let headers = {
			'Content-Type': 'application/json',
			Authorization: this.state.token,
		};
		Axios.get(`http://${ip.default}:5000/user/quizz`, { headers: headers })
			.then(res => {
				this.setState({
					isLoading: false,
					quizzes: this.state.quizzes.concat(res.data),
				});
			})
			.catch(err => console.log('Error while getting quizz route ' + err));
	};

	_keyExtractor = (datasource, index) => datasource._id;

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
				<FlatList
					data={this.state.quizzes}
					keyExtractor={this._keyExtractor}
					style={{ padding: 0, margin: 0 }}
					renderItem={({ item }) => (
						<Card style={{ padding: 0, margin: 0 }}>
							<CardItem style={{ padding: 0, margin: 0, height: 70 }}>
								<View style={styles.quizzTopicContainer}>
									<Text style={styles.topicName}> {item.topicName.toUpperCase()} </Text>
									<Text
										style={{
											fontSize: responsiveFontSize(1.5),
											color: '#A0A0A0',
											fontFamily: 'monospace',
											marginLeft:screenWidth*0.05,
										}}
									>
										Questions: {item.questions.length}
									</Text>
								</View>
								<View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
									<TouchableOpacity
										onPress={() => {
											this.props.navigation.navigate('QuizzQuestionsScreen', {
												questions: item.questions,
												topicName: item.topicName,
											});
										}}
										style={{ padding: 0, margin: 0 }}
									>
										<Entypo
											name="chevron-right"
											size={30}
											style={{
												// position:"relative",
												// left:screenWidth*0.1,
												// marginRight: screenWidth * 0.1,
												color: '#10A881',
											}}
										/>
									</TouchableOpacity>
								</View>
							</CardItem>
						</Card>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	spinnerText: {
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'monospace',
	},
	topicName: {
		fontSize: responsiveFontSize(2.5),
		fontFamily: 'monospace',
	},
	quizzTopicContainer: {
		flex: 1,
		flexDirection: 'column',
	},
	progress: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
