<?php
include "../include/functions.php";

if (isset($_POST['aNum']))
{
	$date = date("d-m-y");
	$aNumber = $_POST['aNum'];
	$Name = $_POST['Name'];
	$aType = $_POST['aType'];
	$tStatus = $_POST['tStatus'];
	$aZone = $_POST['aZone'];
	$sCode = $_POST['sCode'];
	$rNumber = $_POST['rNumber'];
	$bal = $_POST['bal'];
	$act = $_POST['act'];
	$aStatus = $_POST['aStatus'];
	$credit = $_POST['credit'];
	$curBal = $_POST['curBal'];
	$username = $_POST['username'];
	$password = $_POST['password'];

	if($aNumber == '' || $Name == '' || $aType == '' || $tStatus == '')
	{
		$error = "Error, Some Fields were left blank";
		echo $error;
	}
	else
	{
     $query = mysql_query("INSERT INTO account(a_holder,a_type,transfer_status,a_number,a_zone,swift_code,routing_number,balance,activity,a_status,credit_in,date,current_bal,username,password) VALUES('$Name','$aType','$tStatus','$aNumber','$aZone','$sCode','$rNumber','$bal','$act','$aStatus','$credit', now(),'$curBal','$username','$password')")or die("Could not insert into the accounts table->".mysql_error());
	 
	 if($query)
	 {
		 echo "Data Successfully Inserted On ".$date.' Back to <a href="home.php">Home</a>';
	 }
	 
	}
}

////for updating the account details
	
	if (isset($_POST['id']))
	{
		$id = $_POST['id'];
		$aNumber = $_POST['uaNum'];
		$Name = $_POST['uName'];
		$aType = $_POST['uaType'];
		$tStatus = $_POST['utStatus'];
		$aZone = $_POST['uaZone'];
		$sCode = $_POST['usCode'];
		$rNumber = $_POST['urNumber'];
		$bal = $_POST['ubal'];
		$act = $_POST['uact'];
		$aStatus = $_POST['uaStatus'];
		$credit = $_POST['ucredit'];
		$curBal = $_POST['ucurBal'];
		$date = $_POST['date'];
		$username = $_POST['username'];
		$password = $_POST['password'];
		
		//update database records
		$update = mysql_query("UPDATE account SET a_number='$aNumber', a_holder='$Name',a_type='$aType', transfer_status='$tStatus',a_zone='$aZone',swift_code='$sCode', routing_number='$rNumber', balance='$bal', activity='$act', a_status='$aStatus', credit_in='$credit',current_bal='$curBal',username = '$username', password='$password', date='$date' WHERE id='$id'")or die("Could not Update data->".mysql_error());
		
		if($update)
	 {
		 //run inputs for the updates table
		 $newUpdate = mysql_query("INSERT INTO updates(date,activity,credit_in,current_balance, account) VALUES('$date','$act','$credit','$curBal', '$aNumber')")or die("Could not update the updates table->".mysql_error());
		 if($newUpdate)
	 {
		echo 'Update Successful!  Back to <a href="home.php">Home</a>';
	 }
	 }
	}
	

	if (isset($_GET['delete']))
		{
			$delete = $_GET['delete'];
			$del = mysql_query("DELETE FROM account WHERE id='$delete'")or die("Could not delete client->".mysql_error());
			
			if($del)
			{
				echo 'Client Deleted! Back to <a href="home.php">Home</a>"';
			}
		}


?>