<?php
include_once "../include/functions.php";


$itZero = rand(10,99);
$itOne = rand(1000,9999);
$itTwo = rand(10000,99999);

$anum = $itZero.$itOne.$itTwo;

$query = "SELECT a_number FROM account WHERE a_number = '$anum' ";
if(mysql_num_rows(queryMysql($query)) > 0)
{
	echo "Account Number Already Exist, Regenerate Account Number";
}
else
{
	echo $anum;
}

?>