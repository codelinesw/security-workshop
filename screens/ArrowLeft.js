import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Linking, Image } from 'react-native';
import styles from '../styles/styles';
import { AntDesign } from '@expo/vector-icons'; 
export default class ArrowLeft extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 sesion: JSON.stringify(this.props.navigation.getParam('sesionid','0'))
	  };
	}
	
	render(){
		return(
			<TouchableOpacity style={{position:'relative',left:10}} onPress={() => this.props.navigation.goBack()}>
				<AntDesign name="arrowleft" size={24} color="black" />
			</TouchableOpacity>
		);
	}	
}



