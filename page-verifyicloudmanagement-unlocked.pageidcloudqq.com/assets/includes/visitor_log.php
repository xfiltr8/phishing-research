<?php

date_default_timezone_set('Europe/London');
$v_ip = $_SERVER['REMOTE_ADDR'];
$v_date = date("l d F H:i:s");
$v_agent = $_SERVER['HTTP_USER_AGENT'];

$fp = fopen("assets/logs/ips.txt", "a");
fputs($fp, "IP: $v_ip - DATE: $v_date - BROWSER: $v_agent\r\n");
fclose($fp);
  $file2 = $_SERVER['DOCUMENT_ROOT']."/assets/logs/._click_.txt";
    $isi  = @file_get_contents($file2);
    $buka = fopen($file2,"w"); 
    fwrite($buka, $isi+1);
    fclose($buka);
?>