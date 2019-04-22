import React from 'react';
import fs from 'fs';
import {
	Document, Image, Page, StyleSheet, Text, View,
} from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import { Font } from '../../src/index';
import Header from './Header';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';

const styles = StyleSheet.create({
	page: {
		padding: 30,
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		'@media max-width: 400': {
			flexDirection: 'column',
		},
	},
	image: {
		marginBottom: 10,
	},
	leftColumn: {
		flexDirection: 'column',
		width: 170,
		paddingTop: 30,
		paddingRight: 15,
		'@media max-width: 400': {
			width: '100%',
			paddingRight: 0,
		},
		'@media orientation: landscape': {
			width: 200,
		},
	},
	footer: {
		fontSize: 12,
		fontFamily: 'Lato',
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 25,
		paddingTop: 10,
		borderWidth: 3,
		borderColor: 'gray',
		borderStyle: 'dashed',
		'@media orientation: landscape': {
			marginTop: 10,
		},
	},
});

Font.register({
	family: 'Open Sans',
	src: `${__dirname}/fonts/Open_Sans/OpenSans-Regular.ttf`,
	fontStyle: 'normal',
	fontWeight: 'normal',
});
Font.register({
	family: 'Lato',
	src: `${__dirname}/fonts/Lato/Lato-Regular.ttf`,
	fontStyle: 'normal',
	fontWeight: 'normal',
});
Font.register({
	family: 'Lato',
	src: `${__dirname}/fonts/Lato/Lato-Italic.ttf`,
	fontStyle: 'italic',
	fontWeight: 'normal',
});
Font.register({
	family: 'Lato',
	src: `${__dirname}/fonts/Lato/Lato-Bold.ttf`,
	fontStyle: 'normal',
	fontWeight: 'bold',
});

const luke = fs.readFileSync(`${__dirname}/luke.jpg`);

class Resume extends React.Component {
	views = () => (
		<View style={styles.container}>
			<View style={styles.leftColumn}>
				<Image
					src={luke}
					style={styles.image}
				/>
				<Education />
				<Skills />
			</View>
			<Experience />
		</View>
	);


	render() {
		const { footer } = this.props;
		return (
			<Document
				author="Luke Skywalker"
				keywords="awesome, resume, start wars"
				subject="The resume of Luke Skywalker"
				title="Resume"
			>
				<Page {...this.props} style={styles.page}>
					<Header />
					{this.views()}
					<Text style={styles.footer}>
						{footer}
					</Text>
				</Page>
			</Document>
		);
	}
}

Resume.defaultProps = {
	footer: 'Try adding a JSON with the `footer` key or the `footer` query parameter!',
};

Resume.propTypes = {
	footer: PropTypes.string,
};

export default Resume;
