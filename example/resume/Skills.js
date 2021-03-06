import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import Title from './Title';
import List, { Item } from './List';

const styles = StyleSheet.create({
	title: {
		fontFamily: 'Lato',
		fontWeight: 'bold',
		fontSize: 11,
		marginBottom: 10,
	},
	skills: {
		fontFamily: 'Lato',
		fontSize: 10,
		marginBottom: 10,
	},
});

const SkillEntry = ({ name, skills }) => (
	<View>
		<Text style={styles.title}>{name}</Text>
		<List>
			{skills.map((skill, i) => (
				<Item key={i}>{skill}</Item>
			))}
		</List>
	</View>
);

const Skills = () => (
	<View>
		<Title>Skills</Title>
		<SkillEntry
			name="Combat Abilities"
			skills={[
				'Completed Jedi Master training and built a lightsaber from scratch in order to do battle against the Empire',
				'Defeated the Rancor and rescued Princess Leia from Jabba the Hutt',
				'Competent fighter pilot as well as an excelent shot with nearly any weapon',
			]}
		/>
	</View>
);

SkillEntry.propTypes = {
	name: PropTypes.string.isRequired,
	skills: PropTypes.arrayOf([PropTypes.string.isRequired]).isRequired,
};

export default Skills;
