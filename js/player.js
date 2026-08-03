console.log("Player JS loaded");
/* ==================================================
   SOLIPCISOR AUDIO ENGINE v1.0
   ================================================== */


const audio = document.getElementById("audioPlayer");
console.log("audio element =", audio);
const playerContainer = document.getElementById("playerContainer");

let activeTrack = null;
let activePlayer = null;
let dragging = false;
let moved = false;


/* ---------- Helpers ---------- */


function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${secs}`;

}



/* ---------- Create Player ---------- */


function createPlayer(track) {


    const player = document.createElement("div");

    player.className = "track-player";


    player.innerHTML = `

        <button class="play-button">

            <span class="play-icon">
                ▶
            </span>

        </button>


        <div class="timeline">

            <div class="timeline-played"></div>

            <div class="timeline-handle"></div>

        </div>


        <div class="time-display">
            0:00 / 0:00
        </div>

    `;


    const button =
        player.querySelector(".play-button");


    const timeline =
        player.querySelector(".timeline");


    const played =
        player.querySelector(".timeline-played");


    const handle =
        player.querySelector(".timeline-handle");


    const display =
        player.querySelector(".time-display");



    /* ---------- Play / Pause ---------- */


    button.addEventListener("click", (e) => {

        e.stopPropagation();

        if (audio.paused) {

            audio.play().catch(error => {

            console.log("Playback prevented:", error);

        });

            button.querySelector(".play-icon").textContent = "❚❚";

        }

        else {

            audio.pause();

            button.querySelector(".play-icon").textContent = "▶";

        }

    });



    /* ---------- Timeline Seek ---------- */


let dragging = false;


function seek(e) {

    const rect =
        timeline.getBoundingClientRect();


    let position =
        (e.clientX - rect.left) / rect.width;


    position =
        Math.max(0, Math.min(1, position));


    audio.currentTime =
        position * audio.duration;

}



timeline.addEventListener("mousedown", e => {

    e.stopPropagation();

    dragging = true;
    moved = false;

    seek(e);

});



window.addEventListener("mousemove", e => {

    if (dragging) {

        moved = true;

        seek(e);

    }

});



window.addEventListener("mouseup", () => {

    dragging = false;

});

timeline.addEventListener("touchstart", e => {

    dragging = true;

    seek(e.touches[0]);

});


window.addEventListener("touchmove", e => {

    if (dragging) {

        seek(e.touches[0]);

    }

});


window.addEventListener("touchend", () => {

    dragging = false;

});


    /* ---------- Audio Updates ---------- */


    audio.addEventListener("timeupdate", () => {


        if (activePlayer !== player) {
            return;
        }


        const percent =
            (audio.currentTime / audio.duration) * 100;


        played.style.width =
            `${percent}%`;


        handle.style.left =
            `${percent}%`;


        display.textContent =
            `${formatTime(audio.currentTime)}
             /
             ${formatTime(audio.duration)}`;


    });



    audio.addEventListener("loadedmetadata", () => {


        if (activePlayer !== player) {
            return;
        }


        display.textContent =
            `0:00 / ${formatTime(audio.duration)}`;


    });



    audio.addEventListener("ended", () => {


        if (activePlayer !== player) {
            return;
        }


        button.querySelector(".play-icon").textContent = "↻";


        played.style.width = "100%";

        handle.style.left = "100%";


    });



    return player;

}



/* ---------- Track Selection ---------- */


document.querySelectorAll(".track")
.forEach(track => {


    track.addEventListener("click", (e) => {

        if (track.classList.contains("playing")) {

            return;

        }

        if(moved){
            moved = false;
            return;
        }

        const source =
            track.dataset.audio;


        /* Same track clicked */

        if (activeTrack === track) {


            if (audio.paused) {

                audio.play();

                activePlayer
                    .querySelector(".play-icon")
                    .textContent = "❚❚";

            }

            else {

                audio.pause();

                activePlayer
                    .querySelector(".play-icon")
                    .textContent = "▶";

            }


            return;

        }



        /* Remove old player */


        if (activePlayer) {

            activePlayer.remove();

            activeTrack.classList.remove("playing");

        }



        audio.pause();



        /* Load new track */


        audio.src = source;


        audio.load();



        activeTrack = track;



        activePlayer =
            createPlayer(track);
            track.classList.add("playing");


        const playerWrapper = document.createElement("div");

        playerWrapper.className = "track-player-wrapper";

        playerWrapper.appendChild(activePlayer);

        track.appendChild(playerWrapper);

        requestAnimationFrame(() => {

            playerWrapper.classList.add("open");

        });



        audio.play();



        activePlayer
            .querySelector(".play-icon")
            .textContent = "❚❚";



    });


});