import React from 'react';
import {  Platform , Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home'; 
import Login from '../screens/Login';
import Principal from '../screens/Principal'; 
import Register from '../screens/Register'; 
const WIDTH = Dimensions.get('window').width;


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


  },

);



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

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen:ConfigGlobal
    },

    Login: {
      screen:Login
    },

    Principal: {
      screen:Principal
    },

    Register: {
      screen:Register
    },
   
  }
);


//const AppContainer = createAppContainer(RootStack);
const AppContainer = createAppContainer(DrawerNavigator);
export default AppContainer;
