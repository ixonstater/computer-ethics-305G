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
        $this->mysqlConn = mysqli_connect("dbapp", "root", "therootpasswordserver339017", "comments");
    }

    function process($postBody){
        try{
            $comment = $postBody["comment"];
            $user = $postBody["user"];
            $page = $postBody["page"];
            
            $query = $this->mysqlConn->prepare("insert into comments values (?, ?, ?, default)");
            $query->bind_param("sss", $user, $comment, $page);
            $query->execute();
            echo(json_encode([
                "success" => true,
                "message" => "Successfully submitted comment"
            ]));
        }
        catch(\Exception $e){
            echo(json_encode([
                "success" => false,
                "message" => $e->getMessage()
            ]));
        }
    }
}

main();