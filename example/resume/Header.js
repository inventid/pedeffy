import React from 'react';
import {Link, StyleSheet, Text, View} from '@react-pdf/renderer';

const styles = StyleSheet.create({
	container : {
		flexDirection : 'row',
		borderBottomWidth : 2,
		borderBottomColor : '#112131',
		borderBottomStyle : 'solid',
		alignItems : 'stretch',
	},
	detailColumn : {
		flexDirection : 'column',
		flexGrow : 9,
	},
	linkColumn : {
		flexDirection : 'column',
		flexGrow : 2,
		alignSelf : 'flex-end',
		justifySelf : 'flex-end',
	},
	name : {
		fontSize : 24,
		textTransform : 'uppercase',
		fontFamily : 'Lato',
		fontWeight : 'bold',
	},
	subtitle : {
		fontSize : 10,
		justifySelf : 'flex-end',
		textTransform : 'uppercase',
		fontFamily : 'Lato',
	},
	link : {
		fontFamily : 'Lato',
		fontSize : 10,
		color : 'black',
		textDecoration : 'none',
		textAlign: 'right',
	},
});

export default () => (
	<View style={styles.container}>
		<View style={styles.detailColumn}>
			<Text style={styles.name}>Luke Skywalker</Text>
			<Text style={styles.subtitle}>Jedi Master</Text>
		</View>
		<View style={styles.linkColumn}>
			<Link style={styles.link}>luke@theforce.com</Link>
		</View>
	</View>
);
