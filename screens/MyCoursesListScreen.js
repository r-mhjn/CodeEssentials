import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	SafeAreaView,
	TouchableWithoutFeedback,
	FlatList,
	Keyboard,
	Image,
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
	Card,
	CardItem,
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
// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const ip = require('../ipAddress');

export default class MyCoursesListScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userCourses: [],
			availableCourses: [],
			isLoading: true,
		};
	}

	componentDidMount() {
		this._getCourses();
	}

	_getCourses = () => {
		let userCourses = this.props.navigation.getParam('userCourses');
		let availableCourses = this.props.navigation.getParam('availableCourses');
		this.setState({ userCourses, availableCourses, isLoading: false });
		// console.log(this.state.domain);
		console.log(this.state.userCourses);
	};

	_keyExtractor1 = (datasource, index) => datasource._id;
	_keyExtractor2 = (datasource, index) => datasource._id;

	render() {
		return (
			<TouchableWithoutFeedback>
				<SafeAreaView style={[GlobalStyles.AndroidSafeArea, { backgroundColor: '#fff' }]}>
					<Container style={styles.container}>
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
								<Title style={{ color: '#fff', fontFamily: 'monospace' }}>My Courses</Title>
							</Body>
							<Right />
						</Header>

						<Content style={styles.contentStyles}>
							<View style={styles.myCoursesHeaderView}>
								<Text style={styles.myCoursesHeader}>MY COURSES</Text>
							</View>

							<View style={styles.container}>
								<FlatList
									data={this.state.userCourses}
									keyExtractor={this._keyExtractor1}
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
													<Text style={styles.topicName}>
														{' '}
														{item.courseName.toUpperCase()}{' '}
													</Text>
													<Text
														style={{
															fontSize: responsiveFontSize(1.6),
															color: '#A0A0A0',
															fontFamily: 'monospace',
															marginLeft: screenWidth * 0.02,
															width: screenWidth * 0.62,
														}}
													>
														{item.description}
													</Text>
												</View>
												<View
													style={{
														flex: 1,
														alignItems: 'flex-end',
														justifyContent: 'flex-end',
													}}
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
							<View style={styles.availableCouresHeaderView}>
								<Text style={styles.availableCouresHeader}>AVAILABLE COURSES</Text>
							</View>
							<FlatList
								data={this.state.availableCourses}
								keyExtractor={this._keyExtractor2}
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
														marginLeft: screenWidth * 0.02,
														width: screenWidth * 0.62,
													}}
												>
													{item.description}
												</Text>
											</View>
											<View
												style={{
													flex: 1,
													alignItems: 'flex-end',
													justifyContent: 'flex-end',
												}}
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
						</Content>
					</Container>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F8F8',
	},
	headerStyle: {
		backgroundColor: '#10A881',
	},
	myCoursesHeaderView: {},
	myCoursesHeader: {
		fontSize: responsiveFontSize(2.5),
		fontWeight: '300',
		color: '#989898',
		marginLeft: screenWidth * 0.03,
		marginTop: screenHeight * 0.01,
	},

	availableCouresHeaderView: {},
	availableCouresHeader: {
		fontSize: responsiveFontSize(2.5),
		fontWeight: '300',
		color: '#989898',
		marginLeft: screenWidth * 0.03,
		marginTop: screenHeight * 0.01,
	},
	contentStyle: {
		// backgroundColor: '#F8F8F8',
		backgroundColor: '#fff',
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
	topicName: {
		fontSize: responsiveFontSize(2),
		fontFamily: 'monospace',
	},
	image: {
		width: screenWidth * 0.12,
		height: screenWidth * 0.12,
		marginRight: screenWidth * 0.045,
		borderRadius: 10,
		// borderColor: '#fff',
	},
});
