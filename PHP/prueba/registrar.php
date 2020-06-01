<?php 


include 'Connection.php';
// Getting the received JSON into $Received_JSON variable.
$Received_JSON = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$request = json_decode($Received_JSON,true);

$user = $request['user'];
$pass = $request['pass'];
$repass = $request['repass'];
$email = $request['email'];
$telefono = $request['telefono'];


if(empty($user) && empty($pass) && empty($email) && empty($repass)){
	echo "false";
}else if(empty($user)){
	echo "false";
}else if(empty($email)){
	echo "false";
}else if(empty($telefono)){
	echo "false";
}else if(empty($repass) && $pass != $repass){
	echo "false";
}else if(empty($pass)){
	echo "false";
}else{
	$status = 1;
	$rol = 2;
	$conection = new Connection();
	$date = date('Y-m-d h:i:s');
	$query = $conection->_prepare_('INSERT INTO users VALUES(NULL,:email,:tel,:usr,:pass,:status,:rol,:creacion,:actualizacion)');
	$query->bindParam(':email',$email);
	$query->bindParam(':tel',$telefono);
	$query->bindParam(':usr',$user);
	$query->bindParam(':pass',$pass);
	$query->bindParam(':status',$status);
	$query->bindParam(':rol',$rol);
	$query->bindParam(':creacion',$date);
	$query->bindParam(':actualizacion',$date);
	$query->execute();

	if($query){
		if($query->rowCount() > 0){
			echo "success";
		}else{
			echo "failed";
		}
	}
}




 ?>