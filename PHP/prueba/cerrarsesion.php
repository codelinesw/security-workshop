<?php 

session_start();

if(isset($_SESSION['user']) && isset($_SESSION['id'])){
	session_destroy();
	echo "true";
}else{
	echo "false";
}


 ?>