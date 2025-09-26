// 1. Get references to the HTML elements
const hoverArea = document.querySelector('.hover-area');
const popupSound = document.getElementById('popup-sound');

// 2. Define the function to play the sound
function playSound() {
    // Reset the audio's playback time to the beginning (0 seconds)
    // This is CRUCIAL to allow the sound to play again every time you hover,
    // even if it hasn't finished playing from the last time.
    popupSound.currentTime = 0;
    
    // Play the audio
    popupSound.play()
        .catch(error => {
            // Catches potential error if the user hasn't interacted with the page yet,
            // as some browsers block autoplay/audio until the first click/tap.
            console.warn("Audio playback blocked, user needs to interact first.", error);
        });
}


const audio = document.getElementById("background-audio");
const btn = document.getElementById("audio-toggle");
let isPlaying = false;

btn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        btn.textContent = "😠"; // icon when stopped
      } else {
        audio.play();
        btn.textContent = "✨"; // icon when playing
      }
      isPlaying = !isPlaying;
    });

    // If the audio ends naturally, reset the icon
    audio.addEventListener("ended", () => {
      btn.textContent = "🎙️";
      isPlaying = false;
    });


// Custom cursor with trailing dots
(() => {
  // Skip on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('no-custom-cursor');
    return;
  }

  const cursor = document.getElementById('cursor');
  let lastDotTime = 0;
  const DOT_INTERVAL = 12; // ms between dots (lower = more dots)

  // Move the ring and spawn trail dots
  window.addEventListener('mousemove', (e) => {
    // position the ring
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

    // throttle trail creation for performance
    const now = performance.now();
    if (now - lastDotTime >= DOT_INTERVAL) {
      spawnDot(e.clientX, e.clientY);
      lastDotTime = now;
    }
  });

  // click feedback (ring shrinks briefly)
  window.addEventListener('mousedown', () => cursor.classList.add('is-down'));
  window.addEventListener('mouseup',   () => cursor.classList.remove('is-down'));

  // subtle enlarge on interactive elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a,button,input,textarea,select,label,[role="button"]')) {
      cursor.classList.add('is-hover');
    } else {
      cursor.classList.remove('is-hover');
    }
  });

  // hide when leaving window
  window.addEventListener('mouseleave', () => cursor.style.opacity = 0);
  window.addEventListener('mouseenter', () => cursor.style.opacity = 1);

  function spawnDot(x, y){
    const dot = document.createElement('span');
    dot.className = 'cursor-dot';
    dot.style.left = x + 'px';
    dot.style.top  = y + 'px';
    document.body.appendChild(dot);
    // remove after animation ends
    setTimeout(() => dot.remove(), parseTime(getComputedStyle(dot).animationDuration) + 50);
  }

  // '550ms' -> 550
  function parseTime(t){ return t.endsWith('ms') ? parseFloat(t) : parseFloat(t)*1000; }
})();

    
console.log("what you doing here !!?  ∘ ∘ ∘ ( °ヮ° ) ?");