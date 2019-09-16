<?php
	//$_SERVER['REMOTE_ADDR'] = "123.51.137.48";
	$url = 'http://www.geoplugin.net/json.gp?ip='.$_SERVER['REMOTE_ADDR'];
	function look_country($url) {
		$set_curl = curl_init();
		curl_setopt($set_curl, CURLOPT_URL, $url);
		curl_setopt($set_curl, CURLOPT_RETURNTRANSFER, 1);
		$exp = curl_exec($set_curl);
		curl_close($set_curl);
		return $exp;
	}
	$result = look_country($url);
	$getJson = json_decode($result);
	//echo $getJson->{'country_name'};
	
	//Set country session..
	$_SESSION['cntr'] = $getJson->{'geoplugin_countryName'};
	
	//Use script below to test script..
	//$_SESSION['country'] = "Japan";
?>