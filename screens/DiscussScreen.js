import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	SafeAreaView,
	Keyboard,
	FlatList,
	TouchableWithoutFeedback,
	Image,
	Alert,
} from 'react-native';
import {
	Form,
	Spinner,
	Item,
	Input,
	Container,
	Header,
	Left,
	Right,
	CardItem,
	Card,
	Icon,
	Button,
	Body,
	Title,
	Content,
} from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Axios from 'axios';
import { AsyncStorage } from 'react-native';

const ip = require('../ipAddress');

// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class CoursesScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			token: '',
			isLoading: true,
			questions: [],
		};
	}

	async componentDidMount() {
		const { navigation } = this.props;
		console.log('hey' + this.navigation);
		await AsyncStorage.getItem('jwtToken')
			.then(token => {
				if (token !== null) {
					this.setState({ token: token });
					console.log(token);
				}
			})
			.catch(err => console.log('Error getting token ' + err));
		this.getQuestionsFromApi();
	}

	getQuestionsFromApi = () => {
		let headers = {
			'Content-Type': 'application/json',
			Authorization: this.state.token,
		};
		Axios.get(`http://${ip.default}:5000/user/questions`, { headers: headers })
			.then(res => {
				this.setState({ isLoading: false, questions: res.data });
				console.log(this.state.questions);
			})
			.catch(err => console.log('Error while getting challenges route ' + err));
	};

	_keyExtractor = (questions, index) => questions._id;

	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.progress}>
					<Spinner color="#10A881" />
					<Text>Loading...</Text>
				</View>
			);
		}
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<Container style={{ backgroundColor: '#F5F5F5' }}>
					<FlatList
						data={this.state.questions}
						keyExtractor={this._keyExtractor}
						style={{ padding: 0, margin: 0, marginTop: screenHeight * 0.01, marginHorizontal:screenWidth*0.01 }}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate('DisplayChallengeScreen', {
										challenge: item,
									});
								}}
								style={{ padding: 0, margin: 0, borderRadius: 10 }}
							>
								<Card style={{ padding: 0, margin: 0, borderRadius: 10 }}>
									<CardItem style={{ padding: 0, margin: 0, borderRadius: 10 }}>
										<View style={styles.questionContainer}>
											<Image
												style={styles.questionpic}
												source={{
													uri:
														'https://www.google.com/search?tbm=isch&q=images&chips=q:images,g_1:background:6GJxHg1gMNk%3D&usg=AI4_-kSL79ctnvYywkrsKDDuYBCWjjN6RQ&sa=X&ved=0ahUKEwict5TpsIzkAhUT3o8KHbyIAN4Q4lYILSgB&biw=1843&bih=912&dpr=1#imgrc=R2_t7nzjZXGyEM:',
												}}
											/>

											<Text style={styles.questionInfo}> {item.title} </Text>
										</View>
									</CardItem>
								</Card>
							</TouchableOpacity>
						)}
					/>

					<View style={styles.container}>
						<Button
							onPress={() => {
								this.props.navigation.navigate('AddQuestionScreen');
							}}
							activeOpacity={1}
							style={styles.TouchableOpacityStyle}
						>
							<Text name="add-circle" style={styles.FloatingButtonStyle}>
								+
							</Text>
						</Button>
					</View>
				</Container>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E8E8E8',
	},
	TouchableOpacityStyle: {
		position: 'absolute',
		width: 55,
		height: 55,
		alignItems: 'center',
		justifyContent: 'center',
		right: 30,
		bottom: 30,
		borderRadius: 80,
		backgroundColor: '#10A881',
	},
	FloatingButtonStyle: {
		color: '#fff',
		fontSize: 25,
		fontWeight: '300',
	},
	progress: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	questionContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	questionpic: {
		flex: 2,
		height: screenWidth * 0.2,
		width: screenWidth * 0.15,
		// borderColor:"black",
		// borderWidth:2,
	},
});
