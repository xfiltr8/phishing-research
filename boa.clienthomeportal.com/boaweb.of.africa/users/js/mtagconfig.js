/*--------------------------------------------------------------------------
// LivePerson Code Package for Union Bank (Specific for Union Bank)
//
// Version: 1.0.0.2
//
// Change Log:
//--------------------------------------------------------------------------
// * Version 1.0.0.2:  
//                   03/28/2011 by Jimmy Wang
//                    * Add new button object db2 and 2nd pid:'lpButton_1'
// * Version 1.0.0.1:  
//                   12/15/2010 by Jimmy Wang
//                    * Add new function lpSendDataPriorToPageFinishLoading()
// * Version 1.0.0.0: 
//                   12/14/2010
//                    * Initial drop
*/
/***********************************************************************************DISCLAIMER************************************************************************************
 NOTE: By downloading and using this software you expressly agree to the following:
 This software is for the limited use only in connection with the LivePerson services purchased by you. 
 Once the LivePerson services are no longer in use, you must cease all use of the software and destroy all copies. 
 The software is provided to you "as is" and without any warranty of any kind, express, implied or otherwise, including without limitation, any warranty of merchantability or fitness for a particular purpose.  
 In no event shall LivePerson or any of its affiliates be liable for any direct, indirect, special, incidental, or consequential damages or any other damages of any kind, whether LivePerson
 or any of its affiliates have been advised of the possibility of such loss, however caused, and on any theory of liability, arising out of or related to the possession, use or performance of this software.  
 IF YOU DO NOT AGREE TO THE FOREGOING TERMS, DO NOT DOWNLOAD THE SOFTWARE OR USE THE SOFTWARE.
***********************************************************************************DISCLAIMER************************************************************************************/
//--------------------------------------------------------------------------
// Date last modified =  110328
// Modified by =  JW

var lpMTagConfig = {
	'lpServer' : 'sales.liveperson.net',
	'lpNumber' : '27484482',
	'lpProtocol' : (document.location.toString().indexOf('https:')==0) ? 'https' : 'http',
	'lpTagLoaded' : false,
	'pageStartTime' : (new Date()).getTime(), //pageStartTime is set with a timestamp as soon as the page starts loading
	'defaultUnit' : 'sales-deposits',
	'defaultLanguage' : 'english'
};
if (typeof(lpMTagConfig.lpTagSrv) == 'undefined') {
	lpMTagConfig.lpTagSrv = lpMTagConfig.lpServer;
}
lpMTagConfig.deploymentConfigPath = lpMTagConfig.lpTagSrv+'/visitor/addons/deploy.asp';

lpMTagConfig.lpLoadScripts = function(){
	lpAddMonitorTag(lpMTagConfig.lpProtocol + '://' + lpMTagConfig.deploymentConfigPath + '?site=' + lpMTagConfig.lpNumber + '&d_id=' + lpMTagConfig.deploymentID);
}

function lpAddMonitorTag(src) { 
	if (!lpMTagConfig.lpTagLoaded) {if (typeof(src) == 'undefined' || typeof(src) == 'object') {if (lpMTagConfig.lpMTagSrc) {src = lpMTagConfig.lpMTagSrc;}else {if (lpMTagConfig.lpTagSrv) {src = lpMTagConfig.lpProtocol + '://' +lpMTagConfig.lpTagSrv + '/hcp/html/mTag.js';}else {src = '/hcp/html/mTag.js';};};};if (src.indexOf('http') != 0) {src = lpMTagConfig.lpProtocol + '://' + lpMTagConfig.lpServer + src + '?site=' + lpMTagConfig.lpNumber;} else {if (src.indexOf('site=') < 0) {if (src.indexOf('?') < 0) {src = src + '?';} else{src = src + '&';} src = src + 'site=' + lpMTagConfig.lpNumber;  };};var s = document.createElement('script');s.setAttribute('type', 'text/javascript');s.setAttribute('charset', 'iso-8859-1');s.setAttribute('src', src);document.getElementsByTagName('head').item(0).appendChild(s);}
}
		
//The code below send a PAGEVAR to LP with the time [in seconds] it took the page to load. Code is executed in the onload event
lpMTagConfig.calculateSentPageTime = function () {
	var t = (new Date()).getTime() - lpMTagConfig.pageStartTime;
	lpAddVars('page','pageLoadTime', Math.round(t/1000)+' sec');
};

//Variables Arrays - By Scope
if (typeof(lpMTagConfig.pageVar)=='undefined') { lpMTagConfig.pageVar = []; }
if (typeof(lpMTagConfig.sessionVar)=='undefined') { lpMTagConfig.sessionVar = []; }
if (typeof(lpMTagConfig.visitorVar)=='undefined') { lpMTagConfig.visitorVar = []; }
//Extra actions to be taken once the code executes
if (typeof(lpMTagConfig.onLoadCode)=='undefined') { lpMTagConfig.onLoadCode = []; }
//Dynamic Buttons Array
if(typeof(lpMTagConfig.dynButton)=='undefined') { lpMTagConfig.dynButton = []; }
// This need to be add to afterStartPage will work
if(typeof(lpMTagConfig.ifVisitorCode)=='undefined') {lpMTagConfig.ifVisitorCode = []; }


// Function that sends variables to LP - By Scope
function lpAddVars(scope,name,value) {
	if (name.indexOf('OrderTotal')!=-1 || name.indexOf('OrderNumber')!=-1){
		if  (value=='' || value==0) return; // pass 0 value to all but OrderTotal
		else lpMTagConfig.sendCookies = false
	}	
	value=lpTrimSpaces(value.toString());
//Remove cut long variables names and values. Trims suffix of the variable name above the 25th character onwards
	if (name.length>50) { 
		name=name.substr(0,50);
	}
    if (value.length>50) { // Trims suffix of the variable value above the 50th character onwards
		value=value.substr(0,50);
	}
	switch (scope){
		case 'page': lpMTagConfig.pageVar[lpMTagConfig.pageVar.length] = escape(name)+'='+escape(value); break;
		case 'session': lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = escape(name)+'='+escape(value); break;
		case 'visitor': lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length] = escape(name)+'='+escape(value); break;
	}	
}

// Preventing long cookie transfer for IE based browsers.
function onloadEMT() { 
	var LPcookieLengthTest=document.cookie;
	if (lpMTag.lpBrowser == 'IE' && LPcookieLengthTest.length>1000){
		lpMTagConfig.sendCookies=false;
	}
}

//The Trim function returns a text value with the leading and trailing spaces removed
function lpTrimSpaces(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,'');
}

// Immediate Data submission function
function lpSendData(varscope,varname,varvalue) {
	if(typeof(lpMTag)!='undefined' && typeof(lpMTag.lpSendData)!='undefined')
		lpMTag.lpSendData(varscope.toUpperCase() +'VAR!'+ varname + '=' + varvalue, true);
}

// The unit variable purpose is to route the chat or call to the designated skill. <LOB> should be replaced with the skill name, i.e. : sales
try{
	if (typeof(lpUnit)=='undefined') { var lpUnit=lpMTagConfig.defaultUnit; }
	lpMTagConfig.deploymentID=lpUnit;
	if(typeof(lpAddVars)!='undefined') { lpAddVars('page','unit',lpUnit); }
	if (typeof(lpLanguage)=='undefined') { var lpLanguage=lpMTagConfig.defaultLanguage; }
	if(typeof(lpAddVars)!='undefined') { lpAddVars('page','language',lpLanguage); }
	lpMTagConfig.defaultInvite='chat'+'-'+lpUnit+'-'+lpLanguage;
}catch(e){}

lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = onloadEMT;

//Scan dynButton and removes buttons which doesnt have Div on the page
//lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = function () {
//	if(typeof(lpMTagConfig.dynButton)!='undefined') {
//		for (i=0;i<lpMTagConfig.dynButton.length;i++){
//			if (typeof(lpMTagConfig.dynButton[i].pid)!='undefined' && document.getElementById(lpMTagConfig.dynButton[i].pid) == null) {
//					lpMTagConfig.dynButton.splice(i,1);
//					i--;
//			}
//		}
//	}
//};

//The folowing functions will be load after the page will finish loading
lpMTagConfig.onLoadAll = function () {
	lpMTagConfig.calculateSentPageTime();
	lpMTagConfig.lpLoadScripts();
};

//creating button object
if(typeof(lpMTagConfig.db1)=="undefined"){
	lpMTagConfig.db1 = new Object();
}
if(typeof(lpMTagConfig.db2)=="undefined"){
	lpMTagConfig.db2 = new Object();
}

if (window.attachEvent) { 
	window.attachEvent('onload',lpMTagConfig.onLoadAll); 
} else {
	window.addEventListener('load',lpMTagConfig.onLoadAll,false);
}

function lpSendDataPriorToPageFinishLoading() {
	if(typeof(lpMTagConfig.lpTagLoaded)!='undefined' && (!lpMTagConfig.lpTagLoaded)) {
		lpMTagConfig.sendCookies=false;
		lpAddMonitorTag();
		lpMTagConfig.lpTagLoaded=true;
	}
};

// LP Button Code
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-'+lpLanguage,'pid':'lpButton','afterStartPage': true,'ovr':'lpMTagConfig.db1'};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-'+lpLanguage+'-a','pid':'lpButton_1','afterStartPage': true,'ovr':'lpMTagConfig.db2'};