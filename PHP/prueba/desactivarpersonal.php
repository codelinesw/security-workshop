<?php 
include 'Connection.php';
// Getting the received JSON into $Received_JSON variable.
$Received_JSON = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$request = json_decode($Received_JSON,true);
session_start();
if(isset($_SESSION['user']) && isset($_SESSION['id'])){
	$conection = new Connection();
	$query = $conection->_prepare_('UPDATE users SET status=1 WHERE id=:usr');
	$query->bindParam(':usr',$_SESSION['id']);
	$query->execute();
	if($query){
			if($query->rowCount() > 0){
				echo "true";
			}else{
				echo "failed";
			}
	}
}

 ?>