<?php
 require_once '../models/conexion.php';
 require_once '../models/dedicacion.php';
 $dedicacion = new Dedicacion; 

$operacion = "xxx";
extract($_POST);

switch ($operacion) {
	case 'selSemanas':
		$fechas = "";
		$resultado=$dedicacion->selSemanas();
		for($i=0; $i<count($resultado); $i++)
			$fechas .= $resultado[$i]->fecha.','; 
		echo($fechas);
	break;
	case 'selAdministradores':
		$administradores = "";
		$resultado=$dedicacion->selAdministradores();
		for($i=0; $i<count($resultado); $i++)
			$administradores .= $resultado[$i]->nombre.','; 
		echo($administradores);
	break;
	case 'selTareas':
		$tareas = "";
		$resultado=$dedicacion->selTareas();
		for($i=0; $i<count($resultado); $i++)
			$tareas .= $resultado[$i]->nombre.','; 
		echo($tareas);
	break;
	case 'selDedicacion':
		$dedicacionR = "";
		$resultado=$dedicacion->selDedicacion();
		echo json_encode($resultado);
	break;

	default:
		echo "Error de operación";
	break;
}	

?>