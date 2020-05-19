import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
export default class Login extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			username:'',
			password:''
		}
	}

	validarDatos(){
		const { username , password } = this.state;
		//alert('username => ' + username + ' - ' + password);
		if(username.length == 0 && password.length == 0){
			alert('Por favor complete todos los campos');
		}else if(username.length == 0){
			alert('Por favor complete el campo username');
		}else if(password.length == 0){
			alert('Por favor complete el campo password');
		}else{
			fetch('https://b2a087a7.ngrok.io/prueba/login.php',
			  {
			  	method: 'post',
			    headers: {
			       'Accept': 'application/json, text/plain, */*',
			       'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({user:username,pass:password})
			  }
      		)
      		.then(response => response.text())
      		.then(respuesta => {
      			let res = respuesta.split('-');
      			
      			if(res[0] == "true"){
					this.props.navigation.navigate('Principal',{sesionid:res[1]});
      			}else{
      				alert('Datos incorrectos');
      			}
      		});
		}
	}


	render(){
		return(
			<View style={styles.containerForm}>
				<View style={[styles.inputGroup,{marginTop:25}]}>
					<TextInput
						placeholder="USERNAME"
						style={styles.input}
						onChangeText={(text) =>  this.setState({username:text})}
					/>
				</View>
				<View style={styles.inputGroup}>
					<TextInput
						placeholder="PASSWORD"
						style={styles.input}
						onChangeText={(text) =>  this.setState({password:text})}
					/>
				</View>
				<View style={styles.inputGroup}>
					<TouchableOpacity style={styles.boton} onPress={() => this.validarDatos()}><Text style={{color:'white'}}>INICIAR SESION</Text></TouchableOpacity>
				</View>
			</View>
		);
	}	
}



