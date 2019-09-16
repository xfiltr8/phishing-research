<?php
include_once '../include/functions.php';

	if(isset($_POST['username']))
	{
		$username = $_POST['username'];
		$password = $_POST['password'];
		
		//get login info..............
		
		$sql = mysql_query("SELECT * FROM account WHERE username='$username' AND password='$password' LIMIT 1")or die("Could not get log in info->".mysql_error());
		$exist = mysql_num_rows($sql);
		if($exist == 1)
		{
			while($row = mysql_fetch_array($sql))
			{
				$id = $row['id'];
				$user = $row['username'];
				$pass = $row['password'];
				
				////set session variables here////////////////////////
				session_start();
				$_SESSION['user'] = $user;
   				$_SESSION['pass'] = $pass;
				$_SESSION['id'] = $id;
				
				///redirect to landing page//////////////////////////////////
				header("location:../secured/summary.php");
			}
		}
		else
		{
			echo 'The account info you provided does not match any record in our database!<br>Use the back button to return to the secure login page and sign in with your credentials!';
		}
		
	}

?>