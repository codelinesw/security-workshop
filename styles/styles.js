import { StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
  	width: (WIDTH-50),
  	height:45,
  	padding:5,
  	borderWidth:2,
  	borderColor:'green',
    paddingLeft:10
  },
  containerForm: {
  	width:WIDTH,
  	flexDirection:'column',
  	justifyContent:'center',
  	alignItems:'center'
  },

  inputGroup: {
  	marginBottom:15
  },

  boton: {
  	width: (WIDTH-50),
  	height:55,
  	padding:5,
  	backgroundColor:'green',
  	borderRadius:6,
  	flexDirection:'row',
  	justifyContent:'center',
  	alignItems:'center'
  },

  botonOnlyBorder: {
    width: (WIDTH-50),
    height:55,
    padding:5,
    backgroundColor:'transparent',
    borderRadius:6,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderColor:'green',
    borderWidth:2
  },

  msg:{
     width: (WIDTH-50),
     padding:15,
  },

  bgGreen:{
    backgroundColor:'green'
  },

  bgRed: {
     backgroundColor:'red'
  }
});

export default  styles;