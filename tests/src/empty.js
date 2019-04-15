import React from 'react';
import { Document } from '@react-pdf/renderer';

export default class Empty extends React.Component {
	render() {
		return (
			<Document />
		);
	}
}
