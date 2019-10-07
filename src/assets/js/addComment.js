import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}

const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();
}

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios(
        {
            url: `/api/${videoId}/comment`,
            method: "POST",
            data: {
                comment
            }
        });
        if(response.status === 200){
            addComment(comment);
        }
}

const handleSubmit = (event) => {
    event.preventDefault(); // We don't want to refresh the page
    const commentInpput = addCommentForm.querySelector("input"); // form안의 input의미
    console.log(addCommentForm, "Input : ", commentInpput);
    const comment = commentInpput.value; // input에 입력되서 submit되는 값
    sendComment(comment);
    commentInpput.value = "";
}

function init(){
    addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm){
    console.log("Success Inpput comment");
    init();
}