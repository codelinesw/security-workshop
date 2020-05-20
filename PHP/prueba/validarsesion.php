<?php 
session_start();
// Getting the received JSON into $Received_JSON variable.
$Received_JSON = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$request = json_decode($Received_JSON,true);


if(isset($_SESSION['id']) && isset($_SESSION['user'])){
	if(isset($request['sesion'])){
		
	}else{
		echo "false";
	}
}else{
	echo "false";
}


 ?>