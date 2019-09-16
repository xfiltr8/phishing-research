/*
 * cmcustom.js 
 * $Revision: 1.1 $
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 * Date			Name			Desc
 * 08/16/2011	William Bird	Converted to hosted library: retained legacy tags and customizations
 *
 */
 
function cmCreatePageElementTag(elementID, elementCategory, attributes) {
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"cmAttributes",attributes]);
}

function cmCreateProductviewTag(productID, productName, categoryID, attributes, cm_vc) {
	cmMakeTag(["tid","5","pi",c1(cm_ClientID) ? c1(cm_ClientID) : "Product: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

// Legacy registration tag
function cmCreateRegistrationTag(CIFNum, customerType, customerSubtype, userType, attributes) {
   if (customerType == null) { 
		customerType = "";
	}
	if (customerSubtype == null) { 
		customerSubtype = "";
	}
	if (userType == null) { 
		userType = "";
	}
	if (attributes == null) { 
		attributes = "";
	}
   if (customerType + customerSubtype + userType != "") {
      attributes = customerType + "-_-" + customerSubtype + "-_-" + userType + "-_-" + attributes;
   } 
	cmMakeTag(["tid","2","cd",CIFNum,"cmAttributes",attributes]);
}

// New registration tag
function cmCreateNewRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, customerCountry, attributes) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cy",customerCountry,"cmAttributes",attributes]);
}

/*
 * Legacy 'Application' Tag
 * All new tag implementations should use the 'New' pageview, shop action and order tags.
 *
 * Creates application-related tags: 
 *		Pageview tag, application tag, any form field tags.
 *
 * pageID			: required.  Page ID to set on the embedded Pageview tag.  If not populated,
					  default application page ID is created.
 * categoryID		: optional.  Category ID to set on this tag.
 * appName			: required.  Name of application for this tag.
 * appStepNumber	: required.  Number of step in application.
 * appStepName		: required.  Name of step in application.
 * helpFlag			: optional.  T/F to indicate if user is seeing a help message in application flow.
 * errorFlag		: optional.  T/F to indicate if user is seeing an error message in application flow.
 * toolFlag			: optional.  T/F to indicate if user is using a tool, calculator, etc. in application flow.
 * firstStepFlag	: optional.  T/F to indicate if step is first step in application flow.
 * lastStepFlag		: optional.  T/F to indicate if step is last step in application flow.
 * visitorID		: required for last step in application.  Unique visitor ID for this user.
 * transactionID	: required for last step in application.  Unique transaction ID or order ID.
					  If not populated, unique ID is created.
 */
function cmCreateApplicationTags(pageID, categoryID, appName, appStepNumber, appStepName, helpFlag, toolFlag, errorFlag, firstStepFlag, lastStepFlag, visitorID, transactionID, attributes) {

	if (pageID == null) { 
		pageID = getDefaultPageID()
	} else {
		pageID = getDefaultApplicationPageID(appName, appStepName, appStepNumber );
	}
	if (appName) {
		appName = cmRemoveWhiteSpace(appName);
	}
	if (helpFlag) {
		appUserFlag = "HELP";
	}
	if (toolFlag) {
		appUserFlag = "TOOL";
	}
	if (errorFlag) {
		appUserFlag = "ERROR";
	}
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"pv1", appName,"pv2", appStepNumber,"pv3", appStepName, "pv4", appUserFlag, "pc", "Y","cmAttributes",attributes]);

	if (!transactionID) {
		transactionID = cmGetDefaultOrderID();
	}
	if (!visitorID) {
		visitorID = cmGetDefaultCustomerID();
	}
	if ((firstStepFlag)&&(appName)) {
		cmCreateShopAction5Tag(appName, categoryID, attributes);
		cmDisplayShop5s();
	}
	if ((lastStepFlag)&&(appName)) {
		cmCreateShopAction9Tag(appName, visitorID, transactionID, categoryID, attributes);
        cmDisplayShop9s();
		cmCreateOrderTag(transactionID, appName, visitorID, attributes);
	}
	
	cmAppName = appName;
	cmAppStepName = appStepName;
	cmAppStepNumber = appStepNumber;
	cmSetupApplicationTextBoxTags(categoryID, firstStepFlag, lastStepFlag);
}

/*
 * Legacy Shop Action 5 Tag: for use only by legacy cmCreateApplicationTags
 * Creates a Shop tag with Action 5 (First step in application)
 */
function cmCreateShopAction5Tag(productID, categoryID, attributes){
	cmAddShop(["pr",productID,"pm",productID,"qt","1","bp","1","cg",categoryID,"cmAttributes",attributes,"ha1",attributes ? cm_hex_sha1(attributes) : null,"at","5","tid","4","pc","N"]);
}

// New Shop Action 5 Tag

function cmCreateNewShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID, attributes, extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    productPrice = productPrice.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cc",cm_currencyCode,"at","5","tid","4","pc","N"]);
}

/*
 * Legacy Shop Action 9 Tag: for use only by legacy cmCreateApplicationTags
 * Creates a Shop tag with Action 9 (Application submitted page)
 */
function cmCreateShopAction9Tag(productID, customerID, orderID, categoryID, attributes) {
	var pattern1 = /^\s+|\s+$/gi;
	productID = productID.toString().replace(pattern1, "");
	cmAddShop(["pr",productID,"pm",productID,"qt","1","bp","1","cg",categoryID,"cmAttributes",attributes,"ha1",attributes ? cm_hex_sha1(attributes) : null,"cd",customerID,"on",orderID,"tr","1","at","9","tid","4","pc","N"]);
	cmCalcSKUString();
}

// New Shop Action 9 Tag

function cmCreateNewShopAction9Tag(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, attributes, extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    productPrice = productPrice.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cd",customerID,"on",orderID,"tr",orderTotal,"cc",cm_currencyCode,"at","9","tid","4","pc","N"]);
}

/*
 * Legacy Order Tag: for use only by legacy cmCreateApplicationTags
 */
function cmCreateOrderTag(orderID,appName,customerID,attributes) {
	cmMakeTag(["tid","3","osk",__skuString,"on",orderID,"tr","1","sg","0","cd",customerID,"cmAttributes",attributes]);
	__skuString = "";
}

// New Order Tag

function cmCreateNewOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,attributes,extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    orderShipping = orderShipping.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");	
	cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",cm_currencyCode,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

/*
 * Legacy function used only by legacy cmCreateApplicationTags
 * Creates Form Field activity tags
 */
function cmSetupApplicationTextBoxTags(category, first, last){
	var dt=new Date();
	cmRandom = dt.getTime()%10000000;

	var cm = new _cm("tid", "7", "vn2", "e4.0");
	cm.li = 1;
	cm.ps1= cmAppName;
	cm.ps2 = cmAppStepNumber;
	cm.ps3 = cmAppStepName;
	cm.ps4 = cmRandom;
	cm.ps5= category;
	if (first){
		cm.ps6="FIRST";
	}
	if (last){
		cm.ps7="LAST";
	}
	cm.writeImg();

	for (var i=0;i<document.forms.length; i++){
		for (var j=0;j<document.forms[i].elements.length; j++)
		{
			if (document.forms[i].elements[j].type=="text")
			{
				if(document.forms[i].elements[j].value==""){
					cmCheckForOnChange(document.forms[i].elements[j]);
				} else {
					cmSendFormFieldTag(document.forms[i].elements[j].name, true);
				}
			}
		}
	}
}

/*
 * Legacy function used by legacy cmCreateApplicationTags
 * Removes beginning, ending, and double spaces from strings
 */
function cmRemoveWhiteSpace(str){
	while (str.substring(0,1) == ' ') str = str.substring(1);
    while (str.substring(str.length-1,str.length) == ' ') str = str.substring(0,str.length-1);
	var check = true;
	while (check) {
		var pos = str.indexOf('  ');
		if (pos>-1){
			str = str.substring(0,pos) + str.substring(pos,str.length);
    	} else {
			check = false;
		}
	}
    return(str);
}

/*
 * Legacy function used by legacy cmCreateApplicationTags.
 * Creates an acceptable default Page ID value to use for Pageview tags.
 */
function getDefaultApplicationPageID(appName, appStepName, appStepNumber){
	var	cmPageID = "Application: " + appName + " Step: " + appStepNumber + " (" + appStepName + ")";
	return(cmPageID);
}