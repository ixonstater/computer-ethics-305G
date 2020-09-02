<?php

function main(){
    $postBodyString = file_get_contents("php://input");
    $postBody = json_decode($postBodyString, true);
    $getComments = new GetComments();
    $getComments->process($postBody);
}

class GetComments{
    private $mysqlConn;

    function __construct(){
        $this->mysqlConn = mysqli_connect("dbapp", "root", "therootpasswordserver339017", "comments");
    }

    function process($postBody){
        $page = $postBody["page"];
        $query = $this->mysqlConn->prepare("select * from comments where page=?");
        $query->bind_param("s", $page);
        $query->execute();
        $result = $query->get_result();
        
        $comments = [];
        while($row = $result->fetch_assoc()){
            $comments[] = $row;
        }

        echo(json_encode([
            "comments" => $comments
        ]));
    }
}

main();