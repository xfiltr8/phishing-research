<?php
include_once "../include/functions.php";
session_start();

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
if(isset($_GET['user']))
{
	$id = $_GET['user'];

	$sql = mysql_query("SELECT * FROM account WHERE id='$id'")or die("Could not retrieve accounts info->".mysql_error());
	while($row = mysql_fetch_array($sql))
	{
		$fullname = $row['a_holder'];
		$aType = $row['a_type'];
		$tStatus = $row['transfer_status'];
		$aZone = $row['a_zone'];
		$scode = $row['swift_code'];
		$rNumber = $row['routing_number'];
		$bal = $row['balance'];
		$activity = $row['activity'];
		$aStatus = $row['a_status'];
		$credit = $row['credit_in'];
		$date = $row['date'];
		$curBal = $row['current_bal'];
		$image = $row['image'];
		$account = $row['a_number'];
		$username = $row['username'];
		$password = $row['password'];
		//$fullname = $row['a_holder'];
	}
	
	//echo $id;
	echo <<<_END
_END;
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
            <li id="nav-personal" class="top-nav-item first"><a href="home.php" class="top-nav-item-face">Home</a></li>
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
<div class="formUpdate"> 
<form class="myForm" method="post" action="acctupdate.php">
<h1> Account Holder : <span><?php echo $fullname; ?> </span></h1>
<ul>
<li><input type="text" name="uName" class="flat" value="<?php echo $fullname; ?>" required="required"></li>

<li><input type="text" name="uaType" class="flat" value="<?php echo $aType; ?>" required="required"></li>

<li><input type="text" name="utStatus" class="flat" value="<?php echo $tStatus; ?>" required="required"></li>

<li><input type="text" name="uaNum" id="trackingNum" class="flat" value="<?php echo $account; ?>" required="required"></li>

<li><input type="text" name="uaZone"  class="flat" value="<?php echo $aZone; ?>" required="required"></li>

<li><input type="text" name="usCode"  class="flat" value="<?php echo $scode; ?>" required="required"></li>

<li><input type="text" name="urNumber"  class="flat" value="<?php echo $rNumber; ?>" required="required"></li>

<li><input type="text" name="ubal"  class="flat" value="<?php echo $bal; ?>" required="required"></li>

<li><input type="text" name="uact"  class="flat" value="<?php echo $activity; ?>" required="required"></li>

<li><input type="text" name="uaStatus"  class="flat" value="<?php echo $aStatus; ?>" required="required"></li>

<li><input type="text" name="ucredit"  class="flat" value="<?php echo $credit; ?>" required="required"></li>

<li><input type="text" name="ucurBal"  class="flat" value="<?php echo $curBal; ?>" required="required"></li>

<li><input type="text" name="username"  class="flat" value="<?php echo $username; ?>" required="required"></li>

<li><input type="text" name="password"  class="flat" value="<?php echo $password; ?>" required="required"></li>

<li><input type="text" name="date"  class="flat" value="<?php echo $date; ?>" required="required"></li>

<li><input type="hidden" name="id"  class="flat" value="<?php echo $id; ?>"></li>

<li><input type="Submit" class="flat" value="Update Account"></li>
<li><input type="button" value="Cancel" class="flat button Cancel"></li>

</ul>

</form>
</div>
</div>
</div>
        </div>
        

</body>
</div>
</div>

<!-- global footer --><script type="text/javascript">
     ub.backgrounds = ['/ubimages/ub-p-bg-gradient.jpg'];
</script>
   
</body>
</html>