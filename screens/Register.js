import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
export default class Register extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			username:'',
			password:'',
			email:'',
			repassword:'',
			mensaje:'',
			background:'',
			visible_:false
		}
	}

	validarDatos(){
		const { username , password, email, repassword } = this.state;
		let rg_expr = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
		//alert('username => ' + username + ' - ' + password);
		if(username.trim().length == 0 && password.trim().length == 0 && email.trim().length == 0 && repassword.trim().length == 0){
			this.setState({mensaje:'Por favor complete todos los campos',background:styles.bgRed,visible_:true});
		}else if(!rg_expr.test(email.trim()) || email.length == 0){
			this.setState({mensaje:'Por favor complete todos el campo email y ingrese un correo',background:styles.bgRed,visible_:true});
		}else if(username.trim().length == 0){
			this.setState({mensaje:'Por favor complete el campo username',background:styles.bgRed,visible_:true});
		}else if(password.trim().length == 0){
			this.setState({mensaje:'Por favor complete el campo password',background:styles.bgRed,visible_:true});
		}else if((repassword.trim().length == 0 || repassword != password)){
			this.setState({mensaje:'Por favor complete el campo repetir-password y verifique que ambas contrasenias se han iguales',background:styles.bgRed,visible_:true});
		}else{
			fetch('https://e916d2b3.ngrok.io/prueba/registrar.php',
			  {
			  	method: 'post',
			    headers: {
			       'Accept': 'application/json, text/plain, */*',
			       'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({
			    	user:username,
			    	pass:password,
			    	repass:repassword,
			    	email:email
			    })
			  }
      		)
      		.then(response => response.text())
      		.then(respuesta => {
      			let res = respuesta.split('-');
      			
      			if(res[0] != "failed"){
      				this.setState({mensaje:'Datos insertados',background:styles.bgGreen,visible_:true});
					//this.props.navigation.navigate('Principal',{sesionid:res[1]});
      			}else{
      				this.setState({mensaje:'Ha ocurrido un error al intentar insertar los datos',background:styles.bgRed,visible_:true});
      			}
      		});
		}
	}


	render(){
		const { mensaje, background, visible_ } = this.state;
		return(
			<View style={styles.containerForm}>
				{visible_ ? <View style={[styles.msg,background,{top:10}]}><Text style={{color:'white'}}>{mensaje}</Text></View> : null}
				<View style={[styles.inputGroup,{marginTop:25}]}>
					<TextInput
						placeholder="USERNAME"
						style={styles.input}
						onChangeText={(text) =>  this.setState({username:text})}
					/>
				</View>
				<View style={styles.inputGroup}>
					<TextInput
						placeholder="EMAIL"
						style={styles.input}
						onChangeText={(text) =>  this.setState({email:text})}
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
					<TextInput
						placeholder="REPEAT PASSWORD"
						style={styles.input}
						onChangeText={(text) =>  this.setState({repassword:text})}
					/>
				</View>
				<View style={styles.inputGroup}>
					<TouchableOpacity style={styles.boton} onPress={() => this.validarDatos()}><Text style={{color:'white'}}>REGISTRARME</Text></TouchableOpacity>
				</View>
				<View style={styles.inputGroup}>
					<TouchableOpacity style={styles.botonOnlyBorder} onPress={() => this.props.navigation.navigate('Login')}><Text style={{color:'green'}}>INICIAR SESION</Text></TouchableOpacity>
				</View>
				
			</View>
		);
	}	
}



