import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Linking, Dimensions } from 'react-native';
import styles from '../styles/styles';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default class CerrarSesion extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 sesion: JSON.stringify(this.props.navigation.getParam('sesionid','0')),
	  	 rol:'0'
	  };
	}
	
	componentDidMount(){
		fetch('https://8ae0bf925fa6.ngrok.io/prueba/cerrarsesion.php',
			  {
			  	method: 'post',
			    headers: {
			       'Accept': 'application/json, text/plain, */*',
			       'Content-Type': 'application/json'
			    }
			  }
      	)
      	.then(response => response.text())
      	.then(respuesta => {
      		//alert(respuesta);
      		if(respuesta == "true"){
				this.props.navigation.navigate('Login');
      		}else{      			
      			this.props.navigation.navigate('Login');
      		}
      	});
	}

	render(){
		const { rol } = this.state;
		return(
			<View style={{width:WIDTH,height:HEIGHT}}>
				<Text>Cerrando sesion...</Text>
			</View>
		);
	}	
}



