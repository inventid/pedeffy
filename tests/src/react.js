import React from 'react';
import {Document, Page, Text, View} from '@react-pdf/renderer';

class Jaja extends React.Component {
	render() {
		return (
			<View>
				<Text>Jaja</Text>
			</View>
		);
	}
}

export default class Plain extends React.Component {
	render() {
		return (
			<Document title={this.props.title} author="inventid">
				<Page size="A4">
					<Jaja/>
				</Page>
			</Document>
		);
	}
}
