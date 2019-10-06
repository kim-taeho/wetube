import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");

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
        console.log(response);
}

const handleSubmit = (event) => {
    event.preventDefault(); // We don't want to refresh the page
    const commentInpput = addCommentForm.querySelector("input"); // form안의 input의미
    const comment = commentInpput.value; // input에 입력되서 submit되는 값
    sendComment(comment);
    commentInpput.value = "";
}

function init(){
    addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm){
    init();
}