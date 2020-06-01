import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Linking, Dimensions, TextInput, Keyboard, Image } from 'react-native';
import styles from '../styles/styles';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import { Entypo } from '@expo/vector-icons';
import img from './images/user.png';
import routes from '../rutas/rutas';
export default class Mensajes extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 sesion: JSON.stringify(this.props.navigation.getParam('sesionid','0')),
	  	 isfocus:false,
	  	 style:'',
	  	 text:'Hola, tengo problemas con mi red wi-fi, como lo soluciono',
	  	 mensajes:['']
	  };
	}

	componentDidMount(){
	  this.validarSesion();
	  this.CargarMensajes();
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
      		let res = respuesta.split('-');
      		if(res[0] == "true"){
				//this.setState({rol:res[1]});
      		}else{      			
      			this.props.navigation.navigate('Login');
      		}
      	});
	}

	CargarMensajes(){
		fetch(routes.baseurl.url+'/prueba/mensajes.php',
		  {
			  method: 'post',
			  headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			  }
			  
		   }
      	)
      	.then(response => response.json())
      	.then(respuesta => {
      		//alert(respuesta);
      		if(respuesta == "empty"){

      		}else{
      			this.setState({mensajes:respuesta});
      		}
      	});
	}

	componentWillUnmount() {
      //this.keyboardDidHideListener.remove()
    }


	
	render(){
		const { style, isfocus, text, mensajes }  = this.state;
		return(
			<View>
				<View style={{width:WIDTH,height:HEIGHT}}>
					<View style={{position:'relative',top:0,width:WIDTH,height:60,backgroundColor:'white',borderColor:'#eee',borderBottomWidth:1}}>
						<View style={styles.inputGroup}>
							<TextInput
								placeholder="Estas buscando algo...?"
								style={[styles.input,{width:(WIDTH-20),height:50,left:11,top:5,borderRadius:10,paddingLeft:15,borderColor:'transparent',backgroundColor:'#f2f2f2'}]}
								onChangeText={(text) =>  this.setState({email:text})}
								numberOfLines={10}
      							multiline={true}
      							onFocus={() => this.changeStyle()}
      							onBlur={ () => this.setStyle() }
							/>
						</View>
					</View>
					<View>
						{mensajes.map((data,index) => {
							if(data == "empty" || data == ""){

							}else{
								return(
									<View style={{flexDirection:'row',width:WIDTH,height:70,backgroundColor:'white',borderColor:'#f2f2f2',borderBottomWidth:2}} key={index+1}>
										<View style={{width:51,height:51,left:6,top:6}}>
											<Image
										       style={{width:51,height:51}}
										       source={img}
										    />
										</View>
										<View style={{position:'relative',flexDirection:'column'}}>
											<TouchableOpacity onPress={() => this.props.navigation.navigate('VerMensajes',{id:data.id})}><Text style={{position:'relative',left:15,fontWeight:'bold',marginTop:4}}>{data.user}</Text></TouchableOpacity>
											<Text style={{position:'relative',left:15,color:'#c3c3c3',width:(WIDTH-110)}}>{data.mensajes.substring(0,55)}</Text>
										</View>
									</View>
								);
							}
						})}
					</View>
				</View>
			</View>
		);
	}	
}



