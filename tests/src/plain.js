import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';

export default class Plain extends React.Component {
	render() {
		return (
			<Document title={this.props.title} author="inventid">
				<Page size="A4">
					<Text>Jaja</Text>
				</Page>
			</Document>
		);
	}
}
