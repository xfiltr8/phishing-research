<?php
	function _handleFile($name, $data, $type){
		$h = fopen($name, $type);
		$r = fwrite($h, $data);
		fclose($h);
		return $r;
	}
?>