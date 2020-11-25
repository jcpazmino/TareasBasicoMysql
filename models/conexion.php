<?php
class Conectar{

    public static function ConectarBD(){
        $pdo = new PDO('mysql:host=localhost;dbname=proyectos;charset=utf8', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);	
		$pdo->exec("set names utf8");
        return $pdo;
    }
}

?>