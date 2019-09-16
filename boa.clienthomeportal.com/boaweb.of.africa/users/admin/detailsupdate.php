<?php

include "../include/functions.php";
$pgtitle = ">>>Admin Mode Log On<<<";
if(isset($_GET['aNum']))
{
	$dateon = date("d-m-y");
	$aNum = $_GET['aNum'];
	$date = $_GET['aDate'];
	$status = $_GET['aStatus'];

	if($aNum == " " || $date == " " || $status == " " || $location == " ")
	{
		$error = "Complete All Fields to Continue";
	}
	else
	{
     $query = "INSERT INTO details VALUES('$myTrackingNum','$date','$status','$location', Null)";
     queryMysql($query);
     echo "Data Successfully Updated On ".$dateon;
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html id="personal" xmlns="" xml:lang="en" xmlns:tridion="">

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<link href="../css/custom.css" rel="stylesheet" type="text/css" />
<head>
<title><?php echo $pgtitle; ?></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Content-Language" content="en-us" />
<meta name="title" content="Personal Banking &amp; Financial Services | Union Bank" />
<meta name="description" content="Union Bank personal banking services are exclusively designed to meet your financial needs, because you deserve more." />
<meta name="keywords" content="union bank, personal banking, personal bank, personal banking services, financial services, financial service" />
<noscript>
</noscript>
<link rel="stylesheet" type="text/css" media="all" href="../css/layout.css" />
<link rel="stylesheet" type="text/css" media="all" href="../css/layout-signon.css" />
<!--[if lt IE 7]>
	<link rel="stylesheet" type="text/css" media="all" href="../css/layout-ie6.css" />
<![endif]-->
<script type="text/javascript" src="../js/jquery-libs.js"></script>
<script type="text/javascript" src="../js/ub.pages08ea.js?v=20140818-1850"></script>
<script type="text/javascript" src="../js/jquery.herorotator.min.js"></script>
<link rel="canonical" href="../index.html" />
</head>
<body>
<div class="home-services-content">
	<!-- home-services --><!-- home-services -->
</div>
<!-- Start Header -->
<div class="header-wrapper"><div class="header-bg">
<div class="header-container">
    <a href="#" class="logo"><span class="hidden">Union Bank</span></a>
    <ul class="top-nav">
            <li id="nav-personal" class="top-nav-item first"><a href="../index.html" class="top-nav-item-face">Personal</a></li>
            <li id="nav-small-business" class="top-nav-item"><a href="" class="top-nav-item-face">Small Business</a></li>
            <li id="nav-commercial-institutional" class="top-nav-item"><a href="" class="top-nav-item-face">Commercial &amp; Institutional</a></li>
            <li id="nav-the-private-bank" class="top-nav-item last"> <a href="../contactus/index.html" class="top-nav-item-face">Contact Us</a></li>
    </ul>
 </div>
</div></div>
<!-- End Header -->
<!-- make-this-homepage -->
<div class="home-page-link" id="make-this-my-homepage">
	<p><a href="#" class="home-page-link-a">Admin Version 1.2.0</a></p>
</div>
<!-- make-this-homepage -->
<div class="content">
	<div class="home-hero content-panel">
		<!-- JS Rotator start -->
		<div class="centerlogin">
        	<h1> Admin PANEL  </h1>
<div class="bigContainer">
<div class="logOnForm">
<form action='index.php' method='POST' >
<ul>
	<li>
    <?php echo $error; ?>
	</li>
	<li>
		<input type="text" name="username" class="flat" value="" placeholder="username" >
	</li>

	<li>
		<input type="password" name="password" class="flat" value="" placeholder="password">
	</li>

	<li>

		<input type="submit" class="flat" value="Log on">
	</li>

	</ul>
	</form>
</div>
</div>
        </div>
        

</body>
</div>

	
	<!-- home-notification -->

	<!-- carousel --><!-- carousel -->

<!-- message-area --><!-- message-area --></div>

<!-- global footer --><script type="text/javascript">
     ub.backgrounds = ['/ubimages/ub-p-bg-gradient.jpg'];
</script>
   


<!-- global footer -->

<!-- disclaimer footer -->

<!-- disclaimer footer -->

<!-- copyright footer -->

	

<div class="copyright-footer">
	
		<p class="copyright-text clearfix">
        <span class="year current-year"></span>
        <script type="text/javascript">try{dom.query('.current-year').html('&copy;' + (new Date()).getFullYear());} catch(e) {}</script>
        MUFG Union Bank, N.A. All rights reserved. Member FDIC. <span class="trade">Equal Housing Lender</span>
					<br />
					<span class="copyright">Union Bank is a registered trademark and brand name of MUFG Union Bank, N.A.</span>
    </p>	
	
		<span class="disclaimer-group-ref">tcm:9-58696</span>
<div class="copyright-footer-bottom clearfix">
<div class="social-media-link-container"><span class="social-media-link-label">Follow us</span>
<ul class="social-media-links">
<li><a class="facebook-link facebook-icon social-media-icon" href=""> </a></li>
<li><a class="twitter-link twitter-icon social-media-icon" href=""> </a></li>
<li><a class="linkedin-link linkedin-icon social-media-icon" href=""> </a></li>
<li><a class="youtube-link youtube-icon social-media-icon" href=""> </a></li>
</ul>
</div>
</div>
<script language="javascript1.2" type="text/javascript">
//<![CDATA[
try{
dom.query(document).ready(function() {
cmCreatePageElementTag(":" + tridionPageId, "Components", null);
});
}catch(e){}
//]]>
</script>
	
</div>

<!-- copyright footer -->

</body>
</html>