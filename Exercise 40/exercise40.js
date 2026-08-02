const vedioElement = document.querySelector('#cover');

const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const currentTimeEL = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');
const volumeSlider = document.querySelector('#volume');
const speedSelector = document.querySelector('#speed');

const songs = [
    { title:"See You Again", artist :"Wiz Khalifa ft. Charlie Puth", cover: "images (1).jpg", src : "See You Again.mp4"
    },

    { title:"WAKERE", artist :"Lil Baliil", cover: "Sea.jpg", src : "WAKERE .mp4"
    },

    { title:"Party People", artist :"Nelly ft Fergie", cover: "Party People.jpg", src : "Party People.mp4"
    },

    { title:"Whenever, Wherever", artist :"Shakira", cover: "Whenever, Wherever.jpg", src : "Whenever, Wherever.mp4"
    },
    
    { title:"Hips Don't Lie", artist :"Shakira featuring Wyclef Jean", cover: "Hips Don't Lie.jpg", src : "Hips Don't Lie.mp4"
    },

    { title:"Semie Lelieleh Afe", artist :"Teddy Afro", cover: "Semie Lelieleh Afe.jpg", src : "Semie Lelieleh Afe.mp4"
    },

    { title:"Sheeko", artist :"Dini B", cover: "Sheeko .jpg", src : "Sheeko .mp4"
    },

    { title:"Jaceyl Da' Weyn", artist :"Maxamed warsame Qaasali ft Xaliimo Khaliif Magool", cover: "Jaceyl Da' Weyn .avif", src : "Jaceyl Da' Weyn .mp4"
    },
];

let songIndex = 0;
let isPlaying = false;
let speed = 1;



function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    vedioElement.poster = song.cover; 
    vedioElement.src = song.src;        
}

loadSong(songs[songIndex]);

function playSong () {

    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause')

    vedioElement.play();
    isPlaying = true;
};

function pauseSong () {
        playBtn.querySelector('i').classList.remove('fa-pause');
        playBtn.querySelector('i').classList.add('fa-play');

        vedioElement.pause();
        isPlaying = false;

}

function nexstSong () {
    pauseSong();

   setTimeout(() => {
     songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
   }, 300);
};

function prevSong () {
    pauseSong();

    setTimeout(() => {
      
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);

    playSong()  
    }, 300);
}

// updateProgress
function updateProgress(e) {
    const { duration,currentTime } = e.srcElement;

    if(isNaN (duration)) return;

    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;


    // duration 
    const durationMunites = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);

    if(durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    currentTimeEL.textContent = `${durationMunites}:${durationSeconds}`;

    // currunetMinutes
    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);

    if(currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`
    }
    durationEl.textContent = `${currentMinutes}:${currentSeconds}`;

    vedioElement.playbackRate = speed
}  

// setProgress
function setProgress (e) {
    const width = this.clientWidth;

    const clickX = e.offsetX;

    const duration = vedioElement.duration;
    if(isNaN(duration)) return;

    const newTime = (clickX / width) * duration;

    vedioElement.currentTime = newTime;
}

// All About Events

// playBtn Event
playBtn.addEventListener('click', () => {
   if(isPlaying) {
    pauseSong();
   } else {
    playSong();
   }
});

// nextPtn Event
nextBtn.addEventListener('click', () =>{
    nexstSong();
});

// prevBtn Event
prevBtn.addEventListener('click', prevSong);

// updateProgress
vedioElement.addEventListener('timeupdate', updateProgress);

// setProgress Event
progressContainer.addEventListener('click', setProgress);

// vlumeSlider Event
volumeSlider.addEventListener('input', (e) => {
    vedioElement.volume = e.target.value;
});

speedSelector.addEventListener('change', (e) => {
    speed = parseFloat(e.target.value);
    vedioElement.playbackRate = speed;
});

vedioElement.addEventListener('loadeddata', updateProgress);