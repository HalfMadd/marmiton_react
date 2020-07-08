<?php 
include 'config.php';
 
$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$id_recette = $obj['id_recette'];
 
$query = "SELECT * from commentaires where recette_id = '$recette_id'
INNER JOIN users ON users.id_user = commentaire.user_id";
 
$find = mysqli_fetch_array(mysqli_query($connect,$query));

$result = $connect->query($find);
 
if ($result->num_rows > 0) {
    while($row[] = $result->fetch_assoc()) {
        $item = $row;   
        $json = json_encode($item);
    }
}else{
    echo "Pas de commentaires";
}

echo $json;
$connect->close();
?>