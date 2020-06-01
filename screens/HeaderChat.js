import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Linking, Image } from 'react-native';
import styles from '../styles/styles';
import img from './images/user.png';
export default class HeaderChat extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 sesion: JSON.stringify(this.props.navigation.getParam('sesionid','0'))
	  };
	}
	
	render(){
		return(
			<View>
				<View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',width:315,height:50,left:0,background:'red'}}>
					<View style={{width:40,height:40}}>
						<Image
					       style={{width:40,height:40}}
					       source={img}
					    />
					</View>
					<Text style={{position:'relative',right:180}}>Jhon Murillo</Text>
				</View>
			</View>
		);
	}	
}



