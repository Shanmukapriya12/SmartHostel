<?php

$host = "127.0.0.1";

$username = "root";

$password = "";

$database = "smart_hostel";

/* Database Connection */

$conn = mysqli_connect($host,$username,$password,$database);

/* Check Connection */

if(!$conn){

    die("Connection Failed");

}

?>