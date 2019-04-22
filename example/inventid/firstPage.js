import React from 'react';
import {
	Document, Image, Page, StyleSheet, Text, View,
} from '@react-pdf/renderer';
import fs from 'fs';
import PropTypes from 'prop-types';
import { Font } from '../../src/index';

const BEAUTIFUL_MARGIN = 8;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		margin: BEAUTIFUL_MARGIN * 4,
	},
	image: {
		marginBottom: BEAUTIFUL_MARGIN * 4,
	},
	leftColumn: {
		flexDirection: 'column',
		width: 120,
		marginRight: BEAUTIFUL_MARGIN * 4,
	},
	leftText: {
		fontFamily: 'Open Sans',
		fontSize: 11,
		color: '#a89e9e',
		lineHeight: 1.2,
	},
	rightColumn: {
		flexDirection: 'column',
		flexGrow: 1,
		height: 780,
		overflow: 'hidden',
	},
});

function newLinedText(style, text) {
	if (!text) {
		return null;
	}
	return text.split('\n').map((e, i) => <Text key={i} style={style}>{e.trim()}</Text>);
}

function Spacer() {
	return <View style={{ marginBottom: BEAUTIFUL_MARGIN * 2 }} />;
}

Font.register({
	family: 'Open Sans',
	src: `${__dirname}/Open_Sans/OpenSans-Regular.ttf`,
	fontStyle: 'normal',
	fontWeight: 'normal',
});

const logo = fs.readFileSync(`${__dirname}/logo-6d10589dc3bb992cf77d8ede61131996.png`);

class FirstPage extends React.Component {
	render() {
		const {
			dev,
			children,
			text,
			title,
		} = this.props;

		const address = newLinedText(styles.leftText, `inventid
			Superstreet 14a
			303T2P Rotterdam`);
		const internetAddress = newLinedText(styles.leftText, `www.inventid.nl
			info@inventid.nl`);
		const contactInfo = newLinedText(Object.assign({}, styles.leftText, { fontSize: 9 }), `ING: NL77INGB0007728952
			KvK: 54013887
			BTW: NL851117144B01`);

		const rightColumnStyle = Object.assign({}, styles.rightColumn);
		if (dev) {
			Object.assign(rightColumnStyle, {
				borderWidth: 1,
				borderColor: 'black',
			});
		}

		const childrenInner = children || newLinedText({}, text);

		return (
			<Document title={title} author="inventid">
				<Page size="A4">
					<View style={styles.container}>
						<View style={styles.leftColumn}>
							<Image
								src={{ data: logo, format: 'png' }}
								style={styles.image}
							/>
							{address}
							<Spacer />
							{internetAddress}
							<Spacer />
							{contactInfo}
						</View>
						<View style={rightColumnStyle}>
							{childrenInner}
						</View>
					</View>
				</Page>
			</Document>
		);
	}
}

FirstPage.defaultProps = {
	dev: false,
};

FirstPage.propTypes = {
	children: PropTypes.node.isRequired,
	text: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	dev: PropTypes.bool,
};

module.exports = FirstPage;
