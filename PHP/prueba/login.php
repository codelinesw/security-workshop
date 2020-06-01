<?php 
include 'Connection.php';
// Getting the received JSON into $Received_JSON variable.
$Received_JSON = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$request = json_decode($Received_JSON,true);

$user = $request['user'];
$pass = $request['pass'];


if(empty($user) && empty($pass)){

}else if(empty($user)){
	
}else if(empty($pass)){
	
}else{
	$conection = new Connection();
	$query = $conection->_prepare_('SELECT * FROM users WHERE user=:usr AND pass=:pass');
	$query->bindParam(':usr',$user);
	$query->bindParam(':pass',$pass);
	$query->execute();

	if($query){
		if($query->rowCount() > 0){
			session_start();
			while($row = $query->fetch()){
				$_SESSION['id'] = $row['id'];
			    $_SESSION['user'] = $row['user'];
			    $_SESSION['rol_id'] = $row['rol_id'];
			}
			echo "true";
			
		}else{
			echo "false";
		}
	}
}


 ?>