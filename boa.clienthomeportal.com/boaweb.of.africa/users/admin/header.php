<?php

include_once "../include/functions.php";
session_start();

if (isset($_SESSION['user']))
{
	$user = $_SESSION['user'];
	$loggedIn = TRUE;
}
else
{
	$loggedIn = false;
}	

if(!($loggedIn))
{
	echo "<meta http-equiv='refresh' content='0; url = index.php'>";
}

$pgtitle = "Admin Zone";

?>

<!DOCTYPE html>

<html>
<head>
<link rel="shortcut icon" type="image/x-icon" href="../Images/favicon.ico">


<script type="text/javascript" src="../js/jquery/jquery-2.1.1.min.js"> </script>
<script type="text/javascript" src="../js/jquery/myApp.js" > </script>
<script type="text/javascript" src="../js/jquery/myAppSecond.js"> </script> 

<header>

<div class="header">
<p> BOA::: Admin Page   </p>
<a href="logout.php" /> <img src="../images/Button-Log-copy.png" /> </a>
<ul>
<li>
<a href="home.php" />Home </a>
</li>

<li>
<a href="generate.php" />Generate </a>
</li>

</ul>
  
</div>
</header>