import React from 'react';
import {Document, Page, Text, View} from '@react-pdf/renderer';

const textStyle = {
		fontFamily: 'Helvetica',
		fontSize: 11,
		color: '#a89e9e',
		lineHeight: 1.2,
};

export default class Plain extends React.Component {
	render() {
		return (
			<Document title={this.props.title} author="inventid">
				<Page size="A4">
					<View style={{width: 120}}>
						<Text style={textStyle}>JAJA</Text>
					</View>
				</Page>
			</Document>
		);
	}
}
