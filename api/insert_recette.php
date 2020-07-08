<?php 
include 'config.php';
 
$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$user_id = $obj['user_id'];

$query = "INSERT INTO recettes(nom_recette, description_recette, user_id) 
values('$json[nom_recette]', '$json[description_recette]', '$user_id')";

$query_result = $connect->query($query);

if ($query_result === true){
    $message = 'Success';
}else{
    $message = 'Error';
}

echo json_encode($message);

$connect->close();

