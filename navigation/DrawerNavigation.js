import React from 'react';
import {  Platform , Dimensions, TouchableOpacity, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home'; 
import Login from '../screens/Login';
import Principal from '../screens/Principal'; 
import Register from '../screens/Register'; 
import VerMensajes from '../screens/VerMensajes';
import Mensajes from '../screens/Mensajes';
import HeaderChat from '../screens/HeaderChat';
import ArrowLeft from '../screens/ArrowLeft';
import Contactos from '../screens/Contactos';
import PersonalActivo from '../screens/PersonalActivo';
import CerrarSesion from '../screens/CerrarSesion';
const WIDTH = Dimensions.get('window').width;
import routes from '../rutas/rutas';

const ConfigGlobal = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
          title:'Inicio'
      })
    },

    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
          title:'Inicio de Sesion'
      })
    },
    Register: {
      screen: Register,
      navigationOptions: ({navigation}) => ({
          title:'Registrate'
      })
    },

    Principal: {
      screen: Principal,
      navigationOptions: ({navigation}) => ({
          title:'Principal'
      })
    },

    Contactos: {
      screen: Contactos,
      navigationOptions: ({navigation}) => ({
          title:'Contactos'
      })
    },

    PersonalActivo: {
      screen: PersonalActivo,
      navigationOptions: ({navigation}) => ({
          title:'Personal Activo'
      })
    },

    Mensajes: {
      screen: Mensajes,
      navigationOptions: ({navigation}) => ({
          title:'Mensajes'
      })
    },

    VerMensajes: {
      screen: VerMensajes,
      navigationOptions: ({navigation}) => ({
          title:'',
          headerRight: () => <HeaderChat navigation={navigation} />,
          headerLeft: () => <ArrowLeft navigation={navigation} />
      })
    },


  },{
  initialRouteName:'Login',
  headerMode:'screen',
  navigationOptions:{
     title:'Inicio de Sesion'
  }
  });



// const DrawerConfig = {
//   drawerWidth: WIDTH*0.83,
//   contentComponent: ({ navigation }) => {
//     return(<MenuOptions navigation={navigation}/>)
//   },
//   contentOptions: {
//     labelStyle:{
//       fontFamily:'Poppins',
//     }
//   },
// }
// 
// 
const CerrarSesion_ = (props) => {
  fetch(routes.baseurl.url+'/prueba/cerrarsesion.php',
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
        props.navigation.navigate('Login');
      }else{            
        props.navigation.navigate('Login');
      }
  });
  
}
const DrawerWithLogoutButton = (props) => (
    <View>
      <View style={{position:'relative',width:150,height:40}}>
          <TouchableOpacity
          style={{position:'relative',left:10,top:100}}
          onPress={() => props.navigation.navigate('Login') }
          >
          <Text style={{fontSize:17}}>Iniciar Sesion</Text>
           </TouchableOpacity>
      </View>
      <View style={{position:'relative',width:150,height:40}}>
          <TouchableOpacity
          style={{position:'relative',left:10,top:100}}
          onPress={() => props.navigation.navigate('Register') }
          >
          <Text style={{fontSize:17}}>Registrarse</Text>
           </TouchableOpacity>
      </View>
      <View style={{position:'relative',width:150,height:40}}>
          <TouchableOpacity
          style={{position:'relative',left:10,top:100}}
          onPress={() => props.navigation.navigate('Principal') }
          >
          <Text style={{fontSize:17}}>Principal</Text>
           </TouchableOpacity>
      </View>
      <View style={{position:'relative',width:150,height:40}}>
          <TouchableOpacity
          style={{position:'relative',left:10,top:100}}
          onPress={() => props.navigation.navigate('Mensajes') }
          >
          <Text style={{fontSize:17}}>Mensajes</Text>
           </TouchableOpacity>
      </View>
      <View style={{position:'relative',width:150,height:40}}>
          <TouchableOpacity
          style={{position:'relative',left:10,top:100}}
          onPress={() => props.navigation.navigate('Contactos') }
          >
          <Text style={{fontSize:17}}>Contactos</Text>
           </TouchableOpacity>
      </View>
      <View style={{position:'relative',width:150,height:40}}>
          <TouchableOpacity
          style={{position:'relative',left:10,top:100}}
          onPress={() => props.navigation.navigate('PersonalActivo') }
          >
          <Text style={{fontSize:17}}>Personal Activo</Text>
           </TouchableOpacity>
      </View>
      <View style={{position:'relative',width:150,height:40}}>
          <TouchableOpacity
          style={{position:'relative',left:10,top:100}}
          onPress={() => CerrarSesion_(props) }
          >
          <Text style={{fontSize:17}}>Cerrar Sesion</Text>
           </TouchableOpacity>
      </View>
    </View>
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen:ConfigGlobal
    },


    Registrarse: {
      screen:Register
    },

    Principal: {
      screen:Principal
    },
    Contactos: {
      screen:Contactos
    },

    Mensajes: {
      screen:Mensajes
    },

    PersonalActivo: {
      screen: PersonalActivo
    },

    CerrarSesion: {
      screen: CerrarSesion,
      navigationOptions:{
       title:'Cerrar Sesion'
      }
    }
   
  },
  {
  // other settings
  contentComponent: DrawerWithLogoutButton,
  }
);


//const AppContainer = createAppContainer(RootStack);
const AppContainer = createAppContainer(DrawerNavigator);
export default AppContainer;
