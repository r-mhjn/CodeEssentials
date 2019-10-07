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
	Right,
	Icon,
	Button,
	Tabs,
	Tab,
	ScrollableTab,
	TabHeading,
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
import { FlatList } from 'react-native-gesture-handler';

export default class CourseTopicListScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			topics: [],
			courseName: '',
		};
	}

	componentDidMount() {
		this._getTopics();
	}
	_menu = null;

	setMenuRef = ref => {
		this._menu = ref;
	};

	hideMenu = () => {
		this._menu.hide();
	};

	showMenu = () => {
		this._menu.show();
	};

	_getTopics = () => {
		let topics = this.props.navigation.getParam('topics');
		let courseName = this.props.navigation.getParam('courseName');
		this.setState({ topics, courseName });
		console.log(this.state.topics);
	};

	render() {
		return (
			<TouchableWithoutFeedback>
				<SafeAreaView style={GlobalStyles.AndroidSafeArea}>
					<Container style={{backgroundColor:"#F8F8F8"}}>
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
									{this.state.courseName.toUpperCase()}
								</Title>
							</Body>
							<Right>
								<Menu
									ref={this.setMenuRef}
									button={
										<Entypo
											name="dots-three-vertical"
											size={25}
											onPress={() => {
												this.showMenu();
											}}
											style={{
												color: '#fff',
												marginRight: screenWidth * 0.015,
											}}
										/>
									}
								>
									<MenuItem onPress={this.hideMenu}>Add To Courses</MenuItem>
									<MenuItem onPress={this.hideMenu}>Bookmark</MenuItem>
								</Menu>
							</Right>
						</Header>
						<Tabs
							initialPage={0}
							onChangeTab={({ i }) => {
								console.log(i);
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
							{this.state.topics.map((item, index) => {
								return (
									<Tab
										tabStyle={{ backgroundColor: '#10A881' }}
										key={index}
										heading={
											<TabHeading style={{ backgroundColor: '#10A881' }}>
												<Text style={{ color: '#fff', fontFamily: 'monospace' }}>
													{item.topicName.toUpperCase()}
												</Text>
											</TabHeading>
										}
									></Tab>
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
});
