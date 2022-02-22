const song = document.getElementById('song');
const playBtn = document.querySelector('.play-inner');
const nextBtn = document.querySelector('.forward');
const prevBtn = document.querySelector('.backward');
const durationTime = document.querySelector('.duration');
const remainingTime = document.querySelector('.remaining');
const rangeBar = document.querySelector('.range');
const musicName = document.querySelector('.music-name');
const musicImage = document.querySelector('.music-thumb img');
const musicThumb = document.querySelector('.music-thumb');
const playRepeat = document.querySelector('.repeat');
let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
//const musics = ['NgayDauTien-DucPhuc-7129810.mp3','Chay-Ve-Khoc-Voi-Anh-ERIK.mp3','ChiaCachBinhYenLofiVer-QuocThien-7129092.mp3'];
const musics = [{
        id: 1,
        title: 'Duc Phuc',
        file: 'NgayDauTien-DucPhuc-7129810.mp3',
        image: 'https://media.istockphoto.com/photos/abstract-technological-background-in-vibrant-colors-with-blur-picture-id1310488699?b=1&k=20&m=1310488699&s=170667a&w=0&h=isZviqHbtzf6-4H7GNIlxOpNQgdMLW_a8TxBxz2egu4='
    },
    {
        id: 2,
        title: 'Erik',
        file: 'Chay-Ve-Khoc-Voi-Anh-ERIK.mp3',
        image: 'https://media.istockphoto.com/photos/abstract-technology-background-big-data-digital-line-wave-business-picture-id1319893380?b=1&k=20&m=1319893380&s=170667a&w=0&h=DMXxyCyMZIcOo3Pd1ArhI1mAyxLGBGnJhnxSQvUmmUQ='
    },
    {
        id: 3,
        title: 'Quoc Thien',
        file: 'ChiaCachBinhYenLofiVer-QuocThien-7129092.mp3',
        image: 'https://media.istockphoto.com/photos/abstract-technology-background-big-data-digital-line-wave-business-picture-id1319893380?b=1&k=20&m=1319893380&s=170667a&w=0&h=DMXxyCyMZIcOo3Pd1ArhI1mAyxLGBGnJhnxSQvUmmUQ='

    }

]
let timer;
let repeatCount = 0
nextBtn.addEventListener('click', function() {
    changeSong(1);
});
song.addEventListener('ended', handleEndedSong);

function handleEndedSong() {
    repeatCount++;
    if (isRepeat && repeatCount === 1) {
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
}
prevBtn.addEventListener('click', function() {
    changeSong(-1);
});

function changeSong(dir) {
    if (dir === 1) {
        //next Song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        //prev Song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    //song.setAttribute("src",`./asset/Music/${musics[indexSong].file}`);
    playPause();
}
playRepeat.addEventListener('click', function() {
    if (isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute('style');
    } else {
        isRepeat = true;
        playRepeat.style.color = 'red';
    }
});
playBtn.addEventListener('click', playPause);

function playPause() {
    if (isPlaying) {
        musicThumb.classList.add('is-playing');
        song.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    } else {
        musicThumb.classList.remove('is-playing');
        song.pause();
        playBtn.innerHTML = ' <i class="fa-solid fa-play"></i>';
        isPlaying = true;
        clearInterval(timer);
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = '00:00';
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes: minutes}:${seconds < 10?'0'+seconds:seconds}`;
}
rangeBar.addEventListener('change', handleChangeBar);

function handleChangeBar() {
    song.currentTime = rangeBar.value;
}

function init(indexSong) {
    song.setAttribute("src", `./asset/Music/${musics[indexSong].file}`);
    musicImage.setAttribute('src', musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);