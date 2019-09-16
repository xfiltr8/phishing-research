<?php
$random_id = sha1(rand(0,1000000));
function getUserIPs()
{
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}

$ip = getUserIPs();
if($proxyblock == 'on') {
    if($ip == "127.0.0.1") {
    }else{
        $url = "https://proxycheck.io/v2/$ip?vpn=1&asn=1&tag=proxycheck.io";
        $ch = curl_init();  
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        curl_close($ch);
        $json = json_decode($result,true);
        $proxy = $json["$ip"]["proxy"];
        if($proxy == "yes") {
            $ua = $_SERVER['HTTP_USER_AGENT'];
            $click = fopen("logs/total_bot.txt","a");
            fwrite($click,"$ip - $ua (Detect by BOT/Proxy/VPN)"."\n");
            fclose($click);
             header("HTTP/1.0 404 Not Found");
    die ('<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN"><html><head><title>404 Not Found</title></head><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p><p>Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.</p></body></html>');
    exit();
        }
    }
}
?>