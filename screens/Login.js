import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import routes from '../rutas/rutas';
export default class Login extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			username:'',
			password:'',
			mensaje:'',
			background:'',
			visible_:false,
			active:false
		}
	}

	componentDidMount(){
		this.validarSesion();
	}

	validarSesion(){
		fetch(routes.baseurl.url+'/prueba/validarsesion.php',
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
      		//alert(respuesta);
      		let res = respuesta.split('-');
      		if(res[0] == "true"){
				//this.setState({rol:res[1]});
				this.setState({active:true});      			
      			this.props.navigation.navigate('Principal');
      		}
      	});
	}


	validarDatos(){
		const { username , password } = this.state;
		//alert('username => ' + username + ' - ' + password);
		if(username.length == 0 && password.length == 0){
			this.setState({mensaje:'Por favor complete todos los campos',background:styles.bgRed,visible_:true});
		}else if(username.length == 0){
			this.setState({mensaje:'Por favor complete el campo username',background:styles.bgRed,visible_:true});
		}else if(password.length == 0){
			this.setState({mensaje:'Por favor complete el campo password',background:styles.bgRed,visible_:true});
		}else{
			fetch(routes.baseurl.url+'/prueba/login.php',
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
      				this.setState({mensaje:'',background:'',visible_:false});
					this.props.navigation.navigate('Principal',{sesionid:res[1]});
      			}else{
      				this.setState({mensaje:'Datos incorrectos',background:styles.bgRed,visible_:true});
      			}
      		});
		}
	}


	render(){
		const { mensaje, background, visible_,active } = this.state;
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
					    secureTextEntry={true}
						password={true}
						placeholder="PASSWORD"
						style={styles.input}
						onChangeText={(text) =>  this.setState({password:text})}
					/>
				</View>
				<View style={styles.inputGroup}>
					<TouchableOpacity style={styles.boton} onPress={() => this.validarDatos()}><Text style={{color:'white'}}>INICIAR SESION</Text></TouchableOpacity>
				</View>
				<View style={styles.inputGroup}>
					<TouchableOpacity style={styles.botonOnlyBorder} onPress={() => this.props.navigation.navigate('Register')}><Text style={{color:'green'}}>REGISTRARME</Text></TouchableOpacity>
				</View>
			</View>
		);
	}	
}



