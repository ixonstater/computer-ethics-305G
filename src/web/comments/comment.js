function Comments(){

}

Comments.prototype.createUi = function (){
    var textArea = document.createElement("textarea")
    textArea.style.width = "500px"
    textArea.style.height = "300px"
    textArea.style.display = "block"
    document.body.appendChild(textArea)

    var submitButton = document.createElement("button")
    submitButton.innerHTML = "Submit Comment"
    submitButton.style.marginTop = "20px"
    submitButton.addEventListener("click", this.submitComment.bind(this))
    document.body.appendChild(submitButton)
}

Comments.prototype.submitComment = function (){

}

Comments.prototype.getComments = function (){

}

Comments.prototype.displayComments = function (){

}

document.addEventListener("DOMContentLoaded", function(){
    var comments = new Comments()
    comments.createUi()
    comments.getComments()
})