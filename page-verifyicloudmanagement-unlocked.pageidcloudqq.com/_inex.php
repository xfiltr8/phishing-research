<!DOCTYPE HTML>
<html>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>This page can&rsquo;t be displayed</title>
        <style type="text/css">
body {
	margin: 0em; color: rgb(87, 87, 87); font-family: "Segoe UI", "verdana", "arial"; background-repeat: repeat-x; background-color: white;
}
.mainContent {
	width: 700px; margin-top: 80px; margin-right: 120px; margin-left: 120px;
}
.title {
	color: rgb(39, 120, 236); font-family: "Segoe UI", "verdana"; font-size: 38pt; font-weight: 300; margin-bottom: 20px; vertical-align: bottom; position: relative;
}
.errorExplanation {
	color: rgb(0, 0, 0); font-family: "Segoe UI", "verdana", "arial"; font-size: 12pt; text-decoration: none;
}
.taskSection {
	margin-top: 20px; margin-bottom: 40px; position: relative;
}
.tasks {
	color: rgb(0, 0, 0); padding-top: 5px; font-family: "Segoe UI", "verdana"; font-size: 12pt; font-weight: 200;
}
li {
	margin-top: 8px;
}
.diagnoseButton {
	font-size: 9pt;
}
.launchInternetOptionsButton {
	font-size: 9pt;
}
.webpageURL {
	direction: ltr;
}
.hidden {
	display: none;
}
a {
	color: rgb(0, 102, 204); font-family: "Segoe UI", "verdana", "arial"; font-size: 11pt; text-decoration: none;
}
a:hover {
	text-decoration: underline;
}


        </style>
    </head>

    <body oncontextmenu='return false;' onkeydown='return false;' onmousedown='return false'>
        <div id="contentContainer" class="mainContent">
            <div id="mainTitle" class="title">This page can&rsquo;t be displayed</div>
            <div class="taskSection" id="taskSection">
                <ul id="cantDisplayTasks" class="tasks">
                    <li id="task1-1">Make sure the web address <span id="webpage" class="webpageURL"></span>is correct.</li>
                    <li id="task1-2">Look for the page with your search engine.</li>
                    <li id="task1-3">Refresh the page in a few minutes.</li>
                </ul>
                <ul id="notConnectedTasks" class="tasks" style="display:none">
                    <li id="task2-1">Check that all network cables are plugged in.</li>
                    <li id="task2-2">Verify that airplane mode is turned off.</li>
                    <li id="task2-3">Make sure your wireless switch is turned on.</li>
                    <li id="task2-4">See if you can connect to mobile broadband.</li>
                    <li id="task2-5">Restart your router.</li>
                </ul>
            </div>
            <div><button id="diagnose" class="diagnoseButton" onclick="javascript:diagnoseConnectionAndRefresh(); return false;">Fix connection problems</button></div>
        </div>
    </body>
</html>
