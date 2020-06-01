import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Linking, Dimensions } from 'react-native';
import styles from '../styles/styles';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import routes from '../rutas/rutas';
export default class Principal extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 sesion: JSON.stringify(this.props.navigation.getParam('sesionid','0')),
	  	 rol:'0'
	  };
	}
	
	componentDidMount(){
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
      		let res = respuesta.split('-');
      		if(res[0] == "true"){
				this.setState({rol:res[1]});
      		}else{      			
      			this.props.navigation.navigate('Login');
      		}
      	});
	}

	dialCall = (number) => {
	    let phoneNumber = '';
	    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
	    else {phoneNumber = `telprompt:${number}`; }
	    Linking.openURL(phoneNumber);
 	};

 	activarPersonal(){
 		fetch(routes.baseurl.url+'/prueba/activarpersonal.php',
		  {
			  method: 'post',
			  headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			  },
			  
		   }
      	)
      	.then(response => response.text())
      	.then(respuesta => {
      		//alert(respuesta);
      		if(respuesta == "failed"){
      			alert("No se pudo activar el personal");
      		}else{
      			alert("Se activo el personal correctamente");
      		}
      	});
 	}

 	desactivarPersonal(){
 		fetch(routes.baseurl.url+'/prueba/desactivarpersonal.php',
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
      		if(respuesta == "failed"){
      			alert("No se pudo desactivar el personal");
      		}else{
      			alert("Se desactivo el personal correctamente");
      		}
      	});
 	}
	
	render(){
		const { rol } = this.state;
		return(
			<View style={{width:WIDTH,height:HEIGHT}}>
				<View>
					<View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:25}}>
						<View style={styles.inputGroup}>
							<TouchableOpacity style={styles.botonOnlyBorder} onPress={() => this.dialCall(123)}><Text style={{color:'green'}}>LLAMADA DE EMERGENCIA</Text></TouchableOpacity>
						</View>
						<View style={styles.inputGroup}>
						<TouchableOpacity style={styles.botonOnlyBorder} onPress={() => this.dialCall(119)}><Text style={{color:'green'}}>REPORTAR INCENDIO</Text></TouchableOpacity>	
						</View>
					</View>
					<View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
						<View style={styles.inputGroup}>
							<TouchableOpacity style={styles.botonOnlyBorder} onPress={() => this.dialCall(123)}><Text style={{color:'green'}}>ASISTENCIA MEDICA</Text></TouchableOpacity>
						</View>
						<View style={styles.inputGroup}>
							<TouchableOpacity style={styles.botonOnlyBorder} onPress={() => this.dialCall(3214920029)}><Text style={{color:'green'}}>ASISTENCIA TECNICA</Text></TouchableOpacity>	
						</View>
					</View>
				</View>
				<View>
					{rol == 3 ? <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:165}}>
						<View style={[styles.inputGroup,{marginRight:15}]}>
							<TouchableOpacity style={[styles.boton,{width:150}]} onPress={() => this.activarPersonal()}><Text style={{color:'white'}}>ACTIVAR TURNO</Text></TouchableOpacity>
						</View>
						<View style={styles.inputGroup}>
						<TouchableOpacity style={[styles.botonOnlyBorder,{width:160}]} onPress={() => this.desactivarPersonal(119)}><Text style={{color:'green'}}>DESACTIVAR TURNO</Text></TouchableOpacity>	
						</View>
					</View> : null}
				</View>
			</View>
		);
	}	
}



