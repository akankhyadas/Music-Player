console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3'); 
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems= Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "./images/cover1.jpg" },
    { songName: " Lover(Remix) ", filePath: "songs/2.mp3", coverPath: "./images/cover2.jpg" },
    { songName: "I did something bad", filePath: "songs/3.mp3", coverPath: "./images/cover3.jpg" },
    { songName: "Don't blame me", filePath: "songs/4.mp3", coverPath: "./images/cover4.jpg" },
    { songName: "Back to december", filePath: "songs/5.mp3", coverPath: "./images/cover5.jpg" },
    { songName: "New Year's day", filePath: "songs/6.mp3", coverPath: "./images/cover6.jpg" },
    { songName: "Midnight Rain", filePath: "songs/7.mp3", coverPath: "./images/cover7.jpg" },
    { songName: "I think he knows", filePath: "songs/8.mp3", coverPath: "./images/cover8.jpg" },
    // Add more song objects here
];
songItems.forEach((element, i) => {
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', () => {
    
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myProgressBar.value=progress;
});
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        
        songIndex = parseInt(e.target.getAttribute('id'));
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName; // Use the corresponding song's filePath
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});



document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    loadAndPlaySong();
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    loadAndPlaySong();
});

function loadAndPlaySong() {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch((error) => {
        console.error('Error playing the audio:', error);
    });
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}


