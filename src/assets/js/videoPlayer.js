const videoContainer = document.querySelector('#jsvideoPlayer');
const videoPlayer = document.querySelector("#jsvideoPlayer video");
const playBtn = document.querySelector("jsPlayButton");

const registerView = () => {
    const videoId = window.location.href.split("/videos/")[1];
    fetch(`/api/${videoId}/view`, {
        method: "POST"
    });
};

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play(); // 내장 메소드 
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else{
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function init(){
    playBtn.addEventListener("click", handlePlayClick);
    registerView();
}
if(videoContainer){ // #jsvideoPlayer가 아예 없다면 EventListener가 실행 안되게
    init();
}