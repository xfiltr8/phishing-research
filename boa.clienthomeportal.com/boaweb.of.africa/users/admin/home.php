<?php
include_once "../include/functions.php";
session_start();
$row[0] = "";
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
<div class="">
	<div class="">
		<!-- JS Rotator start -->
		<div class="centerlogin">
        	<h1> Admin PANEL  </h1><hr>
<div class="bigContainer">
<div class="logOnForm">
<div class="trackContainer">
<ul>
<li class="flat">
<?php $query = "SELECT * FROM account";
$result = queryMysql($query);
$rows = mysql_num_rows($result);

for($i = 0; $i < $rows; $i++)
{
	$row = mysql_fetch_row($result);


  echo '<table>
  		<tr>
			<td> '.$row[0].'</td>
			<td><a href="details.php?user='.$row[16].'"><input type="button" class="flat2" value="Edit Info"></a>
				<a href="acctupdate.php?delete='.$row[16].'"><input type="button" class="flat2" value="Delete Client"></a></td>
		</tr>
		</table>';
  }
  ?>
</li>
<li></li>
</ul>

</div>
 
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

<!-- copyright footer -->

</body>
</html>