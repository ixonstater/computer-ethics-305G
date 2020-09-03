function Comments(pageName){
    this.pageName = pageName
    this.textArea = null
    this.userField = null
    this.submittedComments = null
}

Comments.prototype.createUi = function (){
    var userField = document.createElement("input")
    userField.style.width = "500px"
    userField.style.marginBottom = "20px"
    userField.placeholder = "Commentors Name"
    userField.style.display = "block"
    this.userField = userField
    document.body.appendChild(userField)

    var textArea = document.createElement("textarea")
    textArea.style.width = "500px"
    textArea.style.height = "300px"
    textArea.style.display = "block"
    this.textArea = textArea
    document.body.appendChild(textArea)

    var submitButton = document.createElement("button")
    submitButton.innerHTML = "Submit Comment"
    submitButton.style.marginTop = "20px"
    submitButton.addEventListener("click", this.submitComment.bind(this))
    document.body.appendChild(submitButton)
}

Comments.prototype.submitComment = async function (){
    var comment = this.textArea.value
    var username = this.userField.value

    if(!comment || !username){
        alert("Blank comments are not allowed.  You must also submit a name for the comment.")
        return
    }
    else if (username.length > 40){
        alert("Commentor name may not be longer than 40 characters.")
        return
    }

    var body = JSON.stringify({
        comment: comment,
        user: username,
        page: this.pageName
    })

    var response = await fetch(window.location.origin + "/api/submitComment.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: body
    })
    var responseJson = await response.json()
    if(!responseJson.success){
        alert("Comment failed to submit, you can contact me at joshuajarvis0711@gmail.com and I will look into the error.")
    }
    else {
        this.getComments()
    }
}

Comments.prototype.getComments = async function (){
    var body = JSON.stringify({
        page: this.pageName
    })

    var response = await fetch(window.location.origin + "/api/getComments.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: body
    })
    var responseJson = await response.json()
    if(!responseJson.success){
        console.log("Failed to retrieve comments.")
    }

    this.displayComments(responseJson.comments)
}

Comments.prototype.displayComments = function (comments){
    comments.forEach(function (comment){
        var commentWrapper = document.createElement("div")
        commentWrapper.style.width = "700px"
        commentWrapper.style.postion = "relative"
        commentWrapper.style.border = "2px solid black"
        commentWrapper.style.marginTop = "20px"
        commentWrapper.style.paddingLeft = "10px"

        var commentTitle = document.createElement("p")
        commentTitle.innerHTML = "At " + comment.calldatetime + " " + comment.user + " said "

        var commentBody = document.createElement("p")
        commentBody.innerHTML = comment.comment

        commentWrapper.appendChild(commentTitle)
        commentWrapper.appendChild(commentBody)

        document.body.appendChild(commentWrapper)
    })
}