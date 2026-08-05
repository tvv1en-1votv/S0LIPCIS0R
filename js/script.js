// ================= LOGO HOVER =================

const logo = document.getElementById("logo");

if (logo) {

    logo.addEventListener("mouseenter", () => {
        logo.classList.add("active");
    });

    logo.addEventListener("mouseleave", () => {
        logo.classList.remove("active");
    });


    logo.addEventListener("click", () => {

        const shareMenu = document.getElementById("shareMenu");

        if (!shareMenu) return;

        shareMenu.classList.remove("active");

        void shareMenu.offsetWidth;

        shareMenu.classList.add("active");

        clearTimeout(shareMenu.hideTimer);

        shareMenu.hideTimer = setTimeout(() => {
            shareMenu.classList.remove("active");
        },4000);

    });

}


// ================= SHARE POPUP =================

const shareMenu = document.getElementById("shareMenu");


logo.addEventListener("click", () => {

    shareMenu.classList.remove("active");

    // restart animation
    void shareMenu.offsetWidth;

    shareMenu.classList.add("active");

    clearTimeout(shareMenu.hideTimer);

    shareMenu.hideTimer = setTimeout(() => {

        shareMenu.classList.remove("active");

    }, 4000);

});

// ================= SHARE BUTTONS =================

const shareURL = encodeURIComponent(window.location.href);


// Telegram
document.getElementById("telegramShare").href =
    `https://t.me/share/url?url=${shareURL}`;


// WhatsApp
document.getElementById("whatsappShare").href =
    `https://wa.me/?text=${shareURL}`;


// X
document.getElementById("xShare").href =
    `https://twitter.com/intent/tweet?url=${shareURL}`;


// Facebook
document.getElementById("facebookShare").href =
    `https://www.facebook.com/sharer/sharer.php?u=${shareURL}`;


// Copy link

const copyButton =
    document.getElementById("copyLink");


    copyButton.addEventListener("click", () => {

        navigator.clipboard.writeText(window.location.href);

        copyButton.querySelector("img").alt = "Copied!";

        setTimeout(() => {

            copyButton.addEventListener("click", () => {

        navigator.clipboard.writeText(window.location.href);

        const img = copyButton.querySelector("img");

        img.alt = "Copied!";

        setTimeout(() => {

            img.alt = "Copy link";

        },2000);

    });

    }, 2000);

});

// ================= TTC VIDEO =================


const videoLaunch =
    document.getElementById("videoLaunch");


const videoPlayer =
    document.getElementById("videoPlayer");


const mainVideo =
    document.getElementById("mainVideo");


const collapseVideo =
    document.getElementById("collapseVideo");



if (videoLaunch && mainVideo && collapseVideo) {

    videoLaunch.addEventListener("click", () => {

        document
            .querySelector(".video-card")
            ?.classList.add("video-open");

    });

    collapseVideo.addEventListener("click", () => {

        mainVideo.pause();
        mainVideo.currentTime = 0;

        document
            .querySelector(".video-card")
            ?.classList.remove("video-open");

    });

}



collapseVideo.addEventListener("click", () => {

    mainVideo.pause();

    mainVideo.currentTime = 0;

    document
        .querySelector(".video-card")
        .classList.remove("video-open");

});




// ================= CREDITS =================


const creditsButton =
    document.getElementById("creditsButton");


const creditsOverlay =
    document.getElementById("creditsOverlay");



creditsButton.addEventListener("click", () => {

    creditsOverlay.classList.add("active");

});



creditsOverlay.addEventListener("click", () => {

    creditsOverlay.classList.remove("active");

});

document.querySelectorAll(".album-cover").forEach(img => {

    img.addEventListener("mousemove", e => {

        const rect = img.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const moveX = (x-0.5) * 120;
        const moveY = (y-0.5) * 120;

        img.style.transform =
            `scale(1.725) translate(${-moveX}px, ${-moveY}px)`;

    });


    img.addEventListener("mouseleave", () => {

        img.style.transform =
            "scale(1) translate(0,0)";

    });

});

// ================= ASCII BACKGROUND =================


async function loadASCII(file, element) {

    const response = await fetch(file);

    const text = await response.text();

    document.getElementById(element).textContent = text;

}


loadASCII(
    "ascii/bg.txt",
    "backgroundASCII"
);


loadASCII(
    "ascii/fg.txt",
    "foregroundASCII"
);
