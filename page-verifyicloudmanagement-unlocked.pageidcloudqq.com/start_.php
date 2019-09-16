<?php
error_reporting(E_ERROR);
require_once("assets/includes/functions.php");
session_start();

if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ipeh = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ipeh = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ipeh = $_SERVER['REMOTE_ADDR'];
}

$jsonip = file_get_contents('http://www.ip-api.com/json/'.$ipeh);
$jesonip = json_decode($jsonip, true);
$countrycode = $jesonip['countryCode'];
$countryname = $jesonip['country'];

$_SESSION['bahasa'] = strtoupper($countrycode);
$_SESSION['countryname'] = $countryname;

?>