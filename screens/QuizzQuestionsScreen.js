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
	ScrollableTab,
	TabHeading,
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

export default class QuizzQuestionsScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			questions: [],
			topicName: '',
			optionBgColor: '',
		};
	}

	componentDidMount() {
		this._getQuestions();
	}

	_getQuestions = () => {
		let questions = this.props.navigation.getParam('questions');
		let topicName = this.props.navigation.getParam('topicName');
		this.setState({ questions, topicName });
		console.log(this.state.questions);
	};

	render() {
		return (
			<TouchableWithoutFeedback>
				<SafeAreaView style={GlobalStyles.AndroidSafeArea}>
					<Container>
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
								<Title style={{ color: '#fff', fontFamily: 'monospace' }}>
									{this.state.topicName.toUpperCase()}
								</Title>
							</Body>
							<Right />
						</Header>
						<Tabs
							initialPage={0}
							onChangeTab={({ i }) => {
								console.log(i);
								this.setState({ optionBgColor: '' });
							}}
							style={{
								height: Dimensions.get('window').height * 0.8,
								backgroundColor: '#fff',
							}}
							tabBarUnderlineStyle={{
								borderBottomWidth: 4,
								borderBottomColor: '#fff',
							}}
							renderTabBar={() => <ScrollableTab style={{ backgroundColor: '#10A881' }} />}
						>
							{this.state.questions.map((item, index) => {
								return (
									<Tab
										tabStyle={{ backgroundColor: '#10A881' }}
										key={index}
										heading={
											<TabHeading style={{ backgroundColor: '#10A881' }}>
												<Text style={{ color: '#fff' }}>QUESTION {index + 1}</Text>
											</TabHeading>
										}
									>
										<Content style={{ backgroundColor: '#F5F5F5' }}>
											<View style={styles.questionContainer}>
												<Text style={styles.questionText}>{item.questionStatement}</Text>
											</View>
											<View style={styles.optionContainer}>
												{item.options.map((option, idx) => {
													return (
														<TouchableOpacity
															key={idx}
															onPress={() => {
																if (
																	String.fromCharCode(65 + idx) ==
																	String.fromCharCode(65 - 1 + item.answer)
																) {
																	this.setState({ optionBgColor: 'green' });
																	Alert.alert('correct');
																} else {
																	this.setState({ optionBgColor: 'green' });
																	Alert.alert('incorrect');
																}
															}}
														>
															<View style={[styles.optionButtonContainer, ]}>
																<Text style={styles.optionVariable}>
																	{' '}
																	{String.fromCharCode(65 + idx)}
																</Text>
																<Text style={styles.optionText}>{option}</Text>
															</View>
														</TouchableOpacity>
													);
												})}
											</View>
											<View style={styles.explanationContainer}>
												<Text style={styles.explanationHeading}>Explanation</Text>
												<Text style={styles.explanationText}>{item.explanation}</Text>
											</View>
										</Content>
									</Tab>
								);
							})}
						</Tabs>
					</Container>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: '#10A881',
	},
	questionContainer: {
		flex: 1,
		// height: screenHeight * 0.25,
        // height: auto,
        display: 'flex',
		minHeight: screenHeight * 0.15,
		marginTop: screenHeight * 0.01,
		width: screenWidth * 0.99,
		backgroundColor: '#fff',
		marginHorizontal: screenWidth * 0.005,
		// borderWidth: 1,
		borderBottomWidth: 1,

		borderColor: '#ddd',
	},
	questionText: {
		color: 'black',
		fontSize: responsiveFontSize(2),
		fontFamily: 'monospace',
		marginLeft: screenWidth * 0.02,
		marginRight: screenWidth * 0.02,
		marginTop: screenHeight * 0.015,
	},
	optionButtonContainer: {
		flex: 1,
		flexDirection: 'row',
		height: screenHeight * 0.08,
		width: screenWidth,
		// backgroundColor:
		// 	this.state.optionBgColor === '' ? '#fff' : this.state.optionBgColor === 'green' ? 'green' : 'red',
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderColor: '#D0D0D0',
	},
	optionVariable: {
		color: '#fff',
		backgroundColor: '#10A881',
		textAlign: 'center',
		textAlignVertical: 'center',
		fontFamily: 'monospace',
		marginTop: screenHeight * 0.008,
		marginBottom: screenHeight * 0.008,
		fontSize: responsiveFontSize(2.4),
		marginLeft: screenWidth * 0.02,
		height: screenWidth * 0.12,
		width: screenWidth * 0.12,
		borderRadius: screenWidth * 0.12,
	},
	optionText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: responsiveFontSize(2),
		marginRight: screenWidth * 0.05,
		fontFamily: 'monospace',
		marginLeft: screenWidth * 0.05,
	},
	explanationContainer: {
		marginLeft: screenWidth * 0.03,
		marginLeft: screenWidth * 0.03,
		marginTop: screenHeight * 0.03,
	},
	explanationHeading: {
		fontSize: responsiveFontSize(2.6),
		fontFamily: 'monospace',
		fontWeight: '600',
	},
	explanationText: {
		marginTop: screenHeight * 0.005,
		fontFamily: 'monospace',
		fontSize: responsiveFontSize(2),
	},
});
