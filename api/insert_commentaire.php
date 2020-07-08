<?php 
include 'config.php';
 
$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$recette_id = $obj['recette_id'];
$user_id = $obj['user_id'];

$query = "INSERT INTO commentaires(texte_commentaire, user_id; recette_id) 
values('$json[texte_commentaire]', '$user_id', '$recette_id')";

$query_result = $connect->query($query);

if ($query_result === true){
    $message = 'Success';
}else{
    $message = 'Error';
}

echo json_encode($message);

$connect->close();

