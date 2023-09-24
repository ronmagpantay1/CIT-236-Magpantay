let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Gold Steps",
    artist: "Neck Deep",
    image: "https://i.scdn.co/image/ab67616d0000b27382a3560435840c14a72f6b6e",
    path: "..\\assets\\songs\\goldsteps.mp3"
  },
  {
    name: "Rose By The Ocean",
    artist: "In Her Own Words",
    image: "https://i.scdn.co/image/ab67616d0000b273d1db7ddd33e6c857d2e576a4",
    path: "..\\assets\\songs\\rosebytheocean.mp3"
  },
  {
    name: "Baby Blue",
    artist: "Grayscale",
    image: "https://i.scdn.co/image/ab67616d0000b27307cc7f4b0ead2e9ad77c38e3",
    path: "..\\assets\\songs\\babyblue.mp3",
  },
  {
    name: "Dont Look Back In Anger",
    artist: "Oasis",
    image: "https://i.scdn.co/image/ab67616d0000b27385e5dcc05cc216a10f141480",
    path: "..\\assets\\songs\\dontlookback.mp3",
  },
  {
    name: "Moving Boxes",
    artist: "With Confidence",
    image: "https://i.scdn.co/image/ab67616d0000b273706fbb5644d0c803a67291d2",
    path: "..\\assets\\songs\\movingboxes.mp3",
  },
  {
    name: "Pleasures",
    artist: "Sea Way",
    image: "https://i.scdn.co/image/ab67616d0000b273495547d2ffcdeb193b8534c4",
    path: "..\\assets\\songs\\pleasures.mp3",
  },
  {
    name: "Save Me",
    artist: "Home Safe",
    image: "https://i.scdn.co/image/ab67616d0000b273ad7d50150a10785800ddb238",
    path: "..\\assets\\songs\\saveme.mp3",
  },
  {
    name: "Medicine",
    artist: "Tiny Moving Parts",
    image: "https://i.scdn.co/image/ab67616d0000b273c59d701e358b4612be5289e9",
    path: "..\\assets\\songs\\medicine.mp3",
  },
  {
    name: "Clair",
    artist: "Have Mercy",
    image: "https://i.scdn.co/image/ab67616d0000b273e49631db6ec49ecd89d00b68",
    path: "..\\assets\\songs\\clair.mp3",
  },
  {
    name: "In Bloom",
    artist: "Neck Deep",
    image: "https://i.scdn.co/image/ab67616d0000b273012600ed0113720188be4dd5",
    path: "..\\assets\\songs\\inbloom.mp3",
  },
];



function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


