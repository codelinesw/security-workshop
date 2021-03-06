<?php 

include 'Connection.php';
// Getting the received JSON into $Received_JSON variable.
$Received_JSON = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$request = json_decode($Received_JSON,true);


function cargarMensajes(){
	$conection = new Connection();
	$query = $conection->_prepare_('SELECT us.id,us.user, men.mensajes, men.fecha FROM mensajes men INNER JOIN users us ON us.id = men.users_id GROUP BY us.id ORDER BY men.fecha DESC');
	$query->execute();

	if($query){
		if($query->rowCount() > 0){
			echo  json_encode($query->fetchAll(PDO::FETCH_ASSOC));
		}else{
			echo "empty";
		}
	}
}

function guardarMensaje($user_id,$mensaje,$estado,$fecha){
	$conection = new Connection();
	$query = $conection->_prepare_('INSERT INTO mensajes VALUES(NULL,:user_id,:mensaje,:estado,:fecha)');
	$query->bindParam(':user_id',$user_id,PDO::PARAM_INT);
	$query->bindParam(':mensaje',$mensaje,PDO::PARAM_STR);
	$query->bindParam(':estado',$estado,PDO::PARAM_INT);
	$query->bindParam(':fecha',$fecha,PDO::PARAM_STR);
	$query->execute();

	if($query){
		if($query->rowCount() > 0){
			echo  json_encode($query->fetchAll(PDO::FETCH_ASSOC));
		}else{
			echo "empty";
		}
	}
}

function MensajesPorClientes($id){
	session_start();
	$conection = new Connection();
	$query = $conection->_prepare_("
		SELECT msg.mensajes_id,msg.users_id as userid, msg.mensajes,msg.estado,msg.fecha as fechamensaje,
		0 as respuesta_id,'' as mensaje_id, '' as users_id, '' as mensajeres, '' as fechares
		FROM mensajes msg WHERE users_id = :id
		UNION ALL
		SELECT res.mensaje_id as mensajes_id,0 as userid,'' as mensajes, '' as estado, '' as fechamensaje,
		res.respuesta_id,res.mensaje_id,res.users_id,res.mensaje as mensajeres,res.fecha 
		FROM respuestas res
		INNER JOIN mensajes msg ON msg.mensajes_id = res.mensaje_id
		WHERE res.users_id = :idadmin AND msg.users_id = :iduser
		ORDER BY mensajes_id
	");
	$idadmin = 0;
	if (isset($_SESSION['user']) && isset($_SESSION['rol_id'])) {
		if($_SESSION['rol_id'] == 1){
			$idadmin = $_SESSION['id'];
		}else{
			$idadmin = 1;
			$id = $_SESSION['id'];
		}
	}

	$query->bindParam(':id',$id,PDO::PARAM_INT);
	$query->bindParam(':idadmin',$idadmin,PDO::PARAM_INT);
	$query->bindParam(':iduser',$id,PDO::PARAM_INT);
	$query->execute();

	if($query){
		if($query->rowCount() > 0){
			echo  json_encode($query->fetchAll(PDO::FETCH_ASSOC));
		}else{
			//print_r($_SESSION);
			echo json_encode(array(array('data' => $id.$idadmin)));
		}
	}
}


function reponder($mensaje_id,$id,$respuesta,$fecha){
	$conection = new Connection();
	$query = $conection->_prepare_('INSERT INTO respuestas VALUES(NULL,:mensaje_id,:id,:respuesta,:fecha)');
	$query->bindParam(':mensaje_id',$mensaje_id,PDO::PARAM_INT);
	$query->bindParam(':id',$id,PDO::PARAM_INT);
	$query->bindParam(':respuesta',$respuesta,PDO::PARAM_STR);
	$query->bindParam(':fecha',$fecha,PDO::PARAM_STR);
	$query->execute();

	if($query){
		if($query->rowCount() > 0){
			echo  "success";
		}else{
			echo "failed";
		}
	}
}


$action = isset($request['action']) ? $request['action'] : '';
switch ($action) {
	case 'cargarmensajes':
		cargarMensajes();
		break;
	case 'cargarmensajesporcliente':
		$id = isset($request['id']) ? $request['id'] : '';
		MensajesPorClientes($id);
		break;
	case 'responder':
	    $mensaje_id = isset($request['mensaje_id']) ? $request['mensaje_id'] : '';
		$id = isset($request['id']) ? $request['id'] : '';
		$respuesta = isset($request['respuesta']) ? $request['respuesta'] : '';
		$fecha = date('Y-m-d h:i:s');
		reponder($mensaje_id,$id,$respuesta,$fecha);
		break;
	default:
		cargarMensajes();
		break;
}







 ?>