import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	title: {
		fontFamily: 'Lato',
		fontWeight: 'bold',
		fontSize: 14,
		marginBottom: 10,
		textTransform: 'uppercase',
	},
});

const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;

Title.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Title;
