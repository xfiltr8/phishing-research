<?php
	function lazyEncrypter($myText){
		$allChar = '`Mbc:/?.hPUVWDefJK{;>XYijkl1LNO5670|]}[234opqEFG~!@#QRSTwx$%^&*( )-_=+\HIdmnZrastuvg89yzABC,<\'"';
		$charCount = strlen($allChar);
		//echo $allChar[91];
		
		//Make text..
		//$myText = "masmur sijabat!!! ^_^";
		
		//Count..
		$textLength = strlen($myText);
		
		//Make empty allSign..
		$allTextCrypt = "";
		
		for($i = 0; $i < $textLength; $i++){
			//Find letters..
			if($myText[$i] == "\t"){
				$finishedCrypt = "ttt";
			}
			else if($myText[$i] == "\r"){
				$finishedCrypt = "===";
			}
			else if($myText[$i] == "\n"){
				$finishedCrypt = "%%%";
			}
			else {
				for($j = 0; $j < $charCount; $j++){
					if($myText[$i] == $allChar[$j]){
						$signCryptLetter = $j;
						break;
					}
				}
				
				//Make rand..
				$firstLook = rand(0, 93);
				//$firstLook = 3;
				
				//Now make crypt..
				$finishedCrypt = $allChar[$firstLook];
				$getCrypt = $signCryptLetter;
				for($l = 0; $l <= 1; $l++){
					$getCrypt = $getCrypt + $firstLook;
					if($getCrypt > 94){
						$getCrypt = ($getCrypt % 94) - 1;
					}
					if($l == 0){
						$finishedCrypt = $finishedCrypt.$allChar[$getCrypt];
					}
					else{
						$finishedCrypt = $allChar[$getCrypt].$finishedCrypt;
					}
				}
			}
			
			/*
			echo $signCryptLetter;
			echo $firstLook;
			echo "<br>";
			echo $finishedCrypt;
			echo "<br>";
			echo "<br>";
			*/
			$allTextCrypt = $allTextCrypt.$finishedCrypt;
		}
		
		return $allTextCrypt;
	}
	
	function lazyDecrypter($myText){
		$allChar = '`Mbc:/?.hPUVWDefJK{;>XYijkl1LNO5670|]}[234opqEFG~!@#QRSTwx$%^&*( )-_=+\HIdmnZrastuvg89yzABC,<\'"';
		$charCount = strlen($allChar);
		//echo $allChar[91];
		
		//Make text..
		//$myText = ',w:';
		
		//Count..
		$textLength = strlen($myText);
		
		//Check availability..
		$checkAvailable = $textLength%3;
		if($checkAvailable != 0){
			echo "This is not my Encryption Code..";
			exit;
		}
		
		//If it's available.. Then we count how many character are there..
		$rapidOfChar = $textLength/3;
		//echo $rapidOfChar;
		
		//get Each Char Encryption..
		$zeroStart = 0;
		$zeroChar = "";
		for($i = 0; $i < $rapidOfChar; $i++){
			$charDecrypted[$i] = substr($myText, $zeroStart, 3);
			$zeroStart = $zeroStart + 3;
			
			//Now we decrypt it ..
			if($charDecrypted[$i] == "ttt"){
				$getNormalChar = "\t";
			}
			else if($charDecrypted[$i] == "==="){
				$getNormalChar = "\r";
			}
			else if($charDecrypted[$i] == "%%%"){
				$getNormalChar = "\n";
			}
			else {
				for($j = 0; $j < $charCount; $j++){
					if($charDecrypted[$i][1] == $allChar[$j]){
						$decryptKey = $j;
						break;
					}
				}
				
				//Take char from decryptKey..
				for($k = 0; $k < $charCount; $k++){
					if($charDecrypted[$i][2] == $allChar[$k]){
						$decryptedChar = $k - $decryptKey;
						$doubleCheck = $k + $decryptKey;
						if($doubleCheck > 94){
							$doubleCheck = ($doubleCheck % 94) - 1;
						}
						if($charDecrypted[$i][0] != $allChar[$doubleCheck]){
							return "Error!".$i;
							exit;
						}
						if($decryptedChar < 0){
							$decryptedChar = 94 - abs($decryptedChar) + 1;
						}
						$getNormalChar = $allChar[$decryptedChar];
						break;
					}
				}
			}
			
			
			//Combine all..
			$zeroChar = $zeroChar . $getNormalChar;
			
			/*
			echo $getNormalChar."<br>";
			echo $decryptedChar."<br>";
			echo $decryptKey."<br>";
			echo $charDecrypted[$i][1]."<br>";
			echo $charDecrypted[$i];
			echo "<br>";
			echo "<br>";
			*/
			//echo $charDecrypted[$i]."\n\n";
		}
		
		return $zeroChar;
		
		//print_r($charDecrypted);
	}
?>