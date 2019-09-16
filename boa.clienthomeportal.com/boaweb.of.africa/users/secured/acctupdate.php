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

	if($trackNumber == '' || $ODate == '' || $OSArea == '' || $DSArea == '')
	{
		$error = "Error, Some Fields were left blank";
		echo $error;
	}
	else
	{
     $query = "INSERT INTO account(a_holder,a_type,transfer_status,a_number,a_zone,swift_code,routing_number,balance,activity,a_status,credit_in,date,current_bal,) VALUES('$Name','$aType','$tStatus','$aNumber','$aZone','$sCode','$rNumber','$bal','$act','$aStatus','$credit', now(),'$curBal')";
     queryMysql($query);
     echo "Data Successfully Updated On ".$date;
	 
	}
}








?>