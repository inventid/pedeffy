import React from 'react';
import {Document, Font, Image, Page, StyleSheet, Text, View,} from '@react-pdf/core';
import PropTypes from 'prop-types';
import Header from './Header';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';

const styles = StyleSheet.create({
	container : {
		flexDirection : 'row',
	},
	image : {
		marginBottom : 10,
	},
	leftColumn : {
		flexDirection : 'column',
		width : 170,
		marginLeft : 30,
		marginRight : 15,
		marginTop : 20,
	},
	rightColumn : {
		flexDirection : 'column',
		flexGrow : 1,
		marginLeft : 15,
		marginRight : 30,
		marginTop : 20,
	},
	footer : {
		fontSize : 12,
		fontFamily : 'Lato Bold',
		align : 'center',
		marginTop : 25,
		marginHorizontal : 30,
		paddingVertical : 10,
		borderWidth : 3,
		borderColor : 'gray',
		borderStyle : 'dashed',
	},
});

class Resume extends React.Component {

	// Register your fonts here etc here
	componentWillMount() {
		Font.register(`${__dirname}/fonts/Open_Sans/OpenSans-Regular.ttf`, {
			family : 'Open Sans',
		});
		Font.register(`${__dirname}/fonts/Lato/Lato-Regular.ttf`, {
			family : 'Lato',
		});
		Font.register(`${__dirname}/fonts/Lato/Lato-Italic.ttf`, {
			family : 'Lato Italic',
		});
		Font.register(`${__dirname}/fonts/Lato/Lato-Bold.ttf`, {
			family : 'Lato Bold',
		});
	}

	// Unregister anything here to prevent resource leaking
	componentWillUnmount() {
		Font.clear();
	}

	render() {
		return (<Document>
			<Page size="A4">
				<Header/>
				<View style={styles.container}>
					<View style={styles.leftColumn}>
						<Image
							src="https://images.gr-assets.com/characters/1264613782p8/1783.jpg"
							style={styles.image}
						/>
						<Education/>
						<Skills/>
					</View>
					<View style={styles.rightColumn}>
						<Experience/>
					</View>
				</View>
				<Text style={styles.footer}>
					{this.props.footer}
				</Text>
			</Page>
		</Document>);
	}
}

Resume.defaultProps = {
	footer : 'Try adding a JSON with the `footer` key or the `footer` query parameter!'
};

Resume.propTypes = {
	footer: PropTypes.string
};

module.exports = Resume;
