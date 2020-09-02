<?php

function main(){
    $postBodyString = file_get_contents("php://input");
    $postBody = json_decode($postBodyString, true);
    $submitComment = new SubmitComment();
    $submitComment->process($postBody);
}

class SubmitComment{
    private $mysqlConn;

    function __construct(){
        $this->mysqlConn = mysqli_connect("localhost:33060", "root", "therootpasswordserver339017");
    }

    function process($postBody){
        $comment = $postBody["comment"];
        $user = $postBody["user"];
        $page = $postBody["page"];
    }
}

main();