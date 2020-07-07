<?php
 
 include 'config.php';
  
$json = file_get_contents('php://input');

$obj = json_decode($json,true);
  
$id_recette = $obj['id_recette'];

$query = "SELECT * FROM recettes WHERE id_recette='$id_recette'";

$result = $con->query($query);
 
if ($result->num_rows >0) {
    while($row[] = $result->fetch_assoc()) {
        $recette = $row;
        $json = json_encode($recette);
    }
}else{  
    echo "Aucune recette trouvée";
}

echo $json;

$connect->close();
?>
