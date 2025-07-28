const sound = document.getElementById("clickSound");
const clickable = document.querySelector(".soundon");

clickable.addEventListener("click", () => {
    sound.currentTime = 0;
    sound.play();
});

const lines = [
    document.getElementById("line-0"),
    document.getElementById("line-1"),
    document.getElementById("line-2"),
    document.getElementById("line-3")
];

let clickCount = 0;
lines.forEach((line, index) => {
    line.style.display = index === 0 ? "block" : "none";
});
function advancePoem() {
    clickCount++;
    if (clickCount < lines.length) {
        lines[clickCount].style.display = "block";
    } else if (clickCount === lines.length) {
        lines.forEach(line => line.style.display = "block");
    }
}
const revealWords = document.querySelectorAll(".reveal-word");

revealWords.forEach(word => {
    word.addEventListener("click", (e) => {
        e.stopPropagation();
        word.classList.add("revealed");
    });
});

const rightDaffodil = document.querySelector(".rightdaffodil");
const leftDaffodil = document.querySelector(".leftdaffodil");

console.log("Right daffodil found:", rightDaffodil);
console.log("Left daffodil found:", leftDaffodil);

if (rightDaffodil) {
    rightDaffodil.addEventListener("click", (e) => {
        console.log("Right daffodil clicked!");
        e.stopPropagation();
        console.log("Changing src from:", rightDaffodil.src);
        rightDaffodil.src = "svg/rightbloom.svg";
        console.log("Changed src to:", rightDaffodil.src);
        rightDaffodil.classList.add("bloomed");
        console.log("Added bloomed class");
    });
}

if (leftDaffodil) {
    leftDaffodil.addEventListener("click", (e) => {
        console.log("Left daffodil clicked!");
        e.stopPropagation();
        console.log("Changing src from:", leftDaffodil.src);
        leftDaffodil.src = "svg/leftbloom.svg";
        console.log("Changed src to:", leftDaffodil.src);
        leftDaffodil.classList.add("bloomed");
        console.log("Added bloomed class");
    });
}

const eyeContainer = document.querySelector('.eyefollow');
const pupil = document.querySelector('.eyefollow .pupil');

if (eyeContainer && pupil) {
    let isTracking = false;

    function movePupil(e) {
        if (!isTracking) return;

        const rect = eyeContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const maxMoveX = 47; // These values might need to be adjusted based on the new scaling
        const maxMoveY = 9;  // These values might need to be adjusted based on the new scaling
        const sensitivity = 2.5;

        const pupilX = Math.max(-maxMoveX, Math.min(maxMoveX, mouseX * sensitivity));
        const pupilY = Math.max(-maxMoveY, Math.min(maxMoveY, mouseY * sensitivity));

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }

    function checkMouseProximity(e) {
        const rect = eyeContainer.getBoundingClientRect();
        const expandedMargin = 100; // This might need to scale, e.g., 5vw

        const isNearEye = (
            e.clientX >= rect.left - expandedMargin &&
            e.clientX <= rect.right + expandedMargin &&
            e.clientY >= rect.top - expandedMargin &&
            e.clientY <= rect.bottom + expandedMargin
        );

        if (isNearEye && !isTracking) {
            isTracking = true;
            document.addEventListener('mousemove', movePupil);
        } else if (!isNearEye && isTracking) {
            isTracking = false;
            document.removeEventListener('mousemove', movePupil);
            pupil.style.transform = 'translate(0px, 0px)';
        }
    }

    document.addEventListener('mousemove', checkMouseProximity);
}

const heartElement = document.getElementById('heartAnimation');
const dropContainer = document.getElementById('dropContainer');
const dropElement = document.getElementById('dropAnimation');
const flowerContainer = document.getElementById('flowerContainer');
const flowerElement = document.getElementById('flowerAnimation');
const finalDaffodils = document.getElementById('finalDaffodils');
const finalDaffodil = document.querySelector('.final-daffodil');

let animationStep = 0;

if (heartElement) {
    heartElement.addEventListener('click', startFinalAnimation);
}

function startFinalAnimation() {
    if (animationStep !== 0) return;

    animationStep = 1;

    setTimeout(() => {
        heartElement.src = 'svg/hearthalffill.svg';
    }, 300);

    setTimeout(() => {
        heartElement.src = 'svg/heartfill.svg';
        heartElement.classList.add('heart-elastic');
    }, 600);

    // Step 3: Drop appears and falls
    setTimeout(() => {
        dropContainer.style.display = 'block';
        dropElement.style.opacity = '1';
        dropElement.classList.add('drop-falling');
    }, 1600);

    // Step 4: Final daffodil appears directly after drop disappears
    setTimeout(() => {
        finalDaffodils.style.display = 'block';
        finalDaffodil.style.opacity = '1';
        finalDaffodil.classList.add('final-daffodil-appearing');
    }, 3600);

    // Step 4.5: Heart disappears slowly after daffodil appears
    setTimeout(() => {
        heartElement.classList.add('heart-fade-out');
    }, 4100);

    // Step 5: Start slow spinning
    setTimeout(() => {
        finalDaffodil.classList.add('daffodil-spinning');
        animationStep = 5; // Animation complete
    }, 4600);
}

// Reset animation function (optional)
function resetAnimation() {
    animationStep = 0;
    heartElement.src = 'svg/heartnotfill.svg';
    heartElement.classList.remove('heart-elastic', 'heart-fade-out');
    dropContainer.style.display = 'none';
    dropElement.classList.remove('drop-falling');
    flowerContainer.style.display = 'none'; // This was always commented out in your original HTML, not sure if intended
    flowerElement.classList.remove('flower-fading-in', 'flower-blooming'); // These classes aren't in your CSS
    finalDaffodils.style.display = 'none';
    finalDaffodil.style.opacity = '0';
    finalDaffodil.classList.remove('final-daffodil-appearing', 'daffodil-spinning');
}

// --- UI Hint Management ---

const getHint = (id) => document.getElementById(id);

// First Scene: Hover the second line
const hintFirstScene = getHint('hint-first-scene');
if (hintFirstScene) {
    // Show hint initially for the first scene
    hintFirstScene.classList.add('active');

    const hoverLine = document.querySelector('.hover-line');
    if (hoverLine) {
        let hintDismissed = false;
        hoverLine.addEventListener('mouseenter', () => {
            if (!hintDismissed) {
                hintFirstScene.classList.remove('active');
                hintDismissed = true;
            }
        }, { once: true }); // Dismiss hint only once
    }
}


// Second Scene: Click the word and hover the flower
const hintSecondScene = getHint('hint-second-scene');
const daffodil = document.querySelector('.daffodil'); // Assuming this is the flower to hover
const poemSection = document.getElementById("poemSection");

if (hintSecondScene && poemSection && daffodil) {
    let hintDismissed = false;
    let lineClicked = false;
    let daffodilHovered = false;

    // Show hint when user scrolls to second scene
    const observerSecondScene = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!hintDismissed) {
                    hintSecondScene.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed
    observerSecondScene.observe(poemSection);

    // Click on words (advancing poem)
    poemSection.addEventListener('click', () => {
        lineClicked = true;
        checkAndDismissSecondSceneHint();
    });

    // Hover daffodil
    daffodil.addEventListener('mouseenter', () => {
        daffodilHovered = true;
        checkAndDismissSecondSceneHint();
    });

    function checkAndDismissSecondSceneHint() {
        if (lineClicked && daffodilHovered && !hintDismissed) {
            hintSecondScene.classList.remove('active');
            hintDismissed = true;
            observerSecondScene.unobserve(poemSection); // Stop observing once dismissed
        }
    }
}


// Third Scene: Hover the third line (.stretch-line)
const hintThirdScene = getHint('hint-third-scene');
const stretchLineWrapper = document.querySelector('.stretch-line-wrapper');
if (hintThirdScene && stretchLineWrapper) {
    let hintDismissed = false;
    // Show hint when user scrolls to third scene
    const observerThirdScene = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!hintDismissed) {
                    hintThirdScene.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });
    observerThirdScene.observe(stretchLineWrapper);

    stretchLineWrapper.addEventListener('mouseenter', () => {
        if (!hintDismissed) {
            hintThirdScene.classList.remove('active');
            hintDismissed = true;
            observerThirdScene.unobserve(stretchLineWrapper);
        }
    }, { once: true });
}


// Fourth Scene: Click on the missing words (space)
const hintFourthScene = getHint('hint-fourth-scene');
const revealArea = document.getElementById('revealClickArea');
if (hintFourthScene && revealArea) {
    let hintDismissed = false;
    // Show hint when user scrolls to fourth scene
    const observerFourthScene = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!hintDismissed) {
                    hintFourthScene.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });
    observerFourthScene.observe(revealArea);

    revealWords.forEach(word => {
        word.addEventListener("click", () => {
            if (!hintDismissed) {
                hintFourthScene.classList.remove("active");
                hintDismissed = true;
                observerFourthScene.unobserve(revealArea);
            }
        });
    });
}


// Fifth Scene: Click on the two flowers
const hintFifthScene = getHint('hint-fifth-scene');
const fifthSceneContainer = document.querySelector('.fifth.scene');
if (hintFifthScene && fifthSceneContainer && rightDaffodil && leftDaffodil) {
    let hintDismissed = false;
    let rightDaffodilClicked = false;
    let leftDaffodilClicked = false;

    // Show hint when user scrolls to fifth scene
    const observerFifthScene = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!hintDismissed) {
                    hintFifthScene.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });
    observerFifthScene.observe(fifthSceneContainer);

    // Event listeners already exist for daffodil clicks, just update flags
    rightDaffodil.addEventListener("click", () => {
        rightDaffodilClicked = true;
        checkAndDismissFifthSceneHint();
    });

    leftDaffodil.addEventListener("click", () => {
        leftDaffodilClicked = true;
        checkAndDismissFifthSceneHint();
    });

    function checkAndDismissFifthSceneHint() {
        if (rightDaffodilClicked && leftDaffodilClicked && !hintDismissed) {
            hintFifthScene.classList.remove('active');
            hintDismissed = true;
            observerFifthScene.unobserve(fifthSceneContainer);
        }
    }
}


// Sixth Scene: Hover around the eye
const hintSixthScene = getHint('hint-sixth-scene');
const sixthSceneContainer = document.querySelector('.sixth.scene');
if (hintSixthScene && sixthSceneContainer && eyeContainer) {
    let hintDismissed = false;

    // Show hint when user scrolls to sixth scene
    const observerSixthScene = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!hintDismissed) {
                    hintSixthScene.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });
    observerSixthScene.observe(sixthSceneContainer);

    // The eye tracking already has a proximity check. We can piggyback on that.
    // Modify checkMouseProximity to dismiss the hint once eye tracking starts
    const originalCheckMouseProximity = document.body._checkMouseProximity; // Get reference if set globally
    if (originalCheckMouseProximity) {
        document.removeEventListener('mousemove', originalCheckMouseProximity);
    }

    const dismissHintOnEyeHover = (e) => {
        const rect = eyeContainer.getBoundingClientRect();
        const expandedMargin = 100;

        const isNearEye = (
            e.clientX >= rect.left - expandedMargin &&
            e.clientX <= rect.right + expandedMargin &&
            e.clientY >= rect.top - expandedMargin &&
            e.clientY <= rect.bottom + expandedMargin
        );

        if (isNearEye && !hintDismissed) {
            hintSixthScene.classList.remove('active');
            hintDismissed = true;
            observerSixthScene.unobserve(sixthSceneContainer);
            // Optionally, remove this specific listener after dismissal if it interferes
            document.removeEventListener('mousemove', dismissHintOnEyeHover);
        }
        // Call original logic if it exists
        if (originalCheckMouseProximity) originalCheckMouseProximity(e);
    };

    document.addEventListener('mousemove', dismissHintOnEyeHover);
    document.body._checkMouseProximity = dismissHintOnEyeHover; // Store reference if needed
}


// Seventh Scene: Click the heart
const hintSeventhScene = getHint('hint-seventh-scene');
const heart = document.getElementById('heartAnimation');
const seventhSceneContainer = document.querySelector('.seventh-scene-container');

if (hintSeventhScene && heart && seventhSceneContainer) {
    let hintDismissed = false;

    // Show hint when user scrolls to seventh scene
    const observerSeventhScene = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!hintDismissed) {
                    hintSeventhScene.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });
    observerSeventhScene.observe(seventhSceneContainer);

    heart.addEventListener('click', () => {
        if (!hintDismissed) {
            hintSeventhScene.classList.remove('active');
            hintDismissed = true;
            observerSeventhScene.unobserve(seventhSceneContainer);
        }
    }, { once: true });
}