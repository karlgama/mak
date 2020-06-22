<?php
if(!file_exists(require_once('../bd/connection.php')))
        require_once('../bd/connection.php');
        
        
    $connection = connection();

    $age = $_GET['age'];
    $sql = "SELECT * FROM tbl_plans WHERE age_range='$age'";
    $select = (mysqli_query($connection, $sql));
    $rsSelect = mysqli_fetch_all($select);
    if($rsSelect == null){
        return var_dump($sql);
    }
    $array = array();
    $i=0;
    foreach($rsSelect as $plan) {
        $arr = array(
        "id" => $rsSelect[$i][0],
        "operator" => $rsSelect[$i][1],
        "refund" => $rsSelect[$i][2],
        "modality" => $rsSelect[$i][3],
        "age_range" => $rsSelect[$i][4],
        "price" => $rsSelect[$i][5],
        "name" => $rsSelect[$i][6]        
    );
    $i = $i+1;
    array_push($array, $arr);
 };

    
    $array = json_encode($array);  
    echo($array);
    return $array;

    