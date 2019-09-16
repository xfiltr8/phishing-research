<?php
$sv = $_SERVER['SERVER_NAME'];
$sv = str_replace("."," ",$sv);
$sv = str_replace("-"," ",$sv);

?>
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>404 Not Found</title>
</head><body>
<h1>Not Found</h1>
<p>The requested URL <?php echo $_SERVER['REQUEST_URI']; ?> was not found on this server.</p>
<p>Additionally, a 404 Not Found
error was encountered while trying to use an ErrorDocument to handle the request.</p>
</body></html>
