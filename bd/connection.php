<?php 
    function connection()
    {
        $host = "127.0.0.1";
        $user = "adm_maktub";
        $password = "maktub123";
        $dataBase = "db_maktub";
    
        $connection = mysqli_connect($host, $user, $password, $dataBase);
       
        return $connection;
    }

?>