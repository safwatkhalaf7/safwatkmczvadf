<?php

$host='localhost';
$username='root';
$password='';
$dbname='login';
$m=new mysqli($host,$username,$password,$dbname);
$m->set_charset('utf8');

$username=$_POST['username'];
$password=$_POST['password'];
$wtel=$_POST['wtel'];
$wmel=$_POST['wmel'];
$S="INSERT INTO loginuser (username,password,wtel,wmel)VALUES('$username','$password','$wtel','$wmel')";

$r=$m->query($S);

header('location:http://localhost/login1/index.html');
?>