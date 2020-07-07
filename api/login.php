<?php 
include 'config.php';
 
$json = file_get_contents('php://input');

$obj = json_decode($json,true);
 
$pseudo = $obj['pseudo'];
 
$query = "SELECT * from users where pseudo = '$pseudo";
 
$check = mysqli_fetch_array(mysqli_query($connect,$query));
 
 
if(isset($check)){

    $Success = 'Connexion en cours';
    $SuccessJson = json_encode($Success);
    echo $SuccessJson ; 
 
}else{
 
    $Invalide = 'Pseudo invalide' ;
    $InvalideJSon = json_encode($Invalide);
    echo $InvalideJSon ;
    
}

$connect->close();

?>