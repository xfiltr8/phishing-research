<?php
function ambilantara($string, $start, $end){
        $string = ' ' . $string;
        $ini = strpos($string, $start);
        if ($ini == 0) return '';
        $ini += strlen($start);
        $len = strpos($string, $end, $ini) - $ini;
	    return substr($string, $ini, $len);
	}

function cekbin($ccnumb) {
    $cc_bin = substr($ccnumb, 0, 6);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://iin-bin.com/bin/'.$cc_bin.'.html');
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_FAILONERROR, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip');
    curl_setopt($ch, CURLOPT_COOKIESESSION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Accept-Encoding: gzip, deflate, br' ,
    'Accept-Language: en-US,en;q=0.8' ,
    'Upgrade-Insecure-Requests: 1' ,
    'User-Agent: Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' ,
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' ,
    'Cookie: _ym_uid=1509884613467538438; _ym_isad=1; _gat=1; last_visit=1509859573305::1509884773305; _ga=GA1.2.1477099527.1509884613; _gid=GA1.2.544774800.1509884613; _ym_visorc_44775982=w' ,
    'Connection: keep-alive' ,
        ));
    $result = curl_exec($ch);
    curl_close($ch);
    unset($ch);

    $xp = explode("\n", $result);
    for($i=0;$i<count($xp);$i++) {
        if (strpos($xp[$i], 'Payment System') !==false) {
            $ps1 = explode('Payment System', $xp[$i]);
            $cc_brand = ambilantara($ps1[1], 'aria-hidden="true"></i> ', '</td></tr>');
            $cc_issuer = ambilantara($xp[$i+2], '<b>', '</b>');
            $cc_type = ambilantara($xp[$i+2], 'Card Type</th><td>', '</td></tr>');
            $cc_level = ambilantara($xp[$i+2], 'Card Level</th><td>', '</td></tr>');
            break;
        }
    }

    return json_encode(array("cc_bin"=>$cc_bin,"cc_brand"=>$cc_brand,"cc_issuer"=>$cc_issuer,"cc_type"=>$cc_type,"cc_level"=>$cc_level));
}


?>
