<?php

    if(!file_exists(require_once('../bd/connection.php')))
        require_once('../bd/connection.php');

    $connection = connection();

    switch($_GET['controller'])
    {
        case 'contacts':
            switch($_SERVER['REQUEST_METHOD'])
            {
            case 'POST':
                $age=$_POST['age'];
                $email=$_POST['email'];
                $phone=$_POST['phone'];
                $obs=$_POST['obs'];

                $sql = "INSERT INTO tbl_contacts(age, email, phone, obs)
                VALUES (".$age.",'".$email."','".$phone."',".$obs.")";
                echo($sql);
                if(mysqli_query($connection, $sql))
                {
                    header('location:../index.html');
                    break;
                }                         
                else
                {
                    echo("erro");
                    break;
                }
            }
        break;
        case 'plan':
            switch($_SERVER['REQUEST_METHOD'])
            {
            case 'POST':
                $age=$_POST['age'];
                $email=$_POST['email'];
                $phone=$_POST['phone'];
                $plan=$_POST['plan'];

                $sql = "INSERT INTO tbl_contacts(age, email, phone, plan)
                VALUES (".$age.",'".$email."','".$phone."',".$plan.")";
                echo($sql);
                if(mysqli_query($connection, $sql))
                {
                    header('location:../index.html');
                    break;
                }                         
                else
                {
                    echo("erro");
                    break;
                }
            }
        break;       
    }

?>