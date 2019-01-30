'use strict';
let url = window.location.href
let audioAPI = "api/audio/"
let trackAPI = "api/tracklist/"
let trackList = [];
let played = 0;
let shuffle = false;

// console.log('server:', window.location.href);
// console.log(window.location.href + "api/tracklist/");

$.get(window.location.href + trackAPI, function (data) {
  trackList = data;
});

let audioPlayer = document.getElementById("audio-player")
audioPlayer.addEventListener("ended", function () {
  audioPlayer.currentTime = 0;
  // console.log("ended");
  chooseTrack();
});

let playTrack = function (track) {
  document.getElementById("current").src = url + audioAPI + track
  // console.log(document.getElementById("current").src);
  document.getElementById("playing-track").innerHTML = track.split(".")[0]
  audioPlayer.load();
  played++
};

let chooseTrack = function () {
  if (shuffle === true) {
    // console.log('playing random track')
    random();
  } else {
    // console.log('playing next track in list')
    playlist();
  }
};

let playlist = function () {
//   console.log(trackList[played])
  playTrack(trackList[played]);
  if (played === trackList.length) { played = 0 }
}

let random = function () {
  let playing = Math.floor(Math.random() * trackList.length)
  playTrack(trackList[playing].replace(' ', '\ '));
}

let nextTrack = document.getElementById("next")
nextTrack.onclick = function () {
  // console.log('selecting next track');
  chooseTrack();
};

let pauseTrack = document.getElementById("pause")
pauseTrack.onclick = function () {
  if (audioPlayer.paused && audioPlayer.currentTime > 0 && !audioPlayer.ended) {
    audioPlayer.play();
    document.getElementById("pause").innerHTML = "Pause"
  } else {
    audioPlayer.pause();
    document.getElementById("pause").innerHTML = "Play"
  }
}

let playMode = document.getElementById("mode")
playMode.onclick = function () {
  shuffle = !shuffle
  console.log(shuffle)
  if (shuffle === true) {
    document.getElementById("mode").innerHTML = "List"
  } else {
    document.getElementById("mode").innerHTML = "Random"
  }
}

window.onload = function () {
  chooseTrack();
};

setTimeout(() => {
  audioPlayer.play();
}, 500)