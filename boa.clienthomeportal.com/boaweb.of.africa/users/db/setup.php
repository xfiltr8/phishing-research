<?php
include_once "../include/functions.php";

createTable('admin', 'username VARCHAR(20), password VARCHAR(20)');

createTable('updates', 'id INT UNSIGNED NOT NULL AUTO_INCREMENT KEY, date VARCHAR(255), activity VARCHAR(255), account VARCHAR(225), credit_in VARCHAR(255), current_balance VARCHAR(255)');

createTable('account', 'a_holder VARCHAR(255), a_type VARCHAR(255), transfer_status VARCHAR(255), a_number VARCHAR (255), a_zone VARCHAR (255), swift_code VARCHAR (255), routing_number VARCHAR (255), balance VARCHAR (255), activity VARCHAR (255), a_status VARCHAR (255), credit_in VARCHAR (255), date VARCHAR (255), current_bal VARCHAR (255), image VARCHAR (255), username VARCHAR (255), password VARCHAR (255), id INT UNSIGNED NOT NULL AUTO_INCREMENT KEY');
?>