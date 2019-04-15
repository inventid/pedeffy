import React from 'react';
import {StyleSheet, Text, View} from '@react-pdf/renderer';

import Title from './Title';

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	school: {
		fontFamily: 'Lato',
		fontWeight: 'bold',
		fontSize: 10,
	},
	degree: {
		fontFamily: 'Lato',
		fontSize: 10,
	},
	candidate: {
		fontFamily: 'Lato',
		fontStyle: 'italic',
		fontSize: 10,
	},
});

export default () => (
	<View style={styles.container}>
		<Title>Education</Title>
		<Text style={styles.school}>Jedi Academy</Text>
		<Text style={styles.degree}>Jedi Master</Text>
		<Text style={styles.candidate}>A long, long time ago</Text>
	</View>
);
