// ===== SOUND EFFECTS =====
function playKeypadSound() {
  const sound = document.getElementById("keypadSound");
  sound.currentTime = 0;
  sound.play();
}

function playVentSound() {
  const sound = document.getElementById("ventSound");
  sound.currentTime = 0;
  sound.play();
}

function playCorrectSound() {
  const sound = document.getElementById("correctSound");
  sound.currentTime = 0;
  sound.play();
}

function playWrongSound() {
  const sound = document.getElementById("wrongSound");
  sound.currentTime = 0;
  sound.play();
}

// ===== BACKGROUND MUSIC =====
let isMuted = false;

function startBgMusic() {
  const bg = document.getElementById("bgMusic");
  bg.volume = 0.3;
  if (!isMuted) {
    bg.play().catch(() => {
      console.log("Background music will start after first user interaction.");
    });
  }
}

function stopBgMusic() {
  const bg = document.getElementById("bgMusic");
  bg.pause();
  bg.currentTime = 0;
}

window.addEventListener("DOMContentLoaded", startBgMusic);

// ===== MUTE BUTTON =====
const muteBtn = document.getElementById("muteBtn");
muteBtn.addEventListener("click", () => {
  const bg = document.getElementById("bgMusic");
  isMuted = !isMuted;

  if (isMuted) {
    bg.pause();
    muteBtn.textContent = "Muted";
  } else {
    bg.play();
    muteBtn.textContent = "Mute";
  }
});

// ===== MODAL CONTROLS =====
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";

  // Stop all sounds except bgMusic
  const sounds = document.querySelectorAll("audio");
  sounds.forEach((sound) => {
    if (sound.id !== "bgMusic") {
      sound.pause();
      sound.currentTime = 0;
    }
  });

  startBgMusic();
}

// Close modals if clicking outside modal content
window.addEventListener("click", function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// ===== KEYPAD LOGIC =====
let inputCode = "";

function pressKey(num) {
  if (inputCode.length < 8) {
    inputCode += num;
    document.getElementById("display").textContent = inputCode;
  }
}

function clearDisplay() {
  inputCode = "";
  document.getElementById("display").textContent = "";
}

function checkCode() {
  const display = document.getElementById("display");
  const correctCode = "14909531";
  const redirectURL = "https://ppgc6h.csb.app/";

  if (inputCode === correctCode) {
    playCorrectSound();
    display.textContent = "ACCESS GRANTED";
    display.style.color = "#00ff00";

    setTimeout(() => {
      window.location.href = redirectURL;
    }, 1500);
  } else {
    playWrongSound();
    display.textContent = "INCORRECT";
    display.style.color = "red";

    setTimeout(() => {
      clearDisplay();
      display.style.color = "#00ff00";
    }, 1000);
  }
}

function ventgoogoo() {
  window.location.href = "https://tahlahlah.github.io/FNAFRoomCode/";
}

const backdrops = document.querySelectorAll(".door-backdrop");

backdrops[0].addEventListener("click", () => {
  if (leftDoor.classList.contains("open")) {
    setTimeout(() => {
      window.location.href = leftDoorRedirect;
    }, 1200);
  }
});

backdrops[1].addEventListener("click", () => {
  if (rightDoor.classList.contains("open")) {
    setTimeout(() => {
      window.location.href = rightDoorRedirect;
    }, 1200);
  }
});

// ===== JUMPSCARE LOGIC =====
function tryRandomPopup() {
  const popup = document.getElementById("randomPopup");
  const lossModal = document.getElementById("lossModal");
  const jumpSound = document.getElementById("jumpscareSound");

  // 1 in 100 chance
  if (Math.random() < 0.00007) {
    // show jumpscare
    popup.style.display = "block";

    // play sound
    jumpSound.currentTime = 0;
    jumpSound.play();

    // after 1.2 seconds, hide image AND show loss modal
    setTimeout(() => {
      popup.style.display = "none";
      lossModal.style.display = "flex";
    }, 500);
  }
}

// check every second
setInterval(tryRandomPopup, 1000);

// ===== DRAWER ROWS =====
// Already handled in HTML via onclick="openModal('drawerXModal')"
// Hover effect handled in CSS
