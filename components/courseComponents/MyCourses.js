import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Image,
	Keyboard,
	TouchableWithoutFeedback,
	ScrollView,
} from 'react-native';
import { Form, Item, Input, Container, Header, Left, Right, Icon, Button, Body, Title, Content } from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Axios from 'axios';
import { AsyncStorage } from 'react-native';

// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const ip = require('../../ipAddress');

export default class MyCourses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userCourseId: [],
			userCourses: [],
			availableCourses: [],
			allCourses: [],
			token: '',
		};
	}

	async componentDidMount() {
		await AsyncStorage.getItem('jwtToken')
			.then(token => {
				if (token !== null) {
					this.setState({ token: token });
				}
			})
			.catch(err => console.log('Error getting token ' + err));
		this._getUserCourses();
		// this._getAllCourses();
	}

	_getUserCourses = async () => {
		console.log('all cour');
		let headers = {
			'Content-Type': 'application/json',
			Authorization: this.state.token,
		};
		Axios.get(`http://${ip.default}:5000/user/course/mycourses`, { headers: headers })
			.then(res => {
				console.log(res.data);
				this.setState({
					userCourseId: res.data,
				});
				console.log('user courses id' + this.state.userCourseId);
				this._getAllCourses();
			})
			.catch(err => console.log('Error while getting user courses ' + err));
	};

	_getAllCourses = async () => {
		let headers = {
			'Content-Type': 'application/json',
			Authorization: this.state.token,
		};
		Axios.get(`http://${ip.default}:5000/user/course`, { headers: headers })
			.then(res => {
				// console.log(res.data);
				this.setState({
					allCourses: res.data,
				});
				console.log(this.state.allCourses);
				this._filterUserCourses();
			})
			.catch(err => console.log('Error while getting all course route' + err));
		//TODO: modify this to enther get all courses from the server and compare on front end or get all coures filtered from thes server itself
	};

	_filterUserCourses = () => {
		let userCourses = this.state.userCourses;
		let userCourseId = this.state.userCourseId;
		let allCourses = this.state.allCourses;
		let availableCourses = this.state.availableCourses;
		console.log('filter');

		for (let i = 0; i < allCourses.length; i++) {
			console.log(i);
			let userCourseFound = false;
			for (let j = 0; j < userCourseId.length; j++) {
				if (userCourseId[j].courseId == allCourses[i]._id) {
					userCourseFound = true;
					userCourses.push(allCourses[i]);
					break;
				}
			}
			if (userCourseFound == false) {
				availableCourses.push(allCourses[i]);
			}
		}
		this.setState({ userCourses, availableCourses });
		console.log(this.state.userCourses);
		console.log(this.state.availableCourses);
	};

	render() {
		return (
			<Container style={styles.container}>
				<Content>
					<View style={styles.componentTop}>
						<Text style={styles.componentHeading}>My Courses</Text>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('MyCoursesListScreen', {
									userCourses: this.state.userCourses,
									availableCourses: this.state.availableCourses,
								});
							}}
						>
							<Text style={styles.componentButton}>MANAGE</Text>
						</TouchableOpacity>
					</View>
					<ScrollView>
						<View style={styles.componentMainDisplay}>
							{this.state.userCourses.map((item, index) => {
								if (index <= 3) {
									return (
										<TouchableWithoutFeedback
											key={index}
											onPress={() => {
												this.props.navigation.navigate('CourseTopicListScreen', {
													topics: item.topics,
													courseName: item.courseName,
												});
											}}
										>
											<View style={styles.smallCourseViewContainer}>
												<Image
													borderWidth={0}
													style={styles.image}
													source={{
														uri: `http://${ip.default}:5000/coursepics/${item.courseImage}`,
													}}
												/>
												<Text style={styles.smallCourseViewContainerText}>
													{item.courseName.toUpperCase()}
												</Text>
											</View>
										</TouchableWithoutFeedback>
									);
								}
							})}
						</View>
					</ScrollView>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: screenHeight * 0.25,
		// marginTop:screenHeight*0.07,
		width: screenWidth * 0.96,
		backgroundColor: '#fff',
		marginHorizontal: screenWidth * 0.02,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#ddd',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 4,
	},
	componentTop: {
		flex: 1,
		flexDirection: 'row',
	},
	componentHeading: {
		flex: 1,
		alignItems: 'flex-start',
		marginTop: screenHeight * 0.015,
		marginLeft: screenWidth * 0.03,
		fontSize: responsiveFontSize(2),
		fontWeight: '400',
		fontFamily: 'monospace',
		//    borderColor:"black",
		//    borderWidth:2,
	},
	componentButton: {
		flex: 1,
		alignItems: 'flex-end',
		//    borderColor:"black",
		//    borderWidth:2,
		marginTop: screenHeight * 0.02,
		marginRight: screenWidth * 0.03,
		fontSize: responsiveFontSize(1.6),
		fontWeight: '400',
		color: '#10A881',
		fontFamily: 'monospace',
	},
	componentMainDisplay: {
		// borderWidth: 2,
		// borderColor: 'black',
		width: screenWidth * 0.9,
		backgroundColor: '#fff',
		marginHorizontal: screenWidth * 0.03,
		height: screenHeight * 0.19,
		flexDirection: 'row',
	},
	smallCourseViewContainer: {
		flexDirection: 'column',
		marginTop: screenHeight * 0.025,
	},
	smallCourseViewContainerText: {
		marginTop: screenHeight * 0.005,
		marginRight: screenWidth * 0.045,
		fontSize: responsiveFontSize(1.2),
	},
	image: {
		width: screenWidth * 0.19,
		height: screenWidth * 0.19,
		marginRight: screenWidth * 0.045,
		borderRadius: 10,
		// borderColor: '#fff',
	},
});
