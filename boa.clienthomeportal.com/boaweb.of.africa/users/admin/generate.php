<?php
include_once "../include/functions.php";
session_start();
$error = '';
if (isset($_SESSION['user']))
{
	$user = $_SESSION['user'];
	$loggedIn = TRUE;
}
else
{
	$loggedIn = false;
}	

if(!($loggedIn))
{
	echo "<meta http-equiv='refresh' content='0; url = index.php'>";
}

$pgtitle = ">>>Admin Mode Log On<<<";
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
<link type="text/css" rel="stylesheet" href="../css/reset.css"/>
<link type="text/css" rel="stylesheet" href="../css/admin.css"/>
<link rel="stylesheet" type="text/css" media="all" href="../css/layout.css" />
<link rel="stylesheet" type="text/css" media="all" href="../css/layout-signon.css" />
<!--[if lt IE 7]>
	<link rel="stylesheet" type="text/css" media="all" href="../css/layout-ie6.css" />
<![endif]-->
<script type="text/javascript" src="../js/jquery-2.1.1.min.js"> </script>
<script type="text/javascript" src="../js/myApp.js" > </script>
<script type="text/javascript" src="../js/myAppSecond.js"> </script>
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
           <li id="nav-personal" class="top-nav-item first"><a href="#" class="top-nav-item-face">Home</a></li>
            <li id="nav-small-business" class="top-nav-item"><a href="generate.php" class="top-nav-item-face">Generate</a></li>
            <li id="nav-commercial-institutional" class="top-nav-item"><a href="logout.php" class="top-nav-item-face">Logout</a></li>
            <li id="nav-the-private-bank" class="top-nav-item last"> <a href="#" class="top-nav-item-face">Contact Support</a></li>
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
        	<h1> Admin PANEL  </h1><hr />
            
<div class="bigContainer">
<div class="logOnForm">
	<li>
    <?php echo $error; ?>
	</li>
	<div class="GenerateContainer">

    <div class="trackNumberDisplay">
<h1>  </h1>

</div>

    <div class="trackButtonContainer">
<form>
<input type="button" class="flat" value="Generate Account Number" id="trackButton">

<input type="button" class="hidden flat" value="Add Details" id="addButton">
</form>
</div>

<div class="trackRegister hidden">
<form action="acctupdate.php" method="POST">
<ul>

<li><input type="text" name="Name" class="flat" placeholder="Account Holder" required="required"></li>

<li><input type="text" name="aType" class="flat" placeholder="Account type" required="required"></li>

<li><input type="text" name="tStatus" class="flat" placeholder="Transfer Status" required="required"></li>

<li><input type="text" name="aNum" id="trackingNum" class="flat" placeholder="Account Number" required="required"></li>

<li><input type="text" name="aZone"  class="flat" placeholder="Account Zone" required="required"></li>

<li><input type="text" name="sCode"  class="flat" placeholder="Swift Code" required="required"></li>

<li><input type="text" name="rNumber"  class="flat" placeholder="Routing Number" required="required"></li>

<li><input type="text" name="bal"  class="flat" placeholder="Balance" required="required"></li>

<li><input type="text" name="act"  class="flat" placeholder="Activity" required="required"></li>

<li><input type="text" name="aStatus"  class="flat" placeholder="Account Status" required="required"></li>

<li><input type="text" name="credit"  class="flat" placeholder="Credit In" required="required"></li>

<li><input type="text" name="curBal"  class="flat" placeholder="Current Balance" required="required"></li>

<li><input type="text" name="username"  class="flat" placeholder="Username" required="required"></li>

<input type="text" name="password"  class="flat" placeholder="Password" required="required"></li>

<li><input type="Submit" value="Register Account" class="button Register flat"><br /><input type="button" value="Cancel" class="flat button Cancel"></li>
</ul>
</form>
</div>

</div>

		</div>
    </div>
</div>
</body>
</div>
<script type="text/javascript">
     ub.backgrounds = ['/ubimages/ub-p-bg-gradient.jpg'];
</script>
   


<!-- global footer -->

<!-- disclaimer footer -->

<!-- disclaimer footer -->

<!-- copyright footer -->


<!-- copyright footer -->

</body>
</html>