//javaScript File//

let thumbnail = document.getElementsByClassName('thumbnail')

let activeImages = document.getElementsByClassName('active')

for (var i=0; i < thumbnail.length; i++){

  thumbnail[i].addEventListener('mouseover', function(){
    //console.log(activeImages)

    document.getElementById('featured').src = this.src
  })
}


let buttonRight = document.getElementById('slideRight');
let buttonLeft = document.getElementById('slideLeft');

buttonLeft.addEventListener('click', function(){
  document.getElementById('slider').scrollLeft -= 80
})

buttonRight.addEventListener('click', function(){
  document.getElementById('slider').scrollLeft += 80
})


// ---------------------------------------------Scripts for Main-Caroussel----------------------------------

var imageDivs = document
  .querySelector(".caroussel-container")
  .querySelectorAll(".image img");
imageDivs.forEach((imageDiv) => {
  imageDiv.width = window.innerWidth;
});

let moved = false;
const windowWidth = window.innerWidth;
function slide() {
  if (!moved) {
    ele = document.querySelector(".caroussel");
    left = ele.style.left;
    left = left.replace("px", "");
    newLeft = Number(left) - windowWidth;
    if (newLeft == -6 * windowWidth) {
      newLeft = 0;
    }
    // console.log(newLeft);
    ele.style.left = `${newLeft}px`;
    // colorRoundButton(newLeft.toFixed(2));
  } else {
    moved = false;
  }
}
window.onload = (e) => {
  setInterval(slide, 2000);
};


// ----------------------------------------------Scripts for Video Gallery------------------------------------------------------
let videoPlaying = false
let videoEnded = false

function setInitialStateOfVideos() {
  document
    .querySelectorAll(`.video-projects .video .play-btn`)
    .forEach((btn) => {
      btn.classList.add("show");
      btn.classList.remove("hide");
    });

  const otherVideos = document.querySelectorAll(`.video-projects .video video`);
  otherVideos.forEach((video) => {
    video.removeAttribute("controls");
    video.pause();
  });
}

function videoControlDisplay(e) {
  setInitialStateOfVideos();
  e.target.parentNode.classList.add("hide");
  e.target.parentNode.classList.remove("show");
  const className = e.target.parentNode.classList[1];
  const video = document.querySelector(`.video-projects .${className} video`);
  console.log(video);
  video.setAttribute("controls", "");
  video.play();
  clearInterval(autoslide)
  focusVideo = Number(className.replace("video", ""))
  document
    .querySelector(`.video-projects .video-container .video${focusVideo}`)
    .scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
  let videos = document.querySelectorAll(`.video-projects .video`);
  videos.forEach((video) => {
    video.style.transform = "scale(0.9)";
  });
  document.querySelector(
    `.video-projects .video-container .video${focusVideo}`
  ).style.transform = "scale(1)";
  videoPlaying = true
    video.addEventListener("ended", (event) => {
      console.log(e.target.parentNode.classList);
      e.target.parentNode.classList.add("show");
      e.target.parentNode.classList.remove("hide");
      video.removeAttribute("controls");
      videoEnded = true;
      videoPlaying = false
      return
    });
}

let playBtns = document.querySelectorAll(".video-projects .video .play-btn");
playBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => videoControlDisplay(e));
});

let focusVideo = 1;
let prevScroll = 0;

function autoslide() {

  if (!videoPlaying) {
    setInitialStateOfVideos();
  }
  let currentScroll = document.querySelector(
    ".video-projects .slide-container"
  ).scrollLeft;

  if (currentScroll === prevScroll && !videoPlaying) {
    let videos = document.querySelectorAll(`.video-projects .video`);
    videos.forEach((video) => {
      video.style.transform = "scale(0.9)";
      video.classList.remove("focus");
    });

    if (focusVideo === 7) {
      focusVideo = 1;
    }
    console.log(focusVideo)
    document.querySelector(
      `.video-projects .video-container .video${focusVideo}`
    ).style.transform = "scale(1)";

    document.querySelector(
      `.video-projects .video-container .video${focusVideo}`
    ).classList.add("focus");

    document
      .querySelector(`.video-projects .video-container .video${focusVideo}`)
      .scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    prevScroll = document.querySelector(
      ".video-projects .slide-container"
    ).scrollLeft;

    focusVideo += 1;
  } else {
    prevScroll = document.querySelector(
      ".video-projects .slide-container"
    ).scrollLeft;
  }
}
setInterval(() => {
  isInViewport(document.querySelector(`.video-projects .slide-container`)) ? autoslide() : "";
}, 3000);


function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  );
}

