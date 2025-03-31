document.addEventListener("DOMContentLoaded", function () {
    const taglines = [
        "Bringing Professional Help to Your Doorstep!",
        "Affordable, Reliable, Convenient – Just One Click Away!",
        "Service. Simplicity. Satisfaction."
    ];

    let taglineIndex = 0;
    const taglineElement = document.getElementById("animatedTagline");

    function animateTagline() {
        taglineElement.style.opacity = "0";
        setTimeout(() => {
            taglineElement.textContent = "";
            let words = taglines[taglineIndex].split(" ");
            let wordIndex = 0;

            function typeNextWord() {
                if (wordIndex < words.length) {
                    taglineElement.textContent += words[wordIndex] + " ";
                    wordIndex++;
                    setTimeout(typeNextWord, 200);
                } else {
                    setTimeout(() => {
                        taglineElement.style.opacity = "1";
                        taglineIndex = (taglineIndex + 1) % taglines.length;
                        setTimeout(animateTagline, 3000);
                    }, 300);
                }
            }

            typeNextWord();
        }, 300);
    }

    animateTagline();
});
