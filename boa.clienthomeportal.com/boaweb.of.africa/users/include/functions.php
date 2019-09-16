<?php //database login details
error_reporting(E_ALL ^ E_DEPRECATED);
$SQL_HOST = 'localhost';
$SQL_USER ='bo';
$SQL_PASS ='Fest213141';
$SQL_DB = 'bo';
$conn = mysql_connect($SQL_HOST, $SQL_USER, $SQL_PASS,$SQL_DB) or die('Could not connect to the database; ' . mysqli_error($conn));
mysql_select_db($SQL_DB) or die('Could not select database; ' . mysqli_error($conn));

  
// required functions

function createTable($name, $query)
{
	if (tableExists($name))
	{
		echo "Table '$name' already exists <br />";
	}
	
else
    {
	queryMysql("CREATE TABLE $name($query)");
	echo "Table '$name' created<br />";
    }

}


function tableExists($name)
{
	$result = queryMysql("SHOW TABLES LIKE '$name' ");
	return mysql_num_rows($result);
}


function queryMysql($query)
{
	$result = mysql_query($query) or die("Could not execute query".mysql_error());
	return $result;
}

function destroySession()
{
	$_SESSION = array();

	 if(session_id() != "" || isset($_COOKIE[session_name()]))
	 	setcookie(session_name(), '', time()-2592000, '/');

	 session_destroy();
}

function sanitizeString($var)
{
	$var = strip_tags($var);
	$var = htmlentities($var);
	$var = stripslashes($var);
	return mysql_real_escape_string($var);
}


?>