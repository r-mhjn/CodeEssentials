import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

//importing styles
import GlobalStyles from '../src/GlobalStyles';

// Dimesions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class ProfileScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<SafeAreaView style={GlobalStyles.AndroidSafeArea}>
				<Container>
					<Header style={styles.headerStyle}>
						<Body style={{ flex: 1 }}></Body>
						<Right style={{ flex: 1 }} />
					</Header>

					<View style={styles.logoContainer}></View>

					<View style={styles.contentContainer}>
						<View style={styles.textContainer}>
							<Text style={styles.headingText}>SIGN IN TO CONTINUE</Text>
							<Text style={styles.text}>Sign in to your account to continue access.</Text>
							<Button
								onPress={() => {
									this.props.navigation.navigate('LoginScreen');
								}}
								style={styles.button}
							>
								<Text style={styles.buttonText}>SIGN IN</Text>
							</Button>
						</View>
					</View>
				</Container>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	logoContainer: {
		flex: 2,
		// borderColor:"black",
		minHeight: screenHeight * 0.4,
		maxHeight: screenHeight * 0.4,
		// borderWidth:2,
	},
	headerStyle: {
		backgroundColor: '#10A881',
		fontFamily: 'monospace',
	},
	headingText: {
		color: '#47535E',
		marginVertical: 10,
		minWidth: screenWidth * 0.7,
		maxWidth: screenWidth * 0.7,
		marginLeft: screenWidth * 0.15,
		marginRight: screenWidth * 0.15,
		fontSize: responsiveFontSize(2.5),
		fontFamily: 'monospace',
	},
	text: {
		color: 'grey',
		fontSize: responsiveFontSize(1.5),
		minWidth: screenWidth * 0.8,
		maxWidth: screenWidth * 0.8,
		marginHorizontal: screenWidth * 0.15,
		fontFamily: 'monospace',
	},
	button: {
		flex: 1,
		backgroundColor: '#10A881',
		minWidth: screenWidth * 0.8,
		maxWidth: screenWidth * 0.8,
		marginHorizontal: screenWidth * 0.1,
		minHeight: screenHeight * 0.07,
		maxHeight: screenHeight * 0.07,
		marginVertical: 20,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: responsiveFontSize(2),
		fontFamily: 'monospace',
	},

	contentContainer: {
		flex: 2,
		minHeight: screenHeight * 0.6,
		maxHeight: screenHeight * 0.6,
		// borderColor:"blue",
		// borderWidth:2,
	},
});
