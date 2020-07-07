<?php

include 'config.php';

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$query = "INSERT INTO users(pseudo, role_id) values('$json[pseudo]', '$json[role_id]')";

$query_result = $connect->query($query);

if ($query_result === true){
    $message = 'Success';
}else{
    $message = 'Error';
}

echo json_encode($message);

$connect->close();