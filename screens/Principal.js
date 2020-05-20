import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Principal extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 sesion: JSON.stringify(this.props.navigation.getParam('sesionid','0'))
	  };
	}
	componentDidMount(){
		fetch('https://e916d2b3.ngrok.io/prueba/validarsesion.php',
			  {
			  	method: 'post',
			    headers: {
			       'Accept': 'application/json, text/plain, */*',
			       'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({sesion:this.state.sesion})
			  }
      	)
      	.then(response => response.text())
      	.then(respuesta => {
      		if(respuesta == "true"){
					
      		}else{      			
      			this.props.navigation.navigate('Login');
      		}
      	});
	}
	
	render(){
		return(
			<View>
				<Text>Bienvenido al sistema</Text>
			</View>
		);
	}	
}



