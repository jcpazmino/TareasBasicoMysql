<?php
class Dedicacion  extends Conectar{ 
	private $consulta;
	
	public function __CONSTRUCT(){
		$this->pdo = Conectar::ConectarBD();    
	} 
//********seleccionar las distintas semanas que hay en proyectos 
	public function selSemanas(){
		$this->consulta="SELECT DISTINCT fecha
							FROM proyectos
							ORDER BY fecha DESC";
		$stm = $this->pdo ->prepare($this->consulta);			          
		$stm->execute();
		return $stm->fetchAll(PDO::FETCH_OBJ);
	}   

//********seleccionar los administradores
	public function selAdministradores(){
		$this->consulta="SELECT nombre
							FROM administradores
							ORDER BY nombre";
		$stm = $this->pdo ->prepare($this->consulta);			          
		$stm->execute();
		return $stm->fetchAll(PDO::FETCH_OBJ);
	}  

//********seleccionar las tareas
	public function selTareas(){
		$this->consulta="SELECT nombre 
							FROM tareas 
							ORDER BY nombre";
		$stm = $this->pdo ->prepare($this->consulta);			          
		$stm->execute();
		return $stm->fetchAll(PDO::FETCH_OBJ);
	} 

//********seleccionar las horas de dedicacion para cada manager  y cada tarea
	public function selDedicacion(){
		$this->consulta="SELECT fecha, administrador_id admin, tarea_id tarea, sum(dedicacion) dedicacion
							FROM proyectos
							GROUP BY fecha, administrador_id, tarea_id
							ORDER BY fecha, administrador_id, tarea_id DESC";
		$stm = $this->pdo ->prepare($this->consulta);			          
		$stm->execute();
		return $stm->fetchAll(PDO::FETCH_OBJ);
	} 

}//fin de la clase