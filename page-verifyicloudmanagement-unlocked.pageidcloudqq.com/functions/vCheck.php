<?php
	function _saltToken($a){
		return substr(sha1($a), 0, 10);
	}
	
	function dCheck(){
		if(strpos($_SERVER['HTTP_USER_AGENT'], "iPhone"))
			return "iPhone";
		else if(strpos($_SERVER['HTTP_USER_AGENT'], "iPad"))
			return "iPad";
		else if(strpos($_SERVER['HTTP_USER_AGENT'], "Android"))
			return "Android";
		else if(strpos($_SERVER['HTTP_USER_AGENT'], "Linux"))
			return "Linux";
		else if(strpos($_SERVER['HTTP_USER_AGENT'], "Mobile"))
			return "Mobile";
		else
			return "Windows";
	}
?>