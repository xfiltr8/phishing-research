<?php
error_reporting(0);
$user_agent  = $_SERVER['HTTP_USER_AGENT'];
$ip = $_SERVER['REMOTE_ADDR'];$GLOBALS_LOCATION=$GLOBAL.'l';
$details = json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=".$ip.""));
$negara = $details->geoplugin_countryCode;
$nama_negara = $details->geoplugin_countryName;
$kode_negara = strtolower($negara);
$kota        = $details->geoplugin_city;
$state        = $details->geoplugin_region;
?>
