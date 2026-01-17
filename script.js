// PAGE NAVIGATION
function goToPage(pageNumber) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("page" + pageNumber).classList.add("active");

    if (pageNumber === 2) {
        page2Music.currentTime = 0;
        page3Music.pause();
        page2Music.play();
        startTyping();
        startPoemTyping();
        startHeartsRain();
    } else if (pageNumber === 3) {
        page2Music.pause();
        page3Music.currentTime = 0;
        page3Music.play();
        stopHeartsRain();
        scrollToScreen(1);
    } else {
        page2Music.pause();
        page3Music.pause();
        stopHeartsRain();
    }
}

// PAGE 3 SCREEN NAVIGATION
function scrollToScreen(screenNumber) {
    const screens = document.querySelectorAll(".page3-screen");
    screens.forEach(screen => screen.classList.remove("active"));

    const screen = document.getElementById("screen" + screenNumber);
    if (screen) {
        screen.classList.add("active");
        screen.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// CONTINUOUS HEARTS RAIN
let heartsRainInterval = null;

function startHeartsRain() {
    if (heartsRainInterval) clearInterval(heartsRainInterval);

    heartsRainInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart-rain";
        heart.innerHTML = ["❤️", "💕", "💖", "💝"][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.animationDuration = (4 + Math.random() * 3) + "s";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 7000);
    }, 400);
}

function stopHeartsRain() {
    if (heartsRainInterval) {
        clearInterval(heartsRainInterval);
        heartsRainInterval = null;
    }
}

// BACKGROUND MUSIC
const page2Music = document.getElementById("page2Music");
const page3Music = document.getElementById("page3Music");

function toggleMusic() {
    if (page2Music.paused && page3Music.paused) {
        const currentPage = document.querySelector(".page.active");
        if (currentPage.id === "page2") {
            page2Music.play();
        } else if (currentPage.id === "page3") {
            page3Music.play();
        }
    } else {
        page2Music.pause();
        page3Music.pause();
    }
}

// TYPEWRITER EFFECT
const message =
    "On this special day, I just want you to know how truly amazing you are. Your smile makes everything brighter 💖";

let indexText = 0;

function startTyping() {
    const el = document.getElementById("typeText");
    el.innerHTML = "";
    indexText = 0;

    function type() {
        if (indexText < message.length) {
            el.innerHTML += message.charAt(indexText);
            indexText++;
            setTimeout(type, 50);
        }
    }
    type();
}

// POEM TYPEWRITER (page 2)
const poemMessage = `Out of everyone in this world,\nyou are the one my heart chooses every time.\nYour kindness, your smile, and your presence\nmean more to me than you will ever know.\nYou are not just part of my life,\nyou are my life’s most beautiful part.`;
let poemIndex = 0;

function startPoemTyping() {
    const el = document.getElementById("poemText");
    if (!el) return;
    el.innerHTML = "";
    poemIndex = 0;

    function typePoem() {
        if (poemIndex < poemMessage.length) {
            const ch = poemMessage.charAt(poemIndex);
            if (ch === '\n') {
                el.innerHTML += '<br>';
            } else {
                el.innerHTML += ch;
            }
            poemIndex++;
            setTimeout(typePoem, 50);
        }
    }
    typePoem();
}

// SLIDESHOW
let slides = document.querySelectorAll(".slide");
let slideIndex = 0;

// Show all slides without blinking
slides.forEach(slide => {
    slide.classList.add("active");
});

// CONFETTI
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFallingText() {
    const page3 = document.getElementById("page3");
    const texts = ["🎉 Happy Birthday 🎉", "💖 You're Awesome 💖", "🌟 Shine Bright 🌟"];

    for (let i = 0; i < 15; i++) {
        const textEl = document.createElement("div");
        textEl.className = "falling-text";
        textEl.textContent = texts[Math.floor(Math.random() * texts.length)];
        textEl.style.left = Math.random() * window.innerWidth + "px";
        textEl.style.animation = `fall ${3 + Math.random() * 2}s linear`;
        textEl.style.animationDelay = Math.random() * 0.5 + "s";
        page3.appendChild(textEl);

        setTimeout(() => {
            textEl.remove();
        }, 5500);
    }
}

function celebrate() {
    createFallingText();

    particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 10 + 10,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
            tiltAngle: 0
        });
    }
    requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.tiltAngle += p.tiltAngleIncremental;



        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle) * 15;
        if (p.y > canvas.height) {
            particles[index] = {
                x: Math.random() * canvas.width,
                y: -10,
                r: p.r,
                d: p.d,
                color: p.color,
                tilt: p.tilt,
                tiltAngleIncremental: p.tiltAngleIncremental,
                tiltAngle: p.tiltAngle
            };
        }
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
    });
    requestAnimationFrame(draw);
}

// ===== NEW FEATURES =====

// 1. ENHANCED PHOTO CAROUSEL
let currentSlideIndex = 0;
let autoSlideTimer = null;

function showSlide(index) {
    slides = document.querySelectorAll(".slide");
    slides.forEach(slide => slide.classList.remove("active"));
    currentSlideIndex = (index + slides.length) % slides.length;
    slides[currentSlideIndex].classList.add("active");
    resetAutoSlideTimer();
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

function autoSlideshow() {
    showSlide(currentSlideIndex + 1);
}

function resetAutoSlideTimer() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(autoSlideshow, 6000);
}

// Start auto slideshow on load
document.addEventListener("DOMContentLoaded", () => {
    resetAutoSlideTimer();

    // Add click handlers to slideshow pseudo-elements
    const slideshow = document.querySelector(".slideshow");
    if (slideshow) {
        slideshow.addEventListener("click", (e) => {
            if (e.clientX < window.innerWidth / 2) {
                prevSlide();
            } else {
                nextSlide();
            }
        });
    }
});

// 2. ENHANCED CONFETTI ON POEM FINISH + STARBURST
let poemFinished = false;

function createStarburst() {
    const starCount = 30;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.innerHTML = "✨";
        star.style.position = "fixed";
        star.style.left = "50%";
        star.style.top = "50%";
        star.style.fontSize = "20px";
        star.style.pointerEvents = "none";
        star.style.zIndex = "999";

        const angle = (i / starCount) * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        document.body.appendChild(star);

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let lifetime = 100;

        const animate = () => {
            x += vx;
            y += vy;
            lifetime--;
            star.style.left = x + "px";
            star.style.top = y + "px";
            star.style.opacity = lifetime / 100;

            if (lifetime > 0) {
                requestAnimationFrame(animate);
            } else {
                star.remove();
            }
        };
        animate();
    }
}

function poemFinishConfetti() {
    if (!poemFinished && poemIndex >= poemMessage.length) {
        poemFinished = true;
        createStarburst();
        setTimeout(() => {
            particles = [];
            for (let i = 0; i < 150; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: -10,
                    r: Math.random() * 5 + 2,
                    d: Math.random() * 10 + 10,
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    tilt: Math.random() * 10 - 10,
                    tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
                    tiltAngle: 0
                });
            }
            requestAnimationFrame(draw);
        }, 200);
    }
}

setInterval(() => {
    const currentPage = document.querySelector(".page.active");
    if (currentPage && currentPage.id === "page2") {
        poemFinishConfetti();
    }
}, 100);

// 3. INTERACTIVE CURSOR TRACKING
document.addEventListener("mousemove", (e) => {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.pointerEvents = "none";
    heart.style.fontSize = "18px";
    heart.style.zIndex = "1000";
    heart.style.animation = "fadeOut 1s forwards";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
});

// Fade out animation for hearts
const style = document.createElement("style");
style.innerHTML = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-30px) scale(0.3); }
    }
`;
document.head.appendChild(style);

// 4. BALLOON POP FUNCTIONALITY
document.querySelectorAll(".balloon").forEach(balloon => {
    balloon.addEventListener("click", (e) => {
        e.preventDefault();
        balloon.style.animation = "pop 0.5s ease-out forwards";
        playPopSound();

        setTimeout(() => {
            balloon.remove();
            // Create new balloon
            createNewBalloon();
        }, 500);
    });
});

function playPopSound() {
    const audioContext = new(window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "square";
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function createNewBalloon() {
    const colors = [
        "linear-gradient(135deg, #ff6b9d, #c06c84)",
        "linear-gradient(135deg, #6bcf7f, #2d9b4b)",
        "linear-gradient(135deg, #ffd93d, #ffb144)",
        "linear-gradient(135deg, #6bcf7f, #4a90e2)"
    ];

    const newBalloon = document.createElement("div");
    newBalloon.className = "balloon";
    newBalloon.style.left = Math.random() * 80 + 10 + "%";
    newBalloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    newBalloon.style.width = (40 + Math.random() * 5) + "px";
    newBalloon.style.height = (50 + Math.random() * 5) + "px";
    newBalloon.style.animationDelay = Math.random() * 3 + "s";
    document.getElementById("page3").appendChild(newBalloon);

    newBalloon.addEventListener("click", (e) => {
        e.preventDefault();
        newBalloon.style.animation = "pop 0.5s ease-out forwards";
        playPopSound();
        setTimeout(() => {
            newBalloon.remove();
            createNewBalloon();
        }, 500);
    });
}

// Add pop animation to CSS
const popStyle = document.createElement("style");
popStyle.innerHTML = `
    @keyframes pop {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); }
        100% { transform: scale(0); opacity: 0; }
    }
`;
document.head.appendChild(popStyle);

// 5. MUSIC VISUALIZER
function createVisualizer() {
    const visualizer = document.getElementById("visualizer");
    visualizer.innerHTML = "";
    const barCount = 20;

    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement("div");
        bar.className = "visualizer-bar";
        bar.style.animationDelay = (i * 0.05) + "s";
        visualizer.appendChild(bar);
    }
}

createVisualizer();

// Animate visualizer when music plays
const currentPage2Music = document.getElementById("page2Music");
const currentPage3Music = document.getElementById("page3Music");

[currentPage2Music, currentPage3Music].forEach(audio => {
    audio.addEventListener("play", () => {
        document.querySelectorAll(".visualizer-bar").forEach((bar, index) => {
            bar.style.animation = `bar-animation ${0.5 + Math.random() * 0.3}s ease-in-out infinite`;
            bar.style.animationDelay = (index * 0.05) + "s";
        });
    });

    audio.addEventListener("pause", () => {
        document.querySelectorAll(".visualizer-bar").forEach(bar => {
            bar.style.height = "20px";
        });
    });
});

// 6. PLAY AUDIO MESSAGE ON PAGE 2
const poemEl = document.getElementById("poemText");
window.addEventListener("load", () => {
    setTimeout(() => {
        const audioMsg = document.getElementById("audioMessage");
        if (audioMsg && audioMsg.src) {
            audioMsg.volume = 0.3;
        }
    }, 2000);
});

// 7. ENHANCED PAGE 1 ROSES - GLOW ON HOVER
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".rose-flower").forEach(rose => {
        rose.style.transition = "all 0.3s ease";
        rose.style.cursor = "pointer";

        rose.addEventListener("mouseenter", () => {
            rose.style.transform = "scale(1.15) drop-shadow(0 0 20px rgba(255, 20, 147, 0.8))";
            rose.style.filter = "brightness(1.2) drop-shadow(0 0 25px rgba(255, 105, 180, 0.8))";
        });

        rose.addEventListener("mouseleave", () => {
            rose.style.transform = "scale(1)";
            rose.style.filter = "brightness(1)";
        });
    });
});