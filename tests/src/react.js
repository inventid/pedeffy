import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';

class Jaja extends React.Component {
	render() {
		return (
			<Text>Jaja</Text>
		);
	}
}

export default class Plain extends React.Component {
	render() {
		return (
			<Document title={this.props.title} author="inventid">
				<Page size="A4">
					<Jaja />
				</Page>
			</Document>
		);
	}
}
