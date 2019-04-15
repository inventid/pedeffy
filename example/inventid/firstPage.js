import React from 'react';
import {Document, Font, Image, Page, StyleSheet, Text, View,} from '@react-pdf/renderer';
import fs from 'fs';
import PropTypes from 'prop-types';

const BEAUTIFUL_MARGIN = 8;

const styles = StyleSheet.create({
	container : {
		flexDirection : 'row',
		margin : BEAUTIFUL_MARGIN * 4,
	},
	image : {
		marginBottom : BEAUTIFUL_MARGIN * 4,
	},
	leftColumn : {
		flexDirection : 'column',
		width : 120,
		marginRight : BEAUTIFUL_MARGIN * 4,
	},
	leftText : {
		fontFamily : 'Open Sans',
		fontSize : 11,
		color : '#a89e9e',
		lineHeight : 1.2,
	},
	rightColumn : {
		flexDirection : 'column',
		flexGrow : 1,
		height : 780,
		overflow : 'hidden'
	},
});

function newLinedText(style, text) {
	if (!text) {
		return null;
	}
	return text.split("\n").map((e, i) => <Text key={i} style={style}>{e.trim()}</Text>);
}

function Spacer() {
	return <View style={{marginBottom : BEAUTIFUL_MARGIN * 2}}/>;
}

Font.register({
	family : 'Open Sans',
	src : `${__dirname}/Open_Sans/OpenSans-Regular.ttf`,
	fontStyle : 'normal',
	fontWeight : 'normal',
});

const logo = fs.readFileSync(`${__dirname}/logo-6d10589dc3bb992cf77d8ede61131996.png`);

class FirstPage extends React.Component {

	render() {
		const address = newLinedText(styles.leftText, `inventid
			Superstreet 14a
			303T2P Rotterdam`);
		const internetAddress = newLinedText(styles.leftText, `www.inventid.nl
			info@inventid.nl`);
		const contactInfo = newLinedText(Object.assign({}, styles.leftText, {fontSize : 9}), `ING: NL77INGB0007728952
			KvK: 54013887
			BTW: NL851117144B01`);

		const rightColumnStyle = Object.assign({}, styles.rightColumn);
		if (this.props.dev) {
			Object.assign(rightColumnStyle, {
				borderWidth : 1,
				borderColor : 'black',
			});
		}

		const children = this.props.children ? this.props.children : newLinedText({}, this.props.text);

		return (<Document title={this.props.title} author="inventid">
			<Page size="A4">
				<View style={styles.container}>
					<View style={styles.leftColumn}>
						<Image
							src={{data : logo, format : 'png'}}
							style={styles.image}
						/>
						{address}
						<Spacer/>
						{internetAddress}
						<Spacer/>
						{contactInfo}
					</View>
					<View style={rightColumnStyle}>
						{children}
					</View>
				</View>
			</Page>
		</Document>);
	}
}

FirstPage.defaultProps = {
	dev : false
};

FirstPage.propTypes = {
	children : PropTypes.node.isRequired,
	dev : PropTypes.bool
};

module.exports = FirstPage;
