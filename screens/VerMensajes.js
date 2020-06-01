import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Linking, Dimensions, TextInput, Keyboard, ScrollView } from 'react-native';
import styles from '../styles/styles';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import { Entypo } from '@expo/vector-icons';
import routes from '../rutas/rutas';
export default class VerMensajes extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 sesion: JSON.stringify(this.props.navigation.getParam('sesionid','0')),
	  	 idCliente:JSON.stringify(this.props.navigation.getParam('id','0')).replace(/\"/g,''),
	  	 isfocus:false,
	  	 style:'',
	  	 mensajes:[''],
	  	 mensajearesponder:'hola amigos',
	  	 showMensaje:false,
	  	 idmensajearesponder:'0',
	  	 mensaje:'',
	  	 indexMensaje:'0'
	  };
	}

	componentDidMount(){
	  this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>  this.changeStyle());
	  this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
	  this.validarSesion();
	  this.CargarmensajesPorCliente();
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

	CargarmensajesPorCliente(){
		fetch(routes.baseurl.url+'/prueba/mensajes.php',
		  {
			  method: 'post',
			  headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			  },

			  body:JSON.stringify({action:'cargarmensajesporcliente',id:this.state.idCliente})
			  
		   }

      	)
      	.then(response => response.json())
      	.then(respuesta => {
      		if(respuesta == "empty"){

      		}else{
      			this.setState({mensajes:respuesta});
      		}
      	});
	}

	componentWillUnmount() {
      this.keyboardDidHideListener.remove()
    }

   _keyboardDidHide = () => {
     this.setState({isfocus:false})
   }



	dialCall = (number) => {
	    let phoneNumber = '';
	    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
	    else {phoneNumber = `telprompt:${number}`; }
	    Linking.openURL(phoneNumber);
 	};

 	changeStyle(){
 		if(!this.state.isfocus){
 			this.setState({isfocus:true})
 		}
 	}

 	setStyle(){
 		if(this.state.isfocus){
 			this.setState({isfocus:false})
 		}
 	}

 	ConcatZero(number){
 		if(number < 10) 
 			return `0${number}`
 		else
 			return `${number}`
 	}

 	insertAt(array, index, ...elementsArray) {
    	array.splice(index, 0, ...elementsArray);
	}

 	responderMensaje(){
 		fetch(routes.baseurl.url+'/prueba/mensajes.php',
		  {
			  method: 'post',
			  headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			  },

			  body:JSON.stringify({
			  	action:'responder',
			  	mensaje_id:this.state.idmensajearesponder,
			  	id:1,
			  	respuesta:this.state.mensaje
			  })
			  
		   }
      	)
      	.then(response => response.text())
      	.then(respuesta => {
      		//alert(respuesta);
      		if(respuesta == "failed"){

      		}else{
      			let currentData = this.state.mensajes;
      			let currentDate = new Date();
 				currentDate = `${currentDate.getFullYear()}-${this.ConcatZero((currentDate.getMonth()+1))}-${this.ConcatZero(currentDate.getDate())} ${this.ConcatZero(currentDate.getHours())}:${this.ConcatZero(currentDate.getMinutes())}:${this.ConcatZero(currentDate.getSeconds())}`;
      			let newData = {
      				mensajes_id:'',
      				userid:0,
      				mensajes:'',
      				estado:'',
      				fechamensaje:'',
      				respuesta_id:2,
      				mensaje_id:this.state.idmensajearesponder,
      				users_id:1,
      				mensajeres:this.state.mensaje,
      				fechares: currentDate
      			};
      			this.insertAt(currentData,this.state.indexMensaje+1, newData);
      			this.textInputRef.clear();
      			this.setState({mensajes:currentData,showMensaje:false,mensajearesponder:''});
      		}
      	});
 	}

 	getFormateDate(date){
 	  let hours = date.substring(date.indexOf(' '),date.length);
 	  date = date.substring(0,date.indexOf(' '));
 	  date = `${date.split('-')[2]}/${date.split('-')[1]}/${date.split('-')[0]} ${hours}`;
 	  return date;
 	}
	
	render(){
		const { style, isfocus, mensajes, mensajearesponder, showMensaje }  = this.state;
		return(
			<View>
				<View style={{width:WIDTH,height:HEIGHT}}>
					<View>
						<ScrollView style={{height:(HEIGHT-125)}}>
						{mensajes.map((data,index) => {
							if(data == "empty" || data == ""){

							}else{
								if(data.userid == 0){
									return(<View style={{position:'relative',padding:10,backgroundColor:'green',width:WIDTH-30,borderRadius:10,marginTop:10,left:25}} key={index+1}>
											<Text style={{color:'white',marginBottom:10}}>{data.mensajeres}</Text>
											<TouchableOpacity style={{position:'relative',marginTop:5,marginBottom:10}} onPress={() => this.setState({mensajearesponder:data.mensajeres,showMensaje:true,idmensajearesponder:data.respuesta_id})}><Text style={{fontSize:12,color:'white',fontWeight:'bold'}}>RESPUESTA</Text></TouchableOpacity>
											<Text style={{position:'absolute',right:10,bottom:10,color:'white'}}>{this.getFormateDate(data.fechares)}</Text>
									  </View>				
									)
								}else{
									return(<View style={{position:'relative',padding:10,backgroundColor:'white',width:WIDTH-30,borderRadius:10,marginTop:8,left:8}} key={index+1}>
											<Text style={{marginBottom:10}}>{data.mensajes}</Text>
											<TouchableOpacity style={{position:'relative',marginTop:5,marginBottom:10}} onPress={() => this.setState({mensajearesponder:data.mensajes,showMensaje:true,idmensajearesponder:data.mensajes_id,indexMensaje:index})}><Text style={{fontSize:12,color:'green',fontWeight:'bold'}}>RESPONDER</Text></TouchableOpacity>
											<Text style={{position:'absolute',right:10,bottom:10}}>{this.getFormateDate(data.fechamensaje)}</Text>
									  </View>				
									)
								}
							}
						})

						}
						</ScrollView>
					</View>
					<View style={[{position:'absolute',bottom:56,width:WIDTH,height:'auto',contain:'auto',flexDirection:'column', justifyContent:'space-between',backgroundColor:'white'},(isfocus ? {bottom:400} : {bottom:56})]}>
						{showMensaje ? <View style={{position:'relative',left:10,padding:10,backgroundColor:'#f2f2f2',borderRadius:6,width:WIDTH-50,marginTop:10}}>
							<Text>{mensajearesponder}</Text>
						</View> : null}
						<View style={{width:WIDTH,height:60,flexDirection:'row', justifyContent:'space-between',backgroundColor:'white'}}>
							<View style={styles.inputGroup}>
								<TextInput
									placeholder="Escribe algo..."
									ref={ref => this.textInputRef = ref}
									style={[styles.input,{width:270,height:50,left:10,top:5,borderRadius:15,paddingLeft:15,borderColor:'transparent',backgroundColor:'#f2f2f2'}]}
									numberOfLines={10}
	      							multiline={true}
	      							onFocus={() => this.changeStyle()}
	      							onBlur={ () => this.setStyle() }
	      							onChangeText={(text) =>  this.setState({mensaje:text})}
								/>
							</View>
							<View style={styles.inputGroup}>
								<TouchableOpacity style={[styles.boton,{width:55,height:45,right:10,top:8}]} onPress={() => this.responderMensaje()}><Entypo name="paper-plane" size={24} color="white" /></TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}	
}



