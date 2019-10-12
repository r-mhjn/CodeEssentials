import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	Dimensions,
	SafeAreaView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	TouchableOpacity,
	FlatList,
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
// import { FlatList } from 'react-native-gesture-handler';

//Importing screens
// import CourseTopicListScreen from './CourseTopicListScreen';

export default class CourseListScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			courses: [],
			domain: '',
			isLoading: true,
		};
	}

	componentDidMount() {
		this._getCourses();
	}

	_getCourses = () => {
		let courses = this.props.navigation.getParam('courses');
		this.setState({ courses, domain: courses[0].domain.toUpperCase(), isLoading: false });
		console.log(this.state.domain);
		console.log(this.state.courses);
	};

	addToUserCourses = () => {};

	removeFromUserCoures = () => {};

	_keyExtractor = (datasource, index) => datasource._id;

	editPost = () => {
		Alert.alert('edit');
	};

	deletePost = () => {
		Alert.alert('Dert');
	};

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
			<SafeAreaView style={GlobalStyles.AndroidSafeArea}>
				<Container>
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
						<Body style={{ flex: 1 }}>
							<Title style={{ textAlign: 'center', fontFamily: 'monospace' }}>
								{this.state.courseId}
							</Title>
						</Body>
						<Right />
					</Header>

					<Content style={{ backgroundColor: '#F8F8F8' }}>
						<View style={styles.container}>
							<FlatList
								data={this.state.courses}
								keyExtractor={this._keyExtractor}
								style={{
									padding: 0,
									margin: 0,
									marginTop: screenHeight * 0.01,
									marginHorizontal: screenWidth * 0.01,
								}}
								renderItem={({ item }) => (
									<Card style={{ padding: 0, margin: 0, borderRadius: 10 }}>
										<CardItem
											style={{
												padding: 0,
												margin: 0,
												minHeight: 70,
												display: 'flex',
												borderRadius: 10,
												// flexDirection: 'column',
											}}
										>
											<Image
												style={styles.image}
												source={{
													uri: `http://${ip.default}:5000/coursepics/${item.courseImage}`,
												}}
											/>
											<View style={styles.quizzTopicContainer}>
												<Text style={styles.topicName}> {item.courseName.toUpperCase()} </Text>
												<Text
													style={{
														fontSize: responsiveFontSize(1.6),
														color: '#A0A0A0',
														fontFamily: 'monospace',
														marginLeft: screenWidth * 0.025,
														width: screenWidth * 0.63,
													}}
												>
													{item.description}
												</Text>
											</View>
											<View
												style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}
											>
												<TouchableOpacity
													onPress={() => {
														this.props.navigation.navigate('CourseTopicListScreen', {
															topics: item.topics,
															courseName: item.courseName,
															courseId: item._id,
														});
													}}
													style={{ padding: 0, margin: 0 }}
												>
													<Entypo
														name="chevron-right"
														size={30}
														style={{
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
					</Content>
				</Container>
			</SafeAreaView>
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
	questionInfo: {
		flex: 5,
		flexDirection: 'column',
		marginLeft: screenWidth * 0.01,
		color: '#707070',
		// borderColor:"black",
		// borderWidth:2,
	},
	courseHeading: {
		position: 'relative',
		color: 'black',
		textAlign: 'center',
		textAlignVertical: 'center',
		right: 300,
		fontSize: responsiveFontSize(2.5),
		fontFamily: 'monospace',
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
	image: {
		width: screenWidth * 0.12,
		height: screenWidth * 0.12,
		marginRight: screenWidth * 0.045,
		borderRadius: 10,
		// borderColor: '#fff',
	},
});
